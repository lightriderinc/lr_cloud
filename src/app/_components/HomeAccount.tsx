import SectionHeading from "@/components/solutions/SectionHeading";
import Link from "next/link";
import { HiGiftTop } from "react-icons/hi2";
import { MdAccountCircle, MdArrowForward, MdSend } from "react-icons/md";
import { PiCoinsFill } from "react-icons/pi";

// What the shared Light Rider Cloud account gives you, each linking to where
// you manage it.
const FEATURES = [
  {
    title: "One sign-in",
    description: "The same login works on every Light Rider solution.",
    href: "/settings/account",
    icon: MdAccountCircle,
  },
  {
    title: "One credit balance",
    description:
      "Buy credits once and spend them on quantum runs and entropy draws.",
    href: "/settings/manage-credits",
    icon: PiCoinsFill,
  },
  {
    title: "Share credits",
    description: "Send credits to teammates and other Light Rider users.",
    href: "/settings/manage-credits/share",
    icon: MdSend,
  },
  {
    title: "Rewards",
    description: "Earn rewards when people you invite get started.",
    href: "/settings/rewards",
    icon: HiGiftTop,
  },
];

export default function HomeAccount() {
  return (
    <section className="grid gap-10 lg:grid-cols-[2fr_3fr] lg:items-center">
      <SectionHeading title="Everything in one account">
        Your login, credits and rewards come with you to every solution.
      </SectionHeading>

      <ul className="grid gap-4 sm:grid-cols-2">
        {FEATURES.map(({ title, description, href, icon: Icon }) => (
          <li key={href}>
            <Link
              href={href}
              className="group flex flex-col justify-between h-full gap-2 border border-gray-100 p-4 transition-colors hover:border-[var(--brand-tertiary)] bg-gray-100 default-radius"
            >
              <Icon className="shrink-0 text-4xl text-gray-200 transition-colors group-hover:text-[var(--brand-tertiary)]" />
              <span className="flex flex-col gap-1">
                <span className="flex items-center gap-2 font-semibold text-gray-800">
                  {title}
                </span>
                <span className="text-sm text-gray-600">{description}</span>
              </span>
              <div className="flex justify-end">
                <MdArrowForward className="text-gray-300 transition-colors text-xl group-hover:text-[var(--brand-primary)]" />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
