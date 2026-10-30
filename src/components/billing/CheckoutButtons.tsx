"use client";

import LRButton from "@/components/ui/LRButton";
import { useState } from "react";

// Light Rider sells one-time credit purchases only, so there is no subscription
// checkout. Both buttons tell the server which page they were clicked on, and
// Stripe sends the user back there (see lib/billing/returnUrl.ts).

/** Path (and query) of the page the user is on, for Stripe to return to. */
function currentPath(): string {
  return `${window.location.pathname}${window.location.search}`;
}

/** Redirects to Stripe Checkout for a one-time credits top-up. */
export function CreditsCheckoutButton({
  amountUsd,
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
      const res = await fetch("/api/billing/checkout/credits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amountUsd, returnTo: currentPath() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? `HTTP ${res.status}`);
      window.open(data.url, "_blank", "noopener,noreferrer");
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

/** Sends the signed-in user to the Stripe Customer Portal. */
export function ManageBillingButton({ className }: { className?: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/billing/portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ returnTo: currentPath() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? `HTTP ${res.status}`);
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
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
