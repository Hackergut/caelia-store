import { createFileRoute, Link } from "@tanstack/react-router";
import { cartTotal, useCart } from "@/lib/cart";
import { getProduct } from "@/lib/products";
import { formatEUR } from "@/lib/utils";

export const Route = createFileRoute("/cart")({ component: CartPage });

function CartPage() {
  const { lines, setQty, remove, clear } = useCart();
  const total = cartTotal(lines);

  return (
    <section className="bg-rosa">
      <div className="shell section-y max-w-3xl">
        <h1 className="type-display-md">Carrello</h1>
        {lines.length === 0 ? (
          <div className="mt-10">
            <p className="text-cacao">Il carrello è vuoto.</p>
            <Link to="/products" className="btn-primary mt-6">
              La collezione
            </Link>
          </div>
        ) : (
          <div className="mt-10 space-y-6">
            {lines.map((line) => {
              const p = getProduct(line.handle);
              if (!p) return null;
              return (
                <div key={line.handle} className="flex gap-4 border-b border-mist/70 pb-6">
                  <img src={p.images[0].src} alt="" className="h-28 w-20 object-cover" />
                  <div className="flex-1">
                    <p className="font-serif text-xl tracking-wide">{p.title}</p>
                    <p className="mt-1 tabular-nums text-sm">{formatEUR(p.price)}</p>
                    <div className="mt-3 flex items-center gap-3">
                      <button
                        type="button"
                        className="min-h-11 min-w-11 border border-mist"
                        onClick={() => setQty(line.handle, line.qty - 1)}
                      >
                        −
                      </button>
                      <span className="w-6 text-center tabular-nums">{line.qty}</span>
                      <button
                        type="button"
                        className="min-h-11 min-w-11 border border-mist"
                        onClick={() => setQty(line.handle, line.qty + 1)}
                      >
                        +
                      </button>
                      <button
                        type="button"
                        className="ml-auto type-meta text-cacao"
                        onClick={() => remove(line.handle)}
                      >
                        Rimuovi
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="flex items-center justify-between pt-2">
              <p className="type-meta text-cacao">Totale</p>
              <p className="tabular-nums text-xl">{formatEUR(total)}</p>
            </div>
            <p className="text-sm text-cacao">
              IVA 22% inclusa. Spedizione Italia 2–4 giorni, gratuita da 60 €. Reso 14 giorni.
            </p>
            <div className="flex flex-wrap gap-3">
              <button type="button" className="btn-primary" onClick={() => clear()}>
                Completa (demo)
              </button>
              <Link to="/products" className="inline-flex min-h-12 items-center type-meta">
                Continua
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
