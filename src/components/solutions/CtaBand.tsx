import { DOCS_URL } from "@/lib/solutions";
import Image from "next/image";
import Link from "next/link";
import { connection } from "next/server";
import { Suspense } from "react";
import { MdArrowOutward } from "react-icons/md";
import GetStartedActions from "./GetStartedActions";

const FOOTER_LEGAL_LINKS = [
  { label: "Terms of Use", href: "/legal/terms" },
  { label: "Privacy Policy", href: "/legal/privacy" },
  { label: "Legal", href: "/legal" },
];

async function CopyrightYear() {
  await connection();
  return <>{new Date().getFullYear()}</>;
}

export default function CtaBand() {
  return (
    <section className="bg-gray-800 px-6 pt-10 pb-2 default-radius g:px-10">
      <div className="flex flex-col gap-8 mx-auto max-w-7xl md:flex-row md:items-center md:justify-between mb-16">
        <div className="flex flex-col gap-3">
          <Image
            src="/lightrider-cloud-logo-white.svg"
            alt="Light Rider Cloud"
            width={239}
            height={18}
            className="mb-6"
          />
          <h2 className="text-2xl font-semibold text-white">
            Start building on Light Rider Cloud
          </h2>
          <p className="max-w-xl text-sm text-gray-200">
            Pay as you go with compute credits. New accounts get a 1K credit
            bonus on their first purchase.
          </p>
        </div>

        <div className="flex flex-wrap items-center self-end gap-4">
          <GetStartedActions />
          <a
            href={DOCS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-medium text-white transition-colors hover:text-[var(--brand-tertiary)]"
          >
            Read the docs <MdArrowOutward />
          </a>
        </div>
      </div>
      <div className="flex flex-row flex-wrap gap-x-6 gap-y-2 mx-auto max-w-7xl md:flex-row md:items-center md:justify-between border-t border-gray-600 py-4">
        <span className="text-xs text-gray-200">
          ©{" "}
          <Suspense fallback={<span className="inline-block w-[4ch]" />}>
            <CopyrightYear />
          </Suspense>{" "}
          Light Rider. All rights reserved.
        </span>
        <nav aria-label="Legal" className="ml-auto flex flex-wrap gap-x-6 gap-y-1">
          {FOOTER_LEGAL_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="text-xs text-gray-200 transition-colors hover:text-[var(--brand-tertiary)]"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
