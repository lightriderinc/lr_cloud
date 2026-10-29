import CapabilityCard, { type Capability } from "@/components/solutions/CapabilityCard";
import SectionHeading from "@/components/solutions/SectionHeading";
import { productUrl } from "@/lib/solutions";
import {
  MdDraw,
  MdLock,
  MdManageSearch,
  MdPolicy,
  MdShuffle,
} from "react-icons/md";

// Risk and provenance are part of qSearch's scan results. The vault, the
// signer and the entropy source picker are modals on the PQC Applications
// page, which has no per-app URL to deep-link to.
const CAPABILITIES: Capability[] = [
  {
    title: "qSearch discovery",
    description:
      "Upload a codebase as a ZIP and get an inventory of every cryptographic algorithm it uses.",
    icon: MdManageSearch,
    href: productUrl("pqc", "/qsearch"),
  },
  {
    title: "Risk & provenance",
    description:
      "Each finding is classified as quantum-vulnerable or PQC-ready, with risk, evidence and provenance to prioritise migration.",
    icon: MdPolicy,
    href: productUrl("pqc", "/qsearch"),
  },
  {
    title: "Quantum Vault",
    description:
      "Encrypt secrets with ML-KEM-768 and AES-256-GCM, then decrypt them and manage your keys in one place.",
    icon: MdLock,
    href: productUrl("pqc", "/applications"),
  },
  {
    title: "ML-DSA-65 signing",
    description: "Sign any text with ML-DSA-65 post-quantum signatures.",
    icon: MdDraw,
    href: productUrl("pqc", "/applications"),
  },
  {
    title: "Entropy-backed keys",
    description:
      "Generate keys from quantum and certified sources such as ANU, CURBy, Drand and NIST, and compare sources side by side.",
    icon: MdShuffle,
    href: productUrl("pqc", "/applications"),
  },
];

export default function PqcCapabilities() {
  return (
    <section>
      <SectionHeading title="What you can do" />
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CAPABILITIES.map((capability) => (
          <li key={capability.title}>
            <CapabilityCard {...capability} />
          </li>
        ))}
      </ul>
    </section>
  );
}
