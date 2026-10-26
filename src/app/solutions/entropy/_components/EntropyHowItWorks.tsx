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
      <SectionHeading eyebrow="How it works" title="From first step to result" />
      <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map(({ title, description }, i) => (
          <li key={title} className="border-t-2 border-color-brand pt-4">
            <span className="font-mono text-sm text-gray-400">
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
