import SectionHeading from "@/components/solutions/SectionHeading";

const SPECS = [
  {
    label: "Algorithms",
    items: ["ML-KEM-768", "ML-DSA-65", "AES-256-GCM"],
  },
  {
    label: "Key entropy sources",
    items: ["ANU Quantum RNG", "CURBy", "Drand", "NIST Beacon", "IQM"],
  },
];

export default function PqcSpecs() {
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
