import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { MdArrowOutward } from "react-icons/md";
import { baseClasses, variantClasses, type LRButtonVariant } from "./LRButton";

// A Link styled as an LRButton, for calls to action that navigate rather than
// run an action. External links open in a new tab and get an outward arrow.
export default function LRLinkButton({
  variant = "primary",
  external,
  icon,
  className,
  children,
  ...props
}: ComponentProps<typeof Link> & {
  variant?: LRButtonVariant;
  external?: boolean;
  icon?: ReactNode;
}) {
  const classes = [
    baseClasses,
    variantClasses[variant],
    "gap-2 px-4 py-2",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Link
      className={classes}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      {...props}
    >
      {children}
      {icon ?? (external && <MdArrowOutward />)}
    </Link>
  );
}
