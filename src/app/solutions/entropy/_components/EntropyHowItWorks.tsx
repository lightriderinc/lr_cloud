import SectionHeading from "@/components/solutions/SectionHeading";

const STEPS = [
  {
    title: "Collect",
    description:
      "Quantum devices produce raw random bits by measuring events that can't be predicted, such as particles of light or the state of a qubit.",
  },
  {
    title: "Check",
    description:
      "Each batch runs through the NIST SP 800-90B health tests, which catch a device that is stuck or drifting. Only batches that pass are used.",
  },
  {
    title: "Blend",
    description:
      "Bits from different devices are mixed together, so one weak source can't skew the result.",
  },
  {
    title: "Deliver",
    description:
      "You get your random bytes and a signed receipt. Light Rider keeps the receipt, never the bytes.",
  },
];

export default function EntropyHowItWorks() {
  return (
    <section>
      <SectionHeading title="What happens when you draw" />
      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map(({ title, description }, i) => (
          <li key={title} className="bg-gray-50 p-4 pb-6 default-radius">
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
