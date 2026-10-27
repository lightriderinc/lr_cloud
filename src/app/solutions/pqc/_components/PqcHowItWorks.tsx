import SectionHeading from "@/components/solutions/SectionHeading";

const STEPS = [
  {
    title: "Upload your code",
    description: "Start a qSearch scan from a ZIP of your repository.",
  },
  {
    title: "Review the inventory",
    description: "See which algorithms are quantum-vulnerable and why.",
  },
  {
    title: "Prioritise",
    description: "Rank findings by risk, using evidence and provenance.",
  },
  {
    title: "Migrate",
    description: "Move secrets and signatures to ML-KEM and ML-DSA.",
  },
];

export default function PqcHowItWorks() {
  return (
    <section>
      <SectionHeading title="From first step to result" />
      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map(({ title, description }, i) => (
          <li key={title} className="bg-gray-50 p-4 pb-6">
            <span className="text-sm font-semibold text-gray-200">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-1 font-semibold text-gray-800">{title}</h3>
            <p className="mt-1 text-sm text-gray-600">{description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
