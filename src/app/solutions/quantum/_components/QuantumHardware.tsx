"use client";

import SectionHeading from "@/components/solutions/SectionHeading";
import { productUrl } from "@/lib/solutions";
import { useState } from "react";
import { MdArrowOutward } from "react-icons/md";

// Sources, on the quantum platform: QUANTUM_BACKENDS (src/lib/quantum/backends.ts)
// for per-circuit qubit limits and prices, lib/ionq/client.ts and
// lib/rigetti/client.ts for the simulators, lib/quantum/reservations.ts for
// Cepheus booking. IQM chip sizes and layouts are IQM's published specs (the
// platform reads them live). Rigetti's per-shot rate there is a placeholder,
// and Cepheus runs only in a booked slot, so no per-shot price is quoted.

const TECHNOLOGIES = [
  {
    name: "Superconducting",
    makers: "IQM and Rigetti",
    text: "Tiny electrical circuits on a chip, cooled to a fraction of a degree above absolute zero. Each step takes billionths of a second, so circuits run fast. A qubit can only work directly with its neighbours on the chip, so linking distant qubits takes extra steps, and every step adds a little error.",
  },
  {
    name: "Trapped ions",
    makers: "IonQ",
    text: "Single charged atoms held in place by electric fields and controlled with lasers. Each step is far slower, but tends to be more accurate, and any qubit can work directly with any other, so no extra linking steps are needed.",
  },
];

interface Machine {
  id: string;
  name: string;
  tech: string;
  qubits: string;
  layout: string;
  cost: string;
  practice: string;
  bestFor: string;
  link?: { label: string; path: string };
}

const MACHINES: Machine[] = [
  {
    id: "garnet",
    name: "IQM Garnet",
    tech: "Superconducting",
    qubits: "20",
    layout: "A grid. Each qubit links to up to four neighbours.",
    cost: "$2 per 1,000 shots",
    practice: "A free simulator of Garnet, for circuits of up to 12 qubits.",
    bestFor:
      "Your first runs on real hardware. The Classroom and the platform's examples use Garnet, so your results line up with what you learned.",
  },
  {
    id: "emerald",
    name: "IQM Emerald",
    tech: "Superconducting",
    qubits: "54 on the chip, up to 20 per circuit",
    layout: "A grid, like Garnet's, on a larger chip.",
    cost: "$2 per 1,000 shots",
    practice: "A free simulator of Emerald, for circuits of up to 12 qubits.",
    bestFor:
      "Checking that a result from Garnet holds on a second chip of the same kind, or running when Garnet is busy.",
  },
  {
    id: "sirius",
    name: "IQM Sirius",
    tech: "Superconducting",
    qubits: "16",
    layout:
      "A star. Every qubit links to one shared centre, so any two can be brought together in a single hop.",
    cost: "$2 per 1,000 shots",
    practice: "A free simulator of Sirius, for circuits of up to 12 qubits.",
    bestFor:
      "Circuits where one qubit has to work with many others, such as linking a whole group of qubits together.",
  },
  {
    id: "forte",
    name: "IonQ Forte-1 and Forte Enterprise-1",
    tech: "Trapped ions",
    qubits: "36",
    layout: "Every qubit can work directly with every other.",
    cost: "Priced per job by IonQ. You see the price before you submit.",
    practice:
      "Two free simulators, for circuits of up to 29 qubits: one perfect, and one with Forte's typical errors.",
    bestFor:
      "Circuits where many qubits interact, and work where accuracy matters more than speed or cost. Forte Enterprise-1 is the data-centre edition of the same design.",
  },
  {
    id: "cepheus",
    name: "Rigetti Cepheus-1-108Q",
    tech: "Superconducting",
    qubits: "108",
    layout:
      "Several smaller chips joined into one grid. A live map shows how well each qubit and link scored in the latest calibration, so you can place your circuit on the best ones.",
    cost: "Book 15, 30 or 60 minutes with the machine to yourself, paid upfront.",
    practice: "A free simulator with Cepheus's typical errors, at full size.",
    bestFor:
      "The largest circuits on the platform, and research that needs a quiet machine and up-to-date calibration data.",
    link: { label: "See open slots", path: "/backends/rigetti-cepheus-1-108q?tab=reservation" },
  },
];

function Details({ machine }: { machine: Machine }) {
  const rows = [
    ["Qubits", machine.qubits],
    ["Layout", machine.layout],
    ["Cost", machine.cost],
    ["Practice first", machine.practice],
  ];
  return (
    <>
      <dl className="flex flex-col gap-3 text-sm">
        {rows.map(([label, value]) => (
          <div key={label} className="grid gap-1 sm:grid-cols-[8rem_1fr] sm:gap-4">
            <dt className="text-gray-400">{label}</dt>
            <dd className="text-gray-700">{value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 border-t border-gray-100 pt-4 text-sm text-gray-800">
        <span className="font-semibold">Best for: </span>
        {machine.bestFor}
      </p>
      {machine.link && (
        <a
          href={productUrl("quantum", machine.link.path)}
          target="_blank"
          rel="noopener noreferrer"
          className="brand-link mt-3 inline-flex items-center gap-1 text-sm"
        >
          {machine.link.label} <MdArrowOutward />
        </a>
      )}
    </>
  );
}

export default function QuantumHardware() {
  const [active, setActive] = useState(0);
  const current = MACHINES[active];

  return (
    <section>
      <SectionHeading title="The machines">
        Quantum computers are built in very different ways, and the
        differences show up in your results. Every machine here has a free
        simulator that imitates it, so you can test a circuit before paying to
        run it on the real thing.
      </SectionHeading>

      <dl className="grid gap-4 md:grid-cols-2">
        {TECHNOLOGIES.map(({ name, makers, text }) => (
          <div
            key={name}
            className="default-radius border-l-2 border-[var(--brand-primary)] bg-gray-50 p-5"
          >
            <dt className="flex flex-wrap items-baseline justify-between gap-x-4">
              <span className="font-semibold text-gray-800">{name}</span>
              <span className="text-xs text-gray-500">{makers}</span>
            </dt>
            <dd className="mt-1 text-sm text-gray-600">{text}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-10 grid gap-6 lg:grid-cols-[2fr_3fr]">
        <ul className="flex flex-col gap-1">
          {MACHINES.map((machine, i) => {
            const on = i === active;
            return (
              <li
                key={machine.id}
                className={`default-radius border-l-2 transition-colors ${
                  on
                    ? "border-[var(--brand-primary)] bg-gray-50"
                    : "border-transparent hover:bg-gray-50"
                }`}
              >
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => setActive(i)}
                  className="w-full cursor-pointer px-4 py-3 text-left"
                >
                  <span className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <span className="font-semibold text-gray-800">{machine.name}</span>
                    <span className="text-xs text-gray-500">
                      {machine.tech}, {machine.qubits.split(" ")[0]} qubits
                    </span>
                  </span>
                </button>
                {on && (
                  <div className="px-4 pb-4 lg:hidden">
                    <Details machine={machine} />
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        <div aria-live="polite" className="hidden self-start default-radius bg-gray-50 p-5 lg:block">
          <h3 className="font-semibold text-gray-800">{current.name}</h3>
          <p className="mb-4 text-xs text-gray-500">{current.tech}</p>
          <Details machine={current} />
        </div>
      </div>

      <a
        href={productUrl("quantum", "/backends")}
        target="_blank"
        rel="noopener noreferrer"
        className="brand-link mt-4 inline-flex items-center gap-1 px-4 text-sm"
      >
        Live status and calibration data <MdArrowOutward />
      </a>
    </section>
  );
}
