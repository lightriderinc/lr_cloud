// Mock billing data for the credits/billing settings pages. 1 credit = 1 cent
// ($0.01), so every `*Cents` field doubles as a credit count.
//
// The fixtures are fixed values. A small in-memory store on top lets client
// mutations (e.g. Share Credits) update the balance and transfer history for
// the rest of the browser session; it resets on a full reload.

export type Credits = {
  purchasedCents: number;
  usedCents: number;
  remainingCents: number;
  receivedTransferCents?: number;
  hasUnlocked?: boolean;
};

export type Usage = {
  plan: { tier: string; name: string } | null;
  includedCalls?: number;
  usedCalls?: number;
  remainingCalls?: number;
  currentPeriodEnd?: string | null;
};

export type Subscription = {
  id: string;
  kind: string;
  tier: string | null;
  status: string;
  currentPeriodEnd: string | null;
  cancelAtPeriodEnd: boolean;
};

export type TransferView = "sent" | "received";

export type TransferRow = {
  id: string;
  transferId: string | null;
  batchId: string | null;
  amountCents: number;
  counterpartyEmail: string | null;
  reason: string;
  createdAt: string;
};

export type TransfersPage = {
  view: TransferView;
  page: number;
  pageSize: number;
  total: number;
  hasMore: boolean;
  transfers: TransferRow[];
};

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

export const MOCK_CREDITS: Credits = {
  purchasedCents: 25_000,
  usedCents: 9_160,
  remainingCents: 18_340,
  receivedTransferCents: 2_500,
  hasUnlocked: true,
};

export const MOCK_USAGE: Usage = {
  plan: { tier: "developer", name: "Developer" },
  includedCalls: 2_000_000,
  usedCalls: 412_350,
  remainingCalls: 1_587_650,
  currentPeriodEnd: "2026-11-14T00:00:00.000Z",
};

export const MOCK_SUBSCRIPTIONS: Subscription[] = [
  {
    id: "sub_mock_01",
    kind: "API_PLAN",
    tier: "developer",
    status: "active",
    currentPeriodEnd: "2026-11-14T00:00:00.000Z",
    cancelAtPeriodEnd: false,
  },
];

/** Emails the mock transfer endpoint treats as "no Light Rider account". */
export const MOCK_UNREGISTERED_EMAILS: string[] = [
  "newuser@example.com",
  "nobody@example.com",
];

export const MOCK_TRANSFERS_PAGE_SIZE = 10;

function transfer(
  n: number,
  view: TransferView,
  counterpartyEmail: string | null,
  amountCents: number,
  createdAt: string,
): TransferRow {
  const transferId = `tr_mock_${view}_${String(n).padStart(3, "0")}`;
  return {
    id: `ledger_${transferId}`,
    transferId,
    batchId: `batch_mock_${view}_${String(n).padStart(3, "0")}`,
    amountCents,
    counterpartyEmail,
    reason: `${view === "sent" ? "transfer_sent" : "transfer_received"}:${transferId}`,
    createdAt,
  };
}

export const MOCK_SENT_TRANSFERS: TransferRow[] = [
  transfer(13, "sent", "jordan.lee@lightrider.dev", 500, "2026-10-20T15:42:10.000Z"),
  transfer(12, "sent", "maria.santos@quantumlab.io", 1_000, "2026-10-17T11:05:44.000Z"),
  transfer(11, "sent", "alex.chen@university.edu", 250, "2026-10-12T18:21:03.000Z"),
  transfer(10, "sent", "priya.nair@lightrider.dev", 2_000, "2026-10-08T09:13:27.000Z"),
  transfer(9, "sent", "sam.okafor@qresearch.org", 750, "2026-10-02T14:55:39.000Z"),
  transfer(8, "sent", "jordan.lee@lightrider.dev", 500, "2026-09-27T16:30:00.000Z"),
  transfer(7, "sent", null, 300, "2026-09-21T10:02:18.000Z"),
  transfer(6, "sent", "elena.rossi@photonics.eu", 1_500, "2026-09-15T08:47:51.000Z"),
  transfer(5, "sent", "maria.santos@quantumlab.io", 400, "2026-09-09T13:19:06.000Z"),
  transfer(4, "sent", "kenji.watanabe@qcompute.jp", 1_000, "2026-09-02T22:11:45.000Z"),
  transfer(3, "sent", "alex.chen@university.edu", 200, "2026-08-28T17:38:12.000Z"),
  transfer(2, "sent", "priya.nair@lightrider.dev", 600, "2026-08-21T12:00:59.000Z"),
  transfer(1, "sent", "sam.okafor@qresearch.org", 350, "2026-08-16T09:26:33.000Z"),
];

export const MOCK_RECEIVED_TRANSFERS: TransferRow[] = [
  transfer(3, "received", "priya.nair@lightrider.dev", 1_000, "2026-10-05T19:44:02.000Z"),
  transfer(2, "received", "jordan.lee@lightrider.dev", 1_000, "2026-09-18T07:15:20.000Z"),
  transfer(1, "received", "maria.santos@quantumlab.io", 500, "2026-08-30T20:03:41.000Z"),
];

// ---------------------------------------------------------------------------
// In-memory session store (client-side mutations only)
// ---------------------------------------------------------------------------

let credits: Credits = { ...MOCK_CREDITS };
let subscriptions: Subscription[] = MOCK_SUBSCRIPTIONS.map((s) => ({ ...s }));
let sentTransfers: TransferRow[] = [...MOCK_SENT_TRANSFERS];
const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

export function subscribeMockBilling(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getMockCredits(): Credits {
  return credits;
}

export function getMockUsage(): Usage {
  return MOCK_USAGE;
}

export function getMockSubscriptions(): Subscription[] {
  return subscriptions;
}

export function getMockTransfers(key: string): TransfersPage {
  const [view, pageStr] = key.split(":") as [TransferView, string];
  const page = Number(pageStr) || 1;
  const all = view === "sent" ? sentTransfers : MOCK_RECEIVED_TRANSFERS;
  const start = (page - 1) * MOCK_TRANSFERS_PAGE_SIZE;
  return {
    view,
    page,
    pageSize: MOCK_TRANSFERS_PAGE_SIZE,
    total: all.length,
    hasMore: start + MOCK_TRANSFERS_PAGE_SIZE < all.length,
    transfers: all.slice(start, start + MOCK_TRANSFERS_PAGE_SIZE),
  };
}

/** Flips cancel-at-period-end on a subscription (mock cancel/reactivate). */
export function toggleMockSubscription(id: string): void {
  subscriptions = subscriptions.map((s) =>
    s.id === id ? { ...s, cancelAtPeriodEnd: !s.cancelAtPeriodEnd } : s,
  );
  emit();
}

/**
 * Records a mock outbound transfer batch. Must only be called from an event
 * handler (it reads the clock).
 */
export function recordMockTransfers(
  batchId: string,
  rows: { email: string; amountCents: number }[],
): void {
  const createdAt = new Date().toISOString();
  const newRows = rows.map((row, i): TransferRow => {
    const transferId = `${batchId}_${i}`;
    return {
      id: `ledger_${transferId}`,
      transferId,
      batchId,
      amountCents: row.amountCents,
      counterpartyEmail: row.email,
      reason: `transfer_sent:${transferId}`,
      createdAt,
    };
  });
  const total = rows.reduce((sum, row) => sum + row.amountCents, 0);
  sentTransfers = [...newRows, ...sentTransfers];
  credits = {
    ...credits,
    remainingCents: credits.remainingCents - total,
  };
  emit();
}
