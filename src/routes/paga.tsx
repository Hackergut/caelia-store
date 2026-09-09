import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { STRIPE_PAY_URL } from "@/lib/lock";

export const Route = createFileRoute("/paga")({ component: PagaPage });

const rows = [
  { n: "01", t: "Design system editoriale", p: "€ 60" },
  { n: "02", t: "Landing motion 3D", p: "€ 85" },
  { n: "03", t: "Collezione e prodotto", p: "€ 55" },
  { n: "04", t: "Fotografia e cloni 1/1", p: "€ 70" },
  { n: "05", t: "Video campaign", p: "€ 70" },
  { n: "06", t: "Lock, watermark, deploy", p: "€ 40" },
  { n: "07", t: "Infrastruttura AI e media", p: "€ 70" },
];

function PagaPage() {
  return (
    <section className="bg-berry text-rosa">
      <div className="grid min-h-[100svh] lg:grid-cols-2">
        <div className="relative hidden min-h-[42svh] lg:block">
          <img
            src="/campaign/model-berry.jpg"
            alt="CAELIA Beauty Mirror Case — Burgundy Berry"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-berry/70 via-transparent to-berry/20" />
          <p className="absolute bottom-10 left-10 font-logo text-sm tracking-[0.42em]">CAELIA</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-col justify-center px-6 py-16 md:px-14 lg:px-16"
        >
          <p className="type-meta text-rosa/55">Consuntivo 01 / 2026</p>
          <h1 className="type-display-md mt-5">Saldo.</h1>
          <p className="mt-5 max-w-md leading-relaxed text-rosa/75">
            Sito CAELIA Beauty Mirror Case. 38 ore, 5–9 settembre. Anticipo già versato.
            Dopo il pagamento il watermark si toglie da solo.
          </p>

          <ul className="mt-10 space-y-2.5 border-t border-rosa/15 pt-6">
            {rows.map((r) => (
              <li key={r.n} className="flex items-baseline justify-between gap-4 text-sm">
                <span className="text-rosa/45">{r.n}</span>
                <span className="flex-1 tracking-wide">{r.t}</span>
                <span className="tabular-nums text-rosa/80">{r.p}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 space-y-2 border-t border-rosa/20 pt-6">
            <div className="flex justify-between text-sm text-rosa/60">
              <span>Totale lavori</span>
              <span className="tabular-nums">€ 450,00</span>
            </div>
            <div className="flex justify-between text-sm text-rosa/60">
              <span>Anticipo versato</span>
              <span className="tabular-nums">− € 150,00</span>
            </div>
            <div className="flex items-end justify-between pt-3">
              <span className="type-meta">Da pagare</span>
              <span className="font-serif text-4xl tracking-wide">€ 200,00</span>
            </div>
          </div>

          <a href={STRIPE_PAY_URL} className="btn-invert mt-10 w-full max-w-md">
            Paga 200 € — carta / Apple Pay
          </a>
          <p className="mt-3 max-w-md text-xs leading-relaxed tracking-wide text-rosa/50">
            Stripe live · HACKGUT · Sergio Guttilla. Al termine si apre{" "}
            <Link to="/consegnato" className="underline decoration-rosa/30 underline-offset-4">
              /consegnato
            </Link>
            , il sito senza watermark.
          </p>

          <div className="mt-12 max-w-md border-t border-rosa/15 pt-6 text-sm text-rosa/65">
            <p className="type-meta text-rosa/45">Oppure bonifico</p>
            <p className="mt-3">Sergio Guttilla</p>
            <p className="mt-1 tracking-wide">IT55 T036 4601 6005 2600 7699 943</p>
            <p className="mt-1">NTSBITM1XXX · Causale: Pagamento CAELIA 200 EUR</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
