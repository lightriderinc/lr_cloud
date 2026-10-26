import CtaBand from "@/components/solutions/CtaBand";
import { SOLUTIONS } from "@/lib/solutions";
import type { Metadata } from "next";
import PqcCapabilities from "./_components/PqcCapabilities";
import PqcHero from "./_components/PqcHero";
import PqcHowItWorks from "./_components/PqcHowItWorks";
import PqcSpecs from "./_components/PqcSpecs";
import PqcWorksWith from "./_components/PqcWorksWith";

const solution = SOLUTIONS.pqc;

export const metadata: Metadata = {
  title: `${solution.name} | Light Rider Cloud`,
  description: solution.summary,
};

export default function Page() {
  return (
    <div className="animate-fade-in-up">
      <PqcHero />

      <div className="mx-auto flex max-w-7xl flex-col gap-20 py-14">
        <PqcCapabilities />
        <PqcHowItWorks />
        <PqcSpecs />
        <PqcWorksWith />
      </div>

      <div className="-mx-4 lg:-mx-8 -mb-6">
        <CtaBand />
      </div>
    </div>
  );
}
