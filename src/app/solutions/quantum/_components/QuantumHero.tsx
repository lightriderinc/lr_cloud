import GetStartedActions from "@/components/solutions/GetStartedActions";
import PageHero from "@/components/solutions/PageHero";
import LRLinkButton from "@/components/ui/LRLinkButton";
import { DOCS_URL, SOLUTIONS } from "@/lib/solutions";
import Image from "next/image";
import Link from "next/link";
import { MdChevronRight } from "react-icons/md";

const { name, navLabel, logo } = SOLUTIONS.quantum;

export default function QuantumHero() {
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
          Your gateway to quantum computing.
        </p>
        <p className="text-sm text-gray-600">
          Run quantum circuits on simulators and real QPUs, book dedicated
          hardware time, and build on managed quantum services and
          applications, all paid for with pay-as-you-go compute credits.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <GetStartedActions />
        <LRLinkButton href={DOCS_URL} variant="secondary-outline" external>
          Documentation
        </LRLinkButton>
      </div>

      <p className="text-xs text-gray-400">
        Built for: Developers, researchers and students running quantum
        circuits.
      </p>
    </PageHero>
  );
}
