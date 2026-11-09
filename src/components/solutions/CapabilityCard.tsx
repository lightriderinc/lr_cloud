import type { IconType } from "react-icons";
import { MdArrowOutward } from "react-icons/md";

export interface Capability {
  title: string;
  description: string;
  icon: IconType;
  /** The matching page on the product's own site (see productUrl). */
  href: string;
}

// One "What you can do" card on a /solutions/* page. Links out to the product
// site, so it opens in a new tab like the "Launch platform" button does.
export default function CapabilityCard({
  title,
  description,
  icon: Icon,
  href,
}: Capability) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col gap-3 border border-gray-50 bg-gray-50 p-5 default-radius card-hover-primary"
    >
      <div className="flex items-start justify-between">
        <Icon className="text-2xl text-[var(--brand-tertiary)]" />
        <MdArrowOutward className="text-gray-300 transition-colors group-hover:text-[var(--brand-primary)]" />
      </div>
      <h3 className="font-semibold text-gray-800">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </a>
  );
}
