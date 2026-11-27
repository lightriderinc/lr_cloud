import {
  GENERAL_LEGAL_DOCS,
  LEGAL_ENTITY,
  formatLegalDate,
  legalScopeName,
  type LegalDoc,
} from "@/lib/legal";
import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

export function legalMetadata(doc: LegalDoc): Metadata {
  return {
    title: `${doc.title} | Light Rider Cloud`,
    description: doc.summary,
  };
}

/**
 * Shell for every legal document: header with scope, title and dates, the MDX
 * body in the gray panel the Quantum/PQC legal pages use, then links to the
 * unified General Terms / Privacy Policy. Platform-specific documents are
 * never linked from here; only the /legal overview links to them.
 */
export default function LegalDocumentPage({
  doc,
  children,
}: {
  doc: LegalDoc;
  children: ReactNode;
}) {
  const isGeneral = doc.scope === "general";
  const related = GENERAL_LEGAL_DOCS.filter((d) => d.href !== doc.href);

  return (
    <div className="animate-fade-in-up mx-auto max-w-4xl">
      <Link
        href="/legal"
        className="mb-8 inline-flex items-center gap-1 text-sm text-gray-400 transition-colors hover:text-gray-800"
      >
        <MdArrowBack /> Legal overview
      </Link>

      <header className="mb-10">
        <p className="mb-2 text-xs font-medium tracking-wider color-brand-primary">
          {isGeneral
            ? "All Light Rider Cloud solutions"
            : `${legalScopeName(doc.scope)} - Supplemental`}
        </p>
        <h1 className="text-3xl font-semibold text-gray-800">{doc.title}</h1>
        <p className="mt-4 max-w-2xl text-sm text-gray-600">{doc.summary}</p>
        <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-xs text-gray-400">
          <div className="flex gap-1">
            <dt>Last updated:</dt>
            <dd className="font-medium text-gray-600">
              <time dateTime={doc.lastUpdated}>
                {formatLegalDate(doc.lastUpdated)}
              </time>
            </dd>
          </div>
          <div className="flex gap-1">
            <dt>Effective:</dt>
            <dd className="font-medium text-gray-600">
              <time dateTime={doc.effective}>
                {formatLegalDate(doc.effective)}
              </time>
            </dd>
          </div>
        </dl>
      </header>

      <article className="bg-gray-50 px-5 py-8 default-radius sm:px-10 sm:py-10">
        {children}
      </article>

      <section className="mt-12">
        <h2 className="mb-4 text-xs font-medium uppercase tracking-wider text-gray-300">
          {isGeneral ? "See also" : "Read together with"}
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2">
          {related.map((d) => (
            <li key={d.href}>
              <Link
                href={d.href}
                className="group flex h-full flex-col gap-1 border-l-2 border-gray-100 p-4 transition-colors hover:border-[var(--brand-tertiary)]"
              >
                <span className="text-xs text-gray-400">All Light Rider platforms</span>
                <span className="flex items-center gap-2 font-semibold text-gray-800">
                  {d.title}
                  <MdArrowForward className="text-gray-300 transition-colors group-hover:text-[var(--brand-primary)]" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-12 text-xs text-gray-400">
        Questions about this document? Contact {LEGAL_ENTITY.name} at{" "}
        <a href={`mailto:${LEGAL_ENTITY.email}`} className="brand-link">
          {LEGAL_ENTITY.email}
        </a>
        .
      </p>
    </div>
  );
}
