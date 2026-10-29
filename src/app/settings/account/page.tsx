import { handleSignOut } from "@/app/actions/auth";
import { logtoConfig } from "@/app/logto";
import LogoutButton from "@/components/auth/LogoutButton";
import ConnectedAccounts from "@/components/profile/ConnectedAccounts";
import ProfileAvatar from "@/components/profile/ProfileAvatar";
import { attempt, type ActionResult } from "@/lib/actionResult";
import { validateBirthdate } from "@/lib/birthdate";
import { AVATAR_FORM_FIELD, resolveAvatarSources } from "@/lib/avatar";
import {
  getAccountProfile,
  getDisplayName,
  getSession,
  requireLogtoUser,
} from "@/lib/auth/session";
import {
  bindTotp,
  deleteMfaVerification,
  generateTotpSecret,
  getMfaVerifications,
  normalizeSocialIdentities,
  sendEmailCode,
  updateAvatar,
  updateBirthdate,
  updatePassword,
  updatePrimaryEmail,
  verifyEmailCode,
  verifyPassword,
} from "@/lib/logto-account";
import { deleteAvatar, uploadAvatar } from "@/lib/supabase/avatars";
import { getAccessToken } from "@logto/next/server-actions";
import { refresh, revalidatePath } from "next/cache";
import ProfileActions from "./ProfileActions";

/**
 * Account page. Copied from the Quantum app's /settings/account, with one
 * difference: no Management API (M2M) yet. Quantum reads `identities` and
 * `hasPassword` from `GET /api/users/{id}` first and runs a duplicate-email
 * pre-check through it; here both come from the end-user Account API alone,
 * the same way the Entropy platform does it.
 */
