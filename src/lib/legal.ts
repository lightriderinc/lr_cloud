import { SOLUTIONS, type SolutionSlug } from "@/lib/solutions";

// Registry of Light Rider's legal documents.
//
// A Light Rider Cloud account gives access to every platform, so the General
// Terms of Use and the Privacy Policy are the unified agreements: they cover
// Cloud, Quantum, Entropy and PQC on their own, and they are what the legal
// sidebar and footer link to. Each platform also has supplemental Terms of
// Service and a Privacy Notice; those are linked ONLY from the /legal overview
// chart (modelled on adobe.com/legal/licenses-terms.html), never from the
// sidebar, the footer or the general documents.
//
// The text lives in src/content/legal/*.mdx. When a document changes
// materially, bump `version` and the dates here so they match the
// LegalDocument row (docType/version/effectiveAt) the acceptance flow records.

export const LEGAL_ENTITY = {
  name: "Light Rider Inc.",
  email: "info@lightriderinc.com",
  contactUrl: "https://www.lightriderinc.com/contact",
  address: [
    "5825 University Research Ct, Suite 2000",
    "College Park, MD 20740",
    "United States",
  ],
} as const;

/** Official platform names (single source: SOLUTIONS in lib/solutions.ts). */
export const PLATFORM_NAMES = {
  cloud: "Light Rider Cloud",
  quantum: SOLUTIONS.quantum.name,
  entropy: SOLUTIONS.entropy.name,
  pqc: SOLUTIONS.pqc.name,
} as const;

export type LegalScope = "general" | SolutionSlug;
export type LegalKind = "terms" | "privacy";

export interface LegalDoc {
  scope: LegalScope;
  kind: LegalKind;
  href: string;
  title: string;
  /** Label for the sidebar and the overview chart. */
  navLabel: string;
  summary: string;
  version: number;
  /** ISO dates (YYYY-MM-DD). */
  lastUpdated: string;
  effective: string;
}

const UPDATED = "2026-11-19";

function platformDocs(slug: SolutionSlug, terms: string, privacy: string): LegalDoc[] {
  const name = PLATFORM_NAMES[slug];
  return [
    {
      scope: slug,
      kind: "terms",
      href: `/legal/${slug}/terms`,
      title: `${name} Terms of Service`,
      navLabel: "Terms of Service",
      summary: terms,
      version: 1,
      lastUpdated: UPDATED,
      effective: UPDATED,
    },
    {
      scope: slug,
      kind: "privacy",
      href: `/legal/${slug}/privacy`,
      title: `${name} Privacy Notice`,
      navLabel: "Privacy Notice",
      summary: privacy,
      version: 1,
      lastUpdated: UPDATED,
      effective: UPDATED,
    },
  ];
}

export const LEGAL_DOCS: LegalDoc[] = [
  {
    scope: "general",
    kind: "terms",
    href: "/legal/terms",
    title: "General Terms of Use",
    navLabel: "Terms of Use",
    summary:
      "The unified agreement for your Light Rider Cloud account and every Light Rider platform: Cloud, Quantum, Entropy and PQC.",
    version: 1,
    lastUpdated: UPDATED,
    effective: UPDATED,
  },
  {
    scope: "general",
    kind: "privacy",
    href: "/legal/privacy",
    title: "Privacy Policy",
    navLabel: "Privacy Policy",
    summary:
      "How Light Rider collects, uses and protects personal information across your Light Rider Cloud account and every Light Rider platform.",
    version: 1,
    lastUpdated: UPDATED,
    effective: UPDATED,
  },
  ...platformDocs(
    "quantum",
    "Supplemental terms for running circuits on simulators and third-party QPUs, hardware reservations and the Quantum API.",
    "More detail on how Light Rider Quantum handles circuits, job results, reservations and API usage.",
  ),
  ...platformDocs(
    "entropy",
    "Supplemental terms for drawing random bytes, entropy sources, signed receipts and the Entropy API.",
    "More detail on how Light Rider Entropy handles draw records and signed receipts.",
  ),
  ...platformDocs(
    "pqc",
    "Supplemental terms for qSearch code scanning, the in-browser PQC applications and cryptography export controls.",
    "More detail on how Light Rider PQC handles qSearch uploads and what its applications keep on your device.",
  ),
];

/** The unified documents: the only ones in the sidebar and footer. */
export const GENERAL_LEGAL_DOCS = LEGAL_DOCS.filter((d) => d.scope === "general");

export interface LegalPlatformRow {
  name: string;
  description: string;
  /** Documents that govern this platform, in display order. */
  docs: LegalDoc[];
}

/**
 * Rows of the overview's licenses-and-terms chart. Light Rider Cloud is
 * governed directly by the general documents (as Adobe's Creative Cloud row
 * points at its General Terms); each other platform lists its supplements.
 */
export const LEGAL_PLATFORM_ROWS: LegalPlatformRow[] = [
  {
    name: PLATFORM_NAMES.cloud,
    description: "Your account, compute credits, billing, credit sharing and rewards.",
    docs: GENERAL_LEGAL_DOCS,
  },
  ...(
    [
      ["quantum", "Quantum circuits on simulators and QPUs, and hardware reservations."],
      ["entropy", "Random bytes from quantum and hardware sources, with signed receipts."],
      ["pqc", "qSearch code scanning and post-quantum cryptography applications."],
    ] as const
  ).map(([slug, description]) => ({
    name: PLATFORM_NAMES[slug],
    description,
    docs: LEGAL_DOCS.filter((d) => d.scope === slug),
  })),
];

export function legalScopeName(scope: LegalScope): string {
  return scope === "general" ? PLATFORM_NAMES.cloud : PLATFORM_NAMES[scope];
}

export function getLegalDoc(scope: LegalScope, kind: LegalKind): LegalDoc {
  const doc = LEGAL_DOCS.find((d) => d.scope === scope && d.kind === kind);
  if (!doc) throw new Error(`Unknown legal document: ${scope}/${kind}`);
  return doc;
}

/** "2026-11-10" -> "November 10, 2026", without timezone drift. */
export function formatLegalDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
