/* eslint-disable @typescript-eslint/no-unused-vars -- mock signatures mirror the real server actions */
// Client-side stand-ins for the account page's server actions. Same signatures
// as the cloud platform's inline "use server" functions in page.tsx, so they
// can be swapped back for real server actions passed down as props.

import type { ActionResult } from "@/lib/actionResult";
import { validateBirthdate } from "@/lib/birthdate";
import { AVATAR_FORM_FIELD } from "@/lib/avatar";
import { mockDelay } from "@/lib/mock/delay";
import { MOCK_USER } from "@/lib/mock/user";
import {
  MOCK_INVALID_CODE,
  MOCK_TAKEN_EMAILS,
  MOCK_TOTP_SECRET,
  MOCK_VERIFICATION_RECORD_ID,
  MOCK_WRONG_PASSWORD,
} from "@/lib/mock/account";

// Expected failures are returned, not thrown, matching lib/actionResult's
// contract. (Not via attempt(): its console.error would trip the dev overlay
// every time an error state is previewed.)
function ok<T>(value: T): ActionResult<T> {
  return { ok: true, value };
}
function fail<T>(message: string): ActionResult<T> {
  return { ok: false, message };
}

export async function mockVerifyPassword(
  password: string,
): Promise<ActionResult<string>> {
  // TODO(backend): POST /api/verifications/password via Logto Account API (verifyPassword)
  await mockDelay();
  if (password === MOCK_WRONG_PASSWORD) return fail("Incorrect password. Please check your input.");
  return ok(MOCK_VERIFICATION_RECORD_ID);
}

export async function mockUpdatePassword(
  _verificationId: string,
  _newPassword: string,
): Promise<ActionResult<void>> {
  // TODO(backend): POST /api/my-account/password via Logto Account API (updatePassword)
  await mockDelay();
  return ok(undefined);
}

export async function mockCheckEmailAvailability(
  emailAddr: string,
): Promise<ActionResult<void>> {
  // TODO(backend): findUserByPrimaryEmail via Logto Management API, compared against the session sub
  await mockDelay(300);
  const candidate = emailAddr.trim().toLowerCase();
  if (candidate === MOCK_USER.email.toLowerCase()) {
    return fail("That's already the email address on your account.");
  }
  if (MOCK_TAKEN_EMAILS.includes(candidate)) {
    return fail("That email is already linked to another account.");
  }
  return ok(undefined);
}

export async function mockSendEmailCode(
  _emailAddr: string,
): Promise<ActionResult<string>> {
  // TODO(backend): POST /api/verifications/verification-code via Logto Account API (sendEmailCode)
  await mockDelay();
  return ok(MOCK_VERIFICATION_RECORD_ID);
}

export async function mockVerifyEmailCode(
  _emailAddr: string,
  code: string,
  verificationRecordId: string,
): Promise<ActionResult<string>> {
  // TODO(backend): POST /api/verifications/verification-code/verify via Logto Account API (verifyEmailCode)
  await mockDelay();
  if (code === MOCK_INVALID_CODE) return fail("That code is not valid. Please check it and try again.");
  return ok(verificationRecordId || MOCK_VERIFICATION_RECORD_ID);
}

export async function mockUpdateEmail(
  _currentVerifId: string,
  _newVerifId: string,
  _emailAddr: string,
): Promise<ActionResult<void>> {
  // TODO(backend): POST /api/my-account/primary-email via Logto Account API (updatePrimaryEmail)
  await mockDelay();
  return ok(undefined);
}

export async function mockUpdateBirthdate(
  birthdate: string,
): Promise<ActionResult<void>> {
  const problem = validateBirthdate(birthdate);
  if (problem) return fail(problem);
  // TODO(backend): PATCH /api/my-account/profile { birthdate } via Logto Account API (updateBirthdate)
  await mockDelay();
  return ok(undefined);
}

export async function mockGenerateTotpSecret(): Promise<string> {
  // TODO(backend): POST /api/my-account/mfa-verifications/totp-secret/generate via Logto Account API
  await mockDelay(300);
  return MOCK_TOTP_SECRET;
}

export async function mockBindTotp(
  _verificationRecordId: string,
  _secret: string,
  code: string,
): Promise<void> {
  // TODO(backend): POST /api/my-account/mfa-verifications { type: "Totp" } via Logto Account API (bindTotp), then revalidatePath("/settings/account")
  await mockDelay();
  if (code === MOCK_INVALID_CODE) {
    throw new Error("That code did not match. Try again.");
  }
}

export async function mockDisableMfa(
  _verificationRecordId: string,
): Promise<void> {
  // TODO(backend): GET then DELETE each /api/my-account/mfa-verifications/{id} via Logto Account API, then revalidatePath("/settings/account")
  await mockDelay();
}

export async function mockUpdateAvatarUrl(_avatarUrl: string): Promise<void> {
  // TODO(backend): PATCH /api/my-account { avatar } via Logto Account API (updateAvatar), then revalidatePath("/", "layout") + refresh()
  await mockDelay();
}

export async function mockUploadAvatar(formData: FormData): Promise<string> {
  const file = formData.get(AVATAR_FORM_FIELD);
  if (!(file instanceof File)) {
    throw new Error("No image was received. Try again.");
  }
  // TODO(backend): upload to Supabase Storage (uploadAvatar), then PATCH the public URL onto the Logto user (updateAvatar)
  await mockDelay();
  // A local object URL stands in for the stored image's public URL.
  return URL.createObjectURL(file);
}

export async function mockRemoveAvatar(): Promise<void> {
  // TODO(backend): delete from Supabase Storage (deleteAvatar), then PATCH { avatar: null } via Logto Account API
  await mockDelay();
}
