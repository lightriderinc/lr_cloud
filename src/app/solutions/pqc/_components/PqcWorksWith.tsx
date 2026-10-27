import SectionHeading from "@/components/solutions/SectionHeading";
import SolutionCard from "@/components/solutions/SolutionCard";
import { SOLUTIONS } from "@/lib/solutions";
import Link from "next/link";

export default function PqcWorksWith() {
  return (
    <section>
      <SectionHeading title="The solution stack">
        {SOLUTIONS.pqc.name} is one layer of Light Rider Cloud.{" "}
        <Link href="/#stack" className="brand-link">
          See how the stack fits together
        </Link>
        .
      </SectionHeading>
      <div className="grid gap-4 md:grid-cols-2">
        <SolutionCard solution={SOLUTIONS.quantum} />
        <SolutionCard solution={SOLUTIONS.entropy} />
      </div>
    </section>
  );
}
