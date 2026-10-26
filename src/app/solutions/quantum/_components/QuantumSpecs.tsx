import SectionHeading from "@/components/solutions/SectionHeading";

const SPECS = [
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
];

export default function QuantumSpecs() {
  return (
    <section>
      <SectionHeading eyebrow="Specifications" title="Under the hood" />
      <dl className="flex flex-col gap-6">
        {SPECS.map(({ label, items }) => (
          <div key={label} className="flex flex-col gap-2 md:flex-row md:gap-8">
            <dt className="text-sm font-medium text-gray-700 md:w-48 md:shrink-0">
              {label}
            </dt>
            <dd className="flex flex-wrap gap-2">
              {items.map((item) => (
                <span
                  key={item}
                  className="border border-gray-100 px-2 py-1 font-mono text-xs text-gray-600 default-radius"
                >
                  {item}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
