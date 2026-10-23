import type { ReactNode } from "react";

export default function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="mb-8 max-w-2xl">
      <p className="mb-2 text-2xs font-medium uppercase tracking-wider color-brand-primary">
        {eyebrow}
      </p>
      <h2 className="text-2xl font-semibold text-gray-700">{title}</h2>
      {children && <p className="mt-2 text-sm text-gray-600">{children}</p>}
    </div>
  );
}
