import { handleSignOut } from "@/app/actions/auth";
import LogoutButton from "@/components/auth/LogoutButton";
import CurrentPlanBadge from "@/components/billing/CurrentPlanBadge";
import ConnectedAccounts from "@/components/profile/ConnectedAccounts";
import { resolveAvatarSources } from "@/lib/avatar";
import { getDisplayName, getSession } from "@/lib/auth/session";
import {
  MOCK_BIRTHDATE,
  MOCK_HAS_PASSWORD,
  MOCK_MFA_ENABLED,
  MOCK_SOCIAL_IDENTITIES,
} from "@/lib/mock/account";
import AccountAvatar from "./AccountAvatar";
import ProfileActions from "./ProfileActions";

export default async function AccountPage() {
  const { userInfo } = await getSession();

  const name = await getDisplayName();
  // TODO(backend): getAccountProfile() via Logto Account API (GET /api/my-account) for profile.birthdate
  const birthdate = MOCK_BIRTHDATE;

  // TODO(backend): getUserAccountFacts(sub) via Logto Management API (GET /api/users/{id}) for identities + hasPassword, falling back to the Account API
  const hasPassword = MOCK_HAS_PASSWORD;
  const socialIdentities = MOCK_SOCIAL_IDENTITIES;

  // TODO(backend): getMfaVerifications(token) via Logto Account API; enabled when a "Totp" factor exists
  const mfaEnabled = MOCK_MFA_ENABLED;

  const email = userInfo?.email ?? null;
  // Shared resolver — the header's UserCard uses the same one, so the two
  // can't disagree about which picture (or which generated fallback) is current.
  const { src: customAvatarUrl, fallbackSrc: generatedAvatarUrl } =
    resolveAvatarSources({
      picture: userInfo?.picture,
      name,
      email,
    });

  return (
    <div className="animate-fade-in-up">
      <h1 className="text-2xl font-semibold text-gray-700">
        Account
      </h1>
      <p className="mb-12 text-sm text-gray-500">
        Your Light Rider account details.
      </p>

      <div className="flex items-center gap-4 mb-12">
        <AccountAvatar
          src={customAvatarUrl}
          fallbackSrc={generatedAvatarUrl}
          name={name || email || "Your account"}
        />
        <div className="min-w-0">
          {name && (
            <p className="text-3xl font-semibold text-gray-800 truncate">
              {name}
            </p>
          )}
          <CurrentPlanBadge />
        </div>
      </div>

      <ProfileActions
        name={name}
        email={email ?? ""}
        birthdate={birthdate}
        mfaEnabled={mfaEnabled}
        hasPassword={hasPassword}
        connectedAccounts={<ConnectedAccounts identities={socialIdentities} />}
      />

      <div className="mt-6">
        {/* TODO(backend): signOut(logtoConfig) via @logto/next/server-actions (handleSignOut is a mock no-op) */}
        <LogoutButton onSignOut={handleSignOut} />
      </div>
    </div>
  );
}
