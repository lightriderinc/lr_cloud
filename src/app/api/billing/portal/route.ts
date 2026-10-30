import { requireLogtoUser } from "@/lib/auth/session";
import { db } from "@/lib/billing/db";
import { stripeReturnUrl } from "@/lib/billing/returnUrl";
import { stripe } from "@/lib/stripe/client";
import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/billing/portal
 * Body: { returnTo?: string }
 *
 * Returns a redirect URL into the Stripe-hosted Customer Portal, where users
 * can update payment methods and view invoices themselves. Stripe's "Return"
 * link goes back to `returnTo`, the path of the page the user started on.
 *
 * Requires the Customer Portal to be configured once in the Stripe
 * Dashboard (Settings -> Billing -> Customer portal) before this works.
 */
export async function POST(request: NextRequest) {
  let user;
  try {
    user = await requireLogtoUser();
  } catch {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);

  const customer = await db.customer.findUnique({
    where: { logtoUserId: user.sub },
  });

  if (!customer) {
    return NextResponse.json(
      { error: "No billing account yet. Purchase credits first." },
      { status: 404 },
    );
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: customer.stripeCustomerId,
    return_url: stripeReturnUrl(request.nextUrl.origin, body?.returnTo),
  });

  return NextResponse.json({ url: session.url });
}
