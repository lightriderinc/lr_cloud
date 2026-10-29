import CreditsSummary from "@/components/billing/CreditsSummary";
import PricingNavCard from "@/components/pricing/PricingNavCard";
import { LuHandCoins } from "react-icons/lu";
import { PiCoinsFill } from "react-icons/pi";

export default function PricingOverviewPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-700">Manage Credits</h1>
      <p className="mb-12 text-sm text-gray-600">
        Manage your credit balance or send credits to other Light Rider users.
      </p>
      <div className="mb-8">
        <CreditsSummary />
      </div>

      <div className="flex flex-col lg:flex-row gap-3">
        <PricingNavCard
          href="/settings/manage-credits/purchase"
          title="Purchase credits"
          description="Purchase credits to pay for quantum resources."
          icon={PiCoinsFill}
        />
        <PricingNavCard
          href="/settings/manage-credits/share"
          title="Share credits"
          description="Send credits to other Light Rider users."
          icon={LuHandCoins}
        />
      </div>
    </div>
  );
}
