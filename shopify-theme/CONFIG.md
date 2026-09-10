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

Guida completa: **[PAYMENTS.md](./PAYMENTS.md)**

In sintesi:

1. **Settings → Payments → Completa Shopify Payments** (P.IVA, IBAN EUR SEPA, documento identità)
2. Attiva Shop Pay, Apple Pay, Google Pay — cattura **automatica**
3. **Settings → Checkout** → accent `#973851`
4. **Settings → Shipping** → Italia, gratis da 60 €
5. **Settings → Taxes** → IVA 22% inclusa
6. Tema: Customize → Pagamenti e checkout → drawer + checkout dinamico on

I pagamenti **non** si configurano nel codice del tema.

## 6. SEO / dominio

- Settings → Domains → dominio primario
- Search Console → `https://TUO-NEGOZIO.myshopify.com/sitemap.xml`
- Preferences → titolo e meta del negozio = CAELIA Beauty Mirror Case

## 7. Test A/B pulsante acquisto

Già nel tema. **Customize → Test A/B — pulsante acquisto**.

| Variante | Testo | Ruolo |
| -------- | ----- | ----- |
| **A** | Aggiungi al carrello | controllo |
| **B** | Acquista ora | variante |

Split 50/50. Lo stesso browser resta nello stesso gruppo (`localStorage caelia_cta_ab`).

Eventi: `cta_ab_view` e `cta_ab_click` con parametro `variant` = `A` o `B`.

Come leggerli:

1. Shopify Admin → Settings → Customer events → Add custom pixel  
2. Oppure GA4: stessi nomi evento, parametro `variant`

CTR = click / view per variante. Poi confronta anche gli ordini.

Per spegnere: togli la spunta, resta il testo A.  
Per riprovare: cancella `localStorage.caelia_cta_ab` in DevTools.

## 8. Come un tema premium

Da **Customize** (niente codice):

- **Add section** in home: Hero, Tre colori, Capitolo film, Mappa, Prodotto in evidenza, Immagine e testo, Testo editoriale, Newsletter
- Barra annuncio in header (spedizione / promo)
- Cart drawer: click su Carrello o dopo “Aggiungi”
- Checkout dinamico sotto il CTA (Shop Pay / Apple Pay / Google Pay)
- Menu, colori, logo, favicon, OG, social: ingranaggio tema

Foto: clicca la sezione → Image picker. Non servono path di file.

