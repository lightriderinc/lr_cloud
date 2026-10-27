import CtaBand from "@/components/solutions/CtaBand";
import { SOLUTIONS } from "@/lib/solutions";
import type { Metadata } from "next";
import QuantumCapabilities from "./_components/QuantumCapabilities";
import QuantumHero from "./_components/QuantumHero";
import QuantumHowItWorks from "./_components/QuantumHowItWorks";
import QuantumWorksWith from "./_components/QuantumWorksWith";

const solution = SOLUTIONS.quantum;

export const metadata: Metadata = {
  title: `${solution.name} | Light Rider Cloud`,
  description: solution.summary,
};

export default function Page() {
  return (
    <div className="animate-fade-in-up">
      <QuantumHero />

      <div className="mx-auto flex max-w-7xl flex-col gap-20 py-14">
        <QuantumCapabilities />
        <QuantumHowItWorks />
        <QuantumWorksWith />
      </div>

      <div className="-mx-4 lg:-mx-8 -mb-6">
        <CtaBand />
      </div>
    </div>
  );
}
