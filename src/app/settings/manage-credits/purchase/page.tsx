import CreditsTopUp from "@/components/billing/CreditsTopUp";
import BackButton from "@/components/ui/BackButton";

// Current pricing metric: $0.002/shot ($2 per 1,000 shots) = 0.2 credits/shot.
const IQM_RUNTIME_TIERS = [
  { range: "5K shots", rate: "1K credits" },
  { range: "5M shots", rate: "1M credits" },
  { range: "5B shots", rate: "1B credits" },
];

const RIGETTI_RUNTIME_TIERS = [
  { range: "15 minutes", rate: "112.5K credits" },
  { range: "30 minutes", rate: "225K credits" },
  { range: "60 minutes", rate: "450K credits" },
];
/*
 * NOTE: Legacy runtime pricing chart data. Temporarily commented out because
 * these rates no longer match our current metrics. Do NOT delete — this will be
 * reused as our pricing metric in the future.
 */
// const RUNTIME_TIERS = [
//   {
//     range: "0 to 10 minutes",
//     rate: "$5/sec",
//     use: "Interactive apps, APIs, synthetic data, password generation, quantum randomness",
//   },
//   {
//     range: "11 to 20 minutes",
//     rate: "$4/sec",
//     use: "Research, calibration, QEC testing, model exploration",
//   },
//   {
//     range: "21 to 60 minutes",
//     rate: "$3/sec",
//     use: "Optimization, simulation, AI workflows, larger experiments",
//   },
//   {
//     range: "1+ hour",
//     rate: "Contact Sales",
//     use: "Enterprise workloads, dedicated research, government use",
//   },
// ];

export default function PurchaseCreditsPage() {
  return (
    <div>
      <BackButton
        href="/settings/manage-credits"
        previousPageName="Manage Credits"
      />
      <div className="flex flex-col mb-12">
        <h1 className="text-2xl font-semibold text-gray-700">
          Purchase Credits
        </h1>
        <p className="text-sm text-gray-600">
          Credits are consumed when using quantum resources.
        </p>
      </div>

      <div className="flex flex-col gap-12">
        <div className="block lg:flex lg:max-w-[700px]">
          <CreditsTopUp />
        </div>
      </div>
    </div>
  );
}
