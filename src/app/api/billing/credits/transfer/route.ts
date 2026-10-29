import { requireLogtoUser } from "@/lib/auth/session";
import { getOrCreateCustomer } from "@/lib/billing/customer";
import { transferBatchResponse } from "@/lib/billing/transferResponse";
import { NextResponse } from "next/server";

/**
 * POST /api/billing/credits/transfer
 *
 * Sends whole credits from the signed-in customer to one or more recipients,
 * looked up by email. Validation and the transfer are one endpoint and one
 * transaction — there is no "check first, then send" flow to get out of sync.
 * Body, responses and statuses: see transferBatchResponse() in
 * @/lib/billing/transferResponse, shared with the entropy platform's
 * /api/internal/entropy/transfer. Plus:
 *   401 { error: "Not signed in." }
 *   400 { error: "error", message: "Invalid request body." }
 *
 * A single recipient is just a one-row batch; there is no separate endpoint
 * or code path for it.
 *
 * Session-only (no API-key path): sharing credits is an account-holder action,
 * deliberately not something an SDK key can do on a customer's behalf.
 */
export async function POST(req: Request) {
  let user;
  try {
    user = await requireLogtoUser();
  } catch {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  let body: { rows?: unknown; idempotencyKey?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "error", message: "Invalid request body." },
      { status: 400 },
    );
  }

  return transferBatchResponse(
    () => getOrCreateCustomer(user.sub, user.email),
    body,
  );
}
