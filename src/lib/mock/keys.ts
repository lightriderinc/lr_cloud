// Mock API key data for /settings/keys. Replaced by GET/POST/DELETE
// /api/settings/tokens once the backend is wired up.

export type StoredApiKey = {
  keyPrefix: string;
  createdAt: string;
  lastUsedAt: string | null;
  rotatedAt: string | null;
};

/** The key currently on file for the mock user (only the prefix is ever stored). */
export const MOCK_API_KEY: StoredApiKey | null = {
  keyPrefix: "lr_live_mock_",
  createdAt: "2026-08-14T16:22:05.000Z",
  lastUsedAt: "2026-10-21T09:47:31.000Z",
  rotatedAt: null,
};

/**
 * Full secrets "returned" by generate/rotate, cycled through in order. These
 * are fake and deliberately not in any real provider's format.
 */
export const MOCK_GENERATED_KEYS: string[] = [
  "lr_live_mock_7f3c9a2e4b1d8f6a0c5e9b2d4f7a1c3e",
  "lr_live_mock_2b8e6d1f9a4c7e3b0d5f8a2c6e9b1d4f",
  "lr_live_mock_9d4a1c7f3e8b2d6a0f5c9e1b4d7a3f8c",
];

/** Fixed timestamp used for keys created/rotated during the mock session. */
export const MOCK_KEY_ISSUED_AT = "2026-10-23T12:00:00.000Z";
