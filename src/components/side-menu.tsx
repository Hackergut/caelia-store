"use client";

import Link from "next/link";
import { useEffect } from "react";
import { LogoWordmark } from "./logo-wordmark";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Collezione" },
  { href: "/about", label: "Storia" },
  { href: "/journal", label: "Journal" },
  { href: "/search", label: "Cerca" },
  { href: "/stores", label: "Boutique" },
  { href: "/wishlist", label: "Preferiti" },
  { href: "/account", label: "Account" },
  { href: "/contact", label: "Contatti" },
];

export function SideMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div
        aria-hidden={!open}
        className={`fixed inset-0 z-[65] bg-night/40 transition-opacity duration-[var(--dur-medium)] ease-[var(--ease-out)] ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />
      <aside
        className={`fixed left-0 top-0 z-[70] h-full w-[min(100%,22rem)] bg-cream text-ink shadow-2xl transition-transform duration-[var(--dur-slow)] ease-[var(--ease-drawer)] ${
          open ? "translate-x-0" : "-translate-x-full pointer-events-none"
        }`}
        aria-hidden={!open}
        aria-label="Menu"
      >
        <div className="flex items-center justify-between px-8 py-6 border-b border-mist/60">
          <p className="text-lg">
            <LogoWordmark />
          </p>
          <button
            type="button"
            onClick={onClose}
            className="text-xs uppercase tracking-[0.22em] nav-link"
          >
            Chiudi
          </button>
        </div>
        <nav className="flex flex-col gap-6 p-8 text-2xl font-serif">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} onClick={onClose} className="nav-link w-fit">
              {l.label}
            </Link>
          ))}
        </nav>
        <p className="absolute bottom-8 left-8 right-8 text-xs uppercase tracking-[0.22em] text-ink/50">
          Los Angeles · Dubai
        </p>
      </aside>
    </>
  );
}
