/**
 * Mock data for /settings/rewards (Refer & Earn).
 * Fixed values only — no Date.now()/Math.random() (cacheComponents prerendering).
 */

import { REFERRAL_REWARD_CENTS } from "@/lib/billing/referrals";

export type InviteRow = {
  id: string;
  email: string;
  status: "pending" | "accepted" | "expired";
  createdAt: string;
  expiresAt: string;
  rewardCents: number | null;
};

export type RewardRow = {
  id: string;
  /** Which side of the referral this customer was on. */
  side: "referrer" | "referee";
  /** The person you invited, or the person who invited you. */
  counterpartyEmail: string | null;
  rewardCents: number | null;
  qualifyingEventReason: string | null;
  rewardedAt: string | null;
  reason: string;
};

export type InviteQuota = {
  usedToday: number;
  limit: number;
  remainingToday: number;
};

/** Matches PAGE_SIZE in the source GET /api/invites route. */
export const MOCK_INVITES_PAGE_SIZE = 10;

/** Matches INVITE_DAILY_LIMIT server-side. */
export const MOCK_INVITE_QUOTA: InviteQuota = {
  usedToday: 3,
  limit: 15,
  remainingToday: 12,
};

/** Addresses the mock send treats as "already has an account". */
export const MOCK_EXISTING_MEMBERS: string[] = [
  "dana.whitfield@lightriderinc.com",
  "ops@quantumlab.io",
];

/** Newest first, as returned by GET /api/invites?view=invites. */
export const MOCK_INVITES: InviteRow[] = [
  { id: "inv_018", email: "maya.chen@northwind.dev", status: "pending", createdAt: "2026-10-22T16:04:11Z", expiresAt: "2026-11-05T16:04:11Z", rewardCents: null },
  { id: "inv_017", email: "j.okafor@helixlabs.com", status: "pending", createdAt: "2026-10-22T16:04:11Z", expiresAt: "2026-11-05T16:04:11Z", rewardCents: null },
  { id: "inv_016", email: "priya.r@qubitworks.ai", status: "pending", createdAt: "2026-10-22T16:04:11Z", expiresAt: "2026-11-05T16:04:11Z", rewardCents: null },
  { id: "inv_015", email: "tomas.lindqvist@uu.se", status: "accepted", createdAt: "2026-10-17T09:30:45Z", expiresAt: "2026-10-24T09:30:45Z", rewardCents: null },
  { id: "inv_014", email: "sarah.kim@photonix.io", status: "accepted", createdAt: "2026-10-12T13:18:02Z", expiresAt: "2026-10-19T13:18:02Z", rewardCents: REFERRAL_REWARD_CENTS },
  { id: "inv_013", email: "alex.moreau@entangle.fr", status: "expired", createdAt: "2026-10-02T11:45:39Z", expiresAt: "2026-10-09T11:45:39Z", rewardCents: null },
  { id: "inv_012", email: "devon.price@gmail.com", status: "accepted", createdAt: "2026-09-28T18:22:17Z", expiresAt: "2026-10-05T18:22:17Z", rewardCents: REFERRAL_REWARD_CENTS },
  { id: "inv_011", email: "lena.vogel@tu-berlin.de", status: "expired", createdAt: "2026-09-19T08:11:54Z", expiresAt: "2026-09-26T08:11:54Z", rewardCents: null },
  { id: "inv_010", email: "rahul.mehta@coherent.co", status: "accepted", createdAt: "2026-09-10T15:37:28Z", expiresAt: "2026-09-17T15:37:28Z", rewardCents: REFERRAL_REWARD_CENTS },
  { id: "inv_009", email: "nora.haddad@outlook.com", status: "expired", createdAt: "2026-08-30T20:03:06Z", expiresAt: "2026-09-06T20:03:06Z", rewardCents: null },
  { id: "inv_008", email: "kenji.watanabe@riken.jp", status: "accepted", createdAt: "2026-08-21T04:49:33Z", expiresAt: "2026-08-28T04:49:33Z", rewardCents: null },
  { id: "inv_007", email: "emma.brooks@superpos.io", status: "accepted", createdAt: "2026-08-08T12:26:50Z", expiresAt: "2026-08-15T12:26:50Z", rewardCents: REFERRAL_REWARD_CENTS },
  { id: "inv_006", email: "carlos.diaz@unam.mx", status: "expired", createdAt: "2026-07-25T17:14:22Z", expiresAt: "2026-08-01T17:14:22Z", rewardCents: null },
  { id: "inv_005", email: "hannah.lee@qcore.com", status: "expired", createdAt: "2026-07-11T10:58:09Z", expiresAt: "2026-07-18T10:58:09Z", rewardCents: null },
  { id: "inv_004", email: "oliver.grant@ionqbit.net", status: "accepted", createdAt: "2026-06-29T14:41:37Z", expiresAt: "2026-07-06T14:41:37Z", rewardCents: REFERRAL_REWARD_CENTS },
  { id: "inv_003", email: "fatima.zahra@mit.edu", status: "expired", createdAt: "2026-06-12T09:07:15Z", expiresAt: "2026-06-19T09:07:15Z", rewardCents: null },
  { id: "inv_002", email: "ben.carter@yahoo.com", status: "accepted", createdAt: "2026-05-30T22:19:48Z", expiresAt: "2026-06-06T22:19:48Z", rewardCents: null },
  { id: "inv_001", email: "sofia.rossi@polimi.it", status: "expired", createdAt: "2026-05-14T07:33:01Z", expiresAt: "2026-05-21T07:33:01Z", rewardCents: null },
];

/** Newest first, as returned by GET /api/invites?view=rewards. */
export const MOCK_REWARDS: RewardRow[] = [
  { id: "ref_006", side: "referrer", counterpartyEmail: "sarah.kim@photonix.io", rewardCents: REFERRAL_REWARD_CENTS, qualifyingEventReason: "first_purchase", rewardedAt: "2026-10-15T10:12:44Z", reason: "referral_reward:ref_006" },
  { id: "ref_005", side: "referrer", counterpartyEmail: "devon.price@gmail.com", rewardCents: REFERRAL_REWARD_CENTS, qualifyingEventReason: "first_qpu_job", rewardedAt: "2026-10-03T19:55:21Z", reason: "referral_reward:ref_005" },
  { id: "ref_004", side: "referrer", counterpartyEmail: "rahul.mehta@coherent.co", rewardCents: REFERRAL_REWARD_CENTS, qualifyingEventReason: "first_qpu_job", rewardedAt: "2026-09-14T08:40:03Z", reason: "referral_reward:ref_004" },
  { id: "ref_003", side: "referrer", counterpartyEmail: "emma.brooks@superpos.io", rewardCents: REFERRAL_REWARD_CENTS, qualifyingEventReason: "first_purchase", rewardedAt: "2026-08-12T16:27:58Z", reason: "referral_reward:ref_003" },
  { id: "ref_002", side: "referrer", counterpartyEmail: "oliver.grant@ionqbit.net", rewardCents: REFERRAL_REWARD_CENTS, qualifyingEventReason: "first_purchase", rewardedAt: "2026-07-02T13:05:36Z", reason: "referral_reward:ref_002" },
  { id: "ref_001", side: "referee", counterpartyEmail: "dana.whitfield@lightriderinc.com", rewardCents: REFERRAL_REWARD_CENTS, qualifyingEventReason: "first_qpu_job", rewardedAt: "2026-04-20T11:48:12Z", reason: "referral_reward:ref_001" },
];
