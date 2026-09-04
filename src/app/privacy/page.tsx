import { LegalPage, LegalSection } from "@/components/legal-page";

export const metadata = {
  title: "Informativa sulla privacy",
  description:
    "Come CAELIA raccoglie, utilizza e protegge i tuoi dati personali, in conformità al GDPR.",
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Informativa sulla privacy." updated="Settembre 2026">
      <p>
        La presente informativa descrive come CAELIA raccoglie, utilizza e
        protegge i dati personali degli utenti del sito, in conformità al
        Regolamento (UE) 2016/679 (GDPR).
      </p>

      <LegalSection title="Titolare del trattamento">
        <p>
          Il titolare del trattamento è CAELIA. Per qualsiasi richiesta relativa
          ai tuoi dati puoi scrivere a{" "}
          <a href="mailto:privacy@caelia.com" className="text-burgundy underline underline-offset-4">
            privacy@caelia.com
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="Dati che raccogliamo">
        <p>
          Raccogliamo i dati che ci fornisci direttamente (nome, indirizzo email,
          indirizzo di spedizione e fatturazione, dati d&apos;ordine) e i dati
          raccolti automaticamente durante la navigazione (indirizzo IP, tipo di
          dispositivo, pagine visitate) tramite cookie e tecnologie simili.
        </p>
      </LegalSection>

      <LegalSection title="Finalità del trattamento">
        <p>
          Utilizziamo i tuoi dati per elaborare e spedire gli ordini, gestire
          resi e rimborsi, fornire assistenza clienti, inviarti comunicazioni di
          marketing (solo con il tuo consenso) e adempiere agli obblighi di legge.
        </p>
      </LegalSection>

      <LegalSection title="Base giuridica">
        <p>
          Il trattamento si fonda sull&apos;esecuzione del contratto d&apos;acquisto,
          sul consenso (per il marketing), sul legittimo interesse (per la
          sicurezza e il miglioramento del servizio) e sugli obblighi legali.
        </p>
      </LegalSection>

      <LegalSection title="Conservazione dei dati">
        <p>
          Conserviamo i dati per il tempo necessario alle finalità indicate e per
          rispettare gli obblighi fiscali e legali applicabili.
        </p>
      </LegalSection>

      <LegalSection title="I tuoi diritti">
        <p>
          Hai il diritto di accedere, rettificare, cancellare e limitare il
          trattamento dei tuoi dati, oltre al diritto alla portabilità e
          all&apos;opposizione. Per esercitarli, scrivi a{" "}
          <a href="mailto:privacy@caelia.com" className="text-burgundy underline underline-offset-4">
            privacy@caelia.com
          </a>
          . Puoi inoltre proporre reclamo all&apos;autorità di controllo competente.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
