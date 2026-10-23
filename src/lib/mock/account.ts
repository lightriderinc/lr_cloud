// Mock data for the Account settings page (/settings/account).
// Replaced by the Logto Account API / Management API (and billing for the
// plan label) once the backend is wired up. Identity fields (name, email,
// picture) come from @/lib/mock/user via the mock session.

import type { LinkedSocialIdentity } from "@/components/profile/socialProviders";

/** OIDC `birthdate` claim, "YYYY-MM-DD". Null shows the "Add Birthdate" action. */
export const MOCK_BIRTHDATE: string | null = null;

/** False previews a social/SSO-only user ("Set Password" + email-code verification). */
export const MOCK_HAS_PASSWORD = true;

/** Whether a TOTP authenticator factor is bound. */
export const MOCK_MFA_ENABLED = false;

/** Linked social connectors, as returned by normalizeSocialIdentities. Empty hides the section. */
export const MOCK_SOCIAL_IDENTITIES: LinkedSocialIdentity[] = [
  { target: "google", handle: "Ada Lovelace" },
  { target: "github", handle: "ada-lovelace" },
];

/** Base32 TOTP secret shown in the 2FA setup QR code / setup key. */
export const MOCK_TOTP_SECRET = "JBSWY3DPEHPK3PXPLR7Q2MZA";

/** Returned wherever Logto would hand back a verification record id. */
export const MOCK_VERIFICATION_RECORD_ID = "vrec_mock_4c1e9a7b";

/** Addresses the change-email pre-check reports as belonging to another account. */
export const MOCK_TAKEN_EMAILS = ["charles.babbage@example.com"];

/** Password that the mock verify step rejects, to preview the error state. */
export const MOCK_WRONG_PASSWORD = "wrong";

/** Verification code that the mock verify step rejects, to preview the error state. */
export const MOCK_INVALID_CODE = "000000";
