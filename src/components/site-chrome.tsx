"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";
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

  useEffect(() => {
    const d = document.getElementById("caelia-menu") as HTMLDetailsElement | null;
    if (d) d.open = false;
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

      <header className="sticky top-0 z-[300] bg-cream border-b border-mist/60">
        <div className="relative flex h-[4.25rem] w-full items-center">
          <details id="caelia-menu" className="group">
            <summary className="flex h-[4.25rem] cursor-pointer list-none items-center pl-5 sm:pl-8 text-xl md:text-2xl [&::-webkit-details-marker]:hidden">
              <LogoWordmark />
            </summary>
            <div className="fixed inset-0 z-[600]">
              <div className="absolute inset-0 bg-black/50" />
              <aside className="absolute left-0 top-0 h-full w-[min(22rem,100%)] bg-cream text-ink overflow-y-auto">
                <div className="flex h-[4.25rem] items-center justify-between px-6 border-b border-mist">
                  <span className="text-lg">
                    <LogoWordmark />
                  </span>
                </div>
                <nav className="flex flex-col p-8 gap-6 text-2xl font-light">
                  {NAV.map((l) => (
                    <Link key={l.href} href={l.href}>
                      {l.label}
                    </Link>
                  ))}
                </nav>
              </aside>
            </div>
          </details>

          <Link
            href="/cart"
            className="absolute right-5 sm:right-8 top-1/2 -translate-y-1/2 text-[11px] uppercase tracking-[0.22em]"
          >
            Carrello
            {itemCount > 0 ? (
              <span className="absolute -right-3 -top-2 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-burgundy px-1 text-[10px] text-cream">
                {itemCount}
              </span>
            ) : null}
          </Link>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="bg-night text-cream mt-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 grid gap-10 md:grid-cols-2">
          <div className="md:max-w-md">
            <p className="text-2xl">
              <LogoWordmark />
            </p>
            <p className="mt-4 text-sm text-cream/70 leading-relaxed">
              Aprire. Ritoccare. Ripartire.
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
