# CAELIA theme — go-live for Shopify Theme Store

## Already done in v5.1

- OS 2.0 templates, app blocks, mega menu, 10 presets
- Schema `t:` keys (271) + `en.default.schema.json`
- Self-hosted Tenor Sans (no Google Fonts)
- Rich media, Shop Pay terms, Follow on Shop, unit price, selling plans, discounts
- Noscript navigation (works with JS off)
- LCP `fetchpriority` on hero
- Theme zip contains only Shopify folders (no marketing pages)
- Docs/support URLs point to GitHub, not a sales site
- Official Shopify **review CSV** and **performance CSV** saved in this folder

## Lighthouse (this environment)

Audited the editorial storefront preview (Next), not Shopify’s CDN benchmark shop.

| Page | Perf | A11y | Best practices | SEO |
| --- | --- | --- | --- | --- |
| Home | 26* | 95 | 77 | 100 |
| Collection | 46* | 100 | 77 | 100 |
| Product | 35* | 93 | 77 | 100 |

\*Performance is low here because the preview is unminified React, not the Liquid theme on Shopify CDN. Theme Store requires **average ≥ 60** on *their* benchmark shop (home + product + collection). After you push the Liquid theme to a Shopify store, re-run:

https://github.com/shopify/lighthouse-ci-action

Accessibility and SEO already meet Theme Store bars (≥ 90 a11y typical, SEO complete).

## You must do (cannot be done from this sandbox)

### 1. Partner account
1. https://partners.shopify.com/signup  
2. Business details, payouts, tax  
3. Theme Store access request (Themes → Theme Store)

### 2. Development store + testing assets
1. Partner Dashboard → Stores → Create development store  
2. **Products → Import**  
   - `theme-store-testing-shop-product-data.csv` (review team catalog)  
   - `theme-performance-shop-product-data.csv` (volume for Lighthouse)  
3. Online Store → Themes → Upload `caelia-shopify-theme.zip` → Publish  
4. Manual (CSV cannot do these):  
   - Inventory: leave **Bowtie (Rich Product Media)** sold out; vary other qty  
   - 5+ locations, local pickup on, one location pickup off  
   - Unit prices (store address EU/CH)  
   - Bowtie: 2× 3D models, YouTube, Vimeo, MP4  
   - Subscription app → selling plans  
   - US address + Shop Pay Installments  
   - Shop channel → Follow on Shop  
5. Navigation: 3-level menu (for mega menu)  
6. Customize → Change theme style through all 10 presets  

### 3. Lighthouse on Shopify
Install [Shopify Lighthouse CI](https://github.com/shopify/lighthouse-ci-action) on the theme repo, or run Lighthouse on the `.myshopify.com` preview of home, collection, product. Average performance ≥ 60.

### 4. Exclusivity
This theme is for the Shopify Theme Store only. Do not sell the zip on ThemeForest, Gumroad, etc.

### 5. Submit
Partner Dashboard → Theme Store → Submit theme → attach demo store + preset screenshots.

v5.1.0
