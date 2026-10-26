import type { IconType } from "react-icons";
import { MdCloudQueue, MdGrain, MdHub, MdShield } from "react-icons/md";

// Shared identity for the three platforms that make up the Light Rider Cloud
// solution stack. Drives the home page, the header and mobile navigation, and
// the cross-links between solution pages. Each /solutions/* page owns the rest
// of its content in its own section components (see its _components folder).

export const DOCS_URL = "https://docs.lightriderinc.com";

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
    link: "https://platform.lightriderinc.com/",
    navLabel: "Quantum",
    name: "Quantum Compute",
    layer: "Compute",
    icon: MdHub,
    logo: { src: "/lightrider-quantum-logo-black.svg", width: 255, height: 18 },
    tagline: "Your gateway to quantum computing.",
    summary:
      "Run quantum circuits on simulators and real QPUs, book dedicated hardware time, and build on managed quantum services and applications, all paid for with pay-as-you-go compute credits.",
  },

  pqc: {
    slug: "pqc",
    href: "/solutions/pqc",
    link: "https://pqc.lightriderinc.com/",
    navLabel: "PQC",
    name: "Post-Quantum Cryptography",
    layer: "Security",
    icon: MdShield,
    logo: { src: "/Lightrider-pqc-logo-black.svg", width: 226, height: 18 },
    tagline: "Find quantum-vulnerable cryptography, then replace it.",
    summary:
      "Veloce gets you ready for harvest-now-decrypt-later attacks. It finds the cryptography in your code that quantum computers will break, then lets you encrypt and sign with NIST-aligned ML-KEM and ML-DSA keys backed by quantum entropy.",
  },

  entropy: {
    slug: "entropy",
    href: "/solutions/entropy",
    link: "https://entropy.lightriderinc.com/",
    navLabel: "Entropy",
    name: "Entropy as a Service",
    layer: "Randomness",
    icon: MdGrain,
    logo: { src: "/lightrider-entropy-logo-black.svg", width: 252, height: 18 },
    tagline: "Certified quantum randomness, with a receipt for every draw.",
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
