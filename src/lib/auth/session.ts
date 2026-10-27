import { cookies } from "next/headers";
import { cache } from "react";
import { MOCK_USER } from "@/lib/mock/user";

/**
 * Mock session lookup until the account management backend (Logto) is wired
 * up in this app.
 *
 * The session is a local httpOnly cookie that the mock handleSignIn /
 * handleSignOut actions (@/app/actions/auth) set and clear; its value is the
 * signed-in user's id. Same import path and return shapes as the cloud
 * platform's session module (a subset of Logto's LogtoContext), so callers
 * keep working unchanged when this file is replaced with the Logto-backed
 * version.
 *
 * Reads a request cookie, so with cacheComponents every caller must render
 * inside a <Suspense> boundary.
 */
export const MOCK_SESSION_COOKIE = "lr_mock_session";

export type MockSession = {
  isAuthenticated: boolean;
  claims?: { sub: string; name?: string; email?: string };
  userInfo?: { name?: string; email?: string; picture?: string | null };
};

export const getSession = cache(async (): Promise<MockSession> => {
  // TODO(backend): getLogtoContext(logtoConfig, { fetchUserInfo: true })
  const sub = (await cookies()).get(MOCK_SESSION_COOKIE)?.value;
  if (sub !== MOCK_USER.sub) return { isAuthenticated: false };
  return {
    isAuthenticated: true,
    claims: { sub: MOCK_USER.sub, name: MOCK_USER.name, email: MOCK_USER.email },
    userInfo: { name: MOCK_USER.name, email: MOCK_USER.email, picture: MOCK_USER.picture },
  };
});

export type SessionOutcome = {
  isAuthenticated: boolean;
  /** True when the session state could not be determined (e.g. Logto unreachable). */
  indeterminate: boolean;
};

export const getSessionOutcome = cache(async (): Promise<SessionOutcome> => {
  const { isAuthenticated } = await getSession();
  return { isAuthenticated, indeterminate: false };
});

export const getDisplayName = cache(async (): Promise<string | null> => {
  const { isAuthenticated, userInfo } = await getSession();
  return isAuthenticated ? (userInfo?.name ?? null) : null;
});
