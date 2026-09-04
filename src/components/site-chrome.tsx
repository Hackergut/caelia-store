"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
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
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

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
            alignItems: "center",
            height: 72,
            padding: "0 24px",
            gap: 16,
          }}
        >
          <button
            type="button"
            aria-label={menuOpen ? "Chiudi menu" : "Apri menu"}
            onClick={() => setMenuOpen((v) => !v)}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 5,
              width: 40,
              height: 40,
              flexShrink: 0,
              background: "transparent",
              border: "1px solid #4a0e16",
              cursor: "pointer",
            }}
          >
            <span style={{ display: "block", width: 16, height: 1.5, background: "#4a0e16" }} />
            <span style={{ display: "block", width: 16, height: 1.5, background: "#4a0e16" }} />
            <span style={{ display: "block", width: 16, height: 1.5, background: "#4a0e16" }} />
          </button>

          <span style={{ fontSize: 20, whiteSpace: "nowrap" }}>
            <LogoWordmark />
          </span>
          <Link
            href="/cart"
            style={{
              position: "relative",
              marginLeft: "auto",
              fontSize: 11,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
            }}
          >
            Carrello
            {itemCount > 0 ? (
              <span className="site-bar__count">{itemCount}</span>
            ) : null}
          </Link>
        </div>
        <nav
          aria-label="Principale"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px 28px",
            padding: "10px 24px 14px",
            borderTop: "1px solid #e0d6c9",
            fontSize: 11,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          {NAV.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={
                pathname === l.href
                  ? { textDecoration: "underline", textUnderlineOffset: 6, color: "#4a0e16" }
                  : { color: "#4a0e16" }
              }
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </header>

      {menuOpen ? (
        <div style={{ position: "fixed", inset: 0, zIndex: 600 }}>
          <button
            type="button"
            aria-label="Chiudi menu"
            onClick={() => setMenuOpen(false)}
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.45)",
              border: 0,
              cursor: "pointer",
            }}
          />
          <aside
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              height: "100%",
              width: "min(22rem, 100%)",
              background: "#f7f1ea",
              overflowY: "auto",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                height: 72,
                padding: "0 24px",
                borderBottom: "1px solid #e0d6c9",
              }}
            >
              <span style={{ fontSize: 20 }}>
                <LogoWordmark />
              </span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                style={{
                  background: "transparent",
                  border: 0,
                  fontSize: 11,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                }}
              >
                Chiudi
              </button>
            </div>
            <nav
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 20,
                padding: 32,
                fontSize: 24,
                fontWeight: 300,
              }}
            >
              {NAV.map((l) => (
                <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>
                  {l.label}
                </Link>
              ))}
            </nav>
          </aside>
        </div>
      ) : null}

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
