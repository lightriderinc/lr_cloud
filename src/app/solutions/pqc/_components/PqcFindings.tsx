"use client";

import SectionHeading from "@/components/solutions/SectionHeading";
import { productUrl } from "@/lib/solutions";
import { useState } from "react";
import { MdArrowOutward } from "react-icons/md";

type Status = "vulnerable" | "ready" | "key" | "low";

// Labels follow qSearch's own: its "quantum-vulnerable" and "pqc-ready"
// classifications, its "Private key" alert, and its low risk level.
const STATUS: Record<Status, { label: string; className: string, onClass: string; rowBorder: string }> = {
  vulnerable: { label: "Quantum-vulnerable", className: "bg-red-50 text-red-600 border border-red-50 group-hover:border-red-300", onClass: "border-red-300", rowBorder: "border-red-500" },
  key: { label: "Private key", className: "bg-red-50 text-red-600 border border-red-50 group-hover:border-red-300", onClass: "border-red-300", rowBorder: "border-red-500" },
  ready: { label: "PQC-ready", className: "bg-green-50 text-green-700 border border-green-50 group-hover:border-green-400", onClass: "border-green-400", rowBorder: "border-green-500" },
  low: { label: "Low risk", className: "bg-gray-100 text-gray-600 border border-gray-100 group-hover:border-gray-200", onClass: "border-gray-200", rowBorder: "border-gray-200" },
};

// A made-up project, simplified from the shape of a real qSearch result.
const FINDINGS: {
  algorithm: string;
  asset: string;
  use: string;
  status: Status;
  meaning: string;
  action: string;
}[] = [
  {
    algorithm: "ECDH P-256",
    asset: "config/tls.conf:8",
    use: "Sets up encrypted connections",
    status: "vulnerable",
    meaning:
      "Agrees the key that encrypts traffic between your server and its users. Anyone recording that traffic today could decrypt it once a large quantum computer exists.",
    action:
      "Switch to a hybrid key exchange such as X25519MLKEM768. Current browsers already support it.",
  },
  {
    algorithm: "RSA-2048",
    asset: "src/auth/tokens.py:14",
    use: "Signs login tokens",
    status: "vulnerable",
    meaning:
      "Signs the tokens that keep users logged in. A quantum computer could work out the private key from the public one and issue tokens of its own.",
    action:
      "Plan a move to ML-DSA signatures. Recorded data isn't at stake here, so this can follow your key exchange work.",
  },
  {
    algorithm: "RSA private key",
    asset: "deploy/server.key",
    use: "Stored in the repository",
    status: "key",
    meaning:
      "A private key saved alongside the code. Anyone who can read the repository can use it, with or without a quantum computer.",
    action: "Replace the key, then remove it from the repository and its history.",
  },
  {
    algorithm: "AES-256-GCM",
    asset: "src/storage/encrypt.py:31",
    use: "Encrypts stored files",
    status: "low",
    meaning:
      "Encrypts data with a key that is kept secret on both sides. Quantum computers weaken this kind of encryption only slightly, and a 256-bit key stays strong.",
    action: "Nothing to change.",
  },
  {
    algorithm: "ML-KEM-768",
    asset: "src/vault/keys.py:52",
    use: "Exchanges encryption keys",
    status: "ready",
    meaning: "Already uses the new NIST standard for exchanging keys.",
    action: "Nothing to change. qSearch counts these so you can track progress.",
  },
];

function Detail({ meaning, action }: { meaning: string; action: string }) {
  return (
    <>
      <p className="text-sm text-gray-600">{meaning}</p>
      <p className="mt-3 text-sm text-gray-800">
        <span className="font-semibold">What to do: </span>
        {action}
      </p>
    </>
  );
}

export default function PqcFindings() {
  const [active, setActive] = useState(0);
  const current = FINDINGS[active];

  return (
    <section>
      <SectionHeading title="What a scan tells you">
        An example scan of a small web app. Select a finding to see what it
        means and what to do about it.
      </SectionHeading>

      <div className="grid gap-6 lg:grid-cols-[3fr_2fr]">
        <ul className="flex flex-col gap-1">
          {FINDINGS.map(({ algorithm, asset, use, status, meaning, action }, i) => {
            const on = i === active;
            const badge = STATUS[status];
            return (
              <li key={asset}>
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className={`w-full cursor-pointer default-radius border-l-3 px-4 py-3 text-left transition-colors group ${
                    on
                      ? `${badge.rowBorder} bg-gray-50`
                      : "border-transparent hover:bg-gray-50"
                  }`}
                >
                  <span className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
                    <span className="font-semibold text-gray-800">{algorithm}</span>
                    <span
                      className={`rounded uppercase px-2 py-0.5 text-xs font-semibold ${badge.className} ${on ? badge.onClass : ""}`}
                    >
                      {badge.label}
                    </span>
                  </span>
                  <span className="mt-1 flex flex-col gap-x-3 text-xs sm:flex-row">
                    <span className="text-gray-600">{use}</span>
                    <span className="break-all font-mono text-gray-400">{asset}</span>
                  </span>
                  {on && (
                    <span className="mt-3 block lg:hidden">
                      <Detail meaning={meaning} action={action} />
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        <div aria-live="polite" className="hidden self-start default-radius bg-gray-50 p-5 lg:block">
          <h3 className="font-semibold text-gray-800">{current.algorithm}</h3>
          <p className="mb-3 font-mono text-xs text-gray-400">{current.asset}</p>
          <Detail meaning={current.meaning} action={current.action} />
        </div>
      </div>

      <a
        href={productUrl("pqc", "/qsearch")}
        target="_blank"
        rel="noopener noreferrer"
        className="brand-link mt-4 inline-flex items-center gap-1 px-4 text-sm"
      >
        Scan your own code <MdArrowOutward />
      </a>
    </section>
  );
}
