import type { ReactNode } from "react";

export default function SectionHeading({
  eyebrow,
  title,
  children,
  centered,
}: {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
  centered?: boolean;
}) {
  return (
    <div className={`mb-12 max-w-2xl ${centered ? "flex flex-col items-center justify-center text-center" : ""}`}>
      <p className="mb-2 text-xs font-medium tracking-wider color-brand-primary">
        {eyebrow}
      </p>
      <h2 className="text-4xl font-semibold text-gray-700">{title}</h2>
      {children && <p className="mt-4 text-sm text-gray-600">{children}</p>}
    </div>
  );
}
