import Link from "next/link";
import { Suspense } from "react";

/**
 * Shown when an invite link can't be used. Kept deliberately vague about the
 * exact reason — see the note in /invite/route.ts.
 *
 * Only the heading reads `searchParams`, so it alone sits behind a Suspense
 * boundary (cacheComponents); the rest of the page prerenders.
 */
export default function InviteExpiredPage({
  searchParams,
}: {
  searchParams: Promise<{ reason?: string }>;
}) {
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <Suspense
        fallback={
          <h1 className="text-2xl font-semibold text-gray-700">
            This invite link isn&apos;t valid.
          </h1>
        }
      >
        <InviteExpiredHeading searchParams={searchParams} />
      </Suspense>
      <p className="mt-2 text-sm text-gray-600">
        Ask whoever invited you to send a new one, or sign up directly.
      </p>
      <div className="mt-8">
        <Link
          href="/"
          className="default-radius bg-[var(--brand-primary)] px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          Go to Light Rider
        </Link>
      </div>
    </div>
  );
}

async function InviteExpiredHeading({
  searchParams,
}: {
  searchParams: Promise<{ reason?: string }>;
}) {
  const { reason } = await searchParams;

  return (
    <h1 className="text-2xl font-semibold text-gray-700">
      {reason === "expired"
        ? "This invite link has expired."
        : "This invite link isn't valid."}
    </h1>
  );
}
