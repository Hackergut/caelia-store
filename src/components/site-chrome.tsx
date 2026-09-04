"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode } from "react";
import { useCart } from "@/lib/cart-context";
import { CartDrawer } from "./cart-drawer";
import { NewsletterForm } from "./newsletter-form";
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

  return (
    <>
      <style>{`
        .caelia-top {
          position: sticky;
          top: 0;
          z-index: 300;
          background: #f7f1ea;
          border-bottom: 1px solid #e0d6c9;
        }
        .caelia-row {
          display: flex;
          align-items: center;
          height: 80px;
          padding: 0 32px;
          gap: 28px;
        }
        .caelia-menu {
          position: relative;
          flex: 0 0 auto;
        }
        .caelia-menu > summary {
          list-style: none;
          cursor: pointer;
          font-size: 20px;
          white-space: nowrap;
        }
        .caelia-menu > summary::-webkit-details-marker { display: none; }
        .caelia-panel {
          display: none;
          position: absolute;
          left: 0;
          top: calc(100% + 12px);
          z-index: 400;
          min-width: 220px;
          background: #f7f1ea;
          border: 1px solid #e0d6c9;
          padding: 12px 0;
        }
        .caelia-menu[open] .caelia-panel { display: block; }
        .caelia-panel a {
          display: block;
          padding: 10px 20px;
          font-size: 13px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }
        .caelia-pc {
          display: flex;
          align-items: center;
          flex: 1;
          gap: 28px;
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }
        .caelia-cart {
          margin-left: auto;
          font-size: 11px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          white-space: nowrap;
        }
        @media (min-width: 768px) {
          .caelia-menu > summary { cursor: default; pointer-events: none; }
          .caelia-panel { display: none !important; }
        }
        @media (max-width: 767px) {
          .caelia-pc { display: none; }
          .caelia-row { height: 64px; padding: 0 16px; gap: 12px; }
        }
      `}</style>

      <div className="overflow-hidden bg-night text-cream text-xs tracking-[0.18em] uppercase py-2">
        <div className="flex whitespace-nowrap marquee">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="mx-8">
              · {ANNOUNCEMENT}
            </span>
          ))}
        </div>
      </div>

      <header className="caelia-top">
        <div className="caelia-row">
          <details className="caelia-menu">
            <summary aria-label="Menu CAELIA">
              <LogoWordmark />
            </summary>
            <nav className="caelia-panel">
              {NAV.map((l) => (
                <Link key={l.href} href={l.href}>
                  {l.label}
                </Link>
              ))}
            </nav>
          </details>

          <nav className="caelia-pc" aria-label="Principale">
            {NAV.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                style={{
                  color: "#4a0e16",
                  textDecoration: pathname === l.href ? "underline" : "none",
                  textUnderlineOffset: 8,
                }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <Link href="/cart" className="caelia-cart">
            Carrello
            {itemCount > 0 ? ` (${itemCount})` : ""}
          </Link>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="mt-24 bg-night text-cream">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-2 lg:px-10">
          <div className="md:max-w-md">
            <p className="text-2xl">
              <LogoWordmark />
            </p>
            <p className="mt-4 text-sm leading-relaxed text-cream/70">Aprire. Ritoccare. Ripartire.</p>
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
              ]}
            />
          </div>
        </div>
        <div className="border-t border-cream/10">
          <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
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
