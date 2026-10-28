import GetStartedActions from "@/components/solutions/GetStartedActions";
import HeroLockField from "@/components/solutions/HeroLockField";
import PageHero from "@/components/solutions/PageHero";
import LRLinkButton from "@/components/ui/LRLinkButton";
import { DOCS_URL, SOLUTIONS } from "@/lib/solutions";
import Image from "next/image";
import Link from "next/link";
import { MdChevronRight } from "react-icons/md";

const { name, navLabel, logo } = SOLUTIONS.pqc;

export default function PqcHero() {
  return (
    <PageHero
      backdrop={
        <>
          <HeroLockField />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-80 -z-10 hidden w-full bg-linear-to-r to-transparent from-white lg:block xl:hidden"
          />
        </>
      }
    >
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
          Find quantum-vulnerable cryptography, then replace it.
        </p>
        <p className="text-sm text-gray-600">
          Veloce gets you ready for harvest-now-decrypt-later attacks. It finds
          the cryptography in your code that quantum computers will break, then
          lets you encrypt and sign with NIST-aligned ML-KEM and ML-DSA keys
          backed by quantum entropy.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <GetStartedActions solution="pqc" />
        <LRLinkButton href={DOCS_URL} variant="secondary-outline" external>
          Documentation
        </LRLinkButton>
      </div>

      <p className="text-xs text-gray-400">
        Built for: Security and compliance engineers planning a PQC migration.
      </p>
    </PageHero>
  );
}
