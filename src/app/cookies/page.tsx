import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie",
  description: "Informativa completa sull uso dei cookie su CAELIA.",
};

export default function CookiesPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 lg:px-10 pt-16 pb-24">
      <p className="text-xs uppercase tracking-[0.32em] text-ink/60">Cookie</p>
      <h1 className="mt-4 font-serif text-5xl leading-[1.05]">
        Informativa cookie.
      </h1>

      <div className="mt-10 space-y-6 text-ink/80 leading-relaxed">
        <p>
          Ultimo aggiornamento: 3 settembre 2026. Questa pagina spiega cosa
          sono i cookie, quali utilizziamo su caelia.com e come gestirli.
        </p>

        <h2 className="font-serif text-2xl pt-4">Cosa sono i cookie</h2>
        <p>
          I cookie sono piccoli file di testo che il sito invia al tuo
          dispositivo. Ci aiutano a ricordare le tue preferenze e a capire
          come usi il sito.
        </p>

        <h2 className="font-serif text-2xl pt-4">Quali cookie usiamo</h2>
        <div className="space-y-4">
          <CookieRow
            name="Cookie tecnici"
            purpose="Mantengono il carrello, la wishlist, il consenso cookie e le preferenze di lingua."
            duration="Sessione o 1 anno"
            required
          />
          <CookieRow
            name="Cookie analitici"
            purpose="Vercel Web Analytics: conteggio pagine viste, sorgenti di traffico, tempi di caricamento. Nessun dato personale identificativo."
            duration="1 anno"
          />
          <CookieRow
            name="Cookie di marketing"
            purpose="Meta Pixel: tracciamento conversioni e ottimizzazione annunci. Caricato solo previo consenso esplicito."
            duration="Fino a 90 giorni"
          />
        </div>

        <h2 className="font-serif text-2xl pt-4">Come gestirli</h2>
        <p>
          Al primo accesso ti mostriamo un banner per scegliere. Puoi
          modificare la scelta in qualsiasi momento cancellando i cookie di
          caelia.com dal tuo browser.
        </p>

        <h2 className="font-serif text-2xl pt-4">Cookie di terze parti</h2>
        <p>
          Vercel (analytics), Meta (marketing, solo con consenso), Shopify
          (carrello e ordini, se attivo).
        </p>

        <h2 className="font-serif text-2xl pt-4">Contatti</h2>
        <p>
          Per qualsiasi domanda scrivi a{" "}
          <a href="mailto:ciao@caelia.com" className="underline">
            ciao@caelia.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}

function CookieRow({
  name,
  purpose,
  duration,
  required,
}: {
  name: string;
  purpose: string;
  duration: string;
  required?: boolean;
}) {
  return (
    <div className="rounded-md bg-cream-deep p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="font-serif text-lg">{name}</p>
        {required ? (
          <span className="text-xs uppercase tracking-[0.18em] text-ink/60">
            Sempre attivo
          </span>
        ) : (
          <span className="text-xs uppercase tracking-[0.18em] text-ink/60">
            Opzionale
          </span>
        )}
      </div>
      <p className="mt-2 text-sm text-ink/70">{purpose}</p>
      <p className="mt-1 text-xs uppercase tracking-[0.18em] text-ink/50">
        Durata: {duration}
      </p>
    </div>
  );
}
