import LegalDocumentPage, { legalMetadata } from "@/components/legal/LegalDocumentPage";
import PqcTerms from "@/content/legal/pqc-terms.mdx";
import { getLegalDoc } from "@/lib/legal";

const doc = getLegalDoc("pqc", "terms");

export const metadata = legalMetadata(doc);

export default function Page() {
  return (
    <LegalDocumentPage doc={doc}>
      <PqcTerms />
    </LegalDocumentPage>
  );
}
