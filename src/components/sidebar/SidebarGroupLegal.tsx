import { GENERAL_LEGAL_DOCS } from "@/lib/legal";
import { MdGavel, MdPrivacyTip, MdSummarize } from "react-icons/md";
import SidebarNavGroup from "./SidebarNavGroup";
import SidebarNavItem from "./SidebarNavItem";

const kindIcon = { terms: MdGavel, privacy: MdPrivacyTip } as const;

/**
 * Secondary-rail nav for /legal: the overview and the two unified documents
 * only. Platform-specific documents are reachable from the overview alone.
 */
export default function SidebarGroupLegal({
  onNavigate,
}: {
  onNavigate?: () => void;
}) {
  return (
    <SidebarNavGroup label="Legal">
      <SidebarNavItem
        name="Overview"
        href="/legal"
        icon={MdSummarize}
        onNavigate={onNavigate}
        exact
      />
      {GENERAL_LEGAL_DOCS.map((doc) => (
        <SidebarNavItem
          key={doc.href}
          name={doc.navLabel}
          href={doc.href}
          icon={kindIcon[doc.kind]}
          onNavigate={onNavigate}
        />
      ))}
    </SidebarNavGroup>
  );
}
