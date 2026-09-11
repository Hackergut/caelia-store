import { Link } from "@tanstack/react-router";
import { LEGAL, legalDocs, legalNav } from "@/lib/legal";

export function LegalDocPage({ id }: { id: keyof typeof legalDocs }) {
  const doc = legalDocs[id];
  return (
    <section className="bg-rosa">
      <div className="shell section-y grid gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(12rem,1fr)]">
        <article>
          <p className="eyebrow">{doc.kicker}</p>
          <h1 className="type-display-md mt-3">{doc.title}</h1>
          <p className="mt-3 type-meta text-cacao">Aggiornato {doc.updated}</p>
          <div className="mt-10 space-y-10">
            {doc.body.map((block) => (
              <div key={block.h}>
                <h2 className="font-serif text-2xl">{block.h}</h2>
                <p className="mt-3 max-w-xl leading-relaxed text-cacao">{block.p}</p>
              </div>
            ))}
          </div>
          <p className="mt-12 max-w-xl text-sm text-cacao">
            {LEGAL.legalName} · {LEGAL.address} · {LEGAL.piva} · {LEGAL.email}
          </p>
        </article>
        <aside>
          <p className="type-meta text-cacao">Note legali</p>
          <ul className="mt-4 flex flex-col gap-2 text-sm">
            {legalNav.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="underline-offset-4 hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
