"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { useCart } from "@/lib/cart-context";
import { CartDrawer } from "./cart-drawer";
import { NewsletterForm } from "./newsletter-form";
import { CurrencySwitcher } from "./currency-switcher";
import { LogoWordmark } from "./logo-wordmark";

const ANNOUNCEMENT = "Spedizione gratuita oltre 60€  ·  Resi 30 giorni";

const MENU = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Collezione" },
  { href: "/products/burgundy-caelia", label: "Burgundy Caelia" },
  { href: "/products/cacao-caelia", label: "Cacao Caelia" },
  { href: "/products/crema-caelia", label: "Crema Caelia" },
  { href: "/about", label: "Storia" },
  { href: "/journal", label: "Journal" },
  { href: "/contact", label: "Contatti" },
];

export function SiteChrome({ children }: { children: ReactNode }) {
  const { itemCount, open } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <div className="overflow-hidden bg-night text-cream text-xs tracking-[0.18em] uppercase py-2">
        <div className="flex whitespace-nowrap marquee">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="mx-8">
              · {ANNOUNCEMENT}
            </span>
          ))}
        </div>
      </div>

      <header className="sticky top-0 z-[300] bg-cream border-b border-mist/60">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex items-center justify-between h-20">
            <button
              type="button"
              aria-label="Apri menu"
              aria-expanded={menuOpen}
              className="cursor-pointer py-3 pr-8 text-left text-lg md:text-2xl"
              onClick={() => setMenuOpen(true)}
            >
              <LogoWordmark />
            </button>

            <div className="flex items-center gap-5 text-xs uppercase tracking-[0.18em]">
              <CurrencySwitcher />
              <button
                type="button"
                className="relative"
                onClick={open}
                aria-label={`Apri carrello, ${itemCount} articoli`}
              >
                Carrello
                {itemCount > 0 && (
                  <span className="absolute -right-4 -top-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-burgundy px-1 text-[10px] text-cream">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {menuOpen ? (
        <div className="fixed inset-0 z-[500]">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            aria-label="Chiudi menu"
            onClick={() => setMenuOpen(false)}
          />
          <aside className="absolute left-0 top-0 h-full w-[min(100%,22rem)] bg-cream text-ink shadow-2xl overflow-y-auto">
            <div className="flex items-center justify-between px-8 py-6 border-b border-mist/60">
              <p className="text-lg">
                <LogoWordmark />
              </p>
              <button
                type="button"
                className="text-xs uppercase tracking-[0.22em]"
                onClick={() => setMenuOpen(false)}
              >
                Chiudi
              </button>
            </div>
            <nav className="flex flex-col gap-5 p-8 text-2xl font-serif">
              {MENU.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </aside>
        </div>
      ) : null}

      <main className="flex-1">{children}</main>

      <footer className="bg-night text-cream mt-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 grid gap-10 md:grid-cols-2">
          <div className="md:max-w-md">
            <p className="text-2xl">
              <LogoWordmark />
            </p>
            <p className="mt-4 text-sm text-cream/70 leading-relaxed">
              Aprire. Ritoccare. Ripartire. L&apos;astuccio beauty con specchio
              per le donne che non si fermano.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 md:justify-self-end md:gap-12">
            <FooterColumn
              title="Collezione"
              links={[
                { href: "/products/burgundy-caelia", label: "Burgundy Caelia" },
                { href: "/products/cacao-caelia", label: "Cacao Caelia" },
                { href: "/products/crema-caelia", label: "Crema Caelia" },
                { href: "/products", label: "Tutta la collezione" },
              ]}
            />
            <FooterColumn
              title="Aiuto"
              links={[
                { href: "/about", label: "Storia" },
                { href: "/shipping", label: "Spedizioni" },
                { href: "/faq", label: "FAQ" },
                { href: "/contact", label: "Contatti" },
              ]}
            />
          </div>
        </div>
        <div className="border-t border-cream/10">
          <div className="mx-auto max-w-7xl px-6 lg:px-10 py-10 grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-cream/80">
                Newsletter
              </p>
            </div>
            <NewsletterForm />
          </div>
        </div>
        <div className="border-t border-cream/10 py-6 text-xs text-cream/60">
          <div className="mx-auto max-w-7xl px-6 lg:px-10 flex flex-col md:flex-row justify-between gap-3">
            <p>© {new Date().getFullYear()} CAELIA.</p>
            <p>
              <Link href="/privacy">Privacy</Link>
              {" · "}
              <Link href="/terms">Termini</Link>
            </p>
          </div>
        </div>
      </footer>

      <CartDrawer />
    </>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.18em] text-cream/80">{title}</p>
      <ul className="mt-3 space-y-2 text-sm text-cream/70">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href}>{l.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
