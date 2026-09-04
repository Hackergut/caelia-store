import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Informativa sulla privacy di CAELIA.",
};

export default function PrivacyPage() {
  return (
    <div className="shell max-w-3xl pt-16 pb-24 prose prose-neutral">
      <p className="text-xs uppercase tracking-[0.32em] text-ink/60">Privacy</p>
      <h1 className="mt-4 font-serif fluid-h2">
        Informativa sulla privacy.
      </h1>

      <div className="mt-10 space-y-6 text-ink/80 leading-relaxed">
        <p>
          Ultimo aggiornamento: 3 settembre 2026. CAELIA rispetta la tua
          privacy. Questa informativa descrive quali dati personali raccogliamo,
          come li usiamo e quali diritti hai.
        </p>
        <h2 className="font-serif text-2xl pt-4">Dati raccolti</h2>
        <p>
          Raccogliamo i dati che ci fornisci al momento dell acquisto o
          dell iscrizione alla newsletter: nome, email, indirizzo di
          spedizione, dati di pagamento (elaborati dal provider di pagamento,
          mai salvati sui nostri server).
        </p>
        <h2 className="font-serif text-2xl pt-4">Finalita</h2>
        <p>
          I dati sono utilizzati per evadere gli ordini, emettere fattura,
          rispondere alle richieste di assistenza, inviarti comunicazioni di
          marketing solo se hai dato il consenso.
        </p>
        <h2 className="font-serif text-2xl pt-4">Conservazione</h2>
        <p>
          Conserviamo i dati per il tempo necessario a evadere gli obblighi
          di legge (10 anni per la fatturazione). Puoi richiedere la
          cancellazione in qualsiasi momento scrivendo a ciao@caelia.com.
        </p>
        <h2 className="font-serif text-2xl pt-4">I tuoi diritti</h2>
        <p>
          Puoi accedere, modificare o richiedere la cancellazione dei tuoi
          dati personali in qualsiasi momento, contattandoci all indirizzo
          ciao@caelia.com.
        </p>
      </div>
    </div>
  );
}
