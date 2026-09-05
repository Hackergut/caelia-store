"use client";

import Link from "next/link";
import { useEffect } from "react";
import { createPortal } from "react-dom";
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
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-[400]">
      <button
        type="button"
        aria-label="Chiudi menu"
        className="absolute inset-0 bg-night/40"
        onClick={onClose}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Menu CAELIA"
        className="absolute left-0 top-0 h-full w-[min(100%,22rem)] bg-cream text-ink shadow-2xl"
      >
        <div className="flex items-center justify-between px-8 py-6 border-b border-mist/60">
          <p className="text-lg">
            <LogoWordmark />
          </p>
          <button
            type="button"
            onClick={onClose}
            className="text-xs uppercase tracking-[0.22em] pointer-events-auto"
          >
            Chiudi
          </button>
        </div>
        <nav className="flex flex-col gap-6 p-8 text-2xl">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={onClose}
              className="w-fit"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <p className="absolute bottom-8 left-8 right-8 text-xs uppercase tracking-[0.22em] text-ink/50">
          Los Angeles · Dubai
        </p>
      </aside>
    </div>,
    document.body,
  );
}
