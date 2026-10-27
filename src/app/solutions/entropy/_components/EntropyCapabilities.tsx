import SectionHeading from "@/components/solutions/SectionHeading";
import {
  MdCode,
  MdMergeType,
  MdReceiptLong,
  MdSensors,
  MdTune,
  MdVerified,
} from "react-icons/md";

const CAPABILITIES = [
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
];

export default function EntropyCapabilities() {
  return (
    <section>
      <SectionHeading title="What you can do" />
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CAPABILITIES.map(({ title, description, icon: Icon }) => (
          <li
            key={title}
            className="flex flex-col gap-3 border border-gray-50 bg-gray-50 p-5 default-radius"
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
