import Link from "next/link";

export default function NotFound() {
  return (
    <div className="shell max-w-2xl pt-32 pb-24 text-center">
      <p className="text-xs uppercase tracking-[0.32em] text-ink/60">404</p>
      <h1 className="mt-4 font-serif fluid-h2">
        Pagina non trovata.
      </h1>
      <p className="mt-6 text-ink/70">
        Forse il link che cercavi e cambiato. Torna alla collezione o scrivici:
        ti aiutiamo noi.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Link
          href="/products"
          className="inline-flex items-center justify-center bg-charcoal text-cream px-8 py-4 text-xs uppercase tracking-[0.22em] hover:bg-burgundy transition-colors"
        >
          Scopri la collezione
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center border border-charcoal px-8 py-4 text-xs uppercase tracking-[0.22em] nav-link"
        >
          Contattaci
        </Link>
      </div>
    </div>
  );
}
