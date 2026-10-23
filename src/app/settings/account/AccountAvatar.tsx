"use client";

import ProfileAvatar from "@/components/profile/ProfileAvatar";
import {
  mockRemoveAvatar,
  mockUpdateAvatarUrl,
  mockUploadAvatar,
} from "./mockActions";

type Props = {
  src: string | null;
  fallbackSrc: string;
  name: string;
};

/**
 * Mock-only client boundary: the cloud platform's page.tsx renders
 * ProfileAvatar directly and passes its server actions as props. Functions
 * can't cross from a server component to a client one unless they're server
 * actions, so the mock handlers are attached here instead.
 */
export default function AccountAvatar({ src, fallbackSrc, name }: Props) {
  return (
    <ProfileAvatar
      src={src}
      fallbackSrc={fallbackSrc}
      name={name}
      size={64}
      // TODO(backend): pass the server actions (Supabase Storage upload + Logto updateAvatar) from page.tsx instead.
      onUpdateAvatarUrl={mockUpdateAvatarUrl}
      onUploadAvatar={mockUploadAvatar}
      onRemoveAvatar={mockRemoveAvatar}
    />
  );
}
