import CtaBand from "@/components/solutions/CtaBand";
import { SOLUTIONS } from "@/lib/solutions";
import type { Metadata } from "next";
import QuantumGetStarted from "./_components/QuantumGetStarted";
import QuantumHardware from "./_components/QuantumHardware";
import QuantumHero from "./_components/QuantumHero";
import QuantumRun from "./_components/QuantumRun";
import QuantumUseCases from "./_components/QuantumUseCases";
import QuantumWhy from "./_components/QuantumWhy";
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
        <QuantumWhy />
        <QuantumRun />
        <QuantumHardware />
        <QuantumUseCases />
        <QuantumGetStarted />
        <QuantumWorksWith />
      </div>

      <div className="-mx-4 lg:-mx-8 -mb-6">
        <CtaBand />
      </div>
    </div>
  );
}
