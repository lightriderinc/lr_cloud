import SectionHeading from "@/components/solutions/SectionHeading";

const USE_CASES = [
  {
    title: "Encryption keys and secrets",
    text: "Create keys, tokens and passwords from quantum sources, with a record of what produced each one. Light Rider PQC uses this service for its post-quantum keys.",
  },
  {
    title: "Draws people need to trust",
    text: "Raffles, giveaways, lotteries and random audit samples. Publish the result with its receipt, and anyone can check when it was drawn and that it wasn't changed afterwards.",
  },
  {
    title: "Simulations and AI training",
    text: "Seed simulations and model training runs from a named source, and file the receipt with your results so each run is documented.",
  },
  {
    title: "Audits and compliance",
    text: "Give auditors a signed history of every draw, covering source, size, time and health checks, without anyone storing the numbers themselves.",
  },
];

export default function EntropyUseCases() {
  return (
    <section>
      <SectionHeading title="Where it's used" />
      <ul className="grid gap-4 md:grid-cols-2">
        {USE_CASES.map(({ title, text }) => (
          <li key={title} className="default-radius bg-gray-50 p-5">
            <h3 className="font-semibold text-gray-800">{title}</h3>
            <p className="mt-1 text-sm text-gray-600">{text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
