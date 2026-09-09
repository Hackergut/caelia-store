# CAELIA — tema Shopify 2.0

Tema Online Store 2.0 del sito CAELIA Beauty Mirror Case.
Carrello, checkout, prodotti, collezioni, account: nativi Shopify.

## Installazione

1. Shopify Admin → **Online Store → Themes → Add theme → Upload zip**
2. Carica `caelia-shopify-theme.zip`
3. **Publish**

## Catalogo (3 colori)

Crea tre prodotti, stesso prezzo 58 €:

| Handle Shopify        | Titolo          | Colore        |
| --------------------- | --------------- | ------------- |
| `burgundy-caelia`     | Burgundy Berry  | #973851       |
| `crema-caelia`        | Rosa nude       | #ffddde       |
| `cacao-caelia`        | Marrone         | #5b3f33       |

Poi:

1. Crea la collezione **CAELIA** con handle `caelia`
2. Aggiungi i tre prodotti
3. Home → sezione **Tre colori** → scegli la collezione `caelia`
4. Carica le foto campaign (pair-berry / pair-rosa / pair-cacao) su ogni prodotto
5. Pagine: `Storia` (handle `storia`) e `Contatti` (handle `contatti`, template **page.contact**)

## Pagamenti

Shopify Payments / Apple Pay / Google Pay si attivano in **Settings → Payments**.
Il checkout è quello Shopify, non il carrello demo del sito precedente.

## SEO

Già nel tema:

- Title e meta description (home, prodotto, collezione)
- Canonical, hreflang, robots `noindex` su carrello / search / 404 / account
- Open Graph + Twitter `summary_large_image`
- JSON-LD: Organization, WebSite + SearchAction, Product + Offer, BreadcrumbList, ItemList
- Un solo `h1` in home (wordmark CAELIA)
- Breadcrumb visibile, footer con link crawlabili
- Alt immagini prodotto

In Admin Shopify, per ogni prodotto:

1. Title SEO: `Burgundy Berry — CAELIA Beauty Mirror Case`
2. Description: 140–160 caratteri, colore + specchio + tasca
3. URL handle: `burgundy-caelia` / `crema-caelia` / `cacao-caelia`
4. Alt su ogni foto

Configurazione completa: **[CONFIG.md](./CONFIG.md)** (colori, menu, collezione, SEO, pagamenti).

