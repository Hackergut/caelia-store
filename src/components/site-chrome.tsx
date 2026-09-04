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

const NAV = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Collezione" },
  { href: "/products/burgundy-caelia", label: "Burgundy" },
  { href: "/products/cacao-caelia", label: "Cacao" },
  { href: "/products/crema-caelia", label: "Crema" },
  { href: "/about", label: "Storia" },
  { href: "/contact", label: "Contatti" },
];

export function SiteChrome({ children }: { children: ReactNode }) {
  const { itemCount } = useCart();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

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
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between h-16 md:h-20 gap-4">
            <button
              type="button"
              className="md:hidden flex flex-col justify-center gap-[5px] h-10 w-10"
              aria-label={menuOpen ? "Chiudi menu" : "Apri menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span
                className={`block h-px w-5 bg-ink transition ${menuOpen ? "translate-y-[6px] rotate-45" : ""}`}
              />
              <span className={`block h-px w-5 bg-ink ${menuOpen ? "opacity-0" : ""}`} />
              <span
                className={`block h-px w-5 bg-ink transition ${menuOpen ? "-translate-y-[6px] -rotate-45" : ""}`}
              />
            </button>

            <Link href="/" className="shrink-0 text-lg md:text-2xl" aria-label="CAELIA home">
              <LogoWordmark />
            </Link>

            <nav
              aria-label="Principale"
              className="hidden md:flex flex-1 items-center justify-center gap-6 text-[11px] uppercase tracking-[0.18em]"
            >
              {NAV.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={
                    pathname === l.href
                      ? "text-burgundy underline underline-offset-8"
                      : "text-ink hover:text-burgundy"
                  }
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            <Link
              href="/cart"
              className="relative text-[11px] uppercase tracking-[0.18em] shrink-0"
            >
              Carrello
              {itemCount > 0 ? (
                <span className="absolute -right-3 -top-2 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-burgundy px-1 text-[10px] text-cream">
                  {itemCount}
                </span>
              ) : null}
            </Link>
          </div>
        </div>
      </header>

      {menuOpen ? (
        <div className="fixed inset-0 z-[400] md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-night/40"
            aria-label="Chiudi menu"
            onClick={() => setMenuOpen(false)}
          />
          <aside className="absolute left-0 top-0 h-full w-[min(100%,20rem)] bg-cream shadow-2xl overflow-y-auto">
            <div className="flex items-center justify-between px-6 h-16 border-b border-mist/60">
              <LogoWordmark />
              <button
                type="button"
                className="text-[11px] uppercase tracking-[0.2em]"
                onClick={() => setMenuOpen(false)}
              >
                Chiudi
              </button>
            </div>
            <nav className="flex flex-col gap-5 p-8 text-2xl font-light">
              {NAV.map((l) => (
                <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>
                  {l.label}
                </Link>
              ))}
            </nav>
            <div className="px-8 pb-10">
              <CurrencySwitcher />
            </div>
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
              Aprire. Ritoccare. Ripartire. L&apos;astuccio beauty con specchio.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
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
                { href: "/cart", label: "Carrello" },
              ]}
            />
          </div>
        </div>
        <div className="border-t border-cream/10">
          <div className="mx-auto max-w-7xl px-6 lg:px-10 py-10">
            <NewsletterForm />
          </div>
        </div>
        <div className="border-t border-cream/10 py-6 text-xs text-cream/60">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <p>© {new Date().getFullYear()} CAELIA.</p>
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
