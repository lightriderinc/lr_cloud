import CreditsSummary from "@/components/billing/CreditsSummary";

export default function BalancePage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-700">
        Balance
      </h1>
      <p className="mb-12 text-sm text-gray-600">
        View your credit balance.
      </p>

      <div className="flex flex-col gap-4">
        <CreditsSummary />
      </div>
    </div>
  );
}
