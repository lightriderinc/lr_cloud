import SectionHeading from "@/components/solutions/SectionHeading";

// The concept, for readers who have never thought about where random numbers
// come from. Deliberately makes no claim that quantum randomness is "better"
// than a good classical generator: the difference is that it is traceable.
const COMPARISON = [
  {
    label: "A generator inside your computer",
    text: "Runs a formula from a starting value. Fine for most jobs, but once a number is used there is no record of how it was made.",
  },
  {
    label: "Light Rider Entropy",
    text: "Measures quantum devices whose results can't be predicted, and records which devices were used, when, and that they were working properly.",
    highlight: true,
  },
];

export default function EntropyWhy() {
  return (
    <section className="grid gap-10 lg:grid-cols-[2fr_3fr] lg:items-center">
      <SectionHeading title="Why the source matters">
        Random numbers decide encryption keys, password reset links, prize
        draws and how AI training data gets shuffled. If someone can predict
        them, or you can&apos;t show how they were made, everything built on
        them is open to question.
      </SectionHeading>

      <dl className="flex flex-col gap-4">
        {COMPARISON.map(({ label, text, highlight }) => (
          <div
            key={label}
            className={`default-radius border-l-3 p-5 ${
              highlight ? "gradient-border-brand" : "border-amber-500 bg-gray-50"
            }`}
          >
            <dt className="font-semibold text-gray-800">{label}</dt>
            <dd className="mt-1 text-sm text-gray-600">{text}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
