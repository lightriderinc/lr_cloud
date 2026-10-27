"use client";

import { useEffect, useState, type ReactNode } from "react";
import { MdMenu, MdClose, MdMenuBook } from "react-icons/md";
import { DOCS_URL, MAIN_NAV } from "@/lib/solutions";
import SidebarGroupSettings from "./sidebar/SidebarGroupSettings";
import SidebarNavGroup from "./sidebar/SidebarNavGroup";
import SidebarNavItem from "./sidebar/SidebarNavItem";

export default function MobileMenu({
  children,
  isAuthenticated = false,
}: {
  children?: ReactNode;
  isAuthenticated?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="flex h-9 w-9 items-center justify-center default-radius transition-colors hover:bg-gray-100"
      >
        <MdMenu className="text-2xl text-gray-700" />
      </button>

      {/* Always mounted so the panel can slide in and out. */}
      <div
        aria-hidden={!open}
        onClick={close}
        className={`fixed inset-0 z-50 flex justify-end transition-colors duration-300 motion-reduce:transition-none ${
          open ? "bg-black/40" : "pointer-events-none bg-transparent"
        }`}
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          onClick={(e) => e.stopPropagation()}
          className={`flex h-full w-72 max-w-[85%] flex-col bg-white shadow-xl transition-transform duration-300 ease-out motion-reduce:transition-none ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex h-14 shrink-0 items-center justify-between border-b border-gray-100 px-4">
            <span className="text-sm font-medium text-gray-600">Menu</span>
            <button
              type="button"
              aria-label="Close menu"
              onClick={close}
              className="flex h-9 w-9 items-center justify-center default-radius transition-colors hover:bg-gray-100"
            >
              <MdClose className="text-2xl text-gray-700" />
            </button>
          </div>

          {/* The header's main nav, followed by the settings nav — the
              desktop account dropdown's contents — on every page. */}
          <nav className="flex-1 overflow-auto px-3 py-4">
            <SidebarNavGroup label="Light Rider Cloud">
              {MAIN_NAV.map(({ name, href, icon }) => (
                <SidebarNavItem
                  key={href}
                  name={name}
                  href={href}
                  icon={icon}
                  onNavigate={close}
                />
              ))}
              <SidebarNavItem
                name="Docs"
                href={DOCS_URL}
                icon={MdMenuBook}
                onNavigate={close}
                external
              />
            </SidebarNavGroup>
            <SidebarGroupSettings
              onNavigate={close}
              isAuthenticated={isAuthenticated}
            />
          </nav>

          {children && (
            <div className="border-t border-gray-100 p-3">{children}</div>
          )}
        </div>
      </div>
    </div>
  );
}
