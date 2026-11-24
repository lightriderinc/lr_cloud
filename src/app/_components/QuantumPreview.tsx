"use client";

import { useRef, useState } from "react";
import { useLiveTicker } from "./useLiveTicker";

// "One program, any machine": the same program is tested on a free simulator,
// then sent to real quantum computers from each maker, one at a time. Names
// and prices match QuantumHardware's list.

const MACHINES = [
  { name: "Simulator", kind: "Runs on ordinary computers", cost: "Free" },
  { name: "IQM Garnet", kind: "Superconducting, 20 qubits", cost: "200 credits" },
  { name: "IonQ Forte-1", kind: "Trapped ions, 36 qubits", cost: "Priced per job" },
  { name: "Rigetti Cepheus-1-108Q", kind: "Superconducting, 108 qubits", cost: "Booked time" },
];

// Ticks spent running on each machine, then showing it as done.
const RUN_TICKS = 30;
const DONE_TICKS = 12;

export default function QuantumPreview() {
  const ref = useRef<HTMLElement>(null);
  const [job, setJob] = useState({ machine: 1, tick: 12 });

  useLiveTicker(ref, 100, () =>
    setJob(({ machine, tick }) =>
      tick + 1 < RUN_TICKS + DONE_TICKS
        ? { machine, tick: tick + 1 }
        : { machine: (machine + 1) % MACHINES.length, tick: 0 },
    ),
  );

  const progress = Math.min(job.tick / RUN_TICKS, 1);
  const done = progress === 1;

  return (
    <figure ref={ref} className="default-radius bg-gray-50 p-6">
      <div className="flex items-baseline justify-between gap-4 text-xs">
        <span className="font-semibold text-gray-700">One program, any machine</span>
        <span className="text-gray-400">live example</span>
      </div>

      <div className="mt-4 flex items-center justify-between gap-4 default-radius bg-gray-800 px-4 py-3 font-mono text-xs">
        <span className="text-white">bell_pair.py</span>
        <span className="text-gray-300">2 qubits, 1,000 shots</span>
      </div>

      <ul className="mt-2 flex flex-col gap-2">
        {MACHINES.map(({ name, kind, cost }, i) => {
          const active = i === job.machine;
          return (
            <li
              key={name}
              className={`relative overflow-hidden default-radius border-l-3 bg-white px-4 py-3 transition-colors duration-500 ${
                active ? "border-[var(--brand-tertiary)]" : "border-transparent"
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-gray-800">{name}</span>
                  <span className="block text-xs text-gray-400">{kind}</span>
                </span>
                <span
                  className={`shrink-0 text-xs ${
                    active ? (done ? "text-green-700" : "text-gray-700") : "text-gray-400"
                  }`}
                >
                  {active ? (done ? "Done" : "Running") : cost}
                </span>
              </div>
              {active && (
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 h-0.5 bg-[var(--brand-tertiary)] opacity-60 transition-[width] duration-100 ease-linear"
                  style={{ width: `${progress * 100}%` }}
                />
              )}
            </li>
          );
        })}
      </ul>
      <figcaption className="sr-only">
        Illustration: one program tested on a free simulator, then run on
        quantum computers from IQM, IonQ and Rigetti.
      </figcaption>
    </figure>
  );
}
