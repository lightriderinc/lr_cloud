import { cache } from "react";

/**
 * Placeholder session lookup until Logto auth is wired up in this app.
 *
 * Same import path and return shape as the entropy platform's getSession
 * (a subset of Logto's LogtoContext), so the header and sidebars can call it
 * today and pick up real session data when this file is replaced with the
 * Logto-backed version. Always reports signed out.
 */
export const getSession = cache(
  async (): Promise<{ isAuthenticated: boolean }> => ({ isAuthenticated: false }),
);
