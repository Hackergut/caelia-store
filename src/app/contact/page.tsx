import { ContactForm } from "@/components/contact-form";

export const metadata = {
  title: "Contatti",
  description:
    "Contatta il team CAELIA per assistenza su ordini, resi e prodotti. Ti rispondiamo entro 1–2 giorni lavorativi.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 lg:px-10 pt-12 pb-24 grid gap-16 lg:grid-cols-[1fr_1.2fr]">
      <div>
        <p className="text-xs uppercase tracking-[0.32em] text-ink/60">Aiuto</p>
        <h1 className="mt-4 font-serif text-5xl leading-[1.05]">Contatti.</h1>
        <p className="mt-4 text-ink/70 leading-relaxed">
          Domande su un ordine, un reso o un prodotto? Scrivici: il nostro team
          risponde entro 1–2 giorni lavorativi.
        </p>

        <dl className="mt-10 space-y-6 text-sm">
          <div>
            <dt className="text-xs uppercase tracking-[0.18em] text-ink/60">Email</dt>
            <dd className="mt-1">
              <a
                href="mailto:support@caelia.com"
                className="text-burgundy underline underline-offset-4"
              >
                support@caelia.com
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.18em] text-ink/60">Orari</dt>
            <dd className="mt-1 text-ink/75">Lun–Ven, 9:00–18:00 (CET)</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.18em] text-ink/60">Sedi</dt>
            <dd className="mt-1 text-ink/75">Los Angeles · Dubai · Prodotto in Italia</dd>
          </div>
        </dl>
      </div>

      <div>
        <ContactForm />
      </div>
    </div>
  );
}
