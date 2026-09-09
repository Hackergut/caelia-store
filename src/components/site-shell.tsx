import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { cartCount, useCart } from "@/lib/cart";
import { useChrome } from "@/lib/chrome";
import { PreviewWatermark } from "@/components/preview-watermark";
import { STRIPE_PAY_URL } from "@/lib/lock";

const nav = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Collezione" },
  { to: "/about", label: "Storia" },
  { to: "/contact", label: "Contatti" },
] as const;

const ease = [0.23, 1, 0.32, 1] as const;

export function SiteShell({ children }: { children: React.ReactNode }) {
  const count = useCart((s) => cartCount(s.lines));
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";
  const isPay = pathname === "/paga";
  const showNav = useChrome((s) => s.showNav);
  const setShowNav = useChrome((s) => s.setShowNav);
  const visible = !isHome || showNav || open;

  useEffect(() => setReady(true), []);
  useEffect(() => {
    if (!isHome) setShowNav(true);
    else setShowNav(false);
  }, [isHome, setShowNav]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  const shown = ready ? count : 0;

  return (
    <div className="min-h-screen bg-rosa text-burgundy">
      <PreviewWatermark />
      <motion.header
        initial={false}
        animate={{
          opacity: visible ? 1 : 0,
          y: visible ? 0 : -16,
        }}
        transition={{ duration: 0.55, ease }}
        className={`fixed inset-x-0 top-0 z-50 bg-berry/95 text-rosa backdrop-blur-md ${
          visible ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div className="flex h-16 items-center px-5 md:px-10">
          <Link
            to="/"
            className="relative z-[60] font-logo text-lg tracking-[0.42em] text-rosa"
            onClick={() => setOpen(false)}
          >
            CAELIA
          </Link>
          <div className="relative z-[60] ml-auto flex items-center gap-6">
            {isPay ? (
              <a href={STRIPE_PAY_URL} className="type-meta text-rosa">
                Paga 200 €
              </a>
            ) : (
              <>
            <Link to="/cart" className="type-meta text-rosa" onClick={() => setOpen(false)}>
              Carrello{shown > 0 ? ` (${shown})` : ""}
            </Link>
            <button
              type="button"
              aria-expanded={open}
              aria-controls="menu-tenda"
              aria-label={open ? "Chiudi menu" : "Apri menu"}
              className="flex h-10 w-10 items-center justify-center"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="relative block h-3.5 w-5">
                <span
                  className={`absolute left-0 h-px w-full bg-rosa transition-transform duration-300 ${
                    open ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 top-1.5 h-px w-full bg-rosa transition-opacity duration-200 ${
                    open ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 h-px w-full bg-rosa transition-transform duration-300 ${
                    open ? "top-1.5 -rotate-45" : "top-3"
                  }`}
                />
              </span>
            </button>
              </>
            )}
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.nav
            id="menu-tenda"
            key="menu"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.55, ease }}
            className="fixed inset-0 z-40 flex flex-col bg-berry px-5 pt-24 text-rosa md:px-10"
          >
            <ul className="flex flex-1 flex-col justify-center gap-2 pb-16">
              {nav.map((item, i) => (
                <motion.li
                  key={item.to}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.4, delay: 0.08 + i * 0.06, ease }}
                >
                  <Link
                    to={item.to}
                    className="block font-serif text-[clamp(2.4rem,8vw,5.5rem)] leading-[0.92] tracking-wide"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <p className="type-meta pb-8 text-rosa/50">Milano · Beauty Essentials</p>
          </motion.nav>
        ) : null}
      </AnimatePresence>

      <main className={isHome ? "" : "pt-16"}>{children}</main>

      <footer className="relative overflow-hidden bg-berry text-rosa">
        <img
          src="/campaign/edit-tools.jpg"
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full scale-110 object-cover opacity-30 blur-md"
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, color-mix(in srgb, var(--color-berry) 78%, transparent) 0%, color-mix(in srgb, var(--color-berry) 88%, transparent) 100%)",
          }}
        />
        <div className="relative z-10">
          <div className="shell grid gap-10 py-16 md:grid-cols-3">
            <div>
              <p className="font-logo text-lg tracking-[0.38em]">CAELIA</p>
              <p className="mt-4 max-w-xs leading-relaxed text-rosa/75">
                Beauty always with you. Specchio, matita, gloss — un gesto.
              </p>
            </div>
            <div className="text-sm text-rosa/80">
              <p className="type-meta text-rosa/55">Maison</p>
              <div className="mt-4 flex flex-col gap-2">
                <Link to="/about">Storia</Link>
                <Link to="/products">Collezione</Link>
                <Link to="/contact">Contatti</Link>
              </div>
            </div>
            <div className="text-sm text-rosa/80">
              <p className="type-meta text-rosa/55">Cura</p>
              <p className="mt-4">Italia · Pelle vegana · Resi 30 giorni</p>
            </div>
          </div>
          <div className="border-t border-rosa/15">
            <div className="shell flex flex-wrap justify-between gap-3 py-5 type-meta text-rosa/50">
              <span>© 2026 CAELIA</span>
              <span>Milano</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
