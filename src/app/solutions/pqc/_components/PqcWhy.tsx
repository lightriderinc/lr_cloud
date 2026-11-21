import SectionHeading from "@/components/solutions/SectionHeading";

// The concept, for readers new to the topic: the two ways quantum computers
// threaten today's cryptography, and why both start before such a machine exists.
const RISKS = [
  {
    label: "Recorded now, read later",
    text: "Encrypted data can be copied today and stored until a quantum computer can open it. Medical records, contracts and anything else that must stay private for years is already at risk.",
  },
  {
    label: "Forged signatures",
    text: "Digital signatures prove that a software update, a login or a document is genuine. Once they can be forged, every system that checks them needs new keys, and that changeover takes years.",
  },
];

export default function PqcWhy() {
  return (
    <section className="grid gap-10 lg:grid-cols-[2fr_3fr] lg:items-center">
      <SectionHeading title="What quantum computers change">
        Online banking, messaging, software updates and logins rely on maths
        problems that no ordinary computer can solve in any practical time. A
        large quantum computer could solve some of them quickly. None exists
        yet, but the risk starts before one does.
      </SectionHeading>

      <dl className="flex flex-col gap-4">
        {RISKS.map(({ label, text }) => (
          <div
            key={label}
            className="default-radius border-l-2 border-[var(--brand-primary)] bg-gray-50 p-5"
          >
            <dt className="font-semibold text-gray-800">{label}</dt>
            <dd className="mt-1 text-sm text-gray-600">{text}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
