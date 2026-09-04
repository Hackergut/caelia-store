"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { useCart } from "@/lib/cart-context";
import { CartDrawer } from "./cart-drawer";
import { SideMenu } from "./side-menu";
import { NewsletterForm } from "./newsletter-form";
import { CurrencySwitcher } from "./currency-switcher";
import { LogoWordmark } from "./logo-wordmark";

const ANNOUNCEMENT =
  "Spedizione gratuita in Italia oltre 60 euro · Resi gratuiti entro 30 giorni";

export function SiteChrome({ children }: { children: ReactNode }) {
  const { itemCount, open } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  // Only the home page gets the transparent-over-hero treatment.
  const isHome = pathname === "/";

  // Track scroll position with a passive listener so we never block the
  // main thread. After 8px we commit to the solid header — anything
  // tighter feels twitchy on trackpads.
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Reset to top on route change so the new page starts fresh.
  useEffect(() => {
    setScrolled(false);
  }, [pathname]);

  const headerSolid = !isHome || scrolled;
  const headerClass = [
    "sticky top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-[var(--dur-base)] ease-[var(--ease-out)]",
    headerSolid
      ? "bg-cream/95 backdrop-blur-md border-b border-mist/60"
      : "bg-transparent border-b border-transparent",
  ].join(" ");

  return (
    <>
      {/* Announcement bar */}
      <div className="overflow-hidden bg-night text-cream text-xs tracking-[0.18em] uppercase py-2">
        <div className="flex whitespace-nowrap marquee">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="mx-8">
              · {ANNOUNCEMENT}
            </span>
          ))}
        </div>
      </div>

      <header className={headerClass}>
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex items-center justify-between h-20">
            <button
              type="button"
              aria-label="Apri menu CAELIA"
              aria-expanded={mobileOpen}
              className="text-xl md:text-2xl text-left"
              onClick={() => setMobileOpen(true)}
            >
              <LogoWordmark />
            </button>

            <div className="flex items-center gap-5 text-xs uppercase tracking-[0.18em]">
              <CurrencySwitcher />
              <button
                type="button"
                className="nav-link relative"
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

      <main className="flex-1">{children}</main>

      {/* Footer — 2 colonne: brand block (esteso) + due gruppi di link.
          Su mobile collassa a colonna singola. */}
      <footer className="bg-night text-cream mt-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 grid gap-10 md:grid-cols-2">
          {/* Brand block — descrizione estesa, social, sede */}
          <div className="md:max-w-md">
            <p className="text-2xl">
              <LogoWordmark />
            </p>
            <p className="mt-4 text-sm text-cream/70 leading-relaxed">
              Aprire. Ritoccare. Ripartire. L&apos;astuccio beauty con specchio
              per le donne che non si fermano. Pensato da Carla e Giulia, due
              sorelle che vivono fra Los Angeles e Dubai — e che avevano bisogno
              di un beauty case elegante, ordinato, sempre a portata di mano.
            </p>
            <div className="mt-6 flex items-center gap-4 text-xs uppercase tracking-[0.18em] text-cream/60">
              <span>Los Angeles</span>
              <span aria-hidden="true">·</span>
              <span>Dubai</span>
              <span aria-hidden="true">·</span>
              <span>Made in Italy</span>
            </div>
            {/* Social row — placeholder anchor per Instagram/TikTok quando attivi */}
            <div className="mt-6 flex items-center gap-5 text-xs uppercase tracking-[0.18em] text-cream/70">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link"
              >
                Instagram
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link"
              >
                TikTok
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link"
              >
                Pinterest
              </a>
            </div>
          </div>

          {/* Due gruppi di link affiancati */}
          <div className="grid gap-8 sm:grid-cols-2 md:justify-self-end md:gap-12">
            <FooterColumn
              title="Esplora"
              links={[
                { href: "/products", label: "Collezione" },
                { href: "/about", label: "La nostra storia" },
                { href: "/journal", label: "Journal" },
                { href: "/press", label: "Press & media" },
                { href: "/stores", label: "Boutique" },
              ]}
            />
            <FooterColumn
              title="Aiuto"
              links={[
                { href: "/shipping", label: "Spedizioni e resi" },
                { href: "/returns", label: "Resi" },
                { href: "/faq", label: "Domande frequenti" },
                { href: "/contact", label: "Contatti" },
                { href: "/sostenibilita", label: "Sostenibilità" },
              ]}
            />
          </div>
        </div>

        {/* Newsletter strip — full-width sotto brand+link */}
        <div className="border-t border-cream/10">
          <div className="mx-auto max-w-7xl px-6 lg:px-10 py-10 grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-cream/80">
                Newsletter
              </p>
              <p className="mt-2 text-sm text-cream/70">
                Iscriviti per ricevere lanci, rifornimenti e consigli di stile.
              </p>
            </div>
            <NewsletterForm />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-cream/10 py-6 text-xs text-cream/60">
          <div className="mx-auto max-w-7xl px-6 lg:px-10 flex flex-col md:flex-row justify-between gap-3">
            <p>© {new Date().getFullYear()} CAELIA. Tutti i diritti riservati.</p>
            <p>
              <Link href="/privacy" className="nav-link">Privacy</Link>
              {" · "}
              <Link href="/terms" className="nav-link">Termini</Link>
              {" · "}
              <Link href="/cookies" className="nav-link">Cookie</Link>
            </p>
          </div>
        </div>
      </footer>

      <CartDrawer />
      <SideMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
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