import CtaBand from "@/components/solutions/CtaBand";
import { SOLUTIONS } from "@/lib/solutions";
import type { Metadata } from "next";
import EntropyGetStarted from "./_components/EntropyGetStarted";
import EntropyHero from "./_components/EntropyHero";
import EntropyHowItWorks from "./_components/EntropyHowItWorks";
import EntropyReceipt from "./_components/EntropyReceipt";
import EntropySources from "./_components/EntropySources";
import EntropyUseCases from "./_components/EntropyUseCases";
import EntropyWhy from "./_components/EntropyWhy";
import EntropyWorksWith from "./_components/EntropyWorksWith";

const solution = SOLUTIONS.entropy;

export const metadata: Metadata = {
  title: `${solution.name} | Light Rider Cloud`,
  description: solution.summary,
};

export default function Page() {
  return (
    <div className="animate-fade-in-up">
      <EntropyHero />

      <div className="mx-auto flex max-w-7xl flex-col gap-40 py-14">
        <EntropyWhy />
        <EntropyHowItWorks />
        <EntropySources />
        <EntropyReceipt />
        <EntropyUseCases />
        <EntropyGetStarted />
        <EntropyWorksWith />
      </div>

      <div className="-mx-4 lg:-mx-8 -mb-6">
        <CtaBand />
      </div>
    </div>
  );
}
