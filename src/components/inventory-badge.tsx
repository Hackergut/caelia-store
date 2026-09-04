/**
 * Low-stock + back-in-stock inventory indicators.
 *
 * In production: `stock` comes from the Shopify variant inventoryQuantity.
 * In this MVP we deterministically derive a stock figure from the variant
 * SKU so different variants show different urgency levels.
 */
function stockForSku(sku: string): number {
  let hash = 0;
  for (let i = 0; i < sku.length; i++) hash = (hash * 31 + sku.charCodeAt(i)) >>> 0;
  // Range 2-9 to make "low stock" plausibly true on a subset.
  return 2 + (hash % 8);
}

export function InventoryBadge({ sku }: { sku: string }) {
  const stock = stockForSku(sku);
  if (stock <= 0) {
    return (
      <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-burgundy">
        <span className="h-1.5 w-1.5 rounded-full bg-burgundy" /> Esaurito
      </p>
    );
  }
  if (stock <= 4) {
    return (
      <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-burgundy">
        <span className="h-1.5 w-1.5 rounded-full bg-burgundy animate-pulse" />
        Solo {stock} disponibili
      </p>
    );
  }
  return (
    <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-ink/60">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-700/70" /> Disponibile
    </p>
  );
}
