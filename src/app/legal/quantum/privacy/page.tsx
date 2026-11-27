import LegalDocumentPage, { legalMetadata } from "@/components/legal/LegalDocumentPage";
import QuantumPrivacy from "@/content/legal/quantum-privacy.mdx";
import { getLegalDoc } from "@/lib/legal";

const doc = getLegalDoc("quantum", "privacy");

export const metadata = legalMetadata(doc);

export default function Page() {
  return (
    <LegalDocumentPage doc={doc}>
      <QuantumPrivacy />
    </LegalDocumentPage>
  );
}
