import type { IconType } from "react-icons";
import {
  MdApps,
  MdCloudQueue,
  MdCode,
  MdDraw,
  MdEventAvailable,
  MdGrain,
  MdHub,
  MdLayers,
  MdLock,
  MdManageSearch,
  MdMemory,
  MdMergeType,
  MdPolicy,
  MdReceiptLong,
  MdSchool,
  MdSensors,
  MdShield,
  MdShuffle,
  MdTune,
  MdVerified,
} from "react-icons/md";

// Marketing content for the three platforms that make up the Light Rider Cloud
// solution stack. Drives the home page, the /solutions/* pages and the header
// and mobile navigation, so a new platform only needs an entry here (plus its
// page file).

export const DOCS_URL = "https://docs.lightriderinc.com";

export type SolutionSlug = "quantum" | "pqc" | "entropy";

export interface Solution {
  slug: SolutionSlug;
  href: `/solutions/${SolutionSlug}`;
  /** Short label for nav items. */
  navLabel: string;
  name: string;
  /** Where the platform sits in the stack, e.g. "Compute". */
  layer: string;
  icon: IconType;
  logo: { src: string; width: number; height: number };
  tagline: string;
  summary: string;
  audience: string;
  highlights: { title: string; description: string; icon: IconType }[];
  steps: { title: string; description: string }[];
  specs: { label: string; items: string[] }[];
}

