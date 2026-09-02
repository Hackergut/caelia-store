import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termini e condizioni",
  description: "Termini e condizioni d uso di CAELIA.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 lg:px-10 pt-16 pb-24">
      <p className="text-xs uppercase tracking-[0.32em] text-ink/60">
        Termini e condizioni
      </p>
      <h1 className="mt-4 font-serif text-5xl leading-[1.05]">
        Termini d uso.
      </h1>

      <div className="mt-10 space-y-6 text-ink/80 leading-relaxed">
        <p>
          Ultimo aggiornamento: 3 settembre 2026. Utilizzando il sito
          caelia.com accetti i seguenti termini e condizioni.
        </p>
        <h2 className="font-serif text-2xl pt-4">Ordini</h2>
        <p>
          Gli ordini sono soggetti a disponibilita. CAELIA si riserva il
          diritto di annullare un ordine per indisponibilita del prodotto o
          per anomalie nei prezzi pubblicati.
        </p>
        <h2 className="font-serif text-2xl pt-4">Prezzi e IVA</h2>
        <p>
          I prezzi sono espressi in euro e includono IVA dove applicabile. Le
          spese di spedizione sono calcolate al checkout.
        </p>
        <h2 className="font-serif text-2xl pt-4">Resi</h2>
        <p>
          Hai diritto di recedere dal contratto entro 30 giorni dal
          ricevimento, salvo per i prodotti aperti per motivi igienici.
        </p>
        <h2 className="font-serif text-2xl pt-4">Proprieta intellettuale</h2>
        <p>
          Tutti i contenuti del sito (testi, immagini, marchi) sono di
          proprieta di CAELIA o dei rispettivi titolari. E vietata la
          riproduzione senza autorizzazione.
        </p>
        <h2 className="font-serif text-2xl pt-4">Foro competente</h2>
        <p>
          Per qualsiasi controversia e competente il foro di Milano, Italia.
        </p>
      </div>
    </div>
  );
}
