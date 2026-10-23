// Mock signed-in user shared by the header, sidebars and settings pages.
// Replaced by Logto session claims / userinfo once auth is wired up.

/** Flip to false to preview signed-out states (sign-in prompts, hidden nav). */
export const MOCK_SIGNED_IN = true;

export const MOCK_USER = {
  sub: "usr_8f3k2m9q1x",
  name: "Ada Lovelace",
  username: "ada.lovelace",
  email: "ada.lovelace@example.com",
  picture: null as string | null,
  createdAt: "2025-03-14T09:26:53Z",
};
