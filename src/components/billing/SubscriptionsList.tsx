"use client";

import LRButton from "@/components/ui/LRButton";
import {
  getMockSubscriptions,
  subscribeMockBilling,
  toggleMockSubscription,
  type Subscription,
} from "@/lib/mock/billing";
import { mockDelay } from "@/lib/mock/delay";
import { useMockQuery } from "@/lib/mock/useMockQuery";
import { useState } from "react";

function planLabel(subscription: Subscription): string {
  if (subscription.tier) {
    return (
      subscription.tier.charAt(0).toUpperCase() + subscription.tier.slice(1)
    );
  }
  return subscription.kind === "API_PLAN" ? "API" : "User";
}

export default function SubscriptionsList() {
  // TODO(backend): GET /api/billing/subscription → { subscriptions }
  const { data: subscriptions } = useMockQuery(
    getMockSubscriptions,
    "",
    subscribeMockBilling,
  );
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);

  async function toggle(subscription: Subscription) {
    setPendingId(subscription.id);
    setError(null);
    try {
      // TODO(backend): POST /api/billing/subscription/cancel or /reactivate { subscriptionId } → sets Stripe cancel_at_period_end
      await mockDelay();
      toggleMockSubscription(subscription.id);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Something went wrong."));
    } finally {
      setPendingId(null);
    }
  }

  if (error) {
    return (
      <p className="text-sm text-red-600">
        {error instanceof Error ? error.message : "Something went wrong."}
      </p>
    );
  }

  if (!subscriptions) {
    return (
      <div className="animate-pulse">
        <div className="bg-gray-100 default-radius flex-col gap-2 flex p-4">
          <div className="h-5 bg-gray-200 w-40 rounded"></div>
          <div className="h-3 bg-gray-200 w-full rounded"></div>
          <div className="h-3 bg-gray-200 w-3/4 rounded"></div>
        </div>
      </div>
    );
  }

  if (subscriptions.length === 0) {
    return <></>;
  }

  return (
    <ul className="flex flex-col gap-3">
      {subscriptions.map((subscription) => {
        const isPending = pendingId === subscription.id;

        return (
          <li
            key={subscription.id}
            className="flex items-center justify-between gap-4 default-radius border border-gray-200 bg-white p-4"
          >
            <div>
              <p className="text-sm font-medium text-gray-800">
                {planLabel(subscription)} plan — {subscription.status}
                {subscription.cancelAtPeriodEnd && " (cancels at period end)"}
              </p>
              <p className="text-xs text-gray-500">
                {subscription.currentPeriodEnd
                  ? `Period end: ${new Date(subscription.currentPeriodEnd).toLocaleDateString()}`
                  : "No period end on file"}
              </p>
            </div>
            <LRButton
              variant="secondary-outline"
              onClick={() => toggle(subscription)}
              disabled={isPending}
            >
              {isPending
                ? "Working…"
                : subscription.cancelAtPeriodEnd
                  ? "Reactivate"
                  : "Cancel"}
            </LRButton>
          </li>
        );
      })}
    </ul>
  );
}
