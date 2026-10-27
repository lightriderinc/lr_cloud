// Mock user shared by the header, sidebars and settings pages. Signing in
// with the header's Log in button (see @/app/actions/auth) starts a session
// as this user. Replaced by Logto session claims / userinfo once auth is
// wired up.

export const MOCK_USER = {
  sub: "usr_8f3k2m9q1x",
  name: "Ada Lovelace",
  username: "ada.lovelace",
  email: "ada.lovelace@example.com",
  picture: null as string | null,
  createdAt: "2025-03-14T09:26:53Z",
};
