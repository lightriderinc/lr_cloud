"use client";

import LRButton from "@/components/ui/LRButton";

// Stripe Checkout and the Customer Portal are not wired up in Cloud yet, so
// both buttons render disabled with a short "coming soon" note. Light Rider
// sells one-time credit purchases only, so there is no subscription checkout.
// The prop signatures match the Quantum app's CreditsCheckoutButton and
// ManageBillingButton (POST /api/billing/checkout/credits, /api/billing/portal),
// so those drop in unchanged once the routes move here.

function ComingSoon() {
  return <p className="text-xs text-gray-500">Coming soon</p>;
}

/** Stripe Checkout for a one-time compute-credits top-up. Disabled until checkout moves to Cloud. */
export function CreditsCheckoutButton({
  label,
  className,
}: {
  amountUsd: number;
  label: string;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1">
      <LRButton disabled variant="primary" className={className ?? "w-full"}>
        {label}
      </LRButton>
      <ComingSoon />
    </div>
  );
}

/** Stripe Customer Portal. Disabled until the portal moves to Cloud. */
export function ManageBillingButton({ className }: { className?: string }) {
  return (
    <div className="flex flex-col gap-1">
      <LRButton
        disabled
        variant="secondary"
        className={className ?? "min-w-[110px] w-full"}
      >
        Manage billing
      </LRButton>
      <ComingSoon />
    </div>
  );
}
