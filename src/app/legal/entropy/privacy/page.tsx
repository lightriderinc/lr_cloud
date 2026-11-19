import LegalDocumentPage, { legalMetadata } from "@/components/legal/LegalDocumentPage";
import EntropyPrivacy from "@/content/legal/entropy-privacy.mdx";
import { getLegalDoc } from "@/lib/legal";

const doc = getLegalDoc("entropy", "privacy");

export const metadata = legalMetadata(doc);

export default function Page() {
  return (
    <LegalDocumentPage doc={doc}>
      <EntropyPrivacy />
    </LegalDocumentPage>
  );
}
