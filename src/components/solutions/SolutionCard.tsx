import type { Solution } from "@/lib/solutions";
import Link from "next/link";
import { MdArrowForward } from "react-icons/md";

// Clickable product summary, styled like PricingNavCard.
export default function SolutionCard({ solution }: { solution: Solution }) {
  const { href, icon: Icon, layer, name, tagline } = solution;

  return (
    <Link
      href={href}
      className="group flex h-full flex-col justify-between gap-6 border border-gray-100 bg-gray-100 p-5 default-radius card-hover-primary"
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <span className="text-2xs font-medium uppercase tracking-wider text-gray-300">
            {layer}
          </span>
          <Icon className="text-4xl text-gray-200 transition-colors duration-150 group-hover:text-[var(--brand-tertiary)]" />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
          <p className="text-sm text-gray-600">{tagline}</p>
        </div>
      </div>

      <span className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 transition-colors group-hover:text-[var(--brand-primary)]">
        Learn more <MdArrowForward />
      </span>
    </Link>
  );
}
