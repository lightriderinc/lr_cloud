// Display data for the pricing tiers. The Stripe Price ID wiring (env var
// names, price-id lookups) from the source app is intentionally omitted here.
// TODO(backend): map each tier to its Stripe Price ID (STRIPE_PRICE_USER_*,
// STRIPE_PRICE_API_*) and restore findUserPlanByPriceId/findApiPlanByPriceId.

export type UserPlanTier =
  | "starter"
  | "developer"
  | "professional"
  | "pro";

export const USER_PLANS: Record<
  UserPlanTier,
  { name: string; monthlyUsd: number; includedCreditsUsd: number }
> = {
  // V2 two-tier simplification: only `pro` is rendered on the User Pricing
  // page (see UserPlansGrid.tsx). starter/developer/professional stay defined
  // so V3+ can bring them back by rendering their cards again.
  pro: {
    name: "Pro",
    monthlyUsd: 99,
    includedCreditsUsd: 99,
  },
  starter: {
    name: "Starter",
    monthlyUsd: 99,
    includedCreditsUsd: 50,
  },
  developer: {
    name: "Developer",
    monthlyUsd: 499,
    includedCreditsUsd: 250,
  },
  professional: {
    name: "Professional",
    monthlyUsd: 2500,
    includedCreditsUsd: 1500,
  },
  // Enterprise has no self-serve price — routed to Contact Sales instead.
};

export type ApiPlanTier = "starter" | "developer" | "business";

export const API_PLANS: Record<
  ApiPlanTier,
  { name: string; monthlyUsd: number; callsIncluded: number }
> = {
  starter: {
    name: "Starter",
    monthlyUsd: 99,
    callsIncluded: 250_000,
  },
  developer: {
    name: "Developer",
    monthlyUsd: 499,
    callsIncluded: 2_000_000,
  },
  business: {
    name: "Business",
    monthlyUsd: 2500,
    callsIncluded: 15_000_000,
  },
  // Free plan has no Stripe price - provisioned without a subscription.
  // Enterprise is Contact Sales, same as User Pricing.
};
