import { getSession } from "@/lib/auth/session";
import Link from "next/link";
import { Suspense } from "react";
import AuthenticationSection from "./AuthenticationSection";
import HeaderNav from "./HeaderNav";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";

// The header shell is static; only the account controls read the session, so
// they stream in behind their own Suspense boundary (required for request
// reads with cacheComponents).
export default function Header() {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-gray-100 px-4">
      <div className="flex items-center gap-2">
        <Link href="/" aria-label="Light Rider Cloud home">
          <Logo />
        </Link>
      </div>

      <div className="flex items-center gap-12 mr-2">
        <HeaderNav />

        <Suspense fallback={null}>
          <HeaderAccount />
        </Suspense>
      </div>
    </header>
  );
}

// Server component: reads auth state on the server so the Log in button
// renders only for signed-out visitors, with no client-side flash.
async function HeaderAccount() {
  const { isAuthenticated } = await getSession();

  return (
    <>
      {/* Desktop: account button. Mobile: hamburger that opens the menu. */}
      <div className="hidden lg:block">
        <AuthenticationSection dropdown />
      </div>
      <MobileMenu isAuthenticated={isAuthenticated}>
        <AuthenticationSection />
      </MobileMenu>
    </>
  );
}
