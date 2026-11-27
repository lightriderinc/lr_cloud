import CtaBand from "@/components/solutions/CtaBand";
import { SOLUTIONS } from "@/lib/solutions";
import type { Metadata } from "next";
import PqcApplications from "./_components/PqcApplications";
import PqcBeyondCode from "./_components/PqcBeyondCode";
import PqcFindings from "./_components/PqcFindings";
import PqcHero from "./_components/PqcHero";
import PqcHowItWorks from "./_components/PqcHowItWorks";
import PqcWhy from "./_components/PqcWhy";
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

      <div className="mx-auto flex max-w-7xl flex-col gap-40 py-14">
        <PqcWhy />
        <PqcHowItWorks />
        <PqcFindings />
        <PqcBeyondCode />
        <PqcApplications />
        <PqcWorksWith />
      </div>

      <div className="-mx-4 lg:-mx-8 -mb-6">
        <CtaBand />
      </div>
    </div>
  );
}
