import LegalDocumentPage, { legalMetadata } from "@/components/legal/LegalDocumentPage";
import GeneralTerms from "@/content/legal/general-terms.mdx";
import { getLegalDoc } from "@/lib/legal";

const doc = getLegalDoc("general", "terms");

export const metadata = legalMetadata(doc);

export default function Page() {
  return (
    <LegalDocumentPage doc={doc}>
      <GeneralTerms />
    </LegalDocumentPage>
  );
}
