import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contatti",
  description: "Scrivici: siamo qui per risponderti entro 24 ore.",
};

export default function ContactPage() {
  return (
    <div className="shell max-w-3xl pt-16 pb-24">
      <p className="text-xs uppercase tracking-[0.32em] text-ink/60">Contatti</p>
      <h1 className="mt-4 font-serif fluid-h2">
        Scrivici.
      </h1>
      <p className="mt-4 text-lg text-ink/80">
        Carla e Giulia leggono ogni messaggio. Ti rispondiamo entro 24 ore,
        sempre.
      </p>

      <form className="mt-12 grid gap-4 sm:grid-cols-2">
        <Field label="Nome" />
        <Field label="Email" type="email" />
        <Field label="Ordine (opzionale)" className="sm:col-span-2" />
        <label className="sm:col-span-2">
          <span className="block text-xs uppercase tracking-[0.22em] text-ink/60 mb-1">
            Messaggio
          </span>
          <textarea
            rows={6}
            className="w-full border border-mist rounded-md px-4 py-3 text-sm bg-cream focus:outline-none focus:border-charcoal"
          />
        </label>
        <button
          type="button"
          className="sm:col-span-2 bg-charcoal text-cream py-3 text-xs uppercase tracking-[0.22em] hover:bg-rose transition-colors"
        >
          Invia messaggio
        </button>
      </form>

      <div className="mt-16 grid gap-8 sm:grid-cols-3 text-sm">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-ink/60">
            Email
          </p>
          <p className="mt-2 font-serif text-lg">ciao@caelia.com</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-ink/60">
            Instagram
          </p>
          <p className="mt-2 font-serif text-lg">@caelia</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-ink/60">
            Sede
          </p>
          <p className="mt-2 font-serif text-lg">Milano, IT</p>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  type = "text",
  className = "",
}: {
  label: string;
  type?: string;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="block text-xs uppercase tracking-[0.22em] text-ink/60 mb-1">
        {label}
      </span>
      <input
        type={type}
        className="w-full border border-mist rounded-md px-4 py-3 text-sm bg-cream focus:outline-none focus:border-charcoal"
      />
    </label>
  );
}
