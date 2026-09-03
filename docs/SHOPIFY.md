# Shopify integration — activation guide

CAELIA ships with a **catalog adapter** (`src/lib/catalog.ts`) that auto-detects Shopify when env vars are present, with full local fallback. **No code change required** to switch on.

## 1. Create the Storefront API custom app

1. In your Shopify admin go to **Settings → Apps and sales channels → Develop apps**.
2. Click **"Create an app"** → give it a name (e.g. "CAELIA Storefront") → **Create app**.
3. In the **Configuration** tab → **Storefront API integration** → enable these scopes:
   - `unauthenticated_read_product_listings`
   - `unauthenticated_read_product_inventory`
   - `unauthenticated_read_product_listing_images`
4. Click **Save**.
5. In the **API credentials** tab → **Install app** → copy the **Storefront API access token**.

## 2. Add env vars on Vercel

From your terminal at the `caelia-store` folder:

```bash
vercel env add SHOPIFY_STORE_DOMAIN production
# When prompted, paste: tuonegozio.myshopify.com

vercel env add SHOPIFY_STOREFRONT_API_TOKEN production
# When prompted, paste the access token from step 1

vercel --prod
```

The build reuses the existing code; it switches to Shopify automatically because `isShopifyConfigured()` now returns `true`.

## 3. Verify

```bash
vercel curl /products --deployment caelia-store.vercel.app
```

The HTML should now list your real Shopify products. If something looks off, check the Vercel runtime logs — the adapter logs which source it picked and any fallback events:

```
[catalog] Shopify returned 0 products, falling back to local
[catalog] Shopify fetch failed, falling back to local: …
```

## 4. (Recommended) Replace the seeded product images

The local catalog ships with PNGs in `public/products/*.png`. When Shopify is active, those images are *not* used — Shopify URLs are. Make sure your Shopify products have proper product images set.

## 5. (Optional) Wire the checkout to Shopify

The current `/checkout` flow is local (creates an order in `localStorage` via `/api/checkout`). For a production store you''ll want to switch it to the **Shopify Checkout API** — `src/lib/shopify.ts` already exposes the necessary GraphQL primitives; only the `cart-drawer.tsx` → `checkout` handoff needs the new mutation. Let me know if you want me to do that next.

## 6. Roll back

Removing the two env vars and redeploying returns the site to the local catalog. No code change needed.