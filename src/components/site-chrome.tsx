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
      <div className="overflow-hidden bg-night text-cream text-xs tracking-[0.18em] uppercase py-2">
        <div className="flex whitespace-nowrap marquee">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="mx-8">
              · {ANNOUNCEMENT}
            </span>
          ))}
        </div>
      </div>

      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 300,
          background: "#f7f1ea",
          borderBottom: "1px solid #e0d6c9",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 16,
            padding: "16px 24px",
          }}
        >
          <details style={{ position: "relative" }}>
            <summary
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 5,
                width: 40,
                height: 40,
                border: "1px solid #4a0e16",
                cursor: "pointer",
                listStyle: "none",
              }}
            >
              <span style={{ display: "block", width: 16, height: 2, background: "#4a0e16" }} />
              <span style={{ display: "block", width: 16, height: 2, background: "#4a0e16" }} />
              <span style={{ display: "block", width: 16, height: 2, background: "#4a0e16" }} />
            </summary>
            <nav
              style={{
                position: "absolute",
                left: 0,
                top: "calc(100% + 8px)",
                zIndex: 400,
                minWidth: 220,
                background: "#f7f1ea",
                border: "1px solid #e0d6c9",
                padding: "16px 0",
                boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
              }}
            >
              {NAV.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  style={{
                    display: "block",
                    padding: "10px 20px",
                    fontSize: 13,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                  }}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </details>

          <span style={{ fontSize: 20, whiteSpace: "nowrap" }}>
            <LogoWordmark />
          </span>

          <nav
            aria-label="Principale"
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "10px 22px",
              flex: 1,
              fontSize: 11,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            {NAV.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                style={{
                  color: "#4a0e16",
                  textDecoration: pathname === l.href ? "underline" : "none",
                  textUnderlineOffset: 6,
                }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/cart"
            style={{
              marginLeft: "auto",
              fontSize: 11,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
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
