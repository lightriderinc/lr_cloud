"use server";

import { cookies } from "next/headers";
import { MOCK_SESSION_COOKIE } from "@/lib/auth/session";
import { MOCK_USER } from "@/lib/mock/user";

// Mock auth actions: sign in/out by setting/clearing the local session cookie
// that getSession() reads. Setting a cookie in a Server Action re-renders the
// current route in the same round trip, so the header, sidebar and settings
// pages update in place.

export async function handleSignIn() {
  // TODO(backend): signIn(logtoConfig) via @logto/next/server-actions
  (await cookies()).set(MOCK_SESSION_COOKIE, MOCK_USER.sub, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function handleSignOut() {
  // TODO(backend): signOut(logtoConfig) via @logto/next/server-actions
  (await cookies()).delete(MOCK_SESSION_COOKIE);
}
