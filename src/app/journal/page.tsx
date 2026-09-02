import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Journal",
  description: "Note di stile, rituali e pensieri da Carla e Giulia.",
};

const POSTS = [
  {
    title: "Tre gesti per ripartire",
    excerpt:
      "Aprire, ritoccare, ripartire: la routine pensata per le giornate che cambiano ritmo ogni ora.",
    date: "Settembre 2026",
    readTime: "3 min",
  },
  {
    title: "Cosa mettere in borsa a Dubai",
    excerpt:
      "Cinque oggetti che non lascio mai a casa durante le giornate piu lunghe. Spoiler: il Beauty Mirror Case è il primo.",
    date: "Agosto 2026",
    readTime: "4 min",
  },
  {
    title: "Da Los Angeles con amore",
    excerpt:
      "I momenti che richiedono un ritocco veloce e come il Beauty Mirror Case mi segue ovunque.",
    date: "Luglio 2026",
    readTime: "5 min",
  },
];

export default function JournalPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 lg:px-10 pt-16 pb-24">
      <p className="text-xs uppercase tracking-[0.32em] text-ink/60">Journal</p>
      <h1 className="mt-4 font-serif text-5xl lg:text-6xl leading-[1.05]">
        Pensieri, rituali,
        <br />
        <span className="italic text-rose">dietro le quinte.</span>
      </h1>

      <div className="mt-16 divide-y divide-mist/60 border-t border-b border-mist/60">
        {POSTS.map((p, i) => (
          <article
            key={p.title}
            className="grid md:grid-cols-[1fr_3fr] gap-6 py-10 items-baseline"
          >
            <div className="text-xs uppercase tracking-[0.22em] text-ink/60">
              <p>{p.date}</p>
              <p className="mt-1 text-ink/40">{p.readTime}</p>
            </div>
            <div>
              <h2 className="font-serif text-2xl md:text-3xl leading-snug">
                <span className="text-ink/40 mr-3">0{i + 1}</span>
                {p.title}
              </h2>
              <p className="mt-3 text-ink/70 max-w-2xl">{p.excerpt}</p>
              <button className="mt-4 text-xs uppercase tracking-[0.22em] nav-link">
                Continua a leggere →
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
