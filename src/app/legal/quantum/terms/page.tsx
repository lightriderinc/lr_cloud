import LegalDocumentPage, { legalMetadata } from "@/components/legal/LegalDocumentPage";
import QuantumTerms from "@/content/legal/quantum-terms.mdx";
import { getLegalDoc } from "@/lib/legal";

const doc = getLegalDoc("quantum", "terms");

export const metadata = legalMetadata(doc);

export default function Page() {
  return (
    <LegalDocumentPage doc={doc}>
      <QuantumTerms />
    </LegalDocumentPage>
  );
}
