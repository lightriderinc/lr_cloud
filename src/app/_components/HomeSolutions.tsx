import SectionHeading from "@/components/solutions/SectionHeading";
import { SOLUTION_LIST, type SolutionSlug } from "@/lib/solutions";
import Image from "next/image";
import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import { MdArrowForward } from "react-icons/md";
import EntropyPreview from "./EntropyPreview";
import PqcPreview from "./PqcPreview";
import QuantumPreview from "./QuantumPreview";
import SolutionsThread from "./SolutionsThread";

// Landing-page copy for each solution. Kept here rather than in lib/solutions
// so the solution pages' metadata summaries can stay more detailed.
const COPY: Record<
  SolutionSlug,
  { heading: string; body: string; preview: ReactNode }
> = {
  quantum: {
    heading: "Run programs on real quantum computers.",
    body: "Build in your browser or in Python, test for free on simulators, then run on machines from IQM, IonQ and Rigetti. You only pay for time on real hardware.",
    preview: <QuantumPreview />,
  },
  entropy: {
    heading: "Random numbers you can prove.",
    body: "Draw random bytes from quantum devices and certified hardware through a simple API. Every batch is checked before it reaches you and comes with a signed receipt.",
    preview: <EntropyPreview />,
  },
  pqc: {
    heading: "Protect today's data from tomorrow's computers.",
    body: "Scan your code for encryption a quantum computer could break, see what to fix first, then encrypt and sign with keys built on the new NIST standards.",
    preview: <PqcPreview />,
  },
};

// How each solution connects to the one after it, keyed by the earlier one.
const LINKS: Partial<Record<SolutionSlug, string>> = {
  quantum: "Quantum computers are among Entropy's sources",
  entropy: "PQC builds its keys from Entropy's randomness",
};

export default function HomeSolutions() {
  return (
    <section id="solutions" className="scroll-mt-6">
      <div className="flex justify-center">
        <SectionHeading title="Start with what you need" centered>
          Our solutions are built to work together.
        </SectionHeading>
      </div>

      <SolutionsThread>
        {SOLUTION_LIST.map(({ slug, href, name, navLabel, logo }, i) => {
          const { heading, body, preview } = COPY[slug];
          return (
            <Fragment key={slug}>
              <article className="thread-border grid items-center gap-8 lg:grid-cols-2 lg:gap-16 border-2 p-6 rounded">
                <div className="flex flex-col gap-4">
                  <Image
                    src={logo.src}
                    alt={name}
                    width={logo.width}
                    height={logo.height}
                    className="mb-4"
                  />
                  <h3 className="text-3xl font-semibold leading-snug text-gray-800">
                    {heading}
                  </h3>
                  <p className="max-w-xl text-gray-600">{body}</p>
                  <Link
                    href={href}
                    className="brand-link inline-flex items-center gap-1 self-start text-sm"
                  >
                    Explore {navLabel} <MdArrowForward />
                  </Link>
                </div>
                <div className={i % 2 === 1 ? "lg:order-first" : undefined}>
                  {preview}
                </div>
              </article>
              {LINKS[slug] && <Connection label={LINKS[slug]} />}
            </Fragment>
          );
        })}
      </SolutionsThread>
    </section>
  );
}

// The thread between two solutions, labelled with what passes from one to the
// next. The lines touch the panels above and below so the glow runs straight
// on into their borders (see `.thread-line` / `.thread-border`).
function Connection({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="thread-line h-20 w-0.5" />
      <span className="rounded border border-gray-100 bg-gray-50 px-3 py-1 text-center text-xs text-gray-700">
        {label}
      </span>
      <span className="thread-line h-20 w-0.5" />
    </div>
  );
}
