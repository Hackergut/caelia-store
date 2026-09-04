import { LegalPage, LegalSection } from "@/components/legal-page";

export const metadata = {
  title: "Cookie policy",
  description:
    "Come CAELIA utilizza i cookie e le tecnologie simili e come gestire le tue preferenze.",
};

export default function CookiesPage() {
  return (
    <LegalPage title="Cookie policy." updated="Settembre 2026">
      <p>
        Questo sito utilizza cookie e tecnologie simili per garantire il corretto
        funzionamento, analizzare il traffico e personalizzare l&apos;esperienza.
      </p>

      <LegalSection title="Cosa sono i cookie">
        <p>
          I cookie sono piccoli file di testo salvati sul tuo dispositivo quando
          visiti un sito. Servono a ricordare le tue preferenze e a migliorare la
          navigazione.
        </p>
      </LegalSection>

      <LegalSection title="Tipologie di cookie che usiamo">
        <p>
          <strong className="text-ink">Necessari.</strong> Indispensabili per il
          funzionamento del sito, come la gestione del carrello e del checkout.
        </p>
        <p>
          <strong className="text-ink">Analitici.</strong> Ci aiutano a capire come
          viene utilizzato il sito, in forma aggregata e anonima.
        </p>
        <p>
          <strong className="text-ink">Marketing.</strong> Utilizzati, previo
          consenso, per mostrarti contenuti e annunci pertinenti.
        </p>
      </LegalSection>

      <LegalSection title="Gestione delle preferenze">
        <p>
          Puoi gestire o revocare il consenso ai cookie non necessari in qualsiasi
          momento tramite il banner dei cookie o le impostazioni del tuo browser.
          La disattivazione di alcuni cookie potrebbe limitare alcune funzionalità
          del sito.
        </p>
      </LegalSection>

      <LegalSection title="Contatti">
        <p>
          Per domande sull&apos;uso dei cookie scrivi a{" "}
          <a href="mailto:privacy@caelia.com" className="text-burgundy underline underline-offset-4">
            privacy@caelia.com
          </a>
          .
        </p>
      </LegalSection>
    </LegalPage>
  );
}
