import LegalDocumentPage, { legalMetadata } from "@/components/legal/LegalDocumentPage";
import EntropyTerms from "@/content/legal/entropy-terms.mdx";
import { getLegalDoc } from "@/lib/legal";

const doc = getLegalDoc("entropy", "terms");

export const metadata = legalMetadata(doc);

export default function Page() {
  return (
    <LegalDocumentPage doc={doc}>
      <EntropyTerms />
    </LegalDocumentPage>
  );
}
