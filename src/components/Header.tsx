import Link from "next/link";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import { getSession } from "@/lib/auth/session";

// Account controls (AccountControl, BalanceChip) slot in to the right of the
// header once auth and billing are ported from the entropy platform.
export default async function Header() {
  const { isAuthenticated } = await getSession();

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-gray-100 px-4">
      <div className="flex items-center gap-2">
        <Link href="/" aria-label="Light Rider Cloud home">
          <Logo />
        </Link>
      </div>

      <div className="flex items-center gap-1 mr-2">
        <MobileMenu isAuthenticated={isAuthenticated} />
      </div>
    </header>
  );
}
