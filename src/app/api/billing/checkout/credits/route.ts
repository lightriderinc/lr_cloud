import { requireLogtoUser } from "@/lib/auth/session";
import { createCheckoutSession, getOrCreateCustomer } from "@/lib/billing/customer";
import { stripeReturnUrl } from "@/lib/billing/returnUrl";
import { NextRequest, NextResponse } from "next/server";

const MIN_TOPUP_USD = 5;
const MAX_TOPUP_USD = 10_000;

/**
 * POST /api/billing/checkout/credits
 * Body: { amountUsd: number, returnTo?: string }
 *
 * Light Rider credits are a prepaid wallet shared by every product, not a
 * fixed SKU, so this uses Stripe's `price_data` (a price created inline for
 * the session) rather than a pre-created Price ID.
 *
 * `returnTo` is the path of the page the purchase started on; Stripe sends the
 * user back there (with ?checkout=success|canceled). The ledger is credited by
 * the Stripe webhook, which still runs in the Quantum app against the same
 * database and Stripe account (`kind: "credits"` + `logtoUserId` metadata).
 */
export async function POST(request: NextRequest) {
  let user;
  try {
    user = await requireLogtoUser();
  } catch {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const amountUsd = Number(body?.amountUsd);

  if (!Number.isFinite(amountUsd) || amountUsd < MIN_TOPUP_USD || amountUsd > MAX_TOPUP_USD) {
    return NextResponse.json(
      { error: `amountUsd must be between $${MIN_TOPUP_USD} and $${MAX_TOPUP_USD}.` },
      { status: 400 },
    );
  }

  const customer = await getOrCreateCustomer(user.sub, user.email);
  const origin = request.nextUrl.origin;

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
    metadata: { logtoUserId: user.sub, kind: "credits" },
    success_url: stripeReturnUrl(origin, body?.returnTo, { checkout: "success" }),
    cancel_url: stripeReturnUrl(origin, body?.returnTo, { checkout: "canceled" }),
  });

  return NextResponse.json({ url: session.url });
}
