import { SOLUTION_LIST } from "@/lib/solutions";
import Link from "next/link";
import { Fragment } from "react";
import { MdArrowForward, MdArrowUpward } from "react-icons/md";

// What each platform hands to the layer above it, keyed by the lower layer.
const HANDOFFS: Record<string, string> = {
  entropy: "QPUs and QEC supply quantum entropy sources",
  pqc: "Verified entropy seeds post-quantum keys",
};

// The solution stack drawn top-down: your applications, the three platforms,
// then the shared Light Rider Cloud account they all run on.
export default function StackDiagram() {
  const layers = [...SOLUTION_LIST].reverse();

  return (
    <div className="flex flex-col">
      <div className="border border-dashed border-gray-200 px-5 py-4 text-sm text-gray-500 default-radius">
        <span className="font-medium text-gray-700">Applications: </span>
        <span className="block sm:inline">
          Encryption, AI and synthetic data, research, games, and more
        </span>
      </div>

      {layers.map(({ slug, href, icon: Icon, layer, summary }) => (
        <Fragment key={slug}>
          <Connector />
          <Link
            href={href}
            className="group flex items-start gap-4 border border-gray-100 bg-gray-100 px-5 py-4 default-radius card-hover-primary"
          >
            <Icon className="shrink-0 text-3xl text-gray-300 transition-colors group-hover:text-[var(--brand-tertiary)]" />
            <div className="min-w-0 flex-1">
              <span className="font-semibold text-gray-800">{layer}</span>
              <p className="mt-1 hidden text-xs text-gray-500 md:block">
                {summary}
              </p>
            </div>
            <div className="flex flex-col justify-end h-full">
              <MdArrowForward className="shrink-0 text-xl text-gray-300 transition-colors group-hover:text-[var(--brand-primary)]" />
            </div>
          </Link>
          {HANDOFFS[slug] && <Connector label={HANDOFFS[slug]} />}
        </Fragment>
      ))}

      <Connector />
      <div className="bg-gray-800 px-5 py-4 text-sm text-gray-100 default-radius">
        <span className="font-medium text-white">Light Rider Cloud: </span>
        <span className="block text-gray-200 sm:inline">
          Shared resources through a single account
        </span>
      </div>
    </div>
  );
}

// Vertical joint between layers. A label marks a handoff upward, so the line
// is drawn in the brand colour.
function Connector({ label }: { label?: string }) {
  return (
    <div className="flex items-center gap-3 pl-8">
      <span
        className={`h-6 w-0.5 ${
          label ? "bg-linear-to-t from-gray-100 to-[var(--brand-tertiary)]" : "bg-gray-100"
        }`}
      />
      {label && (
        <span className="text-xs text-gray-400 inline-flex items-center gap-2">
          <MdArrowUpward />
          {label}
        </span>
      )}
    </div>
  );
}
