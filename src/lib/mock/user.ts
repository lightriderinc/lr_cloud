// Mock "current user" for the billing pages that are still on mock data
// (SendInvite, ShareCredits use its email for their "that's you" checks). The
// signed-in identity itself comes from Logto (@/lib/auth/session); this goes
// away once those pages read the real session and billing API.

export const MOCK_USER = {
  sub: "usr_8f3k2m9q1x",
  name: "Ada Lovelace",
  username: "ada.lovelace",
  email: "ada.lovelace@example.com",
  picture: null as string | null,
  createdAt: "2025-03-14T09:26:53Z",
};
