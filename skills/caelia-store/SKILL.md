---
name: caelia-store
description: Blueprint completo e guida di ricostruzione dello store e-commerce CAELIA (Next.js 16 App Router, React 19, Tailwind CSS v4, TypeScript strict, Three.js/R3F, Vercel + Shopify-ready). Usala per rigenerare, clonare o fare audit dell'intero storefront con v0 di Vercel o con un agente: design token, motion system, copia in italiano, data model, regole di commerce, contratti API, wiring Shopify e una catena di prompt v0 pronta all'uso. / Complete blueprint + rebuild guide for the CAELIA e-commerce store. Use it to regenerate the whole storefront in v0/Vercel or audit the existing repo.
---

# CAELIA — Skill Completa del Progetto (Full Project Skill)

> **One-liner**: un e-commerce "beauty mirror case" di lusso accessibile, in italiano, per due sorelle (Carla — Los Angeles, Giulia — Dubai). Prodotto unico (2 SKU di formato, 5 varianti colore), brand minimal caldo senza serif, con viewer 3D del prodotto, carrello persistente, wishlist, checkout locale sostituibile con Shopify/Stripe.
> **EN — What this is**: this folder is the single source-of-truth "skill" for the CAELIA project (`Hackergut/caelia-store`, production `https://caelia-store.vercel.app`). It documents the brand, the design system, every route and component, the commerce rules, the data model, the API contracts, the Shopify wiring and the known gaps — and it includes a ready-to-paste **v0 (Vercel) prompt chain** to rebuild the entire store from scratch.

---

## 1. Chi siamo / Brand identity (EN below)

CAELIA nasce dall'incontro di due sorelle, **Carla (Los Angeles)** e **Giulia (Dubai)**. Due città lontane, due vite scandite da lavoro, appuntamenti, palestra, trasferte, weekend improvvisati e serate che cominciano subito dopo. Da questa quotidianità nasce un'esigenza semplice: avere con sé ciò che conta, senza perdere tempo a cercarlo nella borsa.

**Prodotto — Beauty Mirror Case**: un astuccio compatto con specchio integrato anti-riflesso, matita contorno labbra (formula cremosa) e lip gloss non appiccicoso, chiusura magnetica che si apre con una sola mano, fodera in microfibra/raso. Prodotto in Italia, pelle vegana certificata.

- **Tagline (claim)**: `Aprire. Ritoccare. Ripartire.` — i tre gesti del rituale.
- **EN — The ritual**: 01 Apri (chiusura magnetica, una mano sola) → 02 Ritocca (matita, gloss, specchio in un gesto) → 03 Ripartire (richiudi e sei già oltre).
- **Target copy (IT)**: "L'astuccio beauty con specchio per le donne che non si fermano."
- **Voce/tone**: italiano caldo e diretto, seconda persona ("tu/voi"), mai serif decorativo, minuscole maiuscole per micro-label, punteggiatura sobria. Niente inglese nel copy IT (tranne "Journal", "Bundle", "Studio 3D", "Press").
- **Contatti**: ciao@caelia.com (assistenza), press@caelia.com (stampa). Email fittizie del progetto.

**Lineup prodotti** (nome commerciale in italiano):
| Prodotto | Handle | Prezzo | Varianti (swatch) |
|---|---|---|---|
| CAELIA Beauty Mirror Case | `beauty-mirror-case` | €58,00 | Rose `#d49b96` · Noir `#1f1d1c` · Ivory `#efe5d8` |
| CAELIA Beauty Mirror Case Mini | `beauty-mirror-case-mini` | €38,00 | Rose `#d49b96` · Noir `#1f1d1c` |
| Bundle "Duo Essentials" | — (calcolato) | ~€81,60 (-15%) | Case + Mini |

Solo due prodotti nel catalogo; la collezione sembra più ampia grazie a varianti colore, gallery, bundle, recensioni e sezioni editoriali. **Non aggiungere altri prodotti senza chiedere** — il posizionamento è "un astuccio. tutto il necessario."

---

## 2. Stack tecnologico / Tech stack

| Layer | Scelta | Note |
|---|---|---|
| Framework | **Next.js 16 (App Router)** + React 19 | `/params` e `/searchParams` sono `Promise` (Next 15+ convention). SSG con `generateStaticParams` per le PDP. |
| Linguaggio | TypeScript strict, path alias `@/*` → `src/*` | ESLint `eslint-config-next/core-web-vitals` + `typescript` |
| Stili | **Tailwind CSS v4** (`@import "tailwindcss"`, `@theme`, PostCSS `@tailwindcss/postcss`) | Nessun `tailwind.config`; i token sono CSS vars in `src/app/globals.css` |
| Font | **Inter** via `next/font/google` (variabile `--font-inter`) | Solo Inter; `--font-serif` è un **alias di Inter** (il progetto gira interamente sans, vedi "Known issues") |
| 3D | `three` + `@react-three/fiber` v9 + `@react-three/drei` v10 | Solo lato client (`dynamic(..., { ssr:false })`) |
| Analytics | `@vercel/analytics/next` + Meta Pixel (opzionale) + dataLayer | Gate sul consenso cookie |
| E-commerce | Adapter Shopify Storefront API opzionale (`src/lib/shopify.ts`) + fallback locale | Checkout MVP locale; Stripe/Shopify checkout = upgrade previsto |
| Deploy | Vercel (`vercel.json`, framework nextjs) | Push su `master` → auto-deploy. GitHub: `Hackergut/caelia-store` |
| Script | Node 20+, npm | `npm run dev/build/start/lint` |

**Struttura**: `src/app` (route + API) · `src/components` · `src/lib` (dati, contesti, utilità) · `src/lib/caelia` (modello 3D) · `public/products` (foto) · `docs/` (MOTION, SHOPIFY, PRODUCT-PHOTOS) · `scripts/` (generatore immagini, import PS1).

> ⚠️ **Next.js 16**: le API/convenzioni differiscono dalle versioni precedenti — quando si scrive codice a mano, leggere la guida in `node_modules/next/dist/docs/`. Con v0 questo è gestito automaticamente.
> **EN — versioning note**: Next 16.3.4, React 19.2.8, Tailwind v4 — do not downgrade "per comodità"; the project relies on v4 CSS-first config and on Promise-based dynamic route params.
---

## 3. Design system (fedele — da `src/app/globals.css`)

