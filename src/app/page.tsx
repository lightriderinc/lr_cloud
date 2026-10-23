import CtaBand from "@/components/solutions/CtaBand";
import GetStartedActions from "@/components/solutions/GetStartedActions";
import PageHero from "@/components/solutions/PageHero";
import SectionHeading from "@/components/solutions/SectionHeading";
import SolutionCard from "@/components/solutions/SolutionCard";
import StackDiagram from "@/components/solutions/StackDiagram";
import LRLinkButton from "@/components/ui/LRLinkButton";
import { SOLUTION_LIST } from "@/lib/solutions";
import Link from "next/link";
import { BiSolidCoin } from "react-icons/bi";
import { MdArrowForward, MdGroupAdd } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

const ACCOUNT_FEATURES = [
  {
    title: "Shared compute credits",
    description:
      "One balance pays for quantum jobs, entropy draws and PQC tools. 1 credit = $0.01.",
    href: "/settings/manage-credits",
    icon: BiSolidCoin,
  },
  {
    title: "One set of API keys",
    description:
      "Create a key once and use it with every platform in the stack.",
    href: "/settings/keys",
    icon: RiLockPasswordFill,
  },
  {
    title: "Share and earn",
    description:
      "Share credits with your team, and earn rewards by inviting others.",
    href: "/settings/rewards",
    icon: MdGroupAdd,
  },
];

export default function Home() {
  return (
    <div className="animate-fade-in-up">
      <PageHero>
        <h1 className="hero max-w-3xl font-semibold leading-tight text-gray-800">
          Quantum for the next generation,{" "}
          <span className="text-brand-gradient">in one cloud.</span>
        </h1>
        <p className="max-w-2xl text-gray-600">
          Light Rider Cloud brings quantum compute, certified quantum entropy
          and post-quantum cryptography together as one software stack. Run
          circuits on real QPUs, draw verifiable randomness, and protect your
          systems against harvest-now-decrypt-later attacks, all from a single
          account.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <GetStartedActions />
          <LRLinkButton href="#solutions" variant="secondary-outline">
            Explore the stack
          </LRLinkButton>
        </div>
      </PageHero>

      <div className="mx-auto flex max-w-7xl flex-col gap-20 py-14">
        <section id="solutions" className="scroll-mt-6">
          <SectionHeading
            eyebrow="Solutions"
            title="Three platforms. One stack."
          >
            Each platform stands on its own, and each is stronger alongside the
            others.
          </SectionHeading>
          <div className="grid gap-4 md:grid-cols-3">
            {SOLUTION_LIST.map((s) => (
              <SolutionCard key={s.slug} solution={s} />
            ))}
          </div>
        </section>

        <section
          id="stack"
          className="grid scroll-mt-6 gap-10 lg:grid-cols-[2fr_3fr]"
        >
          <SectionHeading
            eyebrow="How it fits together"
            title="Built from the hardware up"
          >
            Quantum hardware is the foundation. Its processors and
            error-corrected circuits are among the sources behind the entropy
            service. That verified entropy then seeds the post-quantum keys that
            protect your applications.
          </SectionHeading>
          <StackDiagram />
        </section>

        <section>
          <SectionHeading eyebrow="One account" title="Everything in one place">
            Your account, credits and keys work across every platform.
          </SectionHeading>
          <ul className="grid gap-4 md:grid-cols-3">
            {ACCOUNT_FEATURES.map(
              ({ title, description, href, icon: Icon }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="group flex h-full flex-col gap-3 border-t-2 border-gray-100 pt-4 transition-colors hover:border-[var(--brand-tertiary)]"
                  >
                    <Icon className="text-2xl text-gray-300 transition-colors group-hover:text-[var(--brand-tertiary)]" />
                    <h3 className="flex items-center gap-2 font-semibold text-gray-800">
                      {title}
                      <MdArrowForward className="text-gray-300 transition-colors group-hover:text-[var(--brand-primary)]" />
                    </h3>
                    <p className="text-sm text-gray-600">{description}</p>
                  </Link>
                </li>
              ),
            )}
          </ul>
        </section>
      </div>
      <div className="-mx-4 lg:-mx-8 -mb-6">
        <CtaBand />
      </div>
    </div>
  );
}
