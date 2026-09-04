import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "La nostra storia",
  description:
    "CAELIA nasce dall incontro di due sorelle, Carla e Giulia, divise da migliaia di chilometri ma unite dallo stesso modo di vivere il mondo.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 lg:px-10 pt-16 pb-24">
      <p className="text-xs uppercase tracking-[0.32em] text-ink/60">
        La nostra storia
      </p>
      <h1 className="mt-4 font-serif text-5xl lg:text-6xl leading-[1.05]">
        Due sorelle, due citta,
        <br />
        <span className="italic text-rose">un&apos;unica idea.</span>
      </h1>

      <div className="mt-16 grid gap-12 lg:grid-cols-2 items-start">
        <div className="space-y-6 text-lg leading-relaxed text-ink/80">
          <p>
            CAELIA nasce dall incontro di due sorelle, Carla e Giulia, divise
            da migliaia di chilometri ma unite dallo stesso modo di vivere il
            mondo. Una vive a Los Angeles, l&apos;altra a Dubai.
          </p>
          <p>
            Due citta lontane, due vite scandite da lavoro, appuntamenti,
            palestra, trasferte, weekend improvvisati e serate che cominciano
            subito dopo.
          </p>
          <p>
            E vivendo questa quotidianita, fatta di ritmi veloci e continui
            passaggi da un momento all&apos;altro della giornata, che nasce
            un&apos;esigenza semplice: avere con se cio che conta, senza
            perdere tempo a cercarlo.
          </p>
          <p>
            Quante volte, per un semplice ritocco, ci ritroviamo a rovistare
            nella borsa alla ricerca di una matita, del lip gloss o dello
            specchietto?
          </p>
          <p>
            E da qui che prende forma il <strong>CAELIA Beauty Mirror Case</strong>:
            un astuccio compatto che racchiude tutto cio che serve per un
            ritocco veloce, ordinato e subito a portata di mano. Una matita
            sulle labbra, un tocco di gloss, un ritocco agli occhi. Pochi
            gesti e si e pronte a continuare.
          </p>
          <p className="font-serif text-2xl">
            CAELIA — Aprire. Ritoccare. Ripartire.
          </p>
        </div>
        <div className="relative aspect-[4/5] rounded-md overflow-hidden shadow-product">
          <Image
            src="/products/beauty-case-burgundy-lifestyle.jpg"
            alt="Due sorelle, due citta, un rituale"
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
