"use client";

import HintIcon from "@/components/HintIcon";
import LRButton from "@/components/ui/LRButton";
import { getMockCredits, subscribeMockBilling } from "@/lib/mock/billing";
import { useMockQuery } from "@/lib/mock/useMockQuery";
import Link from "next/link";
import { MdArrowForward, MdLockOutline } from "react-icons/md";

export type { Credits } from "@/lib/mock/billing";

// TODO(backend): GET /api/billing/credits → { purchasedCents, usedCents, remainingCents, receivedTransferCents, hasUnlocked }
export function useCredits() {
  return useMockQuery(getMockCredits, "", subscribeMockBilling);
}

export function formatUsd(cents: number): string {
  return (cents / 100).toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}

/**
 * Displays a cents balance as a whole credit count — 1 credit = $0.01 = 1
 * cent, so no conversion is needed (unlike formatUsd, which divides by 100
 * for an actual dollar figure). Compact notation (10K, 10M, …) since credit
 * counts can run into the billions at this unit size.
 */
export function formatCreditsCompact(cents: number): string {
  return new Intl.NumberFormat(undefined, { notation: "compact" }).format(cents);
}

export function formatCredits(cents: number): string {
  return cents.toLocaleString();
}

/**
 * "N credits ($X.XX)" — the full (non-compact) credit count alongside its
 * dollar equivalent, for a specific price a customer is about to pay.
 */
export function formatCreditsWithUsd(cents: number): string {
  return `${cents.toLocaleString()} credits ($${formatUsd(cents)})`;
}

export function ProgressBar({ fraction }: { fraction: number }) {
  const clamped = Math.min(1, Math.max(0, fraction));
  return (
    <div className="h-2 w-full default-radius bg-gray-200">
      <div
        className="h-2 default-radius bg-[var(--brand-primary)]"
        style={{ width: `${clamped * 100}%` }}
      />
    </div>
  );
}

/**
 * Credit ledger balance, displayed as "Light Rider credits" — used on its
 * own on the Balance / Manage Credits pages and composed into UsageSummary
 * on the Billing page.
 */
export default function CreditsSummary({
  historyLink = false,
}: {
  historyLink?: boolean;
}) {
  const credits = useCredits();

  if (!credits.data) {
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

  // The signup grant is locked until the account is unlocked by a purchase
  // or by receiving a transfer.
  if (!credits.data.hasUnlocked) {
    return (
      <div className="default-radius border border-gray-50 bg-gray-50 p-4">
        <p className="mb-1 flex items-center gap-1.5 font-medium text-gray-800 opacity-80">
          <MdLockOutline className="text-gray-400" />
          Unlock {formatCredits(credits.data.remainingCents)} bonus Light Rider credits
        </p>
        <p className="text-xs text-gray-500">
          Complete your first purchase to claim your credits.
        </p>
        <div className="flex mt-6">
          <a href="/settings/manage-credits/purchase">
            <LRButton variant="primary">Purchase compute credits</LRButton>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="default-radius border border-gray-50 bg-gray-50 p-4">
      <p className="mb-2 flex items-end gap-1.5 text-gray-800">
        <span className="text-4xl font-medium mr-1">
          {formatCredits(credits.data.remainingCents)}
        </span>{" "}
        <span className="pb-1">
          Light Rider credits remaining{" "}
          <HintIcon text="Simulator (mock) jobs are free and never deduct credits. QPU jobs (Garnet, Emerald, Sirius) deduct credits per shot at submission time." />
        </span>
      </p>

      <div className="flex w-full justify-between items-end mt-8">
        <a href="/settings/manage-credits/purchase">
          <LRButton variant="primary">Purchase compute credits</LRButton>
        </a>
        {historyLink && (
          <Link
            href="/settings/payment-and-history"
            className="text-sm font-medium text-gray-700 inline-flex items-center gap-2 hover:text-[var(--brand-primary)]"
          >
            View payment history <MdArrowForward />
          </Link>
        )}
      </div>
    </div>
  );
}
