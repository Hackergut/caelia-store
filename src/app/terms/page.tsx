import { LegalPage, LegalSection } from "@/components/legal-page";

export const metadata = {
  title: "Termini e condizioni",
  description:
    "Termini e condizioni di vendita e d'uso del sito e dei prodotti CAELIA.",
};

export default function TermsPage() {
  return (
    <LegalPage title="Termini e condizioni." updated="Settembre 2026">
      <p>
        I presenti termini e condizioni regolano l&apos;uso del sito CAELIA e
        l&apos;acquisto dei prodotti. Effettuando un ordine dichiari di accettarli
        integralmente.
      </p>

      <LegalSection title="Ordini e prezzi">
        <p>
          Tutti i prezzi sono espressi nella valuta indicata al checkout e
          includono l&apos;IVA ove applicabile. Ci riserviamo il diritto di
          modificare i prezzi in qualsiasi momento; il prezzo applicato è quello
          in vigore al momento dell&apos;ordine.
        </p>
      </LegalSection>

      <LegalSection title="Conclusione del contratto">
        <p>
          Il contratto si intende concluso quando ricevi la conferma
          dell&apos;ordine via email. Ci riserviamo il diritto di rifiutare o
          annullare ordini in caso di errori di prezzo, indisponibilità o sospetto
          di frode.
        </p>
      </LegalSection>

      <LegalSection title="Pagamenti">
        <p>
          I pagamenti sono elaborati tramite provider sicuri e cifrati. CAELIA non
          conserva i dati completi delle carte di pagamento.
        </p>
      </LegalSection>

      <LegalSection title="Diritto di recesso">
        <p>
          Il consumatore ha diritto di recedere entro 30 giorni dalla consegna,
          secondo quanto indicato nella pagina Spedizioni e resi. Il prodotto deve
          essere restituito integro e nella confezione originale.
        </p>
      </LegalSection>

      <LegalSection title="Garanzia legale">
        <p>
          I prodotti sono coperti dalla garanzia legale di conformità prevista
          dalla normativa vigente. In caso di difetto di conformità hai diritto
          alla riparazione, sostituzione o rimborso.
        </p>
      </LegalSection>

      <LegalSection title="Proprietà intellettuale">
        <p>
          Tutti i contenuti del sito — marchi, testi, immagini e grafiche — sono di
          proprietà di CAELIA e non possono essere riprodotti senza autorizzazione.
        </p>
      </LegalSection>

      <LegalSection title="Legge applicabile">
        <p>
          I presenti termini sono regolati dalla legge italiana. Per ogni
          controversia è competente il foro del luogo di residenza del consumatore.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
