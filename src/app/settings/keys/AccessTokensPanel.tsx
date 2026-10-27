"use client";

import ApiTokenCard from "@/components/overview/ApiTokenCard";
import LRButton from "@/components/ui/LRButton";
import { mockDelay } from "@/lib/mock/delay";
import {
  MOCK_API_KEY,
  MOCK_GENERATED_KEYS,
  MOCK_KEY_ISSUED_AT,
  type StoredApiKey,
} from "@/lib/mock/keys";
import { useMockQuery } from "@/lib/mock/useMockQuery";
import { useState } from "react";
import { MdAutorenew, MdDeleteOutline } from "react-icons/md";

// TODO(backend): GET /api/settings/tokens → the stored key's prefix + timestamps
function loadApiKey(): StoredApiKey | null {
  return MOCK_API_KEY;
}

type Action = "generate" | "rotate" | "revoke";

export default function AccessTokensPanel() {
  const query = useMockQuery(loadApiKey);
  // Local overrides after a mock mutation; `undefined` means "use the query".
  const [localKey, setLocalKey] = useState<StoredApiKey | null | undefined>(
    undefined,
  );
  const [revealedKey, setRevealedKey] = useState<string | null>(null);
  const [confirming, setConfirming] = useState<"rotate" | "revoke" | null>(null);
  const [pending, setPending] = useState<Action | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [issued, setIssued] = useState(0);

  const apiKey = localKey === undefined ? query.data : localKey;
  const isLoading = query.isLoading;

  async function run(action: Action) {
    setPending(action);
    setError(null);
    try {
      await mockDelay();
      if (action === "revoke") {
        // TODO(backend): DELETE /api/settings/tokens → deletes the stored key
        setRevealedKey(null);
        setLocalKey(null);
      } else {
        // TODO(backend): POST /api/settings/tokens (generate) or /api/settings/tokens/rotate → returns the new full key once
        const key = MOCK_GENERATED_KEYS[issued % MOCK_GENERATED_KEYS.length];
        setIssued((n) => n + 1);
        setRevealedKey(key);
        setLocalKey({
          keyPrefix: "lr_live_mock_",
          createdAt: apiKey?.createdAt ?? MOCK_KEY_ISSUED_AT,
          lastUsedAt: action === "rotate" ? null : (apiKey?.lastUsedAt ?? null),
          rotatedAt: action === "rotate" ? MOCK_KEY_ISSUED_AT : null,
        });
      }
      setConfirming(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Something went wrong."));
    } finally {
      setPending(null);
    }
  }

  if (isLoading) {
    return (
      <div className="animate-pulse default-radius border border-gray-50 bg-gray-50 p-4">
        <div className="h-4 w-48 rounded bg-gray-200" />
        <div className="mt-3 h-3 w-32 rounded bg-gray-200" />
        <div className="mt-2 h-3 w-24 rounded bg-gray-200" />
        <div className="mt-4 flex gap-2">
          <div className="h-8 w-28 rounded bg-gray-200" />
          <div className="h-8 w-24 rounded bg-gray-200" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {revealedKey && (
        <div className="default-radius border border-red-100 bg-red-50 p-4">
          <p className="text-sm font-medium text-red-700">
            Copy your key now — it won&apos;t be shown again.
          </p>
          <div className="mt-3">
            <ApiTokenCard token={revealedKey} />
          </div>
        </div>
      )}

      {error && (
        <p className="text-sm text-red-600">
          {error instanceof Error ? error.message : "Something went wrong."}
        </p>
      )}

      {!apiKey && (
        <div className="default-radius border border-gray-200 border-dashed bg-gray-50 p-4">
          <p className="mb-3 text-sm text-gray-600">
            No API key yet. Generate one to authenticate SDK requests.
          </p>
          <LRButton
            variant="primary"
            onClick={() => run("generate")}
            disabled={pending === "generate"}
          >
            {pending === "generate" ? "Generating…" : "Generate API Key"}
          </LRButton>
        </div>
      )}

      {apiKey && (
        <div className="default-radius border border-gray-50 bg-gray-50 p-4">
          <p className="font-mono text-sm text-gray-800">
            {apiKey.keyPrefix}
            {"•".repeat(16)}
          </p>
          <p className="mt-2 text-xs text-gray-500">
            Created: {new Date(apiKey.createdAt).toLocaleString()}
          </p>
          <p className="text-xs text-gray-500">
            Last used:{" "}
            {apiKey.lastUsedAt
              ? new Date(apiKey.lastUsedAt).toLocaleString()
              : "never"}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            {confirming === "rotate" ? (
              <>
                <span className="text-sm text-gray-600">
                  This immediately invalidates the current key.
                </span>
                <LRButton
                  type="button"
                  variant="primary-outline"
                  onClick={() => run("rotate")}
                  disabled={pending === "rotate"}
                  className="default-radius border border-red-300 px-3 py-1.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 disabled:opacity-60"
                >
                  {pending === "rotate" ? "Rotating…" : "Confirm rotate"}
                </LRButton>
                <LRButton
                  variant="secondary-outline"
                  onClick={() => setConfirming(null)}
                >
                  Cancel
                </LRButton>
              </>
            ) : confirming === "revoke" ? (
              <>
                <span className="text-sm text-gray-600">
                  This deletes the key entirely.
                </span>
                <LRButton
                  type="button"
                  variant="primary-outline"
                  onClick={() => run("revoke")}
                  disabled={pending === "revoke"}
                  className="default-radius border border-red-300 px-3 py-1.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 disabled:opacity-60"
                >
                  {pending === "revoke" ? "Revoking…" : "Confirm revoke"}
                </LRButton>
                <LRButton
                  variant="secondary-outline"
                  onClick={() => setConfirming(null)}
                >
                  Cancel
                </LRButton>
              </>
            ) : (
              <>
                <LRButton
                  variant="secondary-outline"
                  icon={<MdAutorenew />}
                  onClick={() => setConfirming("rotate")}
                >
                  Rotate key
                </LRButton>
                <LRButton
                  variant="secondary-outline"
                  icon={<MdDeleteOutline />}
                  onClick={() => setConfirming("revoke")}
                >
                  Revoke
                </LRButton>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
