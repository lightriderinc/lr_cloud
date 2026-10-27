import SectionHeading from "@/components/solutions/SectionHeading";

const STEPS = [
  {
    title: "Collect",
    description: "Raw bits arrive from quantum and certified hardware sources.",
  },
  {
    title: "Verify",
    description: "Every batch passes NIST SP 800-90B health checks.",
  },
  {
    title: "Combine",
    description: "Sources are mixed with SHAKE-256 to remove single-source bias.",
  },
  {
    title: "Deliver",
    description: "You receive the bytes and a signed receipt for the draw.",
  },
];

export default function EntropyHowItWorks() {
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
