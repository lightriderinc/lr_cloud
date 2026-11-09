import { NextResponse } from "next/server";
import { refundEntropyDraw } from "@/lib/billing/entropyCharges";
import { readJson, withEntropyCustomer } from "@/lib/billing/entropyInternal";

// No `runtime`/`dynamic` exports: cacheComponents rejects them, Node.js is the
// default runtime, and every request here reads headers so it is never cached.

/**
 * POST /api/internal/entropy/refund  (entropy platform server only)
 * Body: { drawId: uuid, reason: string }
 * Returns a charged draw's own amount, at most once, and never for a draw
 * that was settled (delivered).
 */
export async function POST(request: Request) {
  const body = await readJson(request);
  return withEntropyCustomer(request, { create: false, allowApiKey: true }, async (customer) => {
    const reason = String(body.reason ?? "draw_failed").slice(0, 120);
    const r = await refundEntropyDraw(String(body.drawId ?? ""), `entropy_site:${reason}`, customer.id);
    if (r.status === "refunded") return NextResponse.json(r);
    if (r.status === "not_found") return NextResponse.json({ error: "not_found" }, { status: 404 });
    return NextResponse.json({ error: "already_settled" }, { status: 409 });
  });
}
