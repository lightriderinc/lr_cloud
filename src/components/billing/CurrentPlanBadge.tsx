"use client";

import {
  getMockSubscriptions,
  subscribeMockBilling,
  type Subscription,
} from "@/lib/mock/billing";
import { useMockQuery } from "@/lib/mock/useMockQuery";

function planLabel(subscription: Subscription): string {
  if (subscription.tier) {
    return subscription.tier.charAt(0).toUpperCase() + subscription.tier.slice(1);
  }
  return subscription.kind === "API_PLAN" ? "API" : "User";
}

export default function CurrentPlanBadge() {
  // TODO(backend): GET /api/billing/subscription → { subscriptions }
  const { data: subscriptions } = useMockQuery(
    getMockSubscriptions,
    "",
    subscribeMockBilling,
  );

  const active = subscriptions?.find(
    (s) => s.status === "active" || s.status === "trialing",
  );
  if (!active) return null;

  return (
    <p className="text-sm font-semibold text-gray-300">{planLabel(active)}</p>
  );
}
