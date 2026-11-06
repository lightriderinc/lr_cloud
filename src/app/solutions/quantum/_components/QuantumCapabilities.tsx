import CapabilityCard, { type Capability } from "@/components/solutions/CapabilityCard";
import SectionHeading from "@/components/solutions/SectionHeading";
import { productUrl } from "@/lib/solutions";
import {
  MdApps,
  MdCode,
  MdLayers,
  MdMemory,
  MdSchool
} from "react-icons/md";

const CAPABILITIES: Capability[] = [
  {
    title: "QPU backends",
    description:
      "Submit jobs to hardware such as Rigetti Cepheus-1-108Q, or iterate on simulators first.",
    icon: MdMemory,
    href: productUrl("quantum", "/backends"),
  },
  {
    title: "Managed services",
    description:
      "Use services such as quantum error correction (QEC) instead of building them yourself.",
    icon: MdLayers,
    href: productUrl("quantum", "/services/qec"),
  },
  {
    title: "Applications",
    description:
      "Try ready-made apps like the True Random Dice Roll and Secure Password Generator, powered by quantum entropy.",
    icon: MdApps,
    href: productUrl("quantum", "/applications"),
  },
  {
    title: "Classroom",
    description:
      "Learn classical and quantum computing basics with guided courses and quizzes.",
    icon: MdSchool,
    href: productUrl("quantum", "/classroom"),
  },
  {
    title: "API access",
    description:
      "Authenticate with an API token and drive jobs and experiments from your own code.",
    icon: MdCode,
    href: productUrl("quantum", "/settings/keys"),
  },
];

export default function QuantumCapabilities() {
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
