/**
 * Mock data for /settings/payment-and-history.
 * Fixed values only — no Date.now()/Math.random() (cacheComponents prerendering).
 */

export type PaymentMethod =
  | {
      type: "card";
      brand: string;
      last4: string;
      expMonth: number;
      expYear: number;
    }
  | { type: "link"; email: string | null };

export interface PurchaseRow {
  id: string;
  amountCents: number;
  type: "one_time" | "plan_credit";
  createdAt: string;
}

export const MOCK_PAYMENT_METHOD: PaymentMethod | null = {
  type: "card",
  brand: "visa",
  last4: "4242",
  expMonth: 8,
  expYear: 2028,
};

/** Billing portal URL the "Manage billing" button would redirect to. */
export const MOCK_BILLING_PORTAL_URL = "#";

/** Newest first, as returned by GET /api/billing/purchases. */
export const MOCK_PURCHASES: PurchaseRow[] = [
  { id: "pur_025", amountCents: 5000, type: "one_time", createdAt: "2026-10-18T14:22:07Z" },
  { id: "pur_024", amountCents: 2000, type: "plan_credit", createdAt: "2026-10-01T00:00:12Z" },
  { id: "pur_023", amountCents: 10000, type: "one_time", createdAt: "2026-09-24T09:41:55Z" },
  { id: "pur_022", amountCents: 2500, type: "one_time", createdAt: "2026-09-11T17:03:20Z" },
  { id: "pur_021", amountCents: 2000, type: "plan_credit", createdAt: "2026-09-01T00:00:09Z" },
  { id: "pur_020", amountCents: 1000, type: "one_time", createdAt: "2026-08-27T12:15:44Z" },
  { id: "pur_019", amountCents: 25000, type: "one_time", createdAt: "2026-08-14T08:30:02Z" },
  { id: "pur_018", amountCents: 2000, type: "plan_credit", createdAt: "2026-08-01T00:00:15Z" },
  { id: "pur_017", amountCents: 5000, type: "one_time", createdAt: "2026-07-22T19:48:31Z" },
  { id: "pur_016", amountCents: 1500, type: "one_time", createdAt: "2026-07-09T10:05:17Z" },
  { id: "pur_015", amountCents: 2000, type: "plan_credit", createdAt: "2026-07-01T00:00:11Z" },
  { id: "pur_014", amountCents: 7500, type: "one_time", createdAt: "2026-06-19T15:27:50Z" },
  { id: "pur_013", amountCents: 2000, type: "plan_credit", createdAt: "2026-06-01T00:00:08Z" },
  { id: "pur_012", amountCents: 5000, type: "one_time", createdAt: "2026-05-23T13:12:39Z" },
  { id: "pur_011", amountCents: 1000, type: "one_time", createdAt: "2026-05-08T21:56:04Z" },
  { id: "pur_010", amountCents: 2000, type: "plan_credit", createdAt: "2026-05-01T00:00:14Z" },
  { id: "pur_009", amountCents: 50000, type: "one_time", createdAt: "2026-04-16T11:34:26Z" },
  { id: "pur_008", amountCents: 2000, type: "plan_credit", createdAt: "2026-04-01T00:00:10Z" },
  { id: "pur_007", amountCents: 2500, type: "one_time", createdAt: "2026-03-20T16:09:58Z" },
  { id: "pur_006", amountCents: 2000, type: "plan_credit", createdAt: "2026-03-01T00:00:13Z" },
  { id: "pur_005", amountCents: 10000, type: "one_time", createdAt: "2026-02-12T07:44:21Z" },
  { id: "pur_004", amountCents: 2000, type: "plan_credit", createdAt: "2026-02-01T00:00:07Z" },
  { id: "pur_003", amountCents: 1999, type: "one_time", createdAt: "2026-01-25T18:20:46Z" },
  { id: "pur_002", amountCents: 2000, type: "plan_credit", createdAt: "2026-01-01T00:00:16Z" },
  { id: "pur_001", amountCents: 5000, type: "one_time", createdAt: "2025-12-14T10:02:33Z" },
];
