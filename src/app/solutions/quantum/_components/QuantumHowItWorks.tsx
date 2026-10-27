import SectionHeading from "@/components/solutions/SectionHeading";

const STEPS = [
  {
    title: "Create an account",
    description: "Sign up and add compute credits to your balance.",
  },
  {
    title: "Choose a backend",
    description: "Pick a simulator or a QPU, and reserve time if you need it.",
  },
  {
    title: "Run circuits",
    description: "Submit jobs from the platform or through the API.",
  },
  {
    title: "Review results",
    description: "Track every job and experiment from your dashboard.",
  },
];

export default function QuantumHowItWorks() {
  return (
    <section>
      <SectionHeading title="From first step to result" />
      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map(({ title, description }, i) => (
          <li key={title} className="bg-gray-50 p-4 pb-6">
            <span className="font-semibold text-sm text-gray-200">
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
