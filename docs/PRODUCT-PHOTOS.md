# Product photography

All storefront photos live in `public/products/` and `public/editorial/`.
They are referenced from `src/lib/products.ts` (catalog) and the home / about pages.

Keep filenames stable. Replace a file in place to swap photography without a code change.

## Catalog — `public/products/`

| File | Used for |
| --- | --- |
| `burgundy-caelia-pair.jpg` | Burgundy hero, product card, home Capitoli |
| `burgundy-caelia-lifestyle.jpg` | Burgundy gallery — vanity / marble |
| `burgundy-caelia-pocket.jpg` | Burgundy gallery — empty pocket |
| `burgundy-caelia-pencils.jpg` | Burgundy gallery + home hero |
| `burgundy-caelia-logo.jpg` | Burgundy gallery — debossed wordmark |
| `burgundy-caelia-stitch.jpg` | Burgundy gallery + home manifesto |
| `cacao-caelia-pair.jpg` | Cacao hero, product card, home Capitoli |
| `cacao-caelia-pencils.jpg` | Cacao gallery |
| `cacao-caelia-logo.jpg` | Cacao gallery |
| `cacao-caelia-angle.jpg` | Cacao gallery — three-quarter |
| `crema-caelia-pair.jpg` | Crema hero, product card, home Capitoli |
| `crema-caelia-lifestyle.jpg` | Crema gallery — desk with pencils |
| `crema-caelia-pencils.jpg` | Crema gallery |
| `crema-caelia-logo.jpg` | Crema gallery |
| `crema-caelia-angle.jpg` | Crema gallery — three-quarter |

## Editorial — `public/editorial/`

| File | Used in |
| --- | --- |
| `lifestyle-burgundy.jpg` | About hero, Open Graph (`/og.jpg` is a 1200×630 crop) |
| `lifestyle-crema.jpg` | Spare cream lifestyle |
| `liner-lips.jpg` | Home ritual + about |
| `hero-lips.jpg` | Spare lip editorial |

## Specs

| Use | Format | Max size | Notes |
| --- | --- | --- | --- |
| Product stills | `.jpg` | 1600×1600, &lt; 400 KB | Cream or marble background |
| Lifestyle | `.jpg` | 1600 on the long edge | Real Beauty Mirror Case (slim pouch + leather-framed mirror). Never a zippered makeup bag. |
| Open Graph | `/og.jpg` | 1200×630 | Cropped from the burgundy lifestyle |

Colourways: Burgundy `#4a0e16`, Cacao `#7b5644`, Crema `#efe5d8`.

Raw generation dumps belong at the repo root (gitignored as `/*.jpeg`). Only `public/` ships.
