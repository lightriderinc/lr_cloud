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
          Find the encryption that quantum computers will break, and move to
          what replaces it.
        </p>
        <p className="text-sm text-gray-600">
          Post-quantum cryptography (PQC) is encryption designed to hold up
          against quantum computers. Light Rider PQC scans your code and
          servers for the older methods it replaces, shows what to fix first,
          and lets you try the new standards in your browser.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <GetStartedActions solution="pqc" />
        <LRLinkButton href={DOCS_URL} variant="secondary-outline" external>
          Documentation
        </LRLinkButton>
      </div>
    </PageHero>
  );
}
