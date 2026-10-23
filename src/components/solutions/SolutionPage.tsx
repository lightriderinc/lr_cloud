import LRLinkButton from "@/components/ui/LRLinkButton";
import { DOCS_URL, SOLUTION_LIST, type Solution } from "@/lib/solutions";
import Image from "next/image";
import Link from "next/link";
import { MdChevronRight } from "react-icons/md";
import CtaBand from "./CtaBand";
import GetStartedActions from "./GetStartedActions";
import PageHero from "./PageHero";
import SectionHeading from "./SectionHeading";
import SolutionCard from "./SolutionCard";

// Shared layout for the /solutions/* product pages.
export default function SolutionPage({ solution }: { solution: Solution }) {
  const { name, navLabel, layer, logo, tagline, summary, audience } = solution;
  const others = SOLUTION_LIST.filter((s) => s.slug !== solution.slug);

  return (
    <div className="animate-fade-in-up">
      <PageHero>
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1 text-xs text-gray-400"
        >
          <Link href="/" className="hover:text-gray-700">
            Light Rider Cloud
          </Link>
          <MdChevronRight />
          <span className="text-gray-600">{navLabel}</span>
        </nav>

        <Image
          src={logo.src}
          alt={name}
          width={logo.width}
          height={logo.height}
        />

        <div className="flex max-w-2xl flex-col gap-3">

          <h1 className="hero font-semibold leading-tight text-gray-800">{name}</h1>
          <p className="text-lg text-gray-700">{tagline}</p>
          <p className="text-sm text-gray-600">{summary}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <GetStartedActions />
          <LRLinkButton href={DOCS_URL} variant="secondary-outline" external>
            Documentation
          </LRLinkButton>
        </div>

        <p className="text-xs text-gray-400">Built for: {audience}</p>
      </PageHero>

      <div className="mx-auto flex max-w-7xl flex-col gap-20 py-14">
        <section>
          <SectionHeading eyebrow="Capabilities" title="What you can do" />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {solution.highlights.map(({ title, description, icon: Icon }) => (
              <li
                key={title}
                className="flex flex-col gap-3 border border-gray-100 bg-gray-100 p-5 default-radius"
              >
                <Icon className="text-2xl text-[var(--brand-tertiary)]" />
                <h3 className="font-semibold text-gray-800">{title}</h3>
                <p className="text-sm text-gray-600">{description}</p>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <SectionHeading
            eyebrow="How it works"
            title="From first step to result"
          />
          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {solution.steps.map(({ title, description }, i) => (
              <li key={title} className="border-t-2 border-color-brand pt-4">
                <span className="font-mono text-sm text-gray-400">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-1 font-semibold text-gray-800">{title}</h3>
                <p className="mt-1 text-sm text-gray-600">{description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section>
          <SectionHeading eyebrow="Specifications" title="Under the hood" />
          <dl className="flex flex-col gap-6">
            {solution.specs.map(({ label, items }) => (
              <div
                key={label}
                className="flex flex-col gap-2 md:flex-row md:gap-8"
              >
                <dt className="text-sm font-medium text-gray-700 md:w-48 md:shrink-0">
                  {label}
                </dt>
                <dd className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <span
                      key={item}
                      className="border border-gray-100 px-2 py-1 font-mono text-xs text-gray-600 default-radius"
                    >
                      {item}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section>
          <SectionHeading eyebrow="The solution stack" title="Works with">
            {name} is one layer of Light Rider Cloud.{" "}
            <Link href="/#stack" className="brand-link">
              See how the stack fits together
            </Link>
            .
          </SectionHeading>
          <div className="grid gap-4 md:grid-cols-2">
            {others.map((s) => (
              <SolutionCard key={s.slug} solution={s} />
            ))}
          </div>
        </section>
      </div>
      <div className="-mx-4 lg:-mx-8 -mb-6">
        <CtaBand />
      </div>
    </div>
  );
}
