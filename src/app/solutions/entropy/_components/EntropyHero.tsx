import GetStartedActions from "@/components/solutions/GetStartedActions";
import PageHero from "@/components/solutions/PageHero";
import LRLinkButton from "@/components/ui/LRLinkButton";
import { DOCS_URL, SOLUTIONS } from "@/lib/solutions";
import Image from "next/image";
import Link from "next/link";
import { MdChevronRight } from "react-icons/md";

const { name, navLabel, logo } = SOLUTIONS.entropy;

export default function EntropyHero() {
  return (
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

      <Image src={logo.src} alt={name} width={logo.width} height={logo.height} />

      <div className="flex max-w-2xl flex-col gap-3">
        <h1 className="hero font-semibold leading-tight text-gray-800">
          {name}
        </h1>
        <p className="text-lg text-gray-700">
          Certified quantum randomness, with a receipt for every draw.
        </p>
        <p className="text-sm text-gray-600">
          Draw verified random bytes from real quantum and certified hardware
          sources through an API. Every batch is health-checked and mixed so
          that no single source can bias it, and it arrives with a signed
          receipt.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <GetStartedActions solution="entropy" />
        <LRLinkButton href={DOCS_URL} variant="secondary-outline" external>
          Documentation
        </LRLinkButton>
      </div>

      <p className="text-xs text-gray-400">
        Built for: Developers and enterprises that need auditable randomness
        for encryption and AI.
      </p>
    </PageHero>
  );
}
