import { readJson, withEntropyCustomer } from "@/lib/billing/entropyInternal";
import { transferBatchResponse } from "@/lib/billing/transferResponse";

// No `runtime`/`dynamic` exports: cacheComponents rejects them, Node.js is the
// default runtime, and every request here reads headers so it is never cached.

/**
 * POST /api/internal/entropy/transfer  (entropy platform server only)
 * Body: { rows: [{ email, credits }], idempotencyKey: string, email?: string }
 *
 * Share Credits from the entropy platform: the same batch, validation, limits,
 * M2M recipient lookup and idempotency as this app's own
 * /api/billing/credits/transfer, answered with exactly the same body and
 * status (see transferBatchResponse in @/lib/billing/transferResponse).
 *
 * Authenticated like the wallet: the shared billing secret plus the signed-in
 * user's Logto token (lib/auth/serviceAuth.ts). User tokens only — sharing
 * credits is an account-holder action, never something an API key can do, so
 * an X-LR-Api-Key caller gets 403. Like the session route, a first-time
 * sender's Customer is provisioned (`create`), using `email` from the body.
 */
export async function POST(request: Request) {
  const body = await readJson(request);
  const email = typeof body.email === "string" ? body.email : undefined;
  return withEntropyCustomer(request, { create: true, email }, (customer) =>
    transferBatchResponse(async () => customer, body),
  );
}
