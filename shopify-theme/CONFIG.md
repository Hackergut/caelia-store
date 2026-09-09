# Configurazione tema CAELIA — Shopify Admin

Dopo **Upload zip** e **Publish**, fai questi passi in ordine.

## 1. Catalogo

**Products → Import** il file `products.csv` del tema.

| Handle            | Titolo         | Prezzo |
| ----------------- | -------------- | ------ |
| burgundy-caelia   | Burgundy Berry | 58 €   |
| crema-caelia      | Rosa nude      | 58 €   |
| cacao-caelia      | Marrone        | 58 €   |

Foto: `pair-berry.jpg`, `pair-rosa.jpg`, `pair-cacao.jpg` (nella cartella assets del tema, oppure Files).

**Collections → Create collection**

- Nome: CAELIA
- Handle: `caelia` (Online store → URL)
- Condizione: vendor = CAELIA, oppure aggiungi i 3 prodotti a mano

## 2. Theme settings (Customize)

Online Store → Themes → **Customize** → icona ingranaggio.

| Gruppo              | Impostazione                 | Valore                          |
| ------------------- | ---------------------------- | ------------------------------- |
| Colori maison       | Burgundy Berry               | `#973851`                       |
|                     | Rosa nude                    | `#ffddde`                       |
|                     | Avorio caldo                 | `#dfc0b4`                       |
|                     | Marrone                      | `#5b3f33`                       |
| Brand               | Nome                         | CAELIA                          |
|                     | Tagline                      | Beauty Mirror Case              |
| Catalogo e menu     | Collezione home              | **CAELIA** (`caelia`)           |
|                     | Menu header                  | main-menu                       |
|                     | Menu footer                  | footer                          |
| SEO                 | Title home                   | CAELIA                          |
|                     | Meta home                    | (già precompilata)              |
|                     | Open Graph                   | `logo-drip.jpg` 1200×630        |
| Social              | Instagram / TikTok           | URL completi                    |

Home → sezione **Tre colori** → Collection = `caelia`.

Hero → Image = `logo-drip.jpg` oppure Video = `logo-drip.mp4` (Shopify Files).

Capitoli film → **Il gesto** = `life-apply.jpg` · **Tutto intorno** = `lifestyle-trio.jpg`.

Mappa prodotto → Image = `pair-berry.jpg`.

## 3. Menu

**Online Store → Navigation**

main-menu:

1. Home → `/`
2. Collezione → `/collections/caelia`
3. Storia → `/pages/storia`
4. Contatti → `/pages/contatti`

footer: stesse voci.

## 4. Pagine

- `Storia` — handle `storia` — template default
- `Contatti` — handle `contatti` — template **page.contact**

## 5. Pagamenti

Settings → Payments → **Shopify Payments** (carta, Apple Pay, Google Pay).

Checkout branding: Settings → Checkout → colore `#973851`.

## 6. SEO / dominio

- Settings → Domains → dominio primario
- Search Console → `https://TUO-NEGOZIO.myshopify.com/sitemap.xml`
- Preferences → titolo e meta del negozio = CAELIA Beauty Mirror Case
