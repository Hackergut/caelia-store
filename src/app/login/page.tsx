import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Accedi",
  description: "Entra nel tuo account CAELIA.",
};

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-md px-6 lg:px-10 pt-20 pb-24">
      <h1 className="font-serif text-4xl">Accedi</h1>
      <p className="mt-3 text-sm text-ink/70">
        Entra per visualizzare ordini, wishlist e spedizioni.
      </p>
      <form className="mt-10 space-y-4">
        <label className="block">
          <span className="block text-xs uppercase tracking-[0.22em] text-ink/60 mb-1">
            Email
          </span>
          <input
            type="email"
            required
            name="email"
            className="w-full border border-mist rounded-md px-4 py-3 text-sm bg-cream focus:outline-none focus:border-charcoal"
          />
        </label>
        <label className="block">
          <span className="block text-xs uppercase tracking-[0.22em] text-ink/60 mb-1">
            Password
          </span>
          <input
            type="password"
            required
            name="password"
            className="w-full border border-mist rounded-md px-4 py-3 text-sm bg-cream focus:outline-none focus:border-charcoal"
          />
        </label>
        <button
          type="button"
          className="w-full bg-charcoal text-cream py-3 text-xs uppercase tracking-[0.22em] hover:bg-rose transition-colors btn-press"
        >
          Accedi
        </button>
        <p className="text-xs text-center text-ink/60">
          Non hai un account?{" "}
          <Link href="/register" className="underline">
            Creane uno
          </Link>
        </p>
      </form>
    </div>
  );
}
