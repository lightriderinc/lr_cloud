import SectionHeading from "@/components/solutions/SectionHeading";

// Mirrors SITE_SOURCES in the entropy platform (src/lib/entropy/modes.ts):
// only sources offered there, plus its "coming soon" ones. Public beacons and
// host RNGs are hidden on the platform, so they are not listed here either.
const SOURCES = [
  {
    name: "ANU Quantum RNG",
    kind: "Measures random flickers of light in a vacuum",
  },
  {
    name: "Cisco Outshift QRNG",
    kind: "Quantum random number generator in the cloud",
  },
  { name: "QiSpace TQRND", kind: "Quantum random number generator" },
  { name: "IQM Resonance", kind: "Superconducting quantum computer" },

  {
    name: "Light Rider QEC (IQM)",
    kind: "The same IQM hardware, with Light Rider error correction",
  },
  {
    name: "Rigetti Cepheus-1-108Q",
    kind: "108-qubit superconducting quantum computer",
  },
  { name: "IonQ (Coming soon)", kind: "Trapped ion quantum computer" },
];

const COMING_SOON = "IBM quantum computers";

const WAYS_TO_DRAW = [
  {
    title: "A preset pool",
    text: "Pick an available pool and let it choose the devices.",
  },
  {
    title: "One source",
    text: "Draw from a single source of your choice.",
  },
  {
    title: "Your own blend",
    text: "Combine up to 8 sources of your choice.",
  },
];

export default function EntropySources() {
  return (
    <section>
      <SectionHeading title="Choose where your randomness comes from">
        <span className="text-lg">
          Let a pool pick the devices, or choose them yourself.
        </span>
      </SectionHeading>

      <div className="grid gap-10 lg:grid-cols-2">
        <ul className="flex flex-col gap-6">
          {WAYS_TO_DRAW.map(({ title, text }) => (
            <li key={title}>
              <h3 className="font-semibold text-gray-800">{title}</h3>
              <p className="mt-1 text-sm text-gray-600">{text}</p>
            </li>
          ))}
        </ul>

        <div className="default-radius bg-gray-50 p-5">
          <h3 className="text-md font-semibold text-gray-400">
            Available Sources
          </h3>
          <ul className="mt-3 divide-y divide-gray-100">
            {SOURCES.map(({ name, kind }) => (
              <li
                key={name}
                className="flex flex-col gap-0.5 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
              >
                <span className="text-sm font-medium text-gray-800">
                  {name}
                </span>
                <span className="text-xs text-gray-500 sm:text-right">
                  {kind}
                </span>
              </li>
            ))}
          </ul>
          {/* <div className="mt-2 flex flex-wrap items-center justify-between gap-2 border-t border-gray-100 pt-3">
            <span className="text-xs text-gray-500">Coming soon: {COMING_SOON}</span>
            <a
              href={productUrl("entropy", "/sources")}
              target="_blank"
              rel="noopener noreferrer"
              className="brand-link inline-flex items-center gap-1 text-sm"
            >
              Live availability <MdArrowOutward />
            </a>
          </div> */}
        </div>
      </div>
    </section>
  );
}
