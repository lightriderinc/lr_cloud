import { DOCS_URL } from "@/lib/solutions";
import Image from "next/image";
import { MdArrowOutward } from "react-icons/md";
import GetStartedActions from "./GetStartedActions";

export default function CtaBand() {
  return (
    <section className=" gap-6 bg-gray-800 px-6 py-10 default-radius g:px-10">
      <div className=" flex flex-col mx-auto max-w-7xl md:flex-row md:items-center md:justify-between l">
        <div className="flex flex-col gap-3 ">
          <Image
            src="/lightrider-cloud-logo-white.svg"
            alt="Light Rider Cloud"
            width={239}
            height={18}
          />
          <h2 className="text-2xl font-semibold text-white">
            Start building on the full stack
          </h2>
          <p className="max-w-xl text-sm text-gray-200">
            Pay as you go with compute credits. New accounts get a 1K credit
            bonus on their first purchase.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <GetStartedActions />
          <a
            href={DOCS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-medium text-white transition-colors hover:text-[var(--brand-secondary)]"
          >
            Read the docs <MdArrowOutward />
          </a>
        </div>
      </div>
    </section>
  );
}
