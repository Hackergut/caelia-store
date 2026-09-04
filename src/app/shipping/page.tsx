import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Spedizioni e resi",
  description: "Politica di spedizione e resi CAELIA.",
};

export default function ShippingPage() {
  return (
    <div className="shell max-w-3xl pt-16 pb-24 space-y-12">
      <header>
        <p className="text-xs uppercase tracking-[0.32em] text-ink/60">
          Spedizioni e resi
        </p>
        <h1 className="mt-4 font-serif fluid-h2">
          Spediamo con cura, rimborsiamo senza domande.
        </h1>
      </header>

      <section className="grid gap-6 sm:grid-cols-2">
        <Card title="Italia">
          <p>Standard (3-5 giorni): € 4,90 · gratuita sopra € 60</p>
          <p>Express (1-2 giorni): € 8,00</p>
        </Card>
        <Card title="Europa">
          <p>Standard (4-7 giorni): da € 9,90</p>
          <p>Express (2-3 giorni): da € 19,00</p>
        </Card>
        <Card title="Regno Unito">
          <p>Standard (4-7 giorni): da £ 9,90</p>
          <p>Express (2-3 giorni): da £ 19,00</p>
        </Card>
        <Card title="USA &amp; Dubai">
          <p>Standard (5-9 giorni): da $ 19,00</p>
          <p>Express (2-4 giorni): da $ 35,00</p>
        </Card>
      </section>

      <section>
        <h2 className="font-serif text-3xl mb-4">Resi</h2>
        <ul className="space-y-3 text-ink/80">
          <li>· Resi gratuiti entro 30 giorni dalla consegna.</li>
          <li>· Il prodotto deve essere integro e nella confezione originale.</li>
          <li>· Rimborso entro 5 giorni lavorativi dal ricevimento.</li>
          <li>· Per motivi igienici, i prodotti aperti non sono rimborsabili.</li>
        </ul>
      </section>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-md bg-cream-deep p-6">
      <p className="text-xs uppercase tracking-[0.22em] text-ink/60">{title}</p>
      <div className="mt-2 text-sm text-ink/80 space-y-1">{children}</div>
    </div>
  );
}
