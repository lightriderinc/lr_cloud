import SectionHeading from "@/components/solutions/SectionHeading";
import {
  GENERAL_LEGAL_DOCS,
  LEGAL_ENTITY,
  LEGAL_PLATFORM_ROWS,
  formatLegalDate,
} from "@/lib/legal";
import type { Metadata } from "next";
import Link from "next/link";
import { MdArrowForward, MdGavel, MdPrivacyTip } from "react-icons/md";

export const metadata: Metadata = {
  title: "Legal | Light Rider Cloud",
  description:
    "Terms of use, privacy policy and platform terms for Light Rider Cloud, Light Rider Quantum, Light Rider Entropy and Light Rider PQC.",
};

const kindIcon = { terms: MdGavel, privacy: MdPrivacyTip } as const;

// The only page that links to platform-specific documents. Layout follows
// adobe.com/legal/licenses-terms.html: the general terms first, then a chart
// of each product and the documents that govern it.
export default function LegalOverviewPage() {
  return (
    <div className="animate-fade-in-up mx-auto flex max-w-5xl flex-col gap-20 py-6">
      <header className="max-w-3xl">
        <p className="mb-2 text-xs font-medium tracking-wider color-brand-primary">
          Light Rider Cloud
        </p>
        <h1 className="hero font-semibold leading-tight text-gray-800">
          Legal
        </h1>
        <p className="mt-4 text-gray-600">
          Your Light Rider Cloud account gives you access to every Light Rider
          platform, so one set of terms covers them all. The General Terms of
          Use and Privacy Policy apply to your account and to Light Rider
          Cloud, Light Rider Quantum, Light Rider Entropy and Light Rider PQC.
        </p>
      </header>

      <section>
        <SectionHeading eyebrow="Applies to every platform" title="General terms" />
        <ul className="grid gap-4 md:grid-cols-2">
          {GENERAL_LEGAL_DOCS.map((doc) => {
            const Icon = kindIcon[doc.kind];
            return (
              <li key={doc.href}>
                <Link
                  href={doc.href}
                  className="group flex h-full flex-col gap-3 border-l-2 border-gray-100 p-4 transition-colors hover:border-[var(--brand-tertiary)]"
                >
                  <Icon className="text-4xl text-gray-200 transition-colors group-hover:text-[var(--brand-tertiary)]" />
                  <h3 className="flex items-center gap-2 font-semibold text-gray-800">
                    {doc.title}
                    <MdArrowForward className="text-gray-300 transition-colors group-hover:text-[var(--brand-primary)]" />
                  </h3>
                  <p className="text-sm text-gray-600">{doc.summary}</p>
                  <p className="mt-auto text-xs text-gray-400">
                    Last updated {formatLegalDate(doc.lastUpdated)}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section>
        <SectionHeading eyebrow="Platform terms" title="Licenses and terms by platform">
          Some platforms have supplemental terms of service and a privacy
          notice with more detail about that platform. They add to the General
          Terms of Use and Privacy Policy, which always apply.
        </SectionHeading>

        <div className="border-t border-gray-100">
          <div className="hidden grid-cols-[1fr_1fr] gap-6 border-b border-gray-100 py-3 text-2xs font-medium uppercase tracking-wider text-gray-300 md:grid">
            <span>Platform</span>
            <span>Licenses and terms</span>
          </div>
          <ul>
            {LEGAL_PLATFORM_ROWS.map((row) => (
              <li
                key={row.name}
                className="grid gap-3 border-b border-gray-100 py-5 md:grid-cols-[1fr_1fr] md:gap-6"
              >
                <div>
                  <p className="font-semibold text-gray-800">{row.name}</p>
                  <p className="mt-1 text-sm text-gray-500">{row.description}</p>
                </div>
                <ul className="flex flex-col gap-2 md:pt-0.5">
                  {row.docs.map((doc) => {
                    const Icon = kindIcon[doc.kind];
                    const label =
                      doc.scope === "general" ? doc.title : doc.navLabel;
                    return (
                      <li key={doc.href}>
                        <Link
                          href={doc.href}
                          className="brand-link inline-flex items-center gap-2 text-sm font-medium"
                        >
                          <Icon className="shrink-0" />
                          {label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-gray-100 pt-10">
        <h2 className="mb-3 text-xl font-semibold text-gray-700">Contact</h2>
        <address className="text-sm not-italic text-gray-600">
          {LEGAL_ENTITY.name}
          {LEGAL_ENTITY.address.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
          <a href={`mailto:${LEGAL_ENTITY.email}`} className="brand-link mt-2 inline-block">
            {LEGAL_ENTITY.email}
          </a>
        </address>
      </section>
    </div>
  );
}
