import GetStartedActions from "@/components/solutions/GetStartedActions";
import PageHero from "@/components/solutions/PageHero";
import LRLinkButton from "@/components/ui/LRLinkButton";
import { DOCS_URL, SOLUTIONS } from "@/lib/solutions";
import Image from "next/image";
import Link from "next/link";
import { MdChevronRight } from "react-icons/md";

const { name, navLabel } = SOLUTIONS.entropy;

export default function EntropyHero() {
  return (
    <PageHero
      backdrop={
        <>
          <div aria-hidden="true" className="absolute inset-0 -z-20 bg-[#090909]" />
          <Image
            src="/entropy-hero-bg.png"
            alt=""
            aria-hidden="true"
            width={2654}
            height={972}
            priority
            className="pointer-events-none absolute top-0 right-0 -z-10 hidden h-full w-auto max-w-none select-none lg:block"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-80 -z-10 hidden w-3/4 bg-linear-to-r to-transparent from-[#090909] lg:block xl:hidden"
          />
        </>
      }
    >
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-1 text-xs text-gray-200"
      >
        <Link href="/" className="text-gray-200 hover:text-gray-100">
          Light Rider Cloud
        </Link>
        <MdChevronRight />
        <span className="text-gray-100">{navLabel}</span>
      </nav>

      <Image
        src="/lightrider-entropy-logo-white.svg"
        alt={name}
        width={252}
        height={18}
      />

      <div className="flex max-w-2xl flex-col gap-3">
        <h1 className="hero font-semibold leading-tight text-white">
          {name}
        </h1>
        <p className="text-lg text-gray-100">
          Certified quantum randomness, with a receipt for every draw.
        </p>
        <p className="text-sm text-gray-200">
          Draw verified random bytes from real quantum and certified hardware
          sources through an API. Every batch is health-checked and mixed so
          that no single source can bias it, and it arrives with a signed
          receipt.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <GetStartedActions solution="entropy" />
        <LRLinkButton href={DOCS_URL} variant="secondary-outline"
          className="border-gray-300! text-white! hover:bg-white/10!"
          external
        >
          Documentation
        </LRLinkButton>
      </div>

      <p className="text-xs text-gray-200">
        Built for: Developers and enterprises that need auditable randomness
        for encryption and AI.
      </p>
    </PageHero>
  );
}
