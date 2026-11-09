import { NextResponse } from "next/server";
import { createCheckoutSession } from "@/lib/billing/customer";
import {
  allowedEntropyReturnOrigin,
  readJson,
  withEntropyCustomer,
} from "@/lib/billing/entropyInternal";

// No `runtime`/`dynamic` exports: cacheComponents rejects them, Node.js is the
// default runtime, and every request here reads headers so it is never cached.

// Same limits as /api/billing/checkout/credits.
const MIN_TOPUP_USD = 5;
const MAX_TOPUP_USD = 10_000;

/**
 * POST /api/internal/entropy/checkout  (entropy platform server only)
 * Body: { amountUsd: number, returnOrigin: string, email?: string }
 *
 * The same prepaid-credits Stripe Checkout as cloud's own top-up, for the
 * same Customer: `kind: "credits"` + `logtoUserId` metadata, so cloud's
 * existing webhook (/api/webhooks/stripe) credits the shared wallet. No
 * webhook is needed on the entropy platform.
 */
export async function POST(request: Request) {
  const body = await readJson(request);
  const email = typeof body.email === "string" ? body.email : undefined;
  return withEntropyCustomer(request, { create: true, email }, async (customer) => {
    const amountUsd = Number(body.amountUsd);
    if (!Number.isFinite(amountUsd) || amountUsd < MIN_TOPUP_USD || amountUsd > MAX_TOPUP_USD) {
      return NextResponse.json(
        { error: `amountUsd must be between $${MIN_TOPUP_USD} and $${MAX_TOPUP_USD}.` },
        { status: 400 },
      );
    }
    const origin = allowedEntropyReturnOrigin(body.returnOrigin);
    if (!origin) {
      return NextResponse.json({ error: "returnOrigin is not an allowed entropy origin." }, { status: 400 });
    }

    const session = await createCheckoutSession(customer, {
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: "Light Rider credits" },
            unit_amount: Math.round(amountUsd * 100),
          },
          quantity: 1,
        },
      ],
      metadata: { logtoUserId: customer.logtoUserId, kind: "credits", platform: "entropy" },
      success_url: `${origin}/settings/credits?checkout=success`,
      cancel_url: `${origin}/settings/credits?checkout=canceled`,
    });
    return NextResponse.json({ url: session.url });
  });
}
