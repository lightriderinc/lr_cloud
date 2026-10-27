import type { ReactNode } from "react";

export default function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="mb-12 max-w-2xl">
      <p className="mb-2 text-xs font-medium tracking-wider color-brand-primary">
        {eyebrow}
      </p>
      <h2 className="text-4xl font-semibold text-gray-700">{title}</h2>
      {children && <p className="mt-4 text-sm text-gray-600">{children}</p>}
    </div>
  );
}
