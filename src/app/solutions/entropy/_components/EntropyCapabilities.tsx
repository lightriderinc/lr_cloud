import CapabilityCard, { type Capability } from "@/components/solutions/CapabilityCard";
import SectionHeading from "@/components/solutions/SectionHeading";
import { productUrl } from "@/lib/solutions";
import {
  MdCode,
  MdMergeType,
  MdReceiptLong,
  MdSensors,
  MdTune,
  MdVerified,
} from "react-icons/md";

// Health checks and SHAKE-256 mixing have no page of their own on the entropy
// site; both are explained in the "How it works" section of its /entropy page.
const CAPABILITIES: Capability[] = [
  {
    title: "Quantum & hardware sources",
    description:
      "Raw bits come from QRNGs, quantum processors, public beacons and CPU hardware.",
    icon: MdSensors,
    href: productUrl("entropy", "/sources"),
  },
  {
    title: "Health-checked",
    description:
      "Every batch passes NIST SP 800-90B health checks before it is stored.",
    icon: MdVerified,
    href: productUrl("entropy", "/entropy"),
  },
  {
    title: "Bias-resistant mixing",
    description:
      "Sources are combined with SHAKE-256, so no single weak source can bias the output.",
    icon: MdMergeType,
    href: productUrl("entropy", "/entropy"),
  },
  {
    title: "Signed receipts",
    description:
      "Each draw comes with a signed receipt proving exactly what backed it.",
    icon: MdReceiptLong,
    href: productUrl("entropy", "/receipts"),
  },
  {
    title: "Pools & blends",
    description:
      "Draw from the fastest, highest-quality or quantum-verified pool, or build a custom blend.",
    icon: MdTune,
    href: productUrl("entropy", "/entropy"),
  },
  {
    title: "One API key",
    description:
      "API keys sync with Light Rider Cloud, so one key works across the stack.",
    icon: MdCode,
    href: productUrl("entropy", "/settings/api-keys"),
  },
];

export default function EntropyCapabilities() {
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
