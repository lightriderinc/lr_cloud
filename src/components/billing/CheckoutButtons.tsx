"use client";

import LRButton from "@/components/ui/LRButton";
import { mockDelay } from "@/lib/mock/delay";
import { useState } from "react";

type SubscriptionCheckoutProps = {
  kind: "user_plan" | "api_plan";
  tier: string;
  label: string;
  className?: string;
};

/** Redirects to Stripe Checkout for a fixed-price subscription tier (mocked). */
export function SubscriptionCheckoutButton({
  label,
  className,
}: SubscriptionCheckoutProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setLoading(true);
    setError(null);
    try {
      // TODO(backend): POST /api/billing/checkout/subscription { kind, tier } → Stripe Checkout session, open data.url in a new tab
      await mockDelay();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-1">
      <button
        onClick={handleClick}
        disabled={loading}
        className={
          className ??
          "w-full default-radius bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700 disabled:opacity-60"
        }
      >
        {loading ? "Redirecting…" : label}
      </button>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}

/** Redirects to Stripe Checkout for a one-time compute-credits top-up (mocked). */
export function CreditsCheckoutButton({
  label,
  className,
  disabled,
}: {
  amountUsd: number;
  label: string;
  className?: string;
  disabled?: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setLoading(true);
    setError(null);
    try {
      // TODO(backend): POST /api/billing/checkout/credits { amountUsd } → Stripe Checkout session, open data.url in a new tab
      await mockDelay();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-1">
      <LRButton
        onClick={handleClick}
        disabled={loading || disabled}
        variant="primary"
        className={className ?? "w-full"}
      >
        {loading ? "Redirecting…" : label}
      </LRButton>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}

/** Sends the signed-in user to the Stripe Customer Portal (mocked). */
export function ManageBillingButton({ className }: { className?: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setLoading(true);
    setError(null);
    try {
      // TODO(backend): POST /api/billing/portal → Stripe Customer Portal session, navigate to data.url
      await mockDelay();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-1">
      <LRButton
        onClick={handleClick}
        disabled={loading}
        variant="secondary"
        className={className ?? "min-w-[110px] w-full"}
      >
        {loading ? "Loading…" : "Manage billing"}
      </LRButton>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
