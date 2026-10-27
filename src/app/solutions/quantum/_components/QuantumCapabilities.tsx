import SectionHeading from "@/components/solutions/SectionHeading";
import {
  MdApps,
  MdCode,
  MdLayers,
  MdMemory,
  MdSchool
} from "react-icons/md";

const CAPABILITIES = [
  {
    title: "QPU backends",
    description:
      "Submit jobs to hardware such as Rigetti Cepheus-1-108Q, or iterate on simulators first.",
    icon: MdMemory,
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
];

export default function QuantumCapabilities() {
  return (
    <section>
      <SectionHeading title="What you can do" />
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
