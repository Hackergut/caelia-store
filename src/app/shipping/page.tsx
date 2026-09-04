import Link from "next/link";

export const metadata = {
  title: "Spedizioni e resi",
  description:
    "Tutto su spedizioni, tempi di consegna, resi gratuiti entro 30 giorni e rimborsi per gli ordini CAELIA.",
};

export default function ShippingPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 lg:px-10 pt-12 pb-24">
      <p className="text-xs uppercase tracking-[0.32em] text-ink/60">Aiuto</p>
      <h1 className="mt-4 font-serif text-5xl leading-[1.05]">Spedizioni e resi.</h1>
      <p className="mt-4 text-ink/70 leading-relaxed">
        Spedizioni tracciate e resi gratuiti entro 30 giorni. Ecco tutto quello
        che c&apos;è da sapere.
      </p>

      <div className="mt-12 space-y-12 text-ink/75 leading-relaxed">
        <section>
          <h2 className="text-xs uppercase tracking-[0.22em] text-burgundy">
            Spedizioni
          </h2>
          <div className="mt-4 space-y-4">
            <p>
              <strong className="text-ink">Italia.</strong> Spedizione gratuita
              per ordini superiori a 60 euro. Sotto tale soglia si applica una
              tariffa fissa mostrata al checkout. Consegna in 2–4 giorni
              lavorativi.
            </p>
            <p>
              <strong className="text-ink">Europa.</strong> Consegna in 4–7
              giorni lavorativi, con costi calcolati al checkout in base alla
              destinazione.
            </p>
            <p>
              <strong className="text-ink">Resto del mondo.</strong> Consegna in
              7–14 giorni lavorativi. Eventuali dazi e imposte doganali sono a
              carico del destinatario.
            </p>
            <p>
              Ricevi un&apos;email con il numero di tracciamento appena
              l&apos;ordine lascia il nostro magazzino.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xs uppercase tracking-[0.22em] text-burgundy">
            Resi
          </h2>
          <div className="mt-4 space-y-4">
            <p>
              Hai <strong className="text-ink">30 giorni</strong> dalla consegna
              per richiedere un reso. Il prodotto deve essere integro, non
              utilizzato e nella confezione originale.
            </p>
            <p>
              Per avviare un reso scrivici dalla pagina{" "}
              <Link href="/contact" className="text-burgundy underline underline-offset-4">
                Contatti
              </Link>{" "}
              indicando il numero d&apos;ordine. Ti invieremo le istruzioni e
              l&apos;etichetta di reso.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xs uppercase tracking-[0.22em] text-burgundy">
            Rimborsi
          </h2>
          <div className="mt-4 space-y-4">
            <p>
              Una volta ricevuto e verificato il reso, il rimborso viene emesso
              entro <strong className="text-ink">5–10 giorni lavorativi</strong>{" "}
              sullo stesso metodo di pagamento usato per l&apos;ordine.
            </p>
            <p>
              Se il prodotto arriva danneggiato o difettoso, contattaci entro 14
              giorni: sostituzione o rimborso completo, spese di spedizione
              incluse.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
