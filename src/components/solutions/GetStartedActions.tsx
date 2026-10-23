import { handleSignIn } from "@/app/actions/auth";
import LoginButton from "@/components/auth/LoginButton";
import LRLinkButton from "@/components/ui/LRLinkButton";
import { getSession } from "@/lib/auth/session";
import { Suspense } from "react";
import { MdArrowForward } from "react-icons/md";

// Primary call to action: sign-up for visitors, credits for signed-in users.
// Reads the session cookie, so it streams in behind its own Suspense boundary;
// the fallback reserves the button's space to avoid a layout shift.
export default function GetStartedActions() {
  return (
    <Suspense fallback={<div className="h-9 w-40" aria-hidden />}>
      <GetStartedButton />
    </Suspense>
  );
}

async function GetStartedButton() {
  const { isAuthenticated } = await getSession();

  if (!isAuthenticated) {
    return (
      <div>
        <LoginButton onSignIn={handleSignIn} register />
      </div>
    );
  }

  return (
    <LRLinkButton href="/settings/manage-credits" icon={<MdArrowForward />}>
      Manage credits
    </LRLinkButton>
  );
}
