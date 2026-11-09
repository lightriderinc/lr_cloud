import CapabilityCard, { type Capability } from "@/components/solutions/CapabilityCard";
import SectionHeading from "@/components/solutions/SectionHeading";
import { productUrl } from "@/lib/solutions";
import {
  MdApps,
  MdManageSearch,
  MdPolicy,
} from "react-icons/md";

// Risk and provenance are part of qSearch's scan results. The individual apps
// are modals on the PQC Applications page, which has no per-app URL, so they
// share one card (like the Applications card on the Quantum solution page).
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
    title: "Applications",
    description:
      "Try hands-on post-quantum apps like Quantum Vault, the Quantum-Safe Signer, a JWT inspector and a PQC speed test.",
    icon: MdApps,
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
