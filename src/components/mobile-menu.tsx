"use client";

import Link from "next/link";
import { useEffect } from "react";

export function MobileMenu({
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
        className={`fixed inset-0 z-40 bg-night/30 transition-opacity duration-300 md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />
      <div
        className={`fixed left-0 top-0 z-50 h-full w-full max-w-xs bg-cream shadow-2xl transition-transform duration-300 md:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-mist/60">
          <p className="font-serif text-xl">CAELIA</p>
          <button
            type="button"
            onClick={onClose}
            className="text-xs uppercase tracking-[0.18em]"
          >
            Chiudi
          </button>
        </div>
        <nav className="flex flex-col gap-6 p-6 text-lg font-serif">
          <Link href="/products" onClick={onClose}>Collezione</Link>
          <Link href="/about" onClick={onClose}>Storia</Link>
          <Link href="/journal" onClick={onClose}>Journal</Link>
          <Link href="/stores" onClick={onClose}>Boutique</Link>
          <Link href="/account" onClick={onClose}>Account</Link>
          <Link href="/login" onClick={onClose}>Accedi</Link>
          <Link href="/contact" onClick={onClose}>Contatti</Link>
        </nav>
      </div>
    </>
  );
}
