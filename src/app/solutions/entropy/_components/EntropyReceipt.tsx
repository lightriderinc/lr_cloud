"use client";

import SectionHeading from "@/components/solutions/SectionHeading";
import { productUrl } from "@/lib/solutions";
import { useState } from "react";
import { MdArrowOutward } from "react-icons/md";

type FieldKey = "sources" | "bytes" | "checks" | "time" | "commitment" | "signature";

// A shortened example in the shape of a real platform receipt (EntropyReceipt
// in the entropy platform's src/lib/entropy/generate.ts). Values are made up.
const LINES: { text: string; field?: FieldKey }[] = [
  { text: "{" },
  { text: '  "request_id": "req_7c41e09a",' },
  { text: '  "contributing_sources": ["anu_aws_001", "cisco_qrng_001"],', field: "sources" },
  { text: '  "output_bytes": 64,', field: "bytes" },
  { text: '  "rct_pass": true,', field: "checks" },
  { text: '  "apt_pass": true,', field: "checks" },
  { text: '  "timestamp_unix_ns": 1795262400417203968,', field: "time" },
  { text: '  "output_commitment": "sha256:4be1d07a…9f02",', field: "commitment" },
  { text: '  "signature_alg": "Ed25519",', field: "signature" },
  { text: '  "signature": "c93a6f18…5d1e"', field: "signature" },
  { text: "}" },
];

const FIELDS: { key: FieldKey; label: string; text: string }[] = [
  {
    key: "sources",
    label: "Sources",
    text: "The devices that supplied your randomness, by name.",
  },
  {
    key: "bytes",
    label: "Size",
    text: "How many random bytes you received.",
  },
  {
    key: "checks",
    label: "Health checks",
    text: "Both standard tests passed, so the devices weren't stuck or drifting when your bytes were made.",
  },
  {
    key: "time",
    label: "Time",
    text: "When the draw happened, down to the nanosecond.",
  },
  {
    key: "commitment",
    label: "Fingerprint",
    text: "Ties this receipt to your exact bytes without revealing them. Show the bytes later and anyone can confirm they are the ones this receipt was issued for.",
  },
  {
    key: "signature",
    label: "Signature",
    text: "Light Rider's digital seal. Change any field and the check fails. Verify it on the platform, with the Python SDK, or against our public key.",
  },
];

export default function EntropyReceipt() {
  const [active, setActive] = useState<FieldKey>("sources");

  return (
    <section>
      <SectionHeading title="A receipt for every draw">
        Each draw comes with a signed record of how it was made. The receipt
        never contains your random bytes, so you can store it or hand it to
        someone else. Light Rider keeps your receipts; the bytes stay with you.
      </SectionHeading>

      <div className="grid gap-6 lg:grid-cols-[3fr_2fr]">
        <figure className="flex flex-col gap-2">
          <pre
            aria-label="Example receipt"
            className="overflow-x-auto default-radius bg-gray-800 py-4 font-mono text-xs leading-6 text-gray-200"
          >
            {LINES.map(({ text, field }, i) => {
              const on = field === active;
              return (
                <span
                  key={i}
                  className={`block border-l-2 px-4 transition-colors ${
                    on
                      ? "border-[var(--brand-tertiary)] bg-white/10 text-white"
                      : "border-transparent"
                  }`}
                >
                  {text}
                </span>
              );
            })}
          </pre>
          <figcaption className="text-xs text-gray-400">
            Example receipt, shortened. Real receipts carry a few more
            technical details.
          </figcaption>
        </figure>

        <div className="flex flex-col gap-1">
          {FIELDS.map(({ key, label, text }) => {
            const on = key === active;
            return (
              <button
                key={key}
                type="button"
                aria-pressed={on}
                onClick={() => setActive(key)}
                onMouseEnter={() => setActive(key)}
                onFocus={() => setActive(key)}
                className={`cursor-pointer default-radius px-4 py-3 text-left transition-colors ${
                  on ? "bg-gray-50" : "hover:bg-gray-50"
                }`}
              >
                <span
                  className={`text-sm font-semibold ${
                    on ? "text-[var(--brand-primary)]" : "text-gray-800"
                  }`}
                >
                  {label}
                </span>
                {on && (
                  <span className="mt-1 block text-sm text-gray-600">{text}</span>
                )}
              </button>
            );
          })}
          <a
            href={productUrl("entropy", "/receipts")}
            target="_blank"
            rel="noopener noreferrer"
            className="brand-link mt-3 inline-flex items-center gap-1 px-4 text-sm"
          >
            See your receipts <MdArrowOutward />
          </a>
        </div>
      </div>
    </section>
  );
}
