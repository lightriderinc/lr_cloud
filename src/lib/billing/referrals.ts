/**
 * Refer & Earn — display-only constants.
 *
 * Ported from the source lib/billing/referrals.ts with all DB access
 * (markRefereeSignedUp, grantReferralRewardIfEligible) stripped.
 */

/** Flat grant to EACH side. 1 credit = 1 cent, so this is $10.00 each. */
export const REFERRAL_REWARD_CENTS = 1000;

/** Ledger `reason` prefix for both sides of a referral payout. */
export const REFERRAL_REWARD_PREFIX = "referral_reward:";

/** What the referee did to earn it. Recorded on the Referral for auditing. */
export type QualifyingEvent = "first_qpu_job" | "first_purchase";
