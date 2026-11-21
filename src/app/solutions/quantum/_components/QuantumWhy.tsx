import SectionHeading from "@/components/solutions/SectionHeading";

// The concept, for readers who have never used a quantum computer. Avoids
// claiming a speed-up today: current machines are small and noisy, and the
// copy says so.
const COMPARISON = [
  {
    label: "A bit",
    text: "Always either 0 or 1. Read it as often as you like and you get the same answer.",
  },
  {
    label: "A qubit",
    text: "Can hold a mix of 0 and 1 until it is measured, then settles on one of them at random. Qubits can also be linked, so that measuring one tells you about the others.",
    highlight: true,
  },
];

export default function QuantumWhy() {
  return (
    <section className="grid gap-10 lg:grid-cols-[2fr_3fr] lg:items-center">
      <SectionHeading title="A different kind of computer">
        Ordinary computers work with bits. Quantum computers work with qubits,
        which follow the physics of single atoms and particles of light. For
        some problems, such as simulating molecules or searching huge sets of
        options, that opens up methods no ordinary computer can use.
        Today&apos;s machines are still small and make errors, so most work
        now is research, teaching, and getting software ready for larger ones.
      </SectionHeading>

      <dl className="flex flex-col gap-4">
        {COMPARISON.map(({ label, text, highlight }) => (
          <div
            key={label}
            className={`default-radius border-l-2 bg-gray-50 p-5 ${
              highlight ? "border-[var(--brand-primary)]" : "border-gray-200"
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
