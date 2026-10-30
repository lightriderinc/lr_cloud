import { sanitizeReturnTo } from "@/lib/auth/silent-sso";

/**
 * Absolute URL on THIS app's origin to send a user back to after Stripe
 * (Checkout success/cancel, Customer Portal return), built from the path the
 * page they started on reported. Anything that does not resolve to this
 * origin falls back to "/", so it can never become an open redirect.
 *
 * The final origin check is not redundant with sanitizeReturnTo(): URL
 * parsing treats "\" as "/" in http(s) URLs, so "/\evil.com" passes a
 * starts-with-"//" test yet resolves to https://evil.com.
 */
export function stripeReturnUrl(
  origin: string,
  rawPath: unknown,
  params: Record<string, string> = {},
): string {
  const path = sanitizeReturnTo(typeof rawPath === "string" ? rawPath : null);
  let url = new URL(path, origin);
  if (url.origin !== origin) url = new URL("/", origin);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }
  return url.toString();
}
