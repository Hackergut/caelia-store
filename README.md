# CAELIA Storefront

> CAELIA — Aprire. Ritoccare. Ripartire.

A premium beauty ecommerce webapp for the CAELIA Beauty Mirror Case,
launched on Vercel with the source code on GitHub.

## Stack

- **Next.js 16** App Router (React 19, Server Components)
- **Tailwind CSS v4** with custom design tokens
- **TypeScript** strict mode
- **Fraunces** (display serif) + **Inter** (UI sans)
- **Shopify Storefront API** ready (drop-in adapter in `src/lib/shopify.ts`)
- **Stripe Checkout** ready
- **Vercel** deployment with edge regions `fra1`, `iad1`
- **PWA** installable (`manifest.webmanifest`)
- **i18n** scaffolding (Italian primary, English copy present in `products.ts`)

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Hero, manifesto, featured products, ritual explainer, trust |
| `/products` | Full collection grid |
| `/products/[handle]` | Product detail with gallery, variant picker, add to cart |
| `/checkout` | Multi-section checkout with shipping & payment selector |
| `/cart` | Triggered from the drawer (state in `lib/cart-context.tsx`) |
| `/about` | The Carla & Giulia brand story |
| `/journal` | Editorial listing (3 sample posts) |
| `/account` | Sign-in (Shopify Customer Accounts / Auth0 ready) |
| `/contact`, `/shipping`, `/faq`, `/privacy`, `/terms` | Standard info pages |
| `/api/checkout` | Server route for order creation |
| `/api/newsletter` | Server route for email opt-in |

## Run locally

```bash
npm install
npm run dev
```

The store runs at <http://localhost:3000>.

## Deploy to Vercel

```bash
npm i -g vercel
vercel link
vercel --prod
```

Or push to GitHub and import the repo at <https://vercel.com/new>.

## Connecting to Shopify (Storefront API)

1. In Shopify admin: **Settings → Apps and sales channels → Develop apps → Create an app**.
2. Enable the **Storefront API** access scope with at minimum:
   `unauthenticated_read_product_listings`, `unauthenticated_read_product_inventory`,
   `unauthenticated_write_checkouts`, `unauthenticated_read_checkouts`.
3. Install the app and copy the Storefront access token.
4. Add to `.env.local`:
   ```
   SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
   SHOPIFY_STOREFRONT_API_TOKEN=xxxxx
   ```
5. The product data in `src/lib/products.ts` mirrors the Shopify product
   shape, so you can drop in a `fetch` from the Storefront API without
   changing the UI.

## Connecting Stripe (direct checkout)

1. Get your secret key from <https://dashboard.stripe.com/apikeys>.
2. Add to `.env.local`:
   ```
   STRIPE_SECRET_KEY=sk_live_xxx
   ```
3. Replace the stub logic in `src/app/api/checkout/route.ts` with a
   `stripe.checkout.sessions.create` call.

## File map

```
src/
  app/                 # App Router pages & API routes
  components/          # Reusable UI (cart, chrome, product card, ...)
  lib/                 # Products, cart context, types, formatters
public/
  products/            # SVG placeholders (swap with real photography)
  og.svg, favicon.svg  # Brand mark + social share image
  manifest.webmanifest # PWA
  robots.txt, sitemap.xml
```

## Brand tokens

| Token | Value |
| --- | --- |
| `--color-cream` | `#f7f1ea` |
| `--color-blush` | `#e9c9c4` |
| `--color-rose` | `#b8655f` |
| `--color-charcoal` | `#1f1d1c` |
| Display font | Fraunces (italic for accents) |
| UI font | Inter |

## Notes

- Cart state is persisted to `localStorage` and ready to be replaced with
  Shopify Cart API calls inside `src/lib/cart-context.tsx`.
- All product imagery is currently SVG placeholders. Swap
  `public/products/*.svg` with real `.webp` photos for production.
