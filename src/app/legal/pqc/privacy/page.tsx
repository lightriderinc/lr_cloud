import LegalDocumentPage, { legalMetadata } from "@/components/legal/LegalDocumentPage";
import PqcPrivacy from "@/content/legal/pqc-privacy.mdx";
import { getLegalDoc } from "@/lib/legal";

const doc = getLegalDoc("pqc", "privacy");

export const metadata = legalMetadata(doc);

export default function Page() {
  return (
    <LegalDocumentPage doc={doc}>
      <PqcPrivacy />
    </LegalDocumentPage>
  );
}