export const SOLUTIONS: Record<SolutionSlug, Solution> = {
  quantum: {
    slug: "quantum",
    href: "/solutions/quantum",
    navLabel: "Quantum",
    name: "Quantum Compute",
    layer: "Compute",
    icon: MdHub,
    logo: { src: "/lightrider-quantum-logo-black.svg", width: 255, height: 18 },
    tagline: "Your gateway to quantum computing.",
    summary:
      "Run quantum circuits on simulators and real QPUs, book dedicated hardware time, and build on managed quantum services and applications, all paid for with pay-as-you-go compute credits.",
    audience: "Developers, researchers and students running quantum circuits.",
    highlights: [
      {
        title: "QPU backends",
        description:
          "Submit jobs to hardware such as Rigetti Cepheus-1-108Q, or iterate on simulators first.",
        icon: MdMemory,
      },
      {
        title: "Experiment reservations",
        description:
          "Book dedicated time on a backend when an experiment needs uninterrupted access.",
        icon: MdEventAvailable,
      },
      {
        title: "Managed services",
        description:
          "Use services such as quantum error correction (QEC) instead of building them yourself.",
        icon: MdLayers,
      },
      {
        title: "Applications",
        description:
          "Try ready-made apps like the True Random Dice Roll and Secure Password Generator, powered by quantum entropy.",
        icon: MdApps,
      },
      {
        title: "Classroom",
        description:
          "Learn classical and quantum computing basics with guided courses and quizzes.",
        icon: MdSchool,
      },
      {
        title: "API access",
        description:
          "Authenticate with an API token and drive jobs and experiments from your own code.",
        icon: MdCode,
      },
    ],
    steps: [
      {
        title: "Create an account",
        description: "Sign up and add compute credits to your balance.",
      },
      {
        title: "Choose a backend",
        description: "Pick a simulator or a QPU, and reserve time if you need it.",
      },
      {
        title: "Run circuits",
        description: "Submit jobs from the platform or through the API.",
      },
      {
        title: "Review results",
        description: "Track every job and experiment from your dashboard.",
      },
    ],
    specs: [
      {
        label: "Backends & services",
        items: [
          "Rigetti Cepheus-1-108Q",
          "Simulators",
          "Quantum error correction (QEC)",
          "Experiment reservations",
        ],
      },
      {
        label: "Learning",
        items: ["Classical computing basics", "Quantum computing basics"],
      },
    ],
  },

  pqc: {
    slug: "pqc",
    href: "/solutions/pqc",
    navLabel: "PQC",
    name: "Post-Quantum Cryptography",
    layer: "Security",
    icon: MdShield,
    logo: { src: "/Lightrider-pqc-logo-black.svg", width: 226, height: 18 },
    tagline: "Find quantum-vulnerable cryptography, then replace it.",
    summary:
      "Veloce gets you ready for harvest-now-decrypt-later attacks. It finds the cryptography in your code that quantum computers will break, then lets you encrypt and sign with NIST-aligned ML-KEM and ML-DSA keys backed by quantum entropy.",
    audience: "Security and compliance engineers planning a PQC migration.",
    highlights: [
      {
        title: "qSearch discovery",
        description:
          "Upload a codebase as a ZIP and get an inventory of every cryptographic algorithm it uses.",
        icon: MdManageSearch,
      },
      {
        title: "Risk & provenance",
        description:
          "Each finding is classified as quantum-vulnerable or PQC-ready, with risk, evidence and provenance to prioritise migration.",
        icon: MdPolicy,
      },
      {
        title: "Quantum Vault",
        description:
          "Encrypt secrets with ML-KEM-768 and AES-256-GCM, then decrypt them and manage your keys in one place.",
        icon: MdLock,
      },
      {
        title: "ML-DSA-65 signing",
        description: "Sign any text with ML-DSA-65 post-quantum signatures.",
        icon: MdDraw,
      },
      {
        title: "Entropy-backed keys",
        description:
          "Generate keys from quantum and certified sources such as ANU, CURBy, Drand and NIST, and compare sources side by side.",
        icon: MdShuffle,
      },
    ],
    steps: [
      {
        title: "Upload your code",
        description: "Start a qSearch scan from a ZIP of your repository.",
      },
      {
        title: "Review the inventory",
        description: "See which algorithms are quantum-vulnerable and why.",
      },
      {
        title: "Prioritise",
        description: "Rank findings by risk, using evidence and provenance.",
      },
      {
        title: "Migrate",
        description: "Move secrets and signatures to ML-KEM and ML-DSA.",
      },
    ],
    specs: [
      {
        label: "Algorithms",
        items: ["ML-KEM-768", "ML-DSA-65", "AES-256-GCM"],
      },
      {
        label: "Key entropy sources",
        items: ["ANU Quantum RNG", "CURBy", "Drand", "NIST Beacon", "IQM"],
      },
    ],
  },

  entropy: {
    slug: "entropy",
    href: "/solutions/entropy",
    navLabel: "Entropy",
    name: "Entropy as a Service",
    layer: "Randomness",
    icon: MdGrain,
    logo: { src: "/lightrider-entropy-logo-black.svg", width: 252, height: 18 },
    tagline: "Certified quantum randomness, with a receipt for every draw.",
    summary:
      "Draw verified random bytes from real quantum and certified hardware sources through an API. Every batch is health-checked and mixed so that no single source can bias it, and it arrives with a signed receipt.",
    audience:
      "Developers and enterprises that need auditable randomness for encryption and AI.",
    highlights: [
      {
        title: "Quantum & hardware sources",
        description:
          "Raw bits come from QRNGs, quantum processors, public beacons and CPU hardware.",
        icon: MdSensors,
      },
      {
        title: "Health-checked",
        description:
          "Every batch passes NIST SP 800-90B health checks before it is stored.",
        icon: MdVerified,
      },
      {
        title: "Bias-resistant mixing",
        description:
          "Sources are combined with SHAKE-256, so no single weak source can bias the output.",
        icon: MdMergeType,
      },
      {
        title: "Signed receipts",
        description:
          "Each draw comes with a signed receipt proving exactly what backed it.",
        icon: MdReceiptLong,
      },
      {
        title: "Pools & blends",
        description:
          "Draw from the fastest, highest-quality or quantum-verified pool, or build a custom blend.",
        icon: MdTune,
      },
      {
        title: "One API key",
        description:
          "API keys sync with Light Rider Cloud, so one key works across the stack.",
        icon: MdCode,
      },
    ],
    steps: [
      {
        title: "Collect",
        description: "Raw bits arrive from quantum and certified hardware sources.",
      },
      {
        title: "Verify",
        description: "Every batch passes NIST SP 800-90B health checks.",
      },
      {
        title: "Combine",
        description: "Sources are mixed with SHAKE-256 to remove single-source bias.",
      },
      {
        title: "Deliver",
        description: "You receive the bytes and a signed receipt for the draw.",
      },
    ],
    specs: [
      {
        label: "Sources",
        items: [
          "ANU Quantum RNG",
          "Cisco Outshift QRNG",
          "QiSpace TQRND",
          "IQM Resonance",
          "Rigetti Cepheus-1-108Q",
          "Light Rider QEC (IQM)",
          "NIST / Inmetro beacons",
          "RDSEED",
        ],
      },
      {
        label: "Pricing",
        items: ["1 credit = $0.01", "1 credit per 256 bytes"],
      },
    ],
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
