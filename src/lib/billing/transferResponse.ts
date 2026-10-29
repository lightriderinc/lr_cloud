import {
  creditsToCents,
  transferCreditsBatch,
  type BatchRowInput,
} from "@/lib/billing/transferCredits";
import type { Customer } from "@prisma/client";
import { NextResponse } from "next/server";

/**
 * Runs a Share Credits batch for an already-authenticated sender and answers
 * with the HTTP response both transfer routes return:
 *
 *   POST /api/billing/credits/transfer            (this app's session)
 *   POST /api/internal/entropy/transfer           (the entropy platform)
 *
 * One place, so the two routes can never disagree about validation, status
 * codes or messages. The routes only differ in how they authenticate.
 *
 * Body: {
 *   rows: [{ email: string, credits: number }],  // credits, not cents
 *   idempotencyKey: string                       // client-generated, per submit
 * }
 *
 * Responses follow the same shape the rest of /api/lr and /api/billing use —
 * `{ error: "<snake_case_code>", message: "<human text>" }` with a matching
 * status, so existing client helpers that read `data.error` keep working:
 *   200 { ok: true, batchId, rows[], totalSentCents, senderBalanceCents, replayed }
 *   402 { error: "insufficient_balance", message, balanceCents, requestedCents, rows[] }
 *   422 { error: "no_valid_rows", message, rows[] }
 *   400 { error: "too_many_rows" | "error", message }
 *   500 { error: "error", message }            — unexpected failure, nothing moved
 *
 * Per-row outcomes live in `rows[]`, so one bad address never collapses into a
 * single generic error for the whole batch.
 */
/**
 * `getSender` resolves the sending Customer. It is only called once the body
 * has passed its shape checks, so a malformed request never provisions one.
 */
export async function transferBatchResponse(
  getSender: () => Promise<Customer>,
  body: { rows?: unknown; idempotencyKey?: unknown },
): Promise<NextResponse> {
  if (!Array.isArray(body.rows)) {
    return NextResponse.json(
      { error: "error", message: "Expected a list of recipients." },
      { status: 400 },
    );
  }

  const idempotencyKey =
    typeof body.idempotencyKey === "string" ? body.idempotencyKey : "";
  if (!idempotencyKey) {
    return NextResponse.json(
      { error: "error", message: "Missing idempotency key." },
      { status: 400 },
    );
  }

  // Credits -> cents at the boundary, exactly once. Non-numeric input is
  // passed through as NaN rather than rejected here, so the per-row validator
  // reports it against the row the user can actually see and fix.
  const rows: BatchRowInput[] = body.rows.map((raw) => {
    const row = (raw ?? {}) as { email?: unknown; credits?: unknown };
    return {
      email: typeof row.email === "string" ? row.email : "",
      amountCents: creditsToCents(Number(row.credits)),
    };
  });

  const sender = await getSender();
  const result = await transferCreditsBatch(sender, rows, idempotencyKey);

  switch (result.status) {
    case "ok":
      return NextResponse.json({
        ok: true,
        batchId: result.batchId,
        rows: result.rows,
        totalSentCents: result.totalSentCents,
        senderBalanceCents: result.senderBalanceCents,
        replayed: result.replayed,
      });

    case "insufficient_balance":
      return NextResponse.json(
        {
          error: "insufficient_balance",
          message: result.message,
          balanceCents: result.balanceCents,
          requestedCents: result.requestedCents,
          rows: result.rows,
        },
        { status: 402 },
      );

    case "too_many_rows":
      return NextResponse.json(
        { error: "too_many_rows", message: result.message },
        { status: 400 },
      );

    case "no_valid_rows":
      // Not a server failure and not a generic error: every row has its own
      // reason in `rows`, which is what the UI renders.
      return NextResponse.json(
        { error: "no_valid_rows", message: result.message, rows: result.rows },
        { status: 422 },
      );

    case "error":
      // Caller-fixable problems are 400; anything else is ours.
      return NextResponse.json(
        {
          error: "error",
          message: result.message,
          // Upstream cause, for preview/local debugging only — never sent to
          // real users, since it names internal services and status codes.
          ...(result.detail && process.env.VERCEL_ENV !== "production"
            ? { detail: result.detail }
            : {}),
        },
        { status: result.cause === "caller" ? 400 : 500 },
      );
  }
}
