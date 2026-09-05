import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Crea account",
  description: "Registrati su CAELIA.",
};

export default function RegisterPage() {
  return (
    <div className="shell max-w-md pt-20 pb-24">
      <h1 className="font-serif text-4xl">Crea account</h1>
      <form className="mt-10 space-y-4">
        <label className="block">
          <span className="block text-xs uppercase tracking-[0.22em] text-ink/60 mb-1">Nome</span>
          <input type="text" required name="name" className="w-full border border-mist rounded-md px-4 py-3 text-sm bg-cream focus:outline-none focus:border-charcoal" />
        </label>
        <label className="block">
          <span className="block text-xs uppercase tracking-[0.22em] text-ink/60 mb-1">Email</span>
          <input type="email" required name="email" className="w-full border border-mist rounded-md px-4 py-3 text-sm bg-cream focus:outline-none focus:border-charcoal" />
        </label>
        <label className="block">
          <span className="block text-xs uppercase tracking-[0.22em] text-ink/60 mb-1">Password</span>
          <input type="password" required name="password" minLength={8} className="w-full border border-mist rounded-md px-4 py-3 text-sm bg-cream focus:outline-none focus:border-charcoal" />
        </label>
        <button type="button" className="w-full bg-charcoal text-cream py-3 text-xs uppercase tracking-[0.22em] hover:bg-burgundy transition-colors btn-press">
          Registrati
        </button>
        <p className="text-xs text-center text-ink/60">
          Hai già un account? <Link href="/login" className="underline">Accedi</Link>
        </p>
      </form>
    </div>
  );
}
