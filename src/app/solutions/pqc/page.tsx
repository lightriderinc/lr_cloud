import SolutionPage from "@/components/solutions/SolutionPage";
import { SOLUTIONS } from "@/lib/solutions";
import type { Metadata } from "next";

const solution = SOLUTIONS.pqc;

export const metadata: Metadata = {
  title: `${solution.name} | Light Rider Cloud`,
  description: solution.summary,
};

export default function Page() {
  return <SolutionPage solution={solution} />;
}
