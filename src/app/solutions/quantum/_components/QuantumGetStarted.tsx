import SectionHeading from "@/components/solutions/SectionHeading";
import { productUrl } from "@/lib/solutions";
import { MdArrowOutward } from "react-icons/md";

// Same calls as the platform's Colab quickstart
// (docs/notebooks/quantum-quickstart.ipynb there); the counts are an example.
const PYTHON = `from lightrider import Circuit, get_backend

pair = Circuit(2)
pair.h(0)
pair.cx(0, 1)
pair.measure_all()

sim = get_backend("statevector")
print(sim.run(pair, shots=1000).result().get_counts())
# {'00': 508, '11': 492}`;

const SDK_DOCS_URL = "https://docs.lightriderinc.com/platform/sdk/getting-started.html";

function OutLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="brand-link mt-auto inline-flex items-center gap-1 pt-4 text-sm"
    >
      {children} <MdArrowOutward />
    </a>
  );
}

const card = "flex flex-col default-radius bg-gray-50 p-5";

export default function QuantumGetStarted() {
  return (
    <section>
      <SectionHeading title="Three ways in">
        Whichever you choose, every job you run is saved to one list on your
        account, with its results.
      </SectionHeading>

      <div className="grid gap-4 lg:grid-cols-[2fr_3fr]">
        <div className="flex flex-col gap-4">
          <div className={`${card} flex-1`}>
            <h3 className="font-semibold text-gray-800">Learn the basics</h3>
            <p className="mt-1 text-sm text-gray-600">
              Two short courses in the Classroom, one on ordinary computing
              and one on quantum. Each has hands-on simulators and ends with a
              quiz. No background needed.
            </p>
            <OutLink href={productUrl("quantum", "/classroom")}>Open the Classroom</OutLink>
          </div>

          <div className={`${card} flex-1`}>
            <h3 className="font-semibold text-gray-800">Build in your browser</h3>
            <p className="mt-1 text-sm text-gray-600">
              In the Composer, drag steps onto qubits and watch the expected
              results change as you go. Run the circuit when it looks right,
              or export it for other quantum tools. You don&apos;t need an
              account to start building.
            </p>
            <OutLink href={productUrl("quantum", "/composer")}>Open the Composer</OutLink>
          </div>
        </div>

        <div className={card}>
          <h3 className="font-semibold text-gray-800">Write code</h3>
          <p className="mt-1 text-sm text-gray-600">
            Install with <code className="font-mono text-xs">pip install lightrider</code>.
            Test circuits on a simulator on your own computer, then send them
            to any machine on the platform with an API key.
          </p>
          <pre className="mt-4 overflow-x-auto default-radius bg-gray-800 p-4 font-mono text-xs leading-6 text-gray-200">
            {PYTHON}
          </pre>
          <OutLink href={SDK_DOCS_URL}>Python quickstart</OutLink>
        </div>
      </div>
    </section>
  );
}