> **EN — Golden rule**: never invent colors, curves, durations or type treatments outside the tokens below. These tokens are the "contract" every v0/agent rebuild must reproduce exactly.

### 3.1 Palette @theme (Tailwind v4)

Ogni colore ha un **ruolo** preciso:

| Token | Hex | Ruolo |
|---|---|---|
| `--color-cream` | `#f7f1ea` | sfondo pagina |
| `--color-cream-deep` | `#efe5d8` | sezioni alternate, placeholder, card bundle |
| `--color-mist` | `#e0d6c9` | bordi/separatori caldi |
| `--color-cacao` | `#7b5644` | **main** — testo, titoli, superfici primary (alias `charcoal`, `ink`) |
| `--color-cacao-deep` | `#5a3d2e` | hover su superfici scure |
| `--color-burgundy` | `#4a0e16` | **accent** — CTA primaria, enfasi link, badge carrello |
| `--color-burgundy-deep` | `#2e070d` | hover della CTA |
| `--color-burgundy-tint` | `#7a2630` | primary soft su superfici scure |
| `--color-night` | `#1a0a0e` | superfici scure: announcement bar, footer, sezione rituale, Studio 3D |
| `--color-night-deep` | `#0e0507` | fondo più scuro |
| `--color-rose` | `#d49b96` | tint decorativo, corsivi, accent micro-label, badge "Esaurito" |
| `--color-rose-deep` | `#b8655f` | rose per enfasi (email template) |
| `--color-blush` | `#e9c9c4` | tint rosa chiaro su fondo scuro (micro-label nel footer/rituale) |
| `--color-blush-deep` | `#d49b96` | selezione testo (`::selection`) |

Regole d'uso (from the design history): cacao = main/readable; **burgundy è riservato** a CTA/enfasi forti; rose = decorativo; su fondo chiaro i CTA usano `bg-charcoal`(=cacao); le classi legacy `charcoal`/`ink` sono alias di cacao. Ombre: `--shadow-soft` `0 10px 30px -12px rgba(31,29,28,.15)`, `--shadow-product` `0 30px 60px -30px rgba(31,29,28,.35)`.

### 3.2 Tipografia

- **Solo Inter** (variable, display swap). `font-serif` è un alias → Inter. Body: 400, ~`text-ink` (cacao). Headings: weight **500**, tracking `-0.018em`…`-0.028em` (`h1 -0.024em`, `h2 -0.02em`). `.font-display`: Inter 500, `letter-spacing:-0.028em`.
- **Micro-label pattern** (usato ovunque): `text-xs uppercase tracking-[0.18em]` / `[0.22em]` / `[0.32em]` (eyebrow sopra gli H1/H2: `[0.32em]` con `text-ink/60`).
- Dimensioni ricorrenti: hero H1 `text-5xl sm:text-6xl lg:text-7xl leading-[1.05]`; sezione H2 `text-4xl lg:text-5xl leading-[1.1]`; card title `font-serif text-lg leading-snug`; accenti corsivi `italic text-rose`.
- Ritmo: max-w contenuti `max-w-7xl px-6 lg:px-10`; sezioni `py-24 lg:py-32` (py ridotti sulle sezioni interne); gutter `gap-12 lg:gap-20`.
- `text-balance` per titoli. Anti-aliasing + `font-feature-settings: "ss01","ss02","cv11"`.

### 3.3 Motion system (Emil Kowalski) — da `docs/MOTION.md` e `globals.css`

**EN**: all motion must use these curves/durations; never plain `ease`/`linear` for UI; never `transition: all`; animate `transform`/`opacity` only.

Curve tokens (`:root`):
| Token | Value | Uso |
|---|---|---|
| `--ease-out` | `cubic-bezier(0.23,1,0.32,1)` | entrate, press-release, color, opacity |
| `--ease-in-out` | `cubic-bezier(0.77,0,0.175,1)` | morph/panning on-screen |
| `--ease-drawer` | `cubic-bezier(0.32,0.72,0,1)` | drawer carrello, sheet, modal (iOS Ionic) |
| `--ease-spring-out` | `cubic-bezier(0.16,1.08,0.38,1)` | toast, momenti marketing (leggero overshoot) |

Durata: `--dur-instant 100ms`, `--dur-fast 160ms`, `--dur-base 220ms`, `--dur-medium 320ms`, `--dur-slow 480ms`; stagger `--stagger 60ms`. Classi utilità: `.btn-press` (scale .97 su `:active`; su touch opacity .7), `.lift`/`.lift-strong`, `.media-zoom` (immagine 1.04 su hover), `.chip`, `.reveal` (fade+translateY stagger con `--i`), `.drawer-enter[-active]`, `.modal-enter[-active]` (scale .97), `.toast-enter[-active]`, `.nav-link` (underline scaleX), `.marquee`, `.grain` (texture puntinata), `.img-fade-in`.

Regole hard: niente `transition:all`; niente `scale(0)` in entrata (usare .95–.97); niente `ease-in` in UI; niente animazione di width/height/margin/padding/top/left; hover animato solo dentro `@media (hover:hover) and (pointer:fine)`; `prefers-reduced-motion: reduce` = transizioni ~0 (ma il feedback colore/opacity resta); toast con transizioni (non keyframes).

### 3.4 Pattern UI ricorrenti (riprodurre esattamente)

- **CTA primaria**: `inline-flex items-center justify-center bg-charcoal text-cream px-6/8 py-3/4 text-xs uppercase tracking-[0.22em] hover:bg-rose transition-colors btn-press`. (Hover: da cacao a rose!)
- **CTA secondaria/ghost**: `border border-charcoal px-… py-… text-xs uppercase tracking-[0.22em] hover:bg-charcoal hover:text-cream transition-colors btn-press`.
- **Text link**: `text-xs uppercase tracking-[0.22em] nav-link` (freccia "→" per i "vedi tutto").
- **Swatch/variante**: bottone pill `rounded-full border pl-2 pr-4 py-2` con pallino `h-4 w-4 rounded-full ring-1 ring-charcoal/10` + nome colore.
- **Card prodotto**: link blocco → media `aspect-[4/5] rounded-md bg-cream-deep overflow-hidden media-zoom lift` + swatch in basso a sinistra + riga titolo/prezzo sotto.
- **Badge header carrello**: pallino `bg-burgundy text-cream text-[10px] rounded-full`.
- **Form**: input `w-full border rounded-md px-4 py-3 text-sm bg-cream focus:outline-none focus:border-charcoal` (bordo `border-mist`, errore `border-rose`), label `text-xs uppercase tracking-[0.22em] text-ink/60 mb-1`.
- **Sezioni alternate** per ritmo pagina: `bg-cream` → `bg-cream-deep relative grain` → `bg-night text-cream` → ecc.
- **Radii**: `rounded-md` ovunque (card/immagini/input), `rounded-full` per pill.
- Responsive: mobile-first; header hamburger < md; grid card `sm:grid-cols-2 lg:grid-cols-3`; PDP `lg:grid-cols-2`.