export default async function AccountPage() {
  const { userInfo } = await getSession();

  // Resolve the display name via the shared resolver so a brand-new user's full
  // name shows on first sign-in (session claims lag until the first refresh; the
  // Account API reflects it immediately). getAccountProfile is cached, so this
  // and getDisplayName share a single Account API fetch per request.
  const name = await getDisplayName();
  const account = await getAccountProfile();
  const birthdate = account?.profile?.birthdate ?? null;

  // Linked socials + password status, straight off the Account API. It only
  // returns these when the Logto Account Center `fields` config exposes them.
  // hasPassword defaults to true on failure, preserving the change-password
  // behavior for password users on a transient error.
  // TODO(m2m): prefer getUserAccountFacts(sub) via the Management API, as the
  // Quantum app does, once M2M credentials are configured for this app.
  const hasPassword = account?.hasPassword ?? true;
  const socialIdentities = normalizeSocialIdentities(account?.identities);

  let mfaEnabled = false;
  try {
    const token = await getAccessToken(logtoConfig);
    if (token) {
      const mfaFactors = await getMfaVerifications(token);
      mfaEnabled = mfaFactors.some((factor) => factor.type === "Totp");
    }
  } catch {
    // Account API not enabled or token unavailable
  }

  const email = userInfo?.email ?? null;
  // Shared resolver — the header's UserCard uses the same one, so the two
  // can't disagree about which picture (or which generated fallback) is current.
  const { src: customAvatarUrl, fallbackSrc: generatedAvatarUrl } =
    resolveAvatarSources({
      picture: userInfo?.picture,
      name,
      email,
    });

  // Returns rather than throws: a wrong password is an expected answer, and a
  // thrown one is replaced by Next's generic sanitized message in production.
  // See lib/actionResult.ts.
  async function doVerifyPassword(
    password: string,
  ): Promise<ActionResult<string>> {
    "use server";
    return attempt(async () => {
      const token = await getAccessToken(logtoConfig);
      return verifyPassword(token, password);
    }, "Incorrect password. Please check your input.");
  }

  async function doUpdatePassword(
    verificationId: string,
    newPassword: string,
  ): Promise<ActionResult<void>> {
    "use server";
    return attempt(async () => {
      const token = await getAccessToken(logtoConfig);
      await updatePassword(token, verificationId, newPassword);
    }, "Could not update your password. Please try again.");
  }

  /**
   * No Management API means no reliable pre-flight duplicate-email check (see
   * the Quantum app's equivalent) — the Account API still enforces uniqueness
   * when the change is finalized, so this lets the flow proceed straight to
   * sending a code.
   * TODO(m2m): restore the findUserByPrimaryEmail pre-check.
   */
  async function doCheckEmailAvailability(): Promise<ActionResult<void>> {
    "use server";
    return { ok: true, value: undefined };
  }

  async function doSendEmailCode(
    emailAddr: string,
  ): Promise<ActionResult<string>> {
    "use server";
    return attempt(async () => {
      const token = await getAccessToken(logtoConfig);
      return sendEmailCode(token, emailAddr);
    }, "Could not send the verification code. Please try again.");
  }

  async function doVerifyEmailCode(
    emailAddr: string,
    code: string,
    verificationRecordId: string,
  ): Promise<ActionResult<string>> {
    "use server";
    return attempt(async () => {
      const token = await getAccessToken(logtoConfig);
      return verifyEmailCode(token, emailAddr, code, verificationRecordId);
    }, "That code is not valid. Please check it and try again.");
  }

  async function doUpdateEmail(
    currentVerifId: string,
    newVerifId: string,
    emailAddr: string,
  ): Promise<ActionResult<void>> {
    "use server";
    return attempt(async () => {
      const token = await getAccessToken(logtoConfig);
      await updatePrimaryEmail(token, currentVerifId, newVerifId, emailAddr);
    }, "Could not update your email. Please try again.");
  }

  /**
   * Saves a directly-pasted image URL onto the Logto user record. This is the
   * "Image URL" tab of the avatar modal, and it's also the second half of the
   * upload flow — once a cropped file lands in storage, its public URL gets
   * written here the same way.
   */
  async function doUpdateAvatarUrl(avatarUrl: string): Promise<void> {
    "use server";
    const token = await getAccessToken(logtoConfig);
    await updateAvatar(token, avatarUrl);
    // "layout" scope, not the usual "/settings/account": the avatar also
    // renders in the header UserCard, which lives in the root layout.
    // Revalidating just this page leaves the header showing the old picture
    // until a full reload.
    revalidatePath("/", "layout");
    refresh();
  }

  /**
   * Uploads the cropped avatar to Supabase Storage, then writes the
   * resulting public URL onto the Logto user the same way the "Image URL"
   * tab does. requireLogtoUser()'s own error ("UNAUTHENTICATED") isn't
   * user-facing, so it's caught and rethrown with a friendlier message here
   * rather than changed at the shared helper.
   */
  async function doUploadAvatar(formData: FormData): Promise<string> {
    "use server";
    let sub: string;
    try {
      ({ sub } = await requireLogtoUser());
    } catch {
      throw new Error("You must be signed in to upload an avatar.");
    }

    const file = formData.get(AVATAR_FORM_FIELD);
    if (!(file instanceof File)) {
      throw new Error("No image was received. Try again.");
    }

    const url = await uploadAvatar(sub, file);
    await doUpdateAvatarUrl(url); // writes to Logto + revalidates
    return url;
  }

  /**
   * Removes the user's avatar: best-effort delete of the stored object, then
   * clears the avatar field on the Logto user so it falls back to the generated
   * default. Storage cleanup failures are logged but don't block clearing the
   * profile — a leftover object is harmless and gets overwritten on next upload.
   */
  async function doRemoveAvatar(): Promise<void> {
    "use server";
    let sub: string;
    try {
      ({ sub } = await requireLogtoUser());
    } catch {
      throw new Error("You must be signed in to remove your avatar.");
    }

    try {
      await deleteAvatar(sub);
    } catch (err) {
      console.error("[account] avatar delete failed:", err);
    }

    // Logto validates `avatar` as a URL, so an empty string is rejected as an
    // invalid body — null is what clears the field.
    const token = await getAccessToken(logtoConfig);
    await updateAvatar(token, null);
    // "layout" scope so the header UserCard (in the root layout) updates too.
    revalidatePath("/", "layout");
    refresh();
  }

  async function doUpdateBirthdate(
    birthdate: string,
  ): Promise<ActionResult<void>> {
    "use server";
    return attempt(async () => {
      // Re-checked here, not just in the form: min/max on a date input is a
      // convenience the caller can bypass entirely.
      const problem = validateBirthdate(birthdate);
      if (problem) throw new Error(problem);

      const token = await getAccessToken(logtoConfig);
      await updateBirthdate(token, birthdate);
    }, "Could not save your date of birth. Please try again.");
  }

  async function doGenerateTotpSecret(): Promise<string> {
    "use server";
    const token = await getAccessToken(logtoConfig);
    return generateTotpSecret(token);
  }

  async function doBindTotp(
    verificationRecordId: string,
    secret: string,
    code: string,
  ): Promise<void> {
    "use server";
    const token = await getAccessToken(logtoConfig);
    await bindTotp(token, verificationRecordId, secret, code);
    revalidatePath("/settings/account");
  }

  async function doDisableMfa(verificationRecordId: string): Promise<void> {
    "use server";
    const token = await getAccessToken(logtoConfig);
    const factors = await getMfaVerifications(token);
    for (const factor of factors) {
      await deleteMfaVerification(token, verificationRecordId, factor.id);
    }
    revalidatePath("/settings/account");
  }

  return (
    <div className="animate-fade-in-up">
      <h1 className="text-2xl font-semibold text-gray-700">
        Account
      </h1>
      <p className="mb-12 text-sm text-gray-500">
        Your Light Rider account details.
      </p>

      <div className="flex items-center gap-4 mb-12">
        <ProfileAvatar
          src={customAvatarUrl}
          fallbackSrc={generatedAvatarUrl}
          name={name || email || "Your account"}
          size={64}
          onUpdateAvatarUrl={doUpdateAvatarUrl}
          onUploadAvatar={doUploadAvatar}
          onRemoveAvatar={doRemoveAvatar}
        />
        <div className="min-w-0">
          {name && (
            <p className="text-3xl font-semibold text-gray-800 truncate">
              {name}
            </p>
          )}
          {/* <CurrentPlanBadge /> */}
        </div>
      </div>

      <ProfileActions
        name={name}
        email={email ?? ""}
        birthdate={birthdate}
        mfaEnabled={mfaEnabled}
        hasPassword={hasPassword}
        connectedAccounts={<ConnectedAccounts identities={socialIdentities} />}
        onVerifyPassword={doVerifyPassword}
        onUpdatePassword={doUpdatePassword}
        onSendEmailCode={doSendEmailCode}
        onVerifyEmailCode={doVerifyEmailCode}
        onCheckEmailAvailable={doCheckEmailAvailability}
        onUpdateEmail={doUpdateEmail}
        onUpdateBirthdate={doUpdateBirthdate}
        onGenerateTotpSecret={doGenerateTotpSecret}
        onBindTotp={doBindTotp}
        onDisableMfa={doDisableMfa}
      />

      <div className="mt-6">
        <LogoutButton onSignOut={handleSignOut} />
      </div>
    </div>
  );
}
