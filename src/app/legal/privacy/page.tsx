import LegalDocumentPage, { legalMetadata } from "@/components/legal/LegalDocumentPage";
import PrivacyPolicy from "@/content/legal/privacy-policy.mdx";
import { getLegalDoc } from "@/lib/legal";

const doc = getLegalDoc("general", "privacy");

export const metadata = legalMetadata(doc);

export default function Page() {
  return (
    <LegalDocumentPage doc={doc}>
      <PrivacyPolicy />
    </LegalDocumentPage>
  );
}