---

## 4. Informazioni e struttura del sito / Information architecture

**EN**: 20+ pagine, tutte server-rendered con metadata italiano; le pagine "interattive" delegano a componenti client.

| Route | Titolo (metadata) | Note / robots |
|---|---|---|
| `/` | (default CAELIA — Aprire. Ritoccare. Ripartire.) | Landing completa (sez. §5) |
| `/products` | Collezione | Header + `<ProductsExplorer>` (filtri/sort client) |
| `/products/[handle]` | seo.product.title | SSG `generateStaticParams`; JSON-LD Product+Breadcrumb |
| `/about` | La nostra storia | Story delle sorelle (testo lungo) |
| `/journal` | Journal | 3 post statici (date 2026, "Settembre/Ago/Luglio 2026") |
| `/account` | Account | `robots noindex`; ordini recenti da localStorage |
| `/cart` | Carrello | `noindex`; `<CartView>` |
| `/checkout` | (default) | `noindex`? (non impostato ma non linkata); form completo |
| `/checkout/success?order=` | Ordine confermato | `robots noindex` |
| `/contact` | Contatti | form statico (senza handler) |
| `/cookies` | Cookie | informativa, ultimo agg. 3 settembre 2026 |
| `/faq` | Domande frequenti | JSON-LD FAQ |
| `/ordini/[id]` | Stato ordine | `noindex`; tracciamento fittizio deterministico `CAELIA-\d{3,6}` |
| `/press` | Press & media | media kit: colori, font, bio founder |
| `/privacy` | Privacy | informativa, ultimo agg. 3 settembre 2026 |
| `/search?q=` | Cerca | `robots noindex, follow`; ricerca client su titolo/descrizione/tags |
| `/shipping` | Spedizioni e resi | tabelle costi per area |
| `/sostenibilita` | Sostenibilità | 4 pilastri numerati 01–04 |
| `/terms` | Termini e condizioni | informativa |
| `/wishlist?h=` | Preferiti | `?h=handle,handle` per link condivisi |
| `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`, `/favicon.ico`, `/favicon.svg`, `/logo.svg`, `/og.svg` | — | asset SEO |
| API | `/api/health` `/api/newsletter` `/api/checkout` | v. §8 |

