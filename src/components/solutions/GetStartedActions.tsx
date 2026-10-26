import { handleSignIn } from "@/app/actions/auth";
import LoginButton from "@/components/auth/LoginButton";
import LRLinkButton from "@/components/ui/LRLinkButton";
import { getSession } from "@/lib/auth/session";
import { SOLUTIONS, type SolutionSlug } from "@/lib/solutions";
import { Suspense } from "react";
import { MdArrowForward } from "react-icons/md";

interface GetStartedActionsProps {
  /** On a solution page, signed-in users get a link to launch that platform. */
  solution?: SolutionSlug;
}

// Primary call to action: sign-up for visitors; for signed-in users, launch
// the platform on a solution page or manage credits elsewhere.
// Reads the session cookie, so it streams in behind its own Suspense boundary;
// the fallback reserves the button's space to avoid a layout shift.
export default function GetStartedActions({ solution }: GetStartedActionsProps) {
  return (
    <Suspense fallback={<div className="h-9 w-40" aria-hidden />}>
      <GetStartedButton solution={solution} />
    </Suspense>
  );
}

async function GetStartedButton({ solution }: GetStartedActionsProps) {
  const { isAuthenticated } = await getSession();

  if (!isAuthenticated) {
    return (
      <div>
        <LoginButton onSignIn={handleSignIn} register />
      </div>
    );
  }

  if (solution) {
    return (
      <LRLinkButton href={SOLUTIONS[solution].link} external>
        Launch platform
      </LRLinkButton>
    );
  }

  return (
    <LRLinkButton href="/settings/manage-credits" icon={<MdArrowForward />}>
      Manage credits
    </LRLinkButton>
  );
}
