import type { ReactNode } from "react";

// Full-bleed hero over the LR grid backdrop. The negative margins cancel
// <main>'s padding so the backdrop and bottom border reach the edges.
export default function PageHero({ children, centered }: { children: ReactNode; centered?: boolean }) {
  return (
    <section className={`relative isolate -mx-4 -mt-6 overflow-hidden  ${centered ? "items-center justify-center text-center px-4 pt-20 pb-24 lg:-mx-8 lg:px-8 lg:pt-40 lg:pb-50" : "px-4 pt-12 pb-14 lg:-mx-8 lg:px-8 lg:pt-20 lg:pb-20"}`}>
      {/* <Image
        src="/LR-grid-bg.svg"
        alt=""
        aria-hidden="true"
        width={3673}
        height={2955}
        priority
        className="pointer-events-none absolute top-0 -right-24 -z-10 hidden h-full min-h-[480px] w-auto select-none opacity-60 md:block"
      /> */}
      <div className={`mx-auto flex max-w-7xl flex-col gap-6 ${centered ? "items-center" : ""}`}>
        {children}
      </div>
      {/* Bottom border that fades out toward the edges. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 bg-linear-to-r from-transparent via-gray-50 to-transparent"
      />
    </section>
  );
}
