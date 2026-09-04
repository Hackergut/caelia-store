import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sostenibilità",
  description: "Materiali, packaging e impegno ambientale di CAELIA.",
};

const PILLARS = [
  {
    n: "01",
    title: "Pelle vegana certificata",
    body: "L esterno del Beauty Mirror Case e in pelle vegana di alta qualita, prodotta in Italia da filiere certificate. Nessun animale e coinvolto nella produzione.",
  },
  {
    n: "02",
    title: "Matita e gloss cruelty-free",
    body: "I prodotti cosmetici inclusi sono formulati e prodotti in Lombardia. Non testati sugli animali, certificati VeganOK, senza parabeni né siliconi.",
  },
  {
    n: "03",
    title: "Packaging riciclato",
    body: "L astuccio esterno e stampato su carta FSC con inchiostri a base vegetale. Il pluriball e biodegradabile. Ogni spedizione e a impatto zero.",
  },
  {
    n: "04",
    title: "Produzione locale",
    body: "Tutto il Beauty Mirror Case e assemblato in un laboratorio artigiano a Firenze, dove vivono e lavorano Carla e il team CAELIA.",
  },
];

export default function SustainabilityPage() {
  return (
    <div className="shell max-w-3xl pt-16 pb-24">
      <p className="text-xs uppercase tracking-[0.32em] text-ink/60">
        Sostenibilità
      </p>
      <h1 className="mt-4 font-serif fluid-h2">
        Bello, ma non a spese del pianeta.
      </h1>
      <p className="mt-6 text-lg text-ink/80 leading-relaxed">
        CAELIA nasce con l idea che prendersi cura di se non debba mai
        danneggiare il mondo intorno. Ogni scelta di materiale, ogni
        fornitore, ogni passaggio logistico risponde a questa idea.
      </p>

      <div className="mt-16 space-y-12">
        {PILLARS.map((p) => (
          <div key={p.n} className="flex gap-6">
            <span className="font-serif text-4xl text-rose/70">{p.n}</span>
            <div>
              <h2 className="font-serif text-2xl">{p.title}</h2>
              <p className="mt-3 text-ink/80 leading-relaxed">{p.body}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 rounded-md bg-cream-deep p-8">
        <p className="font-serif text-xl">Il nostro impegno</p>
        <p className="mt-3 text-sm text-ink/70 leading-relaxed">
          Ogni anno pubblichiamo un report sull impatto ambientale di CAELIA:
          materiali, energia, logistica, packaging. Trasparenza non e una
          parola, e una pratica.
        </p>
        <a
          href="mailto:ciao@caelia.com"
          className="mt-4 inline-block text-xs uppercase tracking-[0.22em] nav-link"
        >
          Scrivici per la sustainability report 2026
        </a>
      </div>
    </div>
  );
}