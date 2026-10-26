import SectionHeading from "@/components/solutions/SectionHeading";
import {
  MdDraw,
  MdLock,
  MdManageSearch,
  MdPolicy,
  MdShuffle,
} from "react-icons/md";

const CAPABILITIES = [
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
];

export default function PqcCapabilities() {
  return (
    <section>
      <SectionHeading eyebrow="Capabilities" title="What you can do" />
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CAPABILITIES.map(({ title, description, icon: Icon }) => (
          <li
            key={title}
            className="flex flex-col gap-3 border border-gray-100 bg-gray-100 p-5 default-radius"
          >
            <Icon className="text-2xl text-[var(--brand-tertiary)]" />
            <h3 className="font-semibold text-gray-800">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
