import Link from "next/link";
import Logo from "./Logo";
import AuthenticationSection from "./AuthenticationSection";
import MobileMenu from "./MobileMenu";
import { getSession } from "@/lib/auth/session";

// Server component: reads auth state on the server so the Log in button
// renders only for signed-out visitors, with no client-side flash.
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
        {/* Desktop: account button. Mobile: hamburger that opens the menu. */}
        <div className="hidden lg:block">
          <AuthenticationSection dropdown />
        </div>
        <MobileMenu isAuthenticated={isAuthenticated}>
          <AuthenticationSection />
        </MobileMenu>
      </div>
    </header>
  );
}
