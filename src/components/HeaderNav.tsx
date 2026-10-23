"use client";

import { DOCS_URL, MAIN_NAV } from "@/lib/solutions";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdArrowOutward } from "react-icons/md";

const itemClasses =
  "flex h-14 items-center gap-1 border-b-2 px-3 text-sm transition-colors";

// Desktop main navigation. On mobile the same MAIN_NAV entries are listed in
// the MobileMenu panel instead.
export default function HeaderNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Main" className="ml-6 hidden h-14 items-center lg:flex">
      {MAIN_NAV.map(({ label, href }) => {
        const active =
          href === "/"
            ? pathname === "/"
            : pathname === href || pathname.startsWith(`${href}/`);
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={`${itemClasses} ${
              active
                ? "border-[var(--brand-primary)] font-medium text-[var(--brand-primary)] pt-2"
                : "border-transparent font-medium text-gray-400 hover:text-gray-800 pt-2"
            }`}
          >
            {label}
          </Link>
        );
      })}
      <a
        href={DOCS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`${itemClasses} border-transparent font-medium text-gray-400 pt-2 hover:text-gray-800`}
      >
        Docs <MdArrowOutward />
      </a>
    </nav>
  );
}
