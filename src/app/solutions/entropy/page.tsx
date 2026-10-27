import CtaBand from "@/components/solutions/CtaBand";
import { SOLUTIONS } from "@/lib/solutions";
import type { Metadata } from "next";
import EntropyCapabilities from "./_components/EntropyCapabilities";
import EntropyHero from "./_components/EntropyHero";
import EntropyHowItWorks from "./_components/EntropyHowItWorks";
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

      <div className="mx-auto flex max-w-7xl flex-col gap-20 py-14">
        <EntropyCapabilities />
        <EntropyHowItWorks />
        <EntropyWorksWith />
      </div>

      <div className="-mx-4 lg:-mx-8 -mb-6">
        <CtaBand />
      </div>
    </div>
  );
}
