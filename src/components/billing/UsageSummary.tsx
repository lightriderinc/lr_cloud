"use client";

import CreditsSummary, {
  ProgressBar,
  useCredits,
} from "@/components/billing/CreditsSummary";
import HintIcon from "@/components/HintIcon";
import { getMockUsage } from "@/lib/mock/billing";
import { useMockQuery } from "@/lib/mock/useMockQuery";

export default function UsageSummary() {
  // Only used here to decide whether to render the wrapping container at
  // all — CreditsSummary loads the full credits payload and renders its own
  // block.
  const credits = useCredits();
  // TODO(backend): GET /api/billing/usage → { plan, includedCalls, usedCalls, remainingCalls, currentPeriodEnd }
  const usage = useMockQuery(getMockUsage);

  const showCredits = credits.data !== undefined;
  const showUsage = !!usage.data?.plan;

  if (!showCredits && !showUsage) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      {showCredits && <CreditsSummary historyLink />}

      {showUsage &&
        usage.data &&
        usage.data.includedCalls != null &&
        usage.data.usedCalls != null &&
        usage.data.remainingCalls != null && (
          <div className="default-radius border border-gray-200 bg-white p-4">
            <p className="mb-2 flex items-center gap-1.5 text-sm font-medium text-gray-800">
              {usage.data.remainingCalls.toLocaleString()} calls remaining of{" "}
              {usage.data.includedCalls.toLocaleString()} included
              <HintIcon text="Remaining reflects your included call allowance — usage isn't deducted yet since call metering isn't live." />
            </p>
            <ProgressBar
              fraction={usage.data.remainingCalls / usage.data.includedCalls}
            />
          </div>
        )}
    </div>
  );
}
