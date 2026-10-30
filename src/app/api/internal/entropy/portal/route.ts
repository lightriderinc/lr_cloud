import {
  allowedEntropyReturnOrigin,
  readJson,
  withEntropyCustomer,
} from "@/lib/billing/entropyInternal";
import { stripe } from "@/lib/stripe/client";
import { NextResponse } from "next/server";

// No `runtime`/`dynamic` exports: cacheComponents rejects them, Node.js is the
// default runtime, and every request here reads headers so it is never cached.

/**
 * POST /api/internal/entropy/portal  (entropy platform server only)
 * Body: { returnOrigin: string }
 *
 * The same Stripe Customer Portal as this app's /api/billing/portal, for the
 * same Customer, so entropy users can update their payment method and see
 * invoices without leaving for Light Rider Cloud. Stripe's "Return" link goes
 * to the entropy platform's /settings/payment-and-history on `returnOrigin`,
 * which must be on ENTROPY_CHECKOUT_RETURN_ORIGINS (the same check as
 * /api/internal/entropy/checkout), so this can never be an open redirect.
 *
 * Authenticated like the wallet: the shared billing secret plus the user's
 * Logto token (lib/auth/serviceAuth.ts); user tokens only. A user with no
 * Customer yet gets 404, like the session route: there is nothing to manage.
 */
export async function POST(request: Request) {
  const body = await readJson(request);
  return withEntropyCustomer(request, { create: false }, async (customer) => {
    const origin = allowedEntropyReturnOrigin(body.returnOrigin);
    if (!origin) {
      return NextResponse.json({ error: "returnOrigin is not an allowed entropy origin." }, { status: 400 });
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: customer.stripeCustomerId,
      return_url: `${origin}/settings/payment-and-history`,
    });
    return NextResponse.json({ url: session.url });
  });
}
