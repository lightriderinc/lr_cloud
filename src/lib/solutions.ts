import type { IconType } from "react-icons";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { MdCloudQueue, MdShield } from "react-icons/md";
import { TbAtom2Filled } from "react-icons/tb";



// Shared identity for the three platforms that make up the Light Rider Cloud
// solution stack. Drives the home page, the header and mobile navigation, and
// the cross-links between solution pages. Each /solutions/* page owns the rest
// of its content in its own section components (see its _components folder).

export const DOCS_URL = "https://docs.lightriderinc.com";

/**
 * Each product site's origin, from NEXT_PUBLIC_{QUANTUM,ENTROPY,PQC}_URL so
 * dev and preview builds can point at their own deployments. Falls back to
 * the production host. NEXT_PUBLIC_ values are inlined at build time, so each
 * must be referenced by its literal name.
 */
const PRODUCT_ORIGINS: Record<SolutionSlug, string> = {
  quantum: originOrDefault(process.env.NEXT_PUBLIC_QUANTUM_URL, "https://platform.lightriderinc.com"),
  entropy: originOrDefault(process.env.NEXT_PUBLIC_ENTROPY_URL, "https://entropy.lightriderinc.com"),
  pqc: originOrDefault(process.env.NEXT_PUBLIC_PQC_URL, "https://pqc.lightriderinc.com"),
};

function originOrDefault(raw: string | undefined, fallback: string): string {
  const value = raw?.trim();
  return (value && /^https?:\/\//.test(value) ? value : fallback).replace(/\/$/, "");
}

/** Absolute URL of a page on a product's own site, e.g. productUrl("entropy", "/receipts"). */
export function productUrl(slug: SolutionSlug, path = "/"): string {
  return `${PRODUCT_ORIGINS[slug]}${path}`;
}

export type SolutionSlug = "quantum" | "pqc" | "entropy";

export interface Solution {
  slug: SolutionSlug;
  href: `/solutions/${SolutionSlug}`;
  /** Short label for nav items. */
  link: string;
  navLabel: string;
  name: string;
  /** Where the platform sits in the stack, e.g. "Compute". */
  layer: string;
  icon: IconType;
  logo: { src: string; width: number; height: number };
  tagline: string;
  summary: string;
}

export const SOLUTIONS: Record<SolutionSlug, Solution> = {
  quantum: {
    slug: "quantum",
    href: "/solutions/quantum",
    link: productUrl("quantum"),
    navLabel: "Quantum",
    name: "Quantum Compute",
    layer: "Quantum",
    icon: TbAtom2Filled,
    logo: { src: "/lightrider-quantum-logo-black.svg", width: 255, height: 18 },
    tagline: "Your gateway to quantum computing.",
    summary:
      "Run quantum circuits on simulators and real QPUs, book dedicated hardware time, and build on managed quantum services and applications, all paid for with pay-as-you-go compute credits.",
  },

  pqc: {
    slug: "pqc",
    href: "/solutions/pqc",
    link: productUrl("pqc"),
    navLabel: "PQC",
    name: "Post-Quantum Cryptography",
    layer: "PQC",
    icon: MdShield,
    logo: { src: "/Lightrider-pqc-logo-black.svg", width: 226, height: 18 },
    tagline: "Find quantum-vulnerable cryptography, then replace it.",
    summary:
      "Veloce gets you ready for harvest-now-decrypt-later attacks. It finds the cryptography in your code that quantum computers will break, then lets you encrypt and sign with NIST-aligned ML-KEM and ML-DSA keys backed by quantum entropy.",
  },

  entropy: {
    slug: "entropy",
    href: "/solutions/entropy",
    link: productUrl("entropy"),
    navLabel: "Entropy",
    name: "Entropy as a Service",
    layer: "Entropy",
    icon: GiPerspectiveDiceSixFacesRandom,
    logo: { src: "/lightrider-entropy-logo-black.svg", width: 252, height: 18 },
    tagline: "Certified high-quality randomness.",
    summary:
      "Draw verified random bytes from real quantum and certified hardware sources through an API. Every batch is health-checked and mixed so that no single source can bias it, and it arrives with a signed receipt.",
  },
};

/** Stack order, from the foundation (hardware) up to the application layer. */
export const SOLUTION_LIST: Solution[] = [
  SOLUTIONS.quantum,
  SOLUTIONS.entropy,
  SOLUTIONS.pqc,
];

/** Main navigation, shared by the desktop header and the mobile menu. */
export const MAIN_NAV: {
  /** Compact header label. */
  label: string;
  /** Full mobile-menu label. */
  name: string;
  href: string;
  icon: IconType;
}[] = [
  { label: "Overview", name: "Overview", href: "/", icon: MdCloudQueue },
  ...SOLUTION_LIST.map((s) => ({
    label: s.navLabel,
    name: s.name,
    href: s.href,
    icon: s.icon,
  })),
];
