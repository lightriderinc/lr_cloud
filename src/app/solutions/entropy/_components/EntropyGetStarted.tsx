import SectionHeading from "@/components/solutions/SectionHeading";
import { productUrl } from "@/lib/solutions";
import { MdArrowOutward } from "react-icons/md";

// Same calls as the platform's Python quickstart (src/lib/developers/snippets.ts).
const PYTHON = `import lightrider as lr

r = lr.entropy.get(32, source="anu")
print(r.hex)

assert lr.entropy.verify(r.receipt)`;

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

export default function EntropyGetStarted() {
  return (
    <section>
      <SectionHeading title="Two ways to start">
        1 credit ($0.01) buys 256 random bytes, and a failed draw costs
        nothing.
      </SectionHeading>

      <div className="grid gap-4 lg:grid-cols-[2fr_3fr]">
        <div className="flex flex-col default-radius bg-gray-50 p-5">
          <h3 className="font-semibold text-gray-800">In your browser</h3>
          <p className="mt-1 text-sm text-gray-600">
            No code needed. Choose a pool or sources, set how many bytes you
            want, and copy the result. Your receipts are saved to your account,
            where you can verify each signature with one click.
          </p>
          <OutLink href={productUrl("entropy", "/entropy")}>Open the console</OutLink>
        </div>

        <div className="flex flex-col default-radius bg-gray-50 p-5">
          <h3 className="font-semibold text-gray-800">From your code</h3>
          <p className="mt-1 text-sm text-gray-600">
            Install with <code className="font-mono text-xs">pip install lightrider</code>,
            or call the API from any language. Up to 4,096 bytes per request.
          </p>
          <pre className="mt-4 overflow-x-auto default-radius bg-gray-800 p-4 font-mono text-xs leading-6 text-gray-200">
            {PYTHON}
          </pre>
          <OutLink href={productUrl("entropy", "/developers")}>Developer quickstart</OutLink>
        </div>
      </div>
    </section>
  );
}