**Shell globale** (`src/app/layout.tsx` + `SiteChrome`): `<html lang="it">` con Inter; `body` = `bg-cream text-ink font-sans` e provider annidati `CartProvider > WishlistProvider > CurrencyProvider > SiteChrome`; poi `CookieBanner`, `Analytics`, JSON-LD Organization+WebSite. `SiteChrome` = **announcement bar** (night, marquee "Spedizione gratuita in Italia oltre 60 euro · Resi gratuiti entro 30 giorni" ×6) + **header sticky** (su `/` trasparente sopra l'hero finché `scrollY>8`, poi `bg-cream/95 backdrop-blur border-b border-mist/60`; logo centrale CAELIA `font-serif tracking-[0.05em]`; nav: Collezione/Storia/Journal/Cerca; destra: Preferiti, currency switcher, Account, Carrello con badge) + `main flex-1` + **footer** night a 2 colonne (brand block: nome, storia breve, LA·Dubai·Made in Italy, social IG/TikTok/Pinterest placeholder `https://instagram.com` ecc. — da aggiornare) e colonna "Esplora/Aiuto", poi strip **Newsletter**, bottom bar `© anno CAELIA` + Privacy·Termini·Cookie. `<CartDrawer>` + `<MobileMenu>` montati qui. Il menu mobile è drawer da sinistra `max-w-xs`.
---

## 5. Contenuti della Landing (`/`) — copia esatta

> **EN**: paste this Italian copy verbatim when rebuilding; it is the brand voice, do not rewrite.

Ordine delle sezioni su `/` (server component `src/app/page.tsx` che chiama `listProducts()`):

1. **Eyebrow**: `Los Angeles · Dubai` → **H1**: `Aprire. Ritoccare.` *(seconda riga, "Ritoccare." in `italic text-rose`)* `Ripartire.` → **paragrafo**: «Il Beauty Mirror Case CAELIA: un astuccio compatto che racchiude matita contorno labbra, lip gloss e specchio. Pensato per le giornate fatte di continui passaggi.»
   - CTA 1: `Scopri la collezione` → `/products` (primaria). CTA 2: `La nostra storia →` → `/about` (text link).
   - **Statistiche**: `3` Tonalità · `3-in-1` Specchio, matita, gloss · `100%` Pelle vegana.
   - **Visual hero**: immagine 4:5 `shadow-product` — nel codice attuale punta a `/products/beauty-case-rose-front.svg` che **NON ESISTE nel repo (bug, v. §13)**; nei rebuild usare `/products/beauty-case-rose-front.png` oppure creare le due silhouette SVG.
2. **Manifesto** (`bg-cream-deep grain`, centrato): eyebrow `Manifesto`; H2 quote: «"Quante volte, per un semplice ritocco, ci ritroviamo a rovistare nella borsa alla ricerca di una matita, del lip gloss o dello specchietto?"»; attribuzione: `Carla & Giulia — fondatrici di CAELIA`.
3. **Collezione in vetrina**: eyebrow `Collezione`; H2 `Un astuccio. Tutto il necessario.`; link `Vedi tutto →`; griglia 3 card `ProductCard` con stagger reveal.
4. **Il rituale CAELIA** (`bg-night text-cream`): eyebrow `Il rituale CAELIA` (in `text-blush`); H2 `Tre gesti.` / `Pronta a ripartire.`; elenco numerato in corsivo serif-rose…
   - 01 **Apri** — "Chiusura magnetica, si apre con una sola mano."
   - 02 **Ritocca** — "Matita contorno labbra, gloss, specchio. Tutto in un gesto."
   - 03 **Ripartire** — "Richiudi e sei già oltre. Nessun attimo perso."
   - Visual 4:5 di destra: riferimento `/products/beauty-case-rose-open.svg` (idem: **manca**, usare `beauty-case-rose-open.png` nei rebuild).
5. **Bundle**: `<BundleSection>` (spec in §7) — "Duo Essentials", -15%, Case+Mini, `Risparmia con i duo.`
6. **Recently viewed**: `<RecentlyViewedSection>` — solo se esistono item in localStorage, header `Visti di recente` / `Torna dove eri rimasta.`, 4 card.
7. **Studio 3D teaser** (`bg-cream-deep grain`): eyebrow `Studio 3D`; H2 `Prendilo in mano. Ruotalo. Aprilo.`; testo: «Esplora il Beauty Mirror Case in alta risoluzione. Cambia tonalità, guarda il formato pocket, scarica uno screenshot da condividere.» Segue subito `<Caelia3DExplorer/>`.
8. **Press/trust strip**: eyebrow `Pensato per chi vive in movimento`; testo «Due città lontane, due vite scandite da lavoro, appuntamenti, palestra, trasferte, weekend improvvisati e serate che cominciano subito dopo.»; riga trust: `Prodotto in Italia · Pelle vegana certificata · Spedizioni tracciate · Resi gratuiti 30 giorni`.

**Studio 3D Explorer (componente)** — sezione `bg-charcoal text-cream`: canvas `aspect-[4/5]` + pannello controlli: 3/4 **varianti 3D** (Cognac/Blush/Bordeaux — swatch `chip`), toggle view `mirror`/`pocket`, toggle auto-rotate, bottone **"Scarica screenshot"** (cattura WebGL → PNG `caelia-{variant}-{view}.png`). Nota: **è l'unico spazio 3D interattivo della landing** (il Beauty Finder quiz `CaeliaFinder` è volutamente rimosso dalla home). Nessuna sezione quiz in home.

---

## 6. Contenuti delle altre pagine (spec copy)

- **/about — La nostra storia**: eyebrow `La nostra storia`; H1 `Due sorelle, due città,` *(riga 2: `un'unica idea.` italic rose)*. ~5 paragrafi (storia: due sorelle divise da migliaia di chilometri — LA e Dubai —, ritmi veloci, esigenza di avere con sé ciò che conta; nascita del Beauty Mirror Case; valori: pelle vegana, made in Italy, laboratorio a Firenze; vision). Chiudere con firma Carla & Giulia.
- **/journal**: H1 `Pensieri, rituali,` / `dietro le quinte.`; 3 card articolo statiche con data in italiano: "Tre gesti per ripartire" (Settembre 2026, 3 min); "Cosa mettere in borsa a Dubai" (Agosto 2026, 4 min); "Da Los Angeles con amore" (Luglio 2026, 5 min). Niente pagine articolo: sono card senza link di dettaglio.
- **/account**: H1 `Il mio account`; nota: ordini locali; `<AccountOrders>` legge `caelia_orders_v1` (lista ordini con data in italiano, totale in `Price`). Contiene anche sezione "Accedi" statica (email/password senza handler) — nota: collegare Shopify Customer Accounts in produzione.
- **/ordini/[id]**: tracciamento **fittizio deterministico**: `STAGES` Ricevuto → In preparazione → Spedito → Consegnato; indice da ultime 4 cifre: ≥9000 Spedito, ≥7000 In preparazione, ≥3000 Ricevuto, else Ricevuto (commento: "≥9000 shipped… others received" — il mapping reale: n>=9000 → 3 (Consegnato? in codice `return 3` con stage "Consegnato"), n>=7000 → 2 "Spedito", n>=3000 → 1 "In preparazione", else 0 "Ricevuto"). Valida `CAELIA-\d{3,6}`.
- **/press**: H1 `Stampa e media kit.`; bio founders; palette + font (⚠️ la pagina press elenca ancora Fraunces e i vecchi hex `#b8655f`/`#1f1d1c`: incoerenza legacy, vedi Known issues); contatto press@caelia.com; immagini prodotto. CTA per scaricare asset.
- **/faq**: 6 domande con accordion (niente <details>? usa elementi custom): contenuto "Cosa contiene il Beauty Mirror Case?", "La matita e il gloss sono ricaricabili?" (monouso, ricariche autunno 2027), "Quanto dura la spedizione?" (Italia 3-5gg, Europa 4-7, USA/Dubai 5-9, express), "Posso regalarlo?", "La pelle è vera?" (no, vegana certificata), "Avete uno store fisico?" (no, online; partner retail LA/Dubai in arrivo). JSON-LD FAQ.
- **/shipping — Spedizioni e resi**: H1 `Spediamo con cura, rimborsiamo senza domande.`; card area: Italia Standard 3-5gg €4,90 / gratis ≥€60, Express 1-2gg €8; Europa Standard 4-7gg da €9,90 / Express 2-3gg da €19; Regno Unito da £9,90 / da £19; USA & Dubai Standard 5-9gg da $19 / Express 2-4gg da $35; sezione resi (30 giorni gratuiti).
- **/sostenibilita**: H1 `Sostenibilità.`; 4 pilastri numerati 01 Pelle vegana certificata; 02 Matita e gloss cruelty-free (Lombardia, VeganOK, no parabeni/siliconi); 03 Packaging riciclato (carta FSC, inchiostri vegetali, pluriball biodegradabile, spedizioni a impatto zero); 04 Produzione locale (assemblato a Firenze).
- **/contact**: H1 `Scrivici.`; promessa risposta entro 24 ore; form statico (Nome, Email, Ordine opzionale, Messaggio) — senza handler funzionante (placeholder).
- **Legal**: `/privacy`, `/terms`, `/cookies` — informativa sobria, "Ultimo aggiornamento: 3 settembre 2026", struttura a H2; cookies pagina elenca CookieRow (tecnici richiesti, analytics con consenso…).
- **404** (`/not-found`): H1 `Pagina non trovata.` + CTA `Scopri la collezione` / `Contattaci`. **500** (`/error` + `global-error`): H1 `Non era previsto.`, bottone `Riprova`, digest. **loading**: skeleton `animate-pulse` con blocchi `bg-mist/40` (header 3 righe + 3 card 4:5).
---

## 7. Data model & catalogo (da `src/lib/products.ts`, `types.ts`)

```ts
type Money = { amount: string; currencyCode: "EUR" | "USD" | "GBP" };
type ProductImage = { src: string; alt: string };
type ProductVariant = { id: string; sku: string; title: string;
  price: Money; available: boolean; swatch?: string };
type Product = { id: string; handle: string; title: string; vendor: string;
  productType: string; tags: string[]; description: string; descriptionEn: string;
  features: string[]; featuresEn: string[]; details: { material: string;
  dimensions: string; weight: string; madeIn: string }; detailsEn: {...};
  images: ProductImage[]; variants: ProductVariant[];
  seo: { title: string; description: string } };
type CartLine = { productHandle: string; productTitle: string; variantId: string;
  variantTitle: string; price: Money; quantity: number; image: string };
type Review = { id; author; location; rating: 1|2|3|4|5; title; body; date; verified };
```

### Prodotto 1 — Beauty Mirror Case (`beauty-mirror-case`, id `gid://caelia/Product/beauty-mirror-case`)
- **IT**: "L'astuccio compatto che racchiude tutto ciò che serve per un ritocco veloce: matita contorno labbra, lip gloss e specchio. Pensato per le giornate che cambiano ritmo ogni ora." — **EN** (per descrizione alternativa): "A compact case that holds everything you need for a fast touch-up: lip liner, lip gloss and mirror. Designed for days that shift tempo every hour."
- **Features IT**: Specchio integrato, anti-riflesso · Matita contorno labbra, formula cremosa · Lip gloss non appiccicoso · Chiusura magnetica sicura · Fodera in microfibra per pulizia rapida. (EN: Built-in anti-glare mirror / Creamy lip liner / Non-sticky lip gloss / Secure magnetic closure / Microfiber lining for quick wipe.)
- **Details**: Materiale "Esterno in pelle vegana color rosa cipria, interno in raso." · Dimensioni `11,5 x 7,5 x 2 cm` · Peso `120 g` · Made in Italia. (EN: 11.5 x 7.5 x 2 cm / 120 g)
- **Varianti**: Rose (`beauty-case-rose`, SKU `CAELIA-BC-ROSE-01`, swatch `#d49b96`) · Noir (`CAELIA-BC-NOIR-01`, `#1f1d1c`) · Ivory (`CAELIA-BC-IVO-01`, `#efe5d8`) — tutti €58.00 EUR, `available: true`.
- **Immagini**: `beauty-case-rose-front.png` (card + hero), `beauty-case-rose-open.png`, `beauty-case-rose-detail.png`, `beauty-case-rose-lifestyle.png` (gallery). Alt con suffisso colore per il matching variante→immagine (Rose/Noir/Ivory hanno anche i file front dedicati: `beauty-case-noir-front.png`, `beauty-case-ivory-front.png`).
- **SEO**: title "CAELIA Beauty Mirror Case — astuccio beauty con specchio", description "Compatto, elegante, sempre con te. Scopri il Beauty Mirror Case CAELIA in tre varianti."
- Tags: `beauty, mirror, essentials, travel`. Vendor CAELIA, type "Beauty Accessory".

### Prodotto 2 — Mini (`beauty-mirror-case-mini`)
- Solo specchio e gloss, formato tascabile per la pochette della sera. **Details**: vegana/raso · `8,5 x 5,5 x 1,5 cm` · 65 g · Italia. Varianti Rose (`CAELIA-BCM-ROSE-01`) e Noir (`CAELIA-BCM-NOIR-01`) a **€38.00**. Immagini: `beauty-case-mini-{rose,noir,ivory}-front.png` (nota: il Mini NON ha Ivory tra le varianti, ma il file front Ivory esiste: usato come slide) + `beauty-case-mini-open.png`.
- **SEO**: "CAELIA Beauty Mirror Case Mini" / "Specchio e gloss in formato tascabile. Il Mini entra in ogni borsa."

### Recensioni seed (per handle, in `src/lib/reviews.ts`)
`beauty-mirror-case`: 4 recensioni IT verificate (Sofia M. Milano 5★ "Lo uso ogni giorno" 2026-07-18; Giulia P. Dubai 5★ "Pensato per chi viaggia" 2026-08-02; Carla R. Los Angeles 4★ "Bellissimo" 2026-08-14; Beatrice L. Roma 5★ "Regalo perfetto" 2026-08-21). Mini: seed analogo (Anna T. Milano 5★ "Tascabile" ecc.). Form mostra: rating, title, author+location, verified badge, date.

### Bundle
`duo-essentials` = "Duo Essentials", desc: "Beauty Mirror Case + Mini: specchio, matita e gloss in due formati. Risparmi il 15%." `percentOff: 15`. Prezzo bundle = somma scontata mostrata con barrato. Bottone "Aggiungi al carrello (15% off)" aggiunge i default variant di entrambi e naviga a `/cart`. Link "Dettagli" → `/products?bundle=duo-essentials`.

---

## 8. Regole di commerce (checkout math — fedele)

**EN — pricing rules to reproduce exactly.**

- **Spedizione (Italia, al checkout)**: standard = **€4,90**, **gratuita sopra €60** di subtotale; express = **€8,00**. (Tabelle internazionali su /shipping; al checkout il selettore paese non ricalcola il costo — solo IT standard/express.)
- **Confezione regalo**: +**€4,90** (checkbox + messaggio max 200 caratteri). Note ordine libere.
- **Codici sconto** (percentuale su subtotale): `CAELIA10` 10% · `WELCOME` 10% · `COMEBACK` 15%. Codici sconosciuti → errore "Codice non valido" + micro animazione shake.
- **Totale** = subtotale + spedizione − sconto + gift wrap. Rounding 2 decimali. Calcolo **identico lato client (checkout page)** e **lato server (`/api/checkout`)**.
- **Valute**: base EUR; switcher EUR/USD/GBP con tassi fissi `1 / 1.08 / 0.86`, display con `Intl.NumberFormat` (it-IT, en-US, en-GB). I prezzi mostrati cambiano valuta, il checkout fattura in EUR (l'ordine registra `currencyCode`).
- **Pagamento**: solo selezione UI `card | paypal | klarna` (senza raccolta dati carta né addebito: MVP). Testo: "Pagamenti sicuri via Stripe · Crittografia SSL" / "Pagamento elaborato in modo sicuro. I dati della carta non vengono mai salvati sui nostri server."
- **Ordine**: id `CAELIA-` + 5 cifre random. Dopo submit: salva in `caelia_orders_v1`, `clear()` carrello, redirect a `/checkout/success?order=CAELIA-xxxxx`. Email conferma opzionale via **Resend** se `RESEND_API_KEY` è impostata (template HTML brandizzato: cream/rose, intestazione CAELIA, tabella righe, totale, gift wrap/message, "Aprire. Ritoccare. Ripartire.").
- **Scorte**: placeholder deterministico da SKU (hash → 2–9). `InventoryBadge`: ≤0 "Esaurito" (e `BackInStockButton` salva la richiesta in localStorage `caelia_back_in_stock_v1`), ≤4 "Solo N disponibili" (rose, pulse), else "Disponibile" (verde). In produzione sostituire con `inventoryQuantity` Shopify.
- **Validazione checkout** (`validate.ts`): email regex; nome/cognome `[\p{L}'\-\s]{2,}`; indirizzo ≥5 char; città ≥2; **CAP italiano = 5 cifre** se paese "Italia", altrimenti 3–10 alfanumerici; telefono opzionale `[+\d][\d\s().-]{6,}`; errori in italiano sotto i campi; scroll + focus sul primo campo errato.
- **Carrello**: drawer (destra, iOS curve, body scroll lock, Escape chiude) + pagina `/cart`. Quantità −/+, rimozione, subtotale, free-shipping progress non presente; nota "Spedizione calcolata al checkout".

### localStorage keys (nomi esatti, con versionamento `_v1`)
| Key | Contenuto |
|---|---|
| `caelia_cart_v1` | `CartLine[]` |
| `caelia_wishlist_v1` | `string[]` di handle prodotto |
| `caelia_currency_v1` | `"EUR"\|"USD"\|"GBP"` |
| `caelia_orders_v1` | `OrderSummary[]` (≤12): orderId, total, currencyCode, placedAt, items |
| `caelia_recently_viewed_v1` | `string[]` (max 4, più recente in testa) |
| `caelia_abandoned_cart_v1` | `{ at, count, email? }` — scritto quando il carrello ha item; consumato dal banner recovery dopo 30 min |
| `caelia_abandoned_dismissed_v1` | `"1"` |
| `caelia_cookie_consent_v1` | `"all" \| "essential-only"` |
| `caelia_exit_intent_v1` | `"1"` (dopo 8s + mouseleave top, una volta sola) |
| `caelia_support_open_v1` | `"1"` (bolla supporto dopo 6s, una volta) |
| `caelia_back_in_stock_v1` | `[{ sku, email, at }]` |

Evento custom: `caelia:consent` con detail `"all"|"essential-only"` (dispatch dal CookieBanner; ascoltato da Analytics e track()).

---

## 9. API routes (contratti)

- **`POST /api/checkout`** — body: `{ email, firstName?, lastName?, address?, city?, zip?, country?, shipping?: "standard"|"express", payment?: "card"|"paypal"|"klarna", giftWrap?, giftMessage?, notes?, discountCode?, lines: [{variantId, quantity, price:{amount,currencyCode}}] }`. Errori: 400 Invalid JSON, 422 Missing email or lines. Success `{ ok:true, orderId, total, currencyCode, discountCode?, discountAmount?, giftWrap }`. Log `[CAELIA order]`. Email Resend se env impostata.
- **`POST /api/newsletter`** — body `{email}`; 422 "Email non valida"; 200 `{ok:true}`; per ora solo log `[CAELIA newsletter]` (prod: Klaviyo/Mailchimp/Shopify Marketing).
- **`GET /api/health`** — `{ ok:true, service:"caelia-storefront", ts }`, `Cache-Control: no-store`, `force-dynamic`.
- Env usati: `SHOPIFY_STORE_DOMAIN`, `SHOPIFY_STOREFRONT_API_TOKEN`, `RESEND_API_KEY`. (`.env*` in .gitignore; su Vercel via `vercel env add`.)

### Analytics & consenso
`src/lib/track.ts` — `track(event, params)` no-op se: niente window, niente consenso `all`, niente `window.fbq`. Pusha anche in `dataLayer`. Eventi mappati: **ViewContent** (PDP mount), **AddToCart** (PDP + sticky + drawer?), **InitiateCheckout** (checkout con righe), **Purchase** (dopo ordine, value=total, content_ids=[orderId]). `Analytics` carica Vercel Analytics + Meta Pixel + (opzionale) Plausible solo dopo consenso. CookieBanner: delay 800ms, due scelte, pulsante rifiuta → "essential-only". Header X-Content-Type-Options/X-Frame-Options DENY/Referrer-Policy/Permissions-Policy in `vercel.json`.
---

## 10. Inventario componenti & comportamento (fedele)

> **EN**: component-by-component spec. "client" = must be `"use client"`.

- **ProductCard** (server-safe) — link a `/products/[handle]`; media 4:5 con zoom+lift; pallini colore da varianti; prezzo col default variant via `<Price>`; accetta `className`/`style` (usato per stagger `reveal --i`).
- **ProductsExplorer** (client) — filtri colore (pallino+nome), tipo prodotto, sort: `featured|price-asc|price-desc|title`; conteggio "N prodotti"; empty state con reset; `colorLabel` map: `#d49b96→Rose`, `#1f1d1c→Noir`, `#efe5d8→Ivory`, `#cfc7be→Mist`.
- **ProductDetail** (client) — PDP layout fedele (DOM reale in `src/components/product-detail.tsx`): wrapper `grid lg:grid-cols-2 gap-12 lg:gap-20` con **3 figli** nell'ordine: (1) `<Caelia3DFrame>` (hero 3D con poster + fallback reduced-motion, aspect 4:5); (2) colonna `flex flex-col gap-4` = immagine zoom-on-hover (scale 2, `--zoom-x/y` dal mouse, `[transform-origin:var(--zoom-x)_var(--zoom-y)]`) + strip thumbnails `grid-cols-4` (active = `border-charcoal`); (3) pannello info `lg:sticky lg:top-28 self-start` (auto-placement grid: in desktop finisce sotto il 3D a sinistra). Contenuto info: eyebrow `productType`, H1, descrizione, prezzo `font-serif text-3xl`, InventoryBadge, BackInStock se esaurito, selettore colore pill con swatch (active `border-charcoal`), stepper quantità (−/+) + ATC (`bg-charcoal ... disabled "Esaurito"`), WishlistButton, features con bullet `bg-rose`, griglia details (Materiale/Dimensioni/Peso/Prodotto in), trust row "· Spedizione gratuita oltre 60€ · Resi gratuiti 30 giorni · Spedizione tracciata". Eventi: `viewItem` al mount, `pushRecentlyViewed(handle)`, `addToCart` su ATC. `variantImages` = filtra `product.images` il cui `alt` contiene il suffisso colore della variante selezionata (es. "rose"), fallback a tutte le immagini.
- **StickyAddToCart** (client) — barra fissa bottom su mobile (`lg:hidden`) con variante attiva + prezzo + ATC.
- **Caelia3DFrame** (client) — PDP: poster = `product.images[0]` sempre visibile; canvas WebGL sopra (fade-in) se `prefers-reduced-motion: reduce` è false; badge "Live 3D · N colori" / "Trascina per ruotare"; mapping swatch→variante 3D: `#d49b96|#e9c9c4→blush`, `#1f1d1c→bordeaux`, `#efe5d8→cognac` (default), swatch assente→cognac.
- **CaeliaViewer** (client, default export, lazy) — R3F `<Canvas dpr={[1,2]} camera={{position:[1.5,0.6,4.4], fov:30}} gl={{antialias:true, alpha:true}}>` ACESFilmic tonemapping; luci ambient .3 + directional ×2; `Environment`/`Lightformer`/`ContactShadows`/`OrbitControls`; snapshot bind via `gl.render` + `toDataURL('image/png')`. props `{variant, view:'mirror'|'pocket', autoRotate, onSnapshotReady}`.
- **CaeliaModel** + `src/lib/caelia/{geometry,textures,variants}.ts` — modello procedurale del case 3-in-1 (aperto = specchio+matita+gloss) costruito da primitive Three; varianti materiali `CAELIA_VARIANTS`: **Cognac** `#97643c`/dark `#5f3a1e`/stitch `#d3a06b`, **Blush** `#d0a093`/`#96685e`/`#b3837a`, **Bordeaux** (dalla riga successiva del file) — palette **3D separata** dal catalogo (Rose/Noir/Ivory ≠ Cognac/Blush/Bordeaux; mapping semplificato in frame).
- **Caelia3DExplorer** (client, home) — descritto in §5.7. Doppio controllo view mirror/pocket, autoplay toggle, swatch chip, download PNG.
- **CartDrawer** (client) — descritto §8; scrim `bg-night/40`, drawer `max-w-md bg-cream`, transizione `--ease-drawer`, subtotale + CTA checkout. Accessible: `role="dialog" aria-label="Carrello"`, body lock, Escape.
- **CartView** (client, `/cart`) — stessa logica shipping (≥60 free) + lista righe con thumbnail 64px, qty stepper, remove, subtotale/totale, note fiducia (Lock/PaymentIcons/Truck/Refresh), CTA checkout; empty state con CTA.
- **MobileMenu** (client) — drawer sinistro `max-w-xs`, overlay, link principali + preferiti/account/carrello.
- **WishlistButton / WishlistShare / WishlistView / wishlist page** — cuoricino toggle per handle; `/wishlist` legge `caelia_wishlist_v1` + supporto `?h=a,b` (shared wishlist: seed localStorage). Share copia link `/wishlist?h=…`.
- **CurrencySwitcher** — select EUR/USD/GBP nel header (desktop).
- **NewsletterForm** (client) — input sottolineato nel footer; stati loading/ok/err; messaggio successo "Grazie. Ti abbiamo aggiunto alla newsletter."
- **CookieBanner / Analytics / ExitIntentModal / RecoveredCartBanner / SupportWidget** — overlay/comportamenti descritti nelle sezioni 8/9 e key table.
- **DiscountField / CheckoutExtrasForm / BackInStockButton / InventoryBadge / TrustIcons / ProductReviews / RecentlyViewedSection / BundleSection / AccountOrders** — vedi regole sopra.
- `CaeliaFinder` (client, quiz) esiste in repo ma **non è montato in home** (mantenuto per usi futuri: quiz "trova la tua tonalità").

---

## 11. SEO, structured data, asset

- **layout.tsx**: metadata globale (title template `%s · CAELIA`; default "CAELIA — Aprire. Ritoccare. Ripartire."; description brand; `metadataBase https://caelia.com`; OG+Twitter con `/og.svg`; keywords it). OG locale `it_IT`, alternate `en_US`.
- **JSON-LD**: Organization (nome, fondatrici Carla/Giulia, foundingDate 2026, Milano IT, sameAs IG/TikTok), WebSite con SearchAction su `/products?q=`, Product + Breadcrumb sulle PDP (`/`, `/products`, `/products/[handle]`), FAQPage su `/faq`.
- **sitemap.ts**: static routes (priority: / 1.0, /products 0.9, products 0.9, /about 0.7, /journal 0.6, /faq·/shipping·/contact 0.5, legal 0.3) + tutte le PDP. Base `https://caelia.com` (il deploy attuale è caelia-store.vercel.app: usare il dominio finale corretto).
- **robots.txt** e **manifest.webmanifest** in public; favicon.svg + logo.svg + og.svg brandizzati (testo CAELIA, palette cream/cacao/rose — rigenrare se serve).
- Pagine noindex: account, cart, checkout/success, ordini/[id], search (index:false follow:true).

### Asset immagine prodotti (importante per il rebuild)
| File in `public/products/` | Contenuto |
|---|---|
| `beauty-case-rose-front.png` / `-noir-front` / `-ivory-front` | front 4:5 |
| `beauty-case-rose-open.png` | aperto con specchio+gloss |
| `beauty-case-rose-detail.png` | dettaglio chiusura/cucito |
| `beauty-case-rose-lifestyle.png` | lifestyle |
| `beauty-case-mini-rose/noir/ivory-front.png`, `beauty-case-mini-open.png` | Mini |

Specifica foto consigliata: 4:5, min 1600×2000, sfondo cream pulito, niente ombra dura sotto il prodotto, formati webp/jpg <500KB (next/image serve automaticamente WebP). Swatch di riferimento colore per la fotografia: Rose `#d49b96`, Noir `#1f1d1c`, Ivory `#efe5d8` — la foto deve rispettarli per non deludere l'acquirente. `scripts/import-product-photos.ps1` ridimensiona/converte e riporta la copertura.

---

## 12. Wiring Shopify (opzionale — l'adapter è pronto)

1. Shopify admin → Settings → Apps → Develop apps → Custom app ("CAELIA Storefront"); abilita Storefront API scopes: `unauthenticated_read_product_listings`, `unauthenticated_read_product_inventory`, `unauthenticated_read_product_listing_images`; installa e copia il token.
2. Env su Vercel: `SHOPIFY_STORE_DOMAIN=…myshopify.com` + `SHOPIFY_STOREFRONT_API_TOKEN=…` → redeploy. `src/lib/catalog.ts` sceglie Shopify automaticamente (`catalogSource`), fallback locale se 0 prodotti o errore (log `[catalog] …`).
3. `src/lib/shopify.ts` usa la Storefront API `2024-10`, `next:{revalidate:60}` (ISR), mappa Product Shopify → tipo `Product` locale (title/tags/variants disponibili/prezzi EUR, images url+alt). Inventario reale e checkout Shopify/Stripe non ancora cablati (MVP: inventario derivato da SKU, checkout locale via `/api/checkout`). Rollback: rimuovi le env.
> **EN**: cart & checkout are still local (localStorage + `/api/checkout`). For production replace with Shopify Checkout / Stripe; code comments mark exactly where.

---

## 13. Known issues & gap da non replicare (EN+IT)

1. **🚨 Home hero 404**: `src/app/page.tsx` referenzia `/products/beauty-case-rose-front.svg` e `/products/beauty-case-rose-open.svg`; `cart-context` ha fallback `…front.svg` — **questi file non esistono** in `public/products/` (solo PNG). Fix: puntare ai `.png` esistenti, oppure creare le due silhouette SVG e committarle. Nei rebuild v0 usare direttamente i PNG.
2. **Media kit incoerente** (`/press`): elenca font "Fraunces" e vecchi hex (#b8655f rose / #1f1d1c charcoal) mentre il sito è 100% Inter con palette cacao/burgundy. Decidere: aggiornare la pagina press ai token reali o reintrodurre davvero Fraunces.
3. **Hygiene repo**: ~23 file JPG AI-candidati alla radice (es. `Burgundy_leather_*.jpeg`, `TOLS.png_2K_*.jpeg`…) e copie estensione-rinominata in `public/products/_candidates/` sono **tracciate** (repo ~56MB in public). Consigliato cleanup in PR separata: spostare su storage esterno o rimuovere; i `_candidates` non sono referenziati dal codice. `.gitignore` NON copre `*.jpeg` alla radice (aggiungere se si pulisce). C'è anche un `ao.jpeg` e `Clean_e-commerce_…jpeg` non referenziati.
4. **Prodotti**: il Mini lista tra le gallery slide anche `beauty-case-mini-ivory.png` ma non ha variante Ivory (solo Rose/Noir): verifica voluta o da sistemare.
5. **Contact/Account forms** sono placeholder senza backend. **`/api/checkout` non processa pagamenti reali** (niente Stripe né Shopify checkout): copy "Pagamenti sicuri via Stripe" è aspirazionale.
6. **Ordini**: email conferma richiede `RESEND_API_KEY`; senza, l'ordine è solo loggato. Lato client l'ordine vive in `caelia_orders_v1` (per browser): non è sincronizzato tra dispositivi né persistito lato server.
7. **Metadata base** `https://caelia.com` mentre prod è `https://caelia-store.vercel.app`: allineare al dominio finale.
8. **Social**: link Instagram/TikTok/Pinterest = placeholder (`https://instagram.com`).
9. Footer/account usano `new Date().getFullYear()` (SSR: anno di build server — ok).
10. Pagina `/cart` noindex: corretta (carrello non deve essere indicizzato).

---

## 14. Checklist QA pre-rilascio

- [ ] Palette/ruoli colore esatti; mai introdurre token nuovi.
- [ ] Hover animati solo con hover-capable; reduced-motion rispettato (3D→poster, marquee off).
- [ ] Tutti i CTA uppercase tracking con `btn-press`; nessun `transition:all`.
- [ ] Mobile: hamburger→drawer; sticky ATC su PDP; checkout raggiungibile; thumbnails funzionano.
- [ ] Carrello: add da card? no (solo PDP/bundle) — verifica ATC, qty, remove, subtotale, soglia 60€, drawer lock scroll/Escape.
- [ ] Checkout: validazioni IT (CAP 5 cifre), sconti CAELIA10/WELCOME/COMEBACK, gift wrap, ordine `CAELIA-#####`, redirect success, record in account.
- [ ] Valute EUR/USD/GBP coerenti tra switcher e prezzi.
- [ ] Wishlist: toggle, pagina, share link `?h=`.
- [ ] 3D: rotazione, cambio colore/view, snapshot PNG, fallback con rid-motion, poster visibile durante load.
- [ ] SEO: metadata per rotta, JSON-LD, sitemap, OG; pagine noindex giuste.
- [ ] Lighthouse: LCP <2.5s (hero: next/image priority + poster 3D), CLS ≈0.
- [ ] Nessun 404 sugli asset (controllare i due .svg errati!), favicon/manifest presenti.
- [ ] A11y: dialog aria, focus visibile, errori form con role=alert, alt descrittive.

---

## 15. Ricostruire con v0 (Vercel) — come usare questa skill

1. **Repo**: questo progetto è connesso su GitHub (`Hackergut/caelia-store`) e deployato su Vercel da `master`.
2. **Percorso rapido v0**: aprire v0.dev → "New project" → **import dal repo GitHub** → v0 replica lo stack; oppure copiare i prompt da `v0-prompts.md` (accanto a questo file) in un progetto v0 partendo da "Start from scratch", incollando i prompt in ordine e verificando le acceptance criteria di ciascuno.
3. **Regole d'oro per ogni prompt**: Tailwind v4 CSS-first (niente tailwind.config), Next.js App Router con `params`/`searchParams` come Promise, design tokens da §3, copy italiana da §5–6, nomi file immagine da §11, chiavi localStorage da §8.
4. Dopo ogni generazione: run `npm run build` e `npm run lint`, poi checklist §14, poi `git push` → Vercel.
