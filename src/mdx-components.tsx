import type { MDXComponents } from "mdx/types";
import Link from "next/link";

// Global element styles for every .mdx file (required by @next/mdx in the App
// Router). Mirrors the Quantum and PQC apps' mdx-components.tsx, extended with
// paragraph, list and inline styles so the documents don't need <br /> spacers.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => (
      <h1 className="mb-6 text-2xl font-semibold text-gray-700" {...props} />
    ),
    h2: (props) => (
      <h2
        className="mt-12 mb-4 border-t border-gray-100 pt-8 text-xl font-semibold text-gray-700 first:mt-0 first:border-t-0 first:pt-0"
        {...props}
      />
    ),
    h3: (props) => (
      <h3 className="mt-8 mb-3 text-lg font-semibold text-gray-600" {...props} />
    ),
    h4: (props) => (
      <h4 className="mt-6 mb-2 text-sm font-semibold text-gray-700" {...props} />
    ),
    p: (props) => (
      <p className="my-4 text-sm leading-relaxed text-gray-600" {...props} />
    ),
    a: ({ href = "", ...props }) =>
      href.startsWith("/") ? (
        <Link href={href} className="brand-link font-medium" {...props} />
      ) : (
        <a
          href={href}
          className="brand-link font-medium"
          {...(href.startsWith("http")
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          {...props}
        />
      ),
    ul: (props) => (
      <ul
        className="my-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-gray-600 marker:text-gray-300"
        {...props}
      />
    ),
    ol: (props) => (
      <ol
        className="my-4 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-gray-600 marker:text-gray-400"
        {...props}
      />
    ),
    li: (props) => <li className="pl-1" {...props} />,
    strong: (props) => (
      <strong className="font-semibold text-gray-800" {...props} />
    ),
    blockquote: (props) => (
      <blockquote
        className="my-6 border-l-2 border-[var(--brand-tertiary)] bg-white px-4 py-1 default-radius"
        {...props}
      />
    ),
    hr: () => <hr className="my-10 border-gray-100" />,
    code: (props) => (
      <code
        className="default-radius bg-gray-100 px-1 py-0.5 font-mono text-xs text-gray-700"
        {...props}
      />
    ),
    table: ({ children }) => (
      <div className="my-8 overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-100 bg-white text-left text-sm">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="border-b border-gray-100 bg-gray-50">{children}</thead>
    ),
    tbody: ({ children }) => (
      <tbody className="divide-y divide-gray-100">{children}</tbody>
    ),
    tr: ({ children }) => <tr>{children}</tr>,
    th: ({ children }) => (
      <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-4 py-3 align-top text-gray-600">{children}</td>
    ),

    ...components,
  };
}
