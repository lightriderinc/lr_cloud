import SectionHeading from "@/components/solutions/SectionHeading";
import { productUrl } from "@/lib/solutions";
import { MdArrowOutward } from "react-icons/md";

// The apps on the PQC platform's Applications page (ApplicationsGrid there),
// named as their windows title them. They open as modals with no URL of their
// own, so the section links to the page as a whole.
const GROUPS = [
  {
    label: "See the risk",
    apps: [
      {
        title: "Harvest Now, Decrypt Later",
        text: "Two people agree on a key while an eavesdropper records it. Attack the recording: today's method, shrunk to a size a laptop can crack, gives up the message in seconds, and ML-KEM doesn't. A quick way to show a team why this matters.",
      },
      {
        title: "Token Forgery Check",
        text: "Paste a login token to see whether a quantum computer could forge it. Then see the post-quantum version, and whether it still fits in a cookie or request header.",
      },
    ],
  },
  {
    label: "Put it to use",
    apps: [
      {
        title: "Quantum Vault",
        text: "Make a key from a randomness source you choose, quantum ones included, and send someone a password or API key that only they can open.",
      },
      {
        title: "Quantum-Safe Signer",
        text: "Sign a statement or release note with ML-DSA. Anyone can then check that it came from you and wasn't changed.",
      },
      {
        title: "Secret Split",
        text: "Lock a secret so that a set number of people, such as any 3 of 5, must come together to open it. Made for root passwords and recovery keys no one person should hold.",
      },
    ],
  },
  {
    label: "Test your own work",
    apps: [
      {
        title: "PQC Speed Test",
        text: "Time the new methods against today's on your own device, and compare the size of their keys and signatures before you choose one.",
      },
      {
        title: "PQC Compatibility Check",
        text: "Building ML-KEM or ML-DSA into your product? Answer fresh challenges with your code to confirm it gives the same results as a reference version.",
      },
    ],
  },
];

export default function PqcApplications() {
  return (
    <section>
      <SectionHeading title="Try the new standards">
        Seven tools that run in your browser. Nothing to install, and your keys
        and secrets stay on your device.
      </SectionHeading>

      <div className="grid gap-10 lg:grid-cols-3">
        {GROUPS.map(({ label, apps }) => (
          <div key={label}>
            <h3 className="text-md font-semibold text-gray-400">{label}</h3>
            <ul className="mt-3 flex flex-col gap-6">
              {apps.map(({ title, text }) => (
                <li key={title}>
                  <h4 className="font-semibold text-gray-800">{title}</h4>
                  <p className="mt-1 text-sm text-gray-600">{text}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <a
        href={productUrl("pqc", "/applications")}
        target="_blank"
        rel="noopener noreferrer"
        className="brand-link mt-8 inline-flex items-center gap-1 text-sm"
      >
        Open the applications <MdArrowOutward />
      </a>
    </section>
  );
}
