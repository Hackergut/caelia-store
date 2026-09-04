"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { Menu, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { CartDrawer } from "./cart-drawer";
import { NewsletterForm } from "./newsletter-form";
import { LogoWordmark } from "./logo-wordmark";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

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

const SECONDARY = [
  { href: "/journal", label: "Journal" },
  { href: "/shipping", label: "Spedizioni" },
  { href: "/faq", label: "FAQ" },
  { href: "/wishlist", label: "Wishlist" },
  { href: "/account", label: "Account" },
];

export function SiteChrome({ children }: { children: ReactNode }) {
  const { itemCount } = useCart();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [navPath, setNavPath] = useState(pathname);

  // Close the mobile nav on route change (render-phase sync, no effect)
  if (navPath !== pathname) {
    setNavPath(pathname);
    if (open) setOpen(false);
  }

  return (
    <>
      <div className="overflow-hidden bg-night py-2 text-[10px] uppercase tracking-[0.18em] text-cream sm:text-xs">
        <div className="marquee flex whitespace-nowrap">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="mx-6 sm:mx-8">
              · {ANNOUNCEMENT}
            </span>
          ))}
        </div>
      </div>

      <header className="sticky top-0 z-[300] border-b border-mist bg-cream/95 backdrop-blur supports-[backdrop-filter]:bg-cream/80">
        <div className="shell flex h-16 items-center gap-3 md:h-20 md:gap-7">
          {/* Mobile: hamburger opens a Sheet */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              aria-label="Apri il menu"
              className="-ml-2 inline-flex h-11 w-11 items-center justify-center text-ink md:hidden"
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
              <SheetHeader>
                <SheetTitle className="text-base">
                  <LogoWordmark />
                </SheetTitle>
              </SheetHeader>
              <nav
                className="flex-1 overflow-y-auto px-5 py-4"
                aria-label="Menu mobile"
              >
                <ul className="space-y-1">
                  {NAV.map((l) => (
                    <li key={l.href}>
                      <SheetClose asChild>
                        <Link
                          href={l.href}
                          className={cn(
                            "flex min-h-12 items-center text-sm uppercase tracking-[0.18em] text-ink/80",
                            pathname === l.href &&
                              "text-burgundy underline underline-offset-8",
                          )}
                        >
                          {l.label}
                        </Link>
                      </SheetClose>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 border-t border-mist/70 pt-5 text-[10px] uppercase tracking-[0.24em] text-ink/40">
                  Altro
                </p>
                <ul className="mt-2 space-y-1">
                  {SECONDARY.map((l) => (
                    <li key={l.href}>
                      <SheetClose asChild>
                        <Link
                          href={l.href}
                          className="flex min-h-11 items-center text-sm text-ink/70"
                        >
                          {l.label}
                        </Link>
                      </SheetClose>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="border-t border-mist/60 px-5 py-4 pb-safe">
                <SheetClose asChild>
                  <Link
                    href="/cart"
                    className="flex min-h-12 w-full items-center justify-center bg-burgundy text-[11px] uppercase tracking-[0.22em] text-cream"
                  >
                    Carrello{itemCount > 0 ? ` (${itemCount})` : ""}
                  </Link>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>

          {/* Brand — centered on mobile, leading on desktop */}
          <Link
            href="/"
            className="flex-1 text-center text-[17px] md:flex-none md:text-left md:text-xl"
            aria-label="CAELIA — home"
          >
            <LogoWordmark />
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden flex-1 items-center gap-5 text-[11px] uppercase tracking-[0.2em] md:flex lg:gap-7"
            aria-label="Principale"
          >
            {NAV.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={pathname === l.href ? "page" : undefined}
                className={cn(
                  "nav-link text-ink/80 transition-colors hover:text-burgundy",
                  pathname === l.href && "text-burgundy",
                )}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/cart"
            className="relative -mr-2 inline-flex h-11 min-w-11 items-center justify-center gap-2 px-2 text-[11px] uppercase tracking-[0.22em] text-ink md:ml-auto md:mr-0 md:px-0"
            aria-label={`Carrello${itemCount > 0 ? `, ${itemCount} articoli` : ""}`}
          >
            <ShoppingBag className="h-5 w-5 md:hidden" />
            <span className="hidden md:inline">Carrello</span>
            <span className="hidden md:inline">
              {itemCount > 0 ? `(${itemCount})` : ""}
            </span>
            {itemCount > 0 && (
              <span className="absolute right-0 top-1.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-burgundy px-1 text-[10px] leading-none text-cream md:hidden">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="mt-16 bg-night text-cream md:mt-24">
        <div className="shell grid gap-10 py-12 md:grid-cols-2 md:py-16">
          <div className="md:max-w-md">
            <p className="text-xl md:text-2xl">
              <LogoWordmark />
            </p>
            <p className="mt-4 text-sm leading-relaxed text-cream/70">
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
          <div className="shell py-8 md:py-10">
            <NewsletterForm />
          </div>
        </div>
        <div className="border-t border-cream/10 py-6 text-xs text-cream/60">
          <div className="shell">
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
            <Link
              href={l.href}
              className="inline-flex min-h-9 items-center hover:text-cream"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
