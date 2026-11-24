import SectionHeading from "@/components/solutions/SectionHeading";

// Each kind of work, with the machines that suit it. Names match
// QuantumHardware's list.
const USE_CASES = [
  {
    title: "Learning and teaching",
    text: "Work through the Classroom, then build the same circuits in the Composer and test them on the free Garnet simulator. Run the finished circuit on IQM Garnet: 1,000 shots cost 200 credits, and students see entanglement in their own results.",
    machines: ["IQM Garnet"],
  },
  {
    title: "Developing algorithms",
    text: "Debug on simulators that copy a machine's errors, then pay only for final runs. If your circuit links many qubits together, IonQ Forte, where any qubit works with any other, and IQM Sirius, with its star layout, avoid the extra linking steps a grid needs, which keeps errors down.",
    machines: ["IonQ Forte", "IQM Sirius"],
  },
  {
    title: "Comparing technologies",
    text: "Send one circuit to a superconducting machine and a trapped-ion one and compare what comes back. Useful when choosing hardware for a project, or measuring how much error each design adds.",
    machines: ["IQM Garnet", "IonQ Forte"],
  },
  {
    title: "Large circuits and hardware research",
    text: "Book Cepheus-1-108Q for circuits beyond 36 qubits, benchmarks and error studies. Check its latest calibration first, then run with no other users' jobs in the way.",
    machines: ["Rigetti Cepheus-1-108Q"],
  },
];

export default function QuantumUseCases() {
  return (
    <section>
      <SectionHeading title="Which machine fits your work" />
      <ul className="grid gap-4 md:grid-cols-2">
        {USE_CASES.map(({ title, text, machines }) => (
          <li key={title} className="flex flex-col default-radius bg-gray-50 p-5">
            <h3 className="font-semibold text-gray-800">{title}</h3>
            <p className="mt-1 text-sm text-gray-600">{text}</p>
            <p className="mt-auto flex flex-wrap items-center gap-2 pt-4">
              <span className="text-xs text-gray-400">Start with</span>
              {machines.map((m) => (
                <span
                  key={m}
                  className="rounded border border-gray-200 bg-white px-2 py-0.5 text-xs text-gray-700"
                >
                  {m}
                </span>
              ))}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
