# CAELIA — Beauty Mirror Case storefront

Production: https://caelia-store.vercel.app

CAELIA nasce dall''incontro di due sorelle, Carla (Los Angeles) e Giulia (Dubai).
Beauty Mirror Case: un astuccio compatto con specchio, matita contorno labbra e lip gloss.
**Aprire. Ritoccare. Ripartire.**

## Stack

- **Next.js 16** (App Router) + React 19
- **Tailwind v4** (custom design tokens)
- **TypeScript** strict
- **Three.js** + @react-three/fiber + drei per il viewer 3D
- **@vercel/analytics** mounted in root layout
- **Shopify Storefront API adapter** pronto (`src/lib/shopify.ts` + `src/lib/catalog.ts`)

## Brand

Three-tone palette, each color with a defined role:

| Token | Hex | Role |
| --- | --- | --- |
| `--color-cacao` | `#7b5644` | main — body text, headings, primary surfaces |
| `--color-burgundy` | `#4a0e16` | accent — CTA, hover, link emphasis |
| `--color-rose` | `#d49b96` | decorative tint — italic accents, badges |
| `--color-night` | `#1a0a0e` | surface — footer, announcement bar, drawer scrim |
| `--color-cream` | `#f7f1ea` | background |
| `--color-mist` | `#e0d6c9` | warm separators |

Typography: **Inter** sans-only (minimal, linear), no serif.

## Run locally

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # 28 routes
npm run start        # production server
```

Requires Node 20+.

## Drop real product photos

The catalog serves JPEGs from `public/products/`. Replace a file **keeping the same filename** — no code change needed.

Current colourways: **Burgundy**, **Cacao**, **Crema**. See `docs/PRODUCT-PHOTOS.md` for the full file list and specs (1600px, &lt; 400 KB JPEG).

### Easiest path — drag & drop on GitHub

1. Open https://github.com/Hackergut/caelia-store/tree/master/public/products
2. Click **"Add file"** → "Upload files"
3. Drag your photos, keeping the existing filenames
4. Click **"Commit changes"**
5. Vercel auto-deploys from `master`.

## Deploy

```bash
vercel link        # one-time, links to hackguts-projects/caelia-store
vercel --prod      # deploy to production
```

Or push to `master` on GitHub — Vercel auto-deploys.

## Wiring Shopify (optional — catalog currently local)

```bash
vercel env add SHOPIFY_STORE_DOMAIN production
# enter: tuonegozio.myshopify.com
vercel env add SHOPIFY_STOREFRONT_API_TOKEN production
# enter the Storefront API access token
vercel --prod
```

`src/lib/catalog.ts` automatically routes to Shopify when both env vars are present, with local fallback.

## Documentation

- `docs/MOTION.md` — Emil Kowalski motion philosophy, tokens, utility classes
- `docs/SHOPIFY.md` — Shopify activation guide
- `docs/PRODUCT-PHOTOS.md` — detailed photo specs (sizes, colors, formats)

## Authors

Carla R. (Los Angeles) · Giulia D. (Dubai) — sister-founders of CAELIA.