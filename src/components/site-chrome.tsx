"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { useCart } from "@/lib/cart-context";
import { CartDrawer } from "./cart-drawer";
import { MobileMenu } from "./mobile-menu";
import { NewsletterForm } from "./newsletter-form";

const ANNOUNCEMENT =
  "Spedizione gratuita in Italia oltre 60 euro · Resi gratuiti entro 30 giorni";

export function SiteChrome({ children }: { children: ReactNode }) {
  const { itemCount, open } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Announcement bar */}
      <div className="overflow-hidden bg-charcoal text-cream text-xs tracking-[0.18em] uppercase py-2">
        <div className="flex whitespace-nowrap marquee">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="mx-8">
              · {ANNOUNCEMENT}
            </span>
          ))}
        </div>
      </div>

      <header className="sticky top-0 z-40 bg-cream/85 backdrop-blur-md border-b border-mist/60">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-3 items-center h-20">
            <button
              type="button"
              aria-label="Apri menu"
              className="justify-self-start inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] md:hidden"
              onClick={() => setMobileOpen(true)}
            >
              <span className="block h-px w-6 bg-charcoal" />
              <span className="block h-px w-6 bg-charcoal" />
            </button>
            <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.22em]">
              <Link href="/products" className="nav-link">Collezione</Link>
              <Link href="/about" className="nav-link">Storia</Link>
              <Link href="/journal" className="nav-link">Journal</Link>
            </nav>

            <Link
              href="/"
              className="justify-self-center font-serif text-2xl md:text-3xl tracking-[0.05em]"
              aria-label="CAELIA home"
            >
              CAELIA
            </Link>

            <div className="justify-self-end flex items-center gap-5 text-xs uppercase tracking-[0.18em]">
              <Link href="/wishlist" className="nav-link hidden sm:inline">
                Preferiti
              </Link>
              <Link href="/account" className="nav-link hidden sm:inline">
                Account
              </Link>
              <button
                type="button"
                className="nav-link relative"
                onClick={open}
                aria-label={`Apri carrello, ${itemCount} articoli`}
              >
                Carrello
                {itemCount > 0 && (
                  <span className="absolute -right-4 -top-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-rose px-1 text-[10px] text-cream">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="bg-charcoal text-cream mt-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 grid gap-10 md:grid-cols-4">
          <div>
            <p className="font-serif text-2xl">CAELIA</p>
            <p className="mt-3 text-sm text-cream/70 max-w-xs">
              Aprire. Ritoccare. Ripartire. Lastuccio beauty con specchio per chi
              vive di continuo passaggio.
            </p>
          </div>
          <FooterColumn
            title="Esplora"
            links={[
              { href: "/products", label: "Collezione" },
              { href: "/about", label: "La nostra storia" },
              { href: "/journal", label: "Journal" },
            ]}
          />
          <FooterColumn
            title="Aiuto"
            links={[
              { href: "/shipping", label: "Spedizioni e resi" },
              { href: "/faq", label: "Domande frequenti" },
              { href: "/contact", label: "Contatti" },
            ]}
          />
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-cream/80">
              Newsletter
            </p>
            <p className="mt-3 text-sm text-cream/70">
              Iscriviti per ricevere lanci, rifornimenti e consigli di stile.
            </p>
            <NewsletterForm />
          </div>
        </div>
        <div className="border-t border-cream/10 py-6 text-xs text-cream/60">
          <div className="mx-auto max-w-7xl px-6 lg:px-10 flex flex-col md:flex-row justify-between gap-3">
            <p>© {new Date().getFullYear()} CAELIA. Tutti i diritti riservati.</p>
            <p>Carla &amp; Giulia · Los Angeles · Dubai</p>
          </div>
        </div>
      </footer>

      <CartDrawer />
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
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
            <Link href={l.href} className="nav-link">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
