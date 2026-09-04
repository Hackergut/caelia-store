import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "La nostra storia",
  description:
    "CAELIA nasce dall’incontro di due sorelle, Carla e Giulia, tra Los Angeles e Dubai.",
};

export default function AboutPage() {
  return (
    <>
      <section className="relative min-h-[70vh] overflow-hidden bg-night">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/editorial/lifestyle-burgundy.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover blur-[3px] brightness-[0.45]"
        />
        <div className="absolute inset-0 bg-night/45" />
        <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-4xl flex-col justify-end px-6 lg:px-10 pb-16 pt-32">
          <p className="text-[11px] uppercase tracking-[0.38em] text-cream/70">
            La nostra storia
          </p>
          <h1 className="mt-4 fluid-h2 font-light text-cream">
            Due sorelle, due città,
            <br />
            un’unica idea.
          </h1>
        </div>
      </section>

      <section className="bg-cream">
        <div className="shell max-w-3xl py-20 lg:py-24 space-y-6 text-lg leading-relaxed text-ink/80 font-light">
          <p>
            CAELIA nasce dall’incontro di due sorelle, Carla e Giulia, divise da
            migliaia di chilometri ma unite dallo stesso modo di vivere il mondo.
            Una vive a Los Angeles, l’altra a Dubai.
          </p>
          <p>
            Due città lontane, due vite scandite da lavoro, appuntamenti,
            palestra, trasferte, weekend improvvisati e serate che cominciano
            subito dopo.
          </p>
        </div>
      </section>

      <section className="relative min-h-[55vh] overflow-hidden bg-night">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/editorial/liner-lips.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover blur-[2px] brightness-[0.5]"
        />
        <div className="absolute inset-0 bg-night/40" />
        <div className="relative z-10 shell max-w-3xl py-24 text-center">
          <p className="text-2xl sm:text-3xl font-light leading-snug text-cream">
            Quante volte, per un ritocco, cerchiamo matita, gloss e specchio in
            fondo alla borsa?
          </p>
        </div>
      </section>

      <section className="bg-cream">
        <div className="shell max-w-3xl py-20 space-y-6 text-lg leading-relaxed text-ink/80 font-light">
          <p>
            È da qui che prende forma il{" "}
            <strong className="font-medium text-ink">CAELIA Beauty Mirror Case</strong>
            : un astuccio compatto che racchiude tutto ciò che serve per un
            ritocco veloce. Una matita, un tocco di gloss, lo specchio. Pochi
            gesti e si è pronte a continuare.
          </p>
          <p className="text-2xl font-light text-ink pt-4">
            CAELIA — Aprire. Ritoccare. Ripartire.
          </p>
          <Link
            href="/products"
            className="inline-flex mt-6 bg-burgundy text-cream px-8 py-3.5 text-[11px] uppercase tracking-[0.22em]"
          >
            La collezione
          </Link>
        </div>
      </section>
    </>
  );
}
