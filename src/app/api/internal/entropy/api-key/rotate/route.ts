import { NextResponse } from "next/server";
import { rotateApiKeyFor } from "@/lib/auth/apiKeys";
import { withEntropyCustomer } from "@/lib/billing/entropyInternal";

// No `runtime`/`dynamic` exports: cacheComponents rejects them, Node.js is the
// default runtime, and every request here reads headers so it is never cached.

/**
 * POST /api/internal/entropy/api-key/rotate  (entropy platform server only)
 * -> { key, keyPrefix }, shown once. Same as cloud's /api/settings/tokens/rotate:
 * the old key stops working the instant this commits, on both platforms.
 */
export async function POST(request: Request) {
  return withEntropyCustomer(request, { create: true }, async (customer) =>
    NextResponse.json(await rotateApiKeyFor(customer.id), { headers: { "Cache-Control": "no-store" } }),
  );
}
