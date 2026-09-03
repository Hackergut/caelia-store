# CAELIA → v0 (Vercel): Catena di prompt pronta all'uso
# CAELIA → v0 (Vercel): Ready-to-paste prompt chain

> **Come usarla / How to use**: in v0.dev create **one new project** ("CAELIA Storefront"), then paste the phases **in order**, one message at a time. Each phase says "contexto già creato" (context already established): keep everything in the same project/chat so tokens, providers and data persist. After each phase check the **Acceptance criteria**; paste the next phase only when they pass. All prompts are in English on purpose (v0 answers best in English) but ALL on-screen copy must be the Italian text provided. The full reference (design tokens, data model, API contracts, known gaps) lives in `SKILL.md` next to this file.

---

## PHASE 0 — Project brief & design foundation

**Goal**: create the app shell and the exact design system. After this phase the project must contain: Tailwind v4 theme tokens, motion tokens, Inter font, base styles — and nothing else visual yet.

**Copy-paste prompt**:

```
You are building "CAELIA — Aprire. Ritoccare. Ripartire.", a premium Italian e-commerce storefront for a "beauty mirror case" (compact leather-look case with mirror + lip liner + lip gloss). Two sister-founders: Carla (Los Angeles) and Giulia (Dubai). Product made in Italy, vegan leather. Brand tone: warm, minimal, feminine but restrained, luxury-accessibly priced (€58 flagship). Website language: Italian for all visible copy. Tech: Next.js 16 (App Router) + React 19 + TypeScript strict + Tailwind CSS v4 (CSS-first config, NO tailwind.config file, no v3 syntax). Path alias "@/*" -> "src/*".

IMPORTANT Next.js 16 conventions: dynamic route params and searchParams are Promises that must be awaited (params: Promise<{handle:string}>). Use generateStaticParams for product pages.

Create exactly this foundation:

1) src/app/globals.css — pure CSS-first Tailwind v4:
   @import "tailwindcss";
   In @theme define these EXACT color tokens and roles (do not rename, do not add):
     --color-cream:#f7f1ea (page background)
     --color-cream-deep:#efe5d8 (alternate sections, placeholders)
     --color-mist:#e0d6c9 (borders/separators)
     --color-cacao:#7b5644 (MAIN text/headings color)
     --color-cacao-deep:#5a3d2e
     --color-charcoal:var(--color-cacao); --color-ink:var(--color-cacao)  (legacy aliases)
     --color-burgundy:#4a0e16 (CTA/emphasis accent)
     --color-burgundy-deep:#2e070d; --color-burgundy-tint:#7a2630
     --color-night:#1a0a0e (dark surfaces); --color-night-deep:#0e0507
     --color-rose:#d49b96 (decorative tint); --color-rose-deep:#b8655f
     --color-blush:#e9c9c4 (light pink tint on dark); --color-blush-deep:#d49b96
     --color-ink:#7b5644 alias and --color-charcoal alias of cacao
   Typography: --font-sans and --font-serif BOTH resolve to var(--font-inter), ui-sans-serif, system-ui, sans-serif (the whole site is sans; "font-serif" is intentionally an Inter alias).
   Shadows: --shadow-soft: 0 10px 30px -12px rgba(31,29,28,0.15); --shadow-product: 0 30px 60px -30px rgba(31,29,28,0.35).

2) In :root (same file) define motion tokens:
   Curves: --ease-out:cubic-bezier(0.23,1,0.32,1); --ease-in-out:cubic-bezier(0.77,0,0.175,1); --ease-drawer:cubic-bezier(0.32,0.72,0,1); --ease-spring-out:cubic-bezier(0.16,1.08,0.38,1)
   Durations: --dur-instant:100ms; --dur-fast:160ms; --dur-base:220ms; --dur-medium:320ms; --dur-slow:480ms; --stagger:60ms
   Then add these utility classes with the SAME names and behavior:
   .btn-press (transform:scale(0.97) on :active inside @media (hover:hover) and (pointer:fine), with 100ms ease-out transition; on touch devices opacity:0.7 on active instead), .lift and .lift-strong (translateY(-2px)/-4px hover, gated), .media-zoom (overflow hidden; inner img scales to 1.04 on parent hover, gated), .chip (border lift, gated), .reveal (opacity 0, translateY(12px), fadeIn animation, animation-delay: calc(var(--stagger) * var(--i, 0))), .nav-link (relative; ::after underline height 1px bottom -4px scaleX(0) origin left, scaleX(1) on hover/[aria-current="page"], gated, ease-out 320ms), .marquee (translateX 0 -> -50% 30s linear infinite), .img-fade-in, .grain (absolute ::before dot-grid radial-gradient pattern with mix-blend-mode multiply), .toast-enter/.toast-enter-active, .modal-enter/.modal-enter-active (scale 0.97 -> 1) and .modal-exit-active, .drawer-enter/.drawer-enter-active and .drawer-exit-active (translateX(100%) -> 0 with --ease-drawer). Keyframes: fadeIn (opacity 0 translateY(8px) -> visible), shake (form errors).
   Headings h1-h4: font-weight 500, letter-spacing -0.018em (h1 -0.024em, h2 -0.02em). Reduced motion media query: kill animations/transitions but keep opacity/color feedback.
   Body base: background var(--color-cream), color var(--color-ink), antialiased, font-feature-settings "ss01","ss02","cv11". ::selection background #d49b96 color #f7f1ea.

3) src/app/layout.tsx: html lang="it"; load Inter via next/font/google with variable --font-inter (subsets: latin, display swap). Metadata: title template "%s · CAELIA", default "CAELIA — Aprire. Ritoccare. Ripartire.", description "CAELIA Beauty Mirror Case: l'astuccio compatto con specchio che racchiude matita, gloss e tutto ciò che serve per un ritocco veloce. Pensato per chi vive di continuo passaggio.", metadataBase https://caelia.com, openGraph locale it_IT with /og.svg image 1200x630, manifest /manifest.webmanifest, icons /favicon.svg.

Do NOT create pages/components yet (only a minimal home placeholder). Do NOT add any other dependency. Reply with the exact file contents you created.
```

**Acceptance criteria**: `npm run build` passes; globals.css classes exist; `font-serif` renders Inter; tokens match hex values above 1:1.

---

## PHASE 1 — Commerce state layer (contexts, localStorage, types)

**Goal**: create all client state contexts exactly (cart, wishlist, currency, recently-viewed, orders, abandoned-cart) with the exact storage keys — pages in later phases consume them.

**Copy-paste prompt**:

```
The CAELIA project foundation from Phase 0 is set. Now create the commerce state layer under src/lib (TypeScript). All files that use hooks/events/window must be "use client".

1) src/lib/types.ts — exact types:
   type Money = { amount: string; currencyCode: "EUR" | "USD" | "GBP" };
   type ProductImage = { src: string; alt: string };
   type ProductVariant = { id: string; sku: string; title: string; price: Money; available: boolean; swatch?: string };
   type Product = { id: string; handle: string; title: string; vendor: string; productType: string; tags: string[]; description: string; descriptionEn: string; features: string[]; featuresEn: string[]; details: { material: string; dimensions: string; weight: string; madeIn: string }; detailsEn: { material: string; dimensions: string; weight: string; madeIn: string }; images: ProductImage[]; variants: ProductVariant[]; seo: { title: string; description: string } };
   type CartLine = { productHandle: string; productTitle: string; variantId: string; variantTitle: string; price: Money; quantity: number; image: string };
   type Review = { id: string; author: string; location: string; rating: 1|2|3|4|5; title: string; body: string; date: string; verified: boolean };

2) CartContext (src/lib/cart-context.tsx): provider holding lines: CartLine[] in localStorage key "caelia_cart_v1" (hydrate on mount, persist on change). API: itemCount, subtotal (Money), isOpen/open/close (drawer flag), add(product, variant, quantity=1) — merge same variantId by adding quantity, image = product.images[0].src, then opens the drawer; remove(variantId); setQuantity(variantId, qty<=0 removes); clear(). While lines.length>0 also write "caelia_abandoned_cart_v1" = {at: Date.now(), count: totalItems} on every change. Export useCart() that throws if used outside provider.

3) WishlistContext (src/lib/wishlist-context.tsx): handles: string[] in "caelia_wishlist_v1"; has/add/remove/toggle(handle).

4) Currency (src/lib/currency.tsx): provider with currency state in "caelia_currency_v1" (EUR default); rates from EUR: EUR 1, USD 1.08, GBP 0.86. displayPrice(amountEUR, target) uses Intl.NumberFormat with locale it-IT/en-US/en-GB, currency style, 2 fraction digits. Export <Price amountEUR className> component that renders displayPrice for current currency, and useCurrency() with safe server fallback {EUR, no-op setter}.

5) Recently viewed (src/lib/recently-viewed.ts): key "caelia_recently_viewed_v1", max 4 handles, most recent first; pushRecentlyViewed(handle) and useRecentlyViewed() hook listening to 'storage' events.

6) Orders history (src/lib/orders-history.ts): key "caelia_orders_v1", max 12 entries; recordOrder({orderId,total,currencyCode,placedAt,items}) and useOrders() hook (also syncs across tabs via storage event). OrderSummary type exported.

7) Abandoned-cart helpers (src/lib/abandoned-cart.ts): readAbandoned/writeAbandoned/clearAbandoned over "caelia_abandoned_cart_v1" ({at,count,email?}) and isStale(stored, ttlMs=30*60*1000).

No UI yet. Reply with file contents.
```

**Acceptance criteria**: build passes; no localStorage access during SSR (guards on typeof window); all key names exactly as listed.

---

## PHASE 2 — Global chrome (header, footer, announcement, drawer, menus, cookie consent)

**Goal**: the site shell that wraps every page: announcement bar + sticky header + footer + cart drawer + mobile menu + newsletter + cookie banner + analytics stub + toast/exit-intent/support widgets (stubs acceptable where noted).

**Copy-paste prompt**:

```
Context: CAELIA foundation (Phase 0/1) exists: tokens in globals.css, contexts in src/lib (useCart has isOpen/open/close/lines/subtotal/itemCount; WishlistProvider; CurrencyProvider with <Price>; NewsletterForm will call /api/newsletter).

Create:

1) src/components/site-chrome.tsx ("use client") — the shell:
   - Announcement bar: bg-night text-cream text-xs uppercase tracking-[0.18em] py-2, overflow hidden, marquee class, 6 repeated spans separated by "· " of: "Spedizione gratuita in Italia oltre 60 euro · Resi gratuiti entro 30 giorni".
   - Header: sticky top-0 z-40; transparent + border-transparent on the home page until window.scrollY > 8, then bg-cream/95 backdrop-blur-md border-b border-mist/60 (transition background-color/border-color/backdrop-filter 220ms ease-out). Layout: grid grid-cols-3 items-center h-20, container mx-auto max-w-7xl px-6 lg:px-10.
     Left: mobile hamburger button (md:hidden, aria-label "Apri menu") opening MobileMenu; desktop nav (hidden md:flex gap-8 text-xs uppercase tracking-[0.22em]): Collezione->/products, Storia->/about, Journal->/journal, Cerca->/search (aria-label Cerca), all .nav-link.
     Center: logo link to "/" "CAELIA" font-serif text-2xl md:text-3xl tracking-[0.05em] justify-self-center aria-label "CAELIA home".
     Right (justify-self-end, text-xs uppercase tracking-[0.18em], gap-5): "Preferiti" ->/wishlist (nav-link, hidden sm:inline), currency switcher (select EUR $ USD £ GBP styled minimal — see CurrencyProvider), "Account" ->/account (hidden sm:inline), "Carrello" button (nav-link) calling open(), with absolute badge -right-4 -top-1 h-4 min-w-4 rounded-full bg-burgundy text-cream text-[10px] showing itemCount when >0, aria-label "Apri carrello, {n} articoli".
   - <main className="flex-1">{children}</main>
   - Footer: bg-night text-cream mt-24. Grid md:grid-cols-2: left brand block (max-w-md): wordmark CAELIA font-serif text-3xl tracking-[0.05em]; paragraph: "Aprire. Ritoccare. Ripartire. L'astuccio beauty con specchio per le donne che non si fermano. Pensato da Carla e Giulia, due sorelle che vivono fra Los Angeles e Dubai — e che avevano bisogno di un beauty case elegante, ordinato, sempre a portata di mano."; row "Los Angeles · Dubai · Made in Italy" (text-cream/60); social placeholder links Instagram/TikTok/Pinterest -> https://instagram.com etc, target _blank rel noopener. Right: two link columns: "Esplora" (Collezione /products, La nostra storia /about, Journal /journal, Press & media /press) and "Aiuto" (Spedizioni e resi /shipping, Domande frequenti /faq, Contatti /contact, Sostenibilità /sostenibilita) styled as nav-link text-sm text-cream/70.
     Newsletter strip full-width (border-t border-cream/10): left title "Newsletter" + "Iscriviti per ricevere lanci, rifornimenti e consigli di stile."; right a NewsletterForm component (email input underline style, POST /api/newsletter, states idle/loading/ok/err; success text "Grazie. Ti abbiamo aggiunto alla newsletter.").
     Bottom bar: © {year} CAELIA. Tutti i diritti riservati. + links Privacy /privacy · Termini /terms · Cookie /cookies (nav-link).
   - Render <CartDrawer/>, <MobileMenu/> at the end.

2) src/components/cart-drawer.tsx ("use client") — fixed right drawer max-w-md w-full bg-cream shadow-2xl, z-50, transform translate-x-full when closed / translate-x-0 when open, transition-transform 480ms var(--ease-drawer); scrim fixed inset-0 bg-night/40 (opacity/pointer-events switch) closes on click; role="dialog" aria-label="Carrello"; body overflow hidden while open; Escape closes. Content: header "Il tuo carrello" + "Chiudi"; empty state centered ("Il carrello è vuoto." + CTA "Scopri la collezione"); lines list with 96px thumbnail (next/image fill), title (font-serif text-lg), variantTitle uppercase small, quantity stepper (− n +), line total with Intl EUR format, "Rimuovi"; footer: Subtotale + note "Spedizione calcolata al checkout. Resi gratuiti entro 30 giorni." + full-width CTA "Procedi al checkout" ->/checkout closing the drawer.

3) src/components/mobile-menu.tsx ("use client") — left drawer max-w-xs bg-cream (translate -100%/0, 300ms), scrim, body lock; header CAELIA + Chiudi; links: Collezione, Storia, Journal, Cerca, Preferiti, Account, Carrello; plus Newsletter line.

4) src/components/newsletter-form.tsx, src/components/currency-switcher.tsx, src/components/cookie-banner.tsx, src/components/analytics.tsx:
   - CookieBanner: shows after 800ms if "caelia_cookie_consent_v1" unset; fixed bottom-left card max-w-md bg-charcoal text-cream; text explaining cookies; two buttons "Accetta tutti" (stores "all") and "Solo essenziali" (stores "essential-only"); on save dispatch window event new CustomEvent("caelia:consent", {detail: value}).
   - Analytics: reads the same key; if consent === "all" it may load Vercel Analytics (@vercel/analytics/next) + Meta Pixel (placeholder ID) + optional Plausible; else renders nothing. Listen for "caelia:consent".

5) src/lib/track.ts — track(event, params): no-op server-side or without consent "all"; if window.fbq function call fbq("track", event, params); also push {event,...params} to window.dataLayer. Export const events = { viewItem, addToCart, initiateCheckout, purchase } mapping to Meta events ViewContent/AddToCart/InitiateCheckout/Purchase with the parameters used by later phases.

Wire the layout: providers CartProvider > WishlistProvider > CurrencyProvider in root layout, SiteChrome wrapping children inside body (html lang="it" bg-cream text-ink font-sans), plus <CookieBanner/>, <Analytics/> after it. Add placeholder routes if referenced links 404 (you may create stub pages for /products /about /journal /search /wishlist /account to make nav work; real content comes later).
```

**Acceptance criteria**: header turns solid after scrolling on home and is solid on other pages; drawer animates with the iOS curve; body scroll locks; Escape closes; menu closes on route click; build passes.
## PHASE 3 — Home page (exact copy & sections)

**Goal**: the full landing page, visually and textually faithful to the spec below.

**Copy-paste prompt**:

```
Context: CAELIA foundation + chrome exist (Phases 0–2). A minimal local product catalog now exists with: product "beauty-mirror-case" (CAELIA Beauty Mirror Case, €58.00, variants Rose #d49b96 / Noir #1f1d1c / Ivory #efe5d8) and "beauty-mirror-case-mini" (CAELIA Beauty Mirror Case Mini, €38.00, Rose+Noir) — images at /products/beauty-case-rose-front.png, beauty-case-rose-open.png, beauty-case-rose-detail.png, beauty-case-rose-lifestyle.png, beauty-case-noir-front.png, beauty-case-ivory-front.png, beauty-case-mini-rose.png, beauty-case-mini-noir.png, beauty-case-mini-ivory.png, beauty-case-mini-open.png. (Put them in public/products.)

Build src/app/page.tsx (server component; await listProducts() from a small src/lib/products.ts data module + src/lib/catalog.ts returning localProducts). Sections in this EXACT order (use the design tokens from Phase 0; images 4:5 next/image fill with object-cover):

1) HERO (relative overflow-hidden): grid lg:grid-cols-2 items-center gap-12 lg:gap-20, container max-w-7xl px-6 lg:px-10 pt-16 pb-24 lg:pt-24 lg:pb-32.
   Left: eyebrow "Los Angeles · Dubai" (text-xs uppercase tracking-[0.32em] text-ink/60). H1 (mt-6, font-serif, text-5xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight): `Aprire. <i class italic text-rose>Ritoccare.</i><br/>Ripartire.` — literally the line break and the italic rose span on "Ritoccare.".
   Paragraph: "Il Beauty Mirror Case CAELIA: un astuccio compatto che racchiude matita contorno labbra, lip gloss e specchio. Pensato per le giornate fatte di continui passaggi."
   CTA row (mt-10, gap-4): primary link "Scopri la collezione" -> /products styled bg-charcoal text-cream px-8 py-4 text-xs uppercase tracking-[0.22em] hover:bg-rose transition-colors btn-press; secondary text link "La nostra storia →" -> /about with .nav-link.
   Stats row (mt-12, flex gap-10, text-xs uppercase tracking-[0.22em] text-ink/60): "3 / Tonalità", "3-in-1 / Specchio, matita, gloss", "100% / Pelle vegana" — big numbers font-serif text-3xl text-ink.
   Right visual: relative aspect-[4/5] rounded-md overflow-hidden shadow-product with next/image src="/products/beauty-case-rose-front.png" alt="Beauty Mirror Case CAELIA" fill priority sizes="(min-width:1024px) 50vw, 100vw".

2) MANIFESTO (bg-cream-deep relative grain): centered max-w-5xl py-24 lg:py-32, eyebrow "Manifesto"; H2 font-serif text-3xl sm:text-4xl lg:text-5xl: «"Quante volte, per un semplice ritocco, ci ritroviamo a rovistare nella borsa alla ricerca di una matita, del lip gloss o dello specchietto?"»; attribution text-sm uppercase tracking-[0.22em] text-ink/70: "Carla & Giulia — fondatrici di CAELIA".

3) COLLECTION preview: container py-24 lg:py-32. Header row: eyebrow "Collezione", H2 "Un astuccio. Tutto il necessario." + link "Vedi tutto →" (nav-link). Grid sm:grid-cols-2 lg:grid-cols-3 of ProductCard for the two products with .reveal stagger style={{"--i": index}}.

4) RITUAL (bg-night text-cream): grid lg:grid-cols-2 items-center py-24 lg:py-32. Left visual aspect-[4/5] with /products/beauty-case-rose-open.png ("Beauty Mirror Case aperto"). Right: eyebrow text-blush "Il rituale CAELIA"; H2 "Tre gesti.<br/>Pronta a ripartire."; ordered list steps with big blush numbers 01 02 03: "Apri / Chiusura magnetica, si apre con una sola mano." — "Ritocca / Matita contorno labbra, gloss, specchio. Tutto in un gesto." — "Ripartire / Richiudi e sei già oltre. Nessun attimo perso." (numbers font-serif text-2xl text-blush).

5) BUNDLE section component (client): section "Risparmia con i duo." Eyebrow "Bundle". One card bg-cream-deep rounded-md p-8: badge "-15%", title "Duo Essentials", text "Beauty Mirror Case + Mini: specchio, matita e gloss in due formati. Risparmi il 15%.", two ProductCards (case + mini), price row with struck-through total €96.00 and bundle price €81.60, button "Aggiungi al carrello (15% off)" — adds both products' default variant then router.push("/cart") — and ghost link "Dettagli" -> /products?bundle=duo-essentials. Compute prices from the catalog, not hardcoded (percentOff 15).

6) RECENTLY VIEWED section: client hook; if localStorage "caelia_recently_viewed_v1" has any handles among the catalog, render "Visti di recente / Torna dove eri rimasta." grid sm:grid-cols-2 lg:grid-cols-4 of those products (max 4). Render nothing otherwise.

7) STUDIO 3D teaser (bg-cream-deep grain, centered, max-w-5xl py-16 lg:py-20): eyebrow "Studio 3D"; H2 "Prendilo in mano. Ruotalo. Aprilo."; paragraph "Esplora il Beauty Mirror Case in alta risoluzione. Cambia tonalità, guarda il formato pocket, scarica uno screenshot da condividere." After this teaser render <Caelia3DExplorer /> (Phase 6 provides it; for now keep a placeholder div with matching dark section if the component is missing).

8) TRUST strip (centered max-w-5xl py-20 lg:py-28): eyebrow "Pensato per chi vive in movimento"; quote "Due città lontane, due vite scandite da lavoro, appuntamenti, palestra, trasferte, weekend improvvisati e serate che cominciano subito dopo."; divider row: "Prodotto in Italia · Pelle vegana certificata · Spedizioni tracciate · Resi gratuiti 30 giorni".

ProductCard component (src/components/product-card.tsx): whole card is a Link to /products/[handle]; media container aspect-[4/5] rounded-md overflow-hidden bg-cream-deep media-zoom lift with next/image fill; color dots bottom-left (h-3.5 w-3.5 rounded-full ring-1 ring-charcoal/10) from variants' swatches; below: title font-serif text-lg leading-snug + variant title text-xs uppercase tracking-[0.18em] text-ink/60 + <Price amountEUR=... />.
```

**Acceptance criteria**: copy matches verbatim; hero uses the PNG (never a non-existent .svg); sections alternate backgrounds; mobile looks right; build passes.

---

## PHASE 4 — Catalog: /products, search & PDP

**Goal**: collection grid with filters/sort, product detail pages with gallery + buy box, search page.

**Copy-paste prompt**:

```
Context: CAELIA shell + home exist. Catalog data module now must be complete and faithful (src/lib/products.ts): two Product objects with bilingual fields (description/descriptionEn, features/featuresEn, details+detailsEn), vendor "CAELIA", productType "Beauty Accessory", tags, seo {title,description}, images {src,alt} referencing the 10 PNG files listed in Phase 3, variants with skus CAELIA-BC-ROSE-01/CAELIA-BC-NOIR-01/CAELIA-BC-IVO-01 (case, €58.00 EUR, available true) and CAELIA-BCM-ROSE-01/CAELIA-BCM-NOIR-01 (mini, €38.00). Dimensions case "11,5 x 7,5 x 2 cm"/120g, mini "8,5 x 5,5 x 1,5 cm"/65g, madeIn Italia; case features: "Specchio integrato, anti-riflesso", "Matita contorno labbra, formula cremosa", "Lip gloss non appiccicoso", "Chiusura magnetica sicura", "Fodera in microfibra per pulizia rapida". Italian descriptions per the brand voice (beauty case = everything for a quick touch-up; mini = only mirror and gloss, for the evening clutch). Provide descriptionsEn too.

Then build:

1) /products (src/app/products/page.tsx, server): metadata title "Collezione", description "Tutti i prodotti CAELIA: Beauty Mirror Case e Mini. Specchio, matita contorno labbra e lip gloss, in un astuccio compatto." Header block: eyebrow Collezione, H1 "Un astuccio.<br/>Tutto il necessario.", paragraph "CAELIA nasce per chi passa da un appuntamento all'altro, da una città all'altra, da un momento all'altro della giornata. Scegli la tua tonalità." Then <ProductsExplorer products={...}/> inside <Suspense fallback={skeleton}>.
   ProductsExplorer (client): filter pills by color (swatch dots, labels map #d49b96->Rose #1f1d1c->Noir #efe5d8->Ivory) and by productType, sort select: Consigliati (featured), Prezzo crescente, Prezzo decrescente, Nome A-Z; result count "N prodotti"; empty state "Nessun prodotto corrisponde." + "Reimposta i filtri"; grid of ProductCard with reveal stagger.

2) PDP route /products/[handle] (server, generateStaticParams from listProducts; await params!): metadata from product.seo. 404 via notFound() when missing. Render:
   - JSON-LD Product and Breadcrumb (scripts type application/ld+json, safe JSON.stringify).
   - <ProductDetail product> with EXACT original DOM (mirror it): wrapper `grid lg:grid-cols-2 gap-12 lg:gap-20 pt-10 pb-32 lg:pb-24` with THREE children in order: (1) a 4:5 3D frame component (in Phase 7; until then use a plain 4:5 poster of product.images[0]); (2) a `flex flex-col gap-4` column: main image block `group relative aspect-[4/5] rounded-md bg-cream-deep cursor-zoom-in` — next/image fill, onMouseMove sets CSS vars --zoom-x/--zoom-y (% of cursor) and the img uses transform-origin var(--zoom-x) var(--zoom-y) with group-hover:scale-[2], transition 480ms ease-out — plus below it a thumbnail strip `grid grid-cols-4 gap-3` of aspect-square buttons (active one gets border-charcoal, aria-label "Mostra immagine N"); active image index resets to 0 when variant changes; gallery images = product.images filtered so that alt includes the selected variant color name (rose/noir/ivory), fallback all images. (3) info panel `lg:sticky lg:top-28 self-start`: eyebrow product.productType; H1 product.title; description paragraph; price font-serif text-3xl (<Price>); inventory badge (below); color selector pills (rounded-full border pl-2 pr-4 py-2 chip, active border-charcoal) with swatch dot + variant color name (strip product title prefix); quantity stepper (− +, min 1); main ATC button (flex-1 bg-charcoal text-cream py-3 ... disabled + "Esaurito" when unavailable) firing events.addToCart; wishlist heart toggle button; features list (bullets: h-1 w-1 rounded-full bg-rose); details grid 2 cols Materiale/Dimensioni/Peso/Prodotto in; trust row "· Spedizione gratuita oltre 60€ · Resi gratuiti 30 giorni · Spedizione tracciata". On mount: events.viewItem + pushRecentlyViewed(product.handle).
   - On mobile a StickyAddToCart fixed bottom bar (lg:hidden) shows current variant, price and an ATC button.
   - Below the grid, <ProductReviews>: static seeded reviews per handle rendered as cards with star rating, title, author + location + "Acquisto verificato" badge, body, Italian date (beauty-mirror-case: Sofia M. Milano 5★ "Lo uso ogni giorno" 18 luglio 2026; Giulia P. Dubai 5★ "Pensato per chi viaggia" 2 agosto 2026; Carla R. Los Angeles 4★ "Bellissimo" 14 agosto 2026; Beatrice L. Roma 5★ "Regalo perfetto" 21 agosto 2026; mini: similar seed).
   - Related section bg-cream-deep grain titled "Per completare il rituale", up to 3 other products.
   - InventoryBadge(sku): deterministic fake stock hash(sku) mod 8 + 2: >4 -> "Disponibile" (green dot, text-ink/60); <=4 -> "Solo N disponibili" (rose, animate-pulse); <=0 -> "Esaurito". BackInStockButton shown only when variant unavailable; stores {sku,email,at} in "caelia_back_in_stock_v1".

3) /search (server) + SearchView (client): input with q param sync (await searchParams), filters products by title/description/tags case-insensitive; show results grid or "Nessun risultato". metadata robots index:false follow:true.

Keep every page server-rendered with Italian metadata; only interactive pieces "use client".
```

**Acceptance criteria**: PDP images swap with variant; zoom works on desktop; filters/sort work; search works from /search?q=; JSON-LD present; no 404 on images; build + lint pass.

---

## PHASE 5 — Cart page, wishlist, account orders

**Copy-paste prompt**:

```
Context: CAELIA contexts exist (cart/wishlist/orders/currency from Phase 1). Build the consumer pages:

1) /cart page (server wrapper) -> <CartView> client: metadata title "Carrello", robots index:false follow:false. CartView: eyebrow "Carrello", H1 "Il tuo Beauty Mirror Case."; if empty show empty state with CTA to /products. Each line: rounded thumbnail (next/image fill), productTitle (font-serif text-lg), variantTitle uppercase small, quantity stepper −/+ and "Rimuovi" (aria-labels in Italian), line totals via Intl EUR; summary card: shipping rule standard Italy — subtotal >= 60 => "Gratuita" else €4.90; total; trust icons row (lock "Pagamenti sicuri", truck "Spedizione tracciata", refresh "Resi gratuiti 30 giorni"); CTA "Procedi al checkout" -> /checkout. Hydrate guard: render "Caricamento..." until mounted.

2) /wishlist page: metadata "Preferiti". WishlistView (client) reading "caelia_wishlist_v1"; empty state "Nessun preferito ancora." with CTA; grid of ProductCards; WishlistShare copies a share link /wishlist?h=handle1,handle2 (fallback text + copied feedback "Link copiato"). The page also accepts ?h=a,b and seeds local storage from it.

3) /account page: metadata "Account". Content: H1 "Il mio account"; note "I tuoi ordini recenti. Per accedere al profilo completo collega Shopify Customer Accounts o il tuo provider auth preferito."; section "Ordini recenti" rendering <AccountOrders> (client, from useOrders()); each order: orderId (font-serif), date in Italian locale (new Date(placedAt).toLocaleDateString("it-IT", {day:"numeric",month:"long",year:"numeric"})), "· N articoli", total via <Price>, link "Dettagli" -> /ordini/[orderId]; empty state "Nessun ordine ancora." + CTA. Also render a static "Accedi" section (email+password inputs, note that auth is not wired). robots noindex.
```

**Acceptance criteria**: cart math matches checkout page; quantity 0 removes line; wishlist share link round-trips; account lists orders recorded after checkout (Phase 6).

---

## PHASE 6 — Checkout, order tracking, API routes, email

**Copy-paste prompt**:

```
Context: CAELIA contexts exist. Build the checkout flow with local order processing + API routes:

1) src/app/api/checkout/validate.ts — pure validators with Italian messages: email regex ^[^\s@]+@[^\s@]+\.[^\s@]{2,}$ ("Email non valida"); firstName/lastName /^[\p{L}'\-\s]{2,}$/u; address >= 5 chars "Indirizzo troppo corto"; city >= 2 "Città richiesta"; country required "Paese richiesto"; zip: if country === "Italia" must match ^\d{5}$ ("CAP italiano a 5 cifre") else 3-10 alphanumeric ("Codice postale non valido"); optional phone /^[+\d][\d\s().-]{6,}$/ ("Numero di telefono non valido").

2) src/app/api/checkout/route.ts — POST JSON: {email, firstName, lastName, address, city, zip, country, shipping: "standard"|"express", payment: "card"|"paypal"|"klarna", giftWrap?, giftMessage?, notes?, discountCode?, lines:[{variantId,quantity,price:{amount,currencyCode}}]}. Validate presence of email+lines (400 Invalid JSON / 422 Missing email or lines). Compute: subtotal; shipping express €8 else free if subtotal>=60 else €4.90; discount percent from codes {CAELIA10:10, WELCOME:10, COMEBACK:15} (case-insensitive); gift wrap €4.90; total = subtotal + shipping - discount + giftWrap, 2 decimals. orderId = "CAELIA-" + 5 random digits. Log "[CAELIA order]" summary. If process.env.RESEND_API_KEY is set, POST an HTML confirmation email to https://api.resend.com/emails (from "CAELIA <ordini@caelia.com>", to payload.email, subject "CAELIA — conferma ordine {orderId}") with a branded cream/rose template listing lines, total, gift message ("Aprire. Ritoccare. Ripartire." footer); never throw on email failure (log warn). Return {ok:true, orderId, total, currencyCode, discountCode?, discountAmount?, giftWrap}.

3) src/app/checkout/page.tsx ("use client") — full form page: grid lg:grid-cols-[1.4fr_1fr]. If cart empty after hydration: "Il carrello è vuoto." + CTA. Form sections (h2 font-serif text-2xl): CONTATTO (email), SPEDIZIONE (nome, cognome, indirizzo, città, CAP, paese select: Italia, Francia, Germania, Spagna, Regno Unito, Stati Uniti, Emirati Arabi Uniti; shipping options radio-style cards: Standard "3-5 giorni lavorativi" cost "Gratuita" when subtotal>=60 else €4.90 / Express "1-2 giorni lavorativi" €8.00), REGALO E NOTE (collapsible: gift wrap checkbox +€4.90 "Astuccio CAELIA chiuso con nastro di raso e biglietto personalizzato.", gift message textarea max 200 with counter, order notes), CODICE SCONTO (DiscountField applying CAELIA10/WELCOME/COMEBACK with "Codice non valido" + shake on unknown, applied chip removable), PAGAMENTO (3 selectable cards: Carta di credito, PayPal, Klarna; note lock icon "Pagamento elaborato in modo sicuro. I dati della carta non vengono mai salvati sui nostri server."; payment icons row). Submit button full-width: "Conferma ordine · €{total}". On submit: validate client-side (scroll+focus first error), POST /api/checkout, on success: events.purchase, recordOrder, clear() cart, redirect /checkout/success?order={orderId}; on error show message. Summary aside (sticky): lines thumbnails + title ×qty + line totals, Subtotale, gift wrap if any, Spedizione (Gratuita or amount), Totale.
   Field components styled: label block text-xs uppercase tracking-[0.22em] text-ink/60 mb-1; input w-full border rounded-md px-4 py-3 text-sm bg-cream focus:outline-none focus:border-charcoal (border-mist, border-rose when error); error <p role="alert">.

4) src/app/checkout/success/page.tsx + success-view.tsx ("use client"): reads order from searchParams (Promise!). Centered: rose check circle, eyebrow "Ordine confermato", H1 "Grazie.", text "Il tuo ordine {id} è in preparazione. Ti abbiamo inviato una conferma via email." + tracking note; 3 info cards: Spedizione "3-5 giorni / Con corriere espresso tracciato.", Resi "30 giorni / Resi gratuiti, senza domande.", Supporto "ciao@caelia.com / Ti rispondiamo entro 24 ore."; buttons "Stato del tuo ordine" -> /ordini/{orderId} and "Leggi il journal" -> /journal. metadata robots noindex.

5) src/app/ordini/[id]/page.tsx (server, await params): validate /^CAELIA-\d{3,6}$/ else notFound(). Show 4-stage tracker Ricevuto -> In preparazione -> Spedito -> Consegnato; deterministic current stage from last 4 digits: >=9000 -> 4 (Consegnato), >=7000 -> 3 (Spedito), >=3000 -> 2 (In preparazione), else 1 (Ricevuto). Note "Questa è una demo — in produzione i dati arrivano dal tuo provider di spedizioni." metadata robots noindex.
```

**Acceptance criteria**: full happy path (add → checkout → order → success → visible in /account and /ordini/{id}); validation blocks bad CAP; discounts + gift wrap change totals identically client & server; build passes.
## PHASE 7 — 3D product viewer (Studio 3D)

**Goal**: interactive WebGL viewer of the mirror case (client-only, reduced-motion safe). Optional but part of the brand experience.

**Copy-paste prompt**:

```
Context: CAELIA store exists. Add the interactive 3D explorer. Stack already allowed: three, @react-three/fiber (v9), @react-three/drei (v10), @types/three. All 3D imports must be client-side and lazy (next/dynamic ssr:false with a loading fallback showing "Caricamento 3D" pulse). Respect prefers-reduced-motion: when active, do NOT render the auto-rotating canvas — show a static poster image instead (see below).

Create:
1) src/lib/caelia/variants.ts — export interface CaeliaVariant {id,name,base,dark,stitch,sheen,swatch,description} and CAELIA_VARIANTS: Cognac (base #97643c, dark #5f3a1e, stitch #d3a06b), Blush (#d0a093, #96685e, #b3837a), Bordeaux (#5e1a24-ish deep red, stitch lighter) — each with a gradient css swatch and an Italian description ("Cuoio caldo ispirato alla pelle naturale toscana", "Rosa cipria delicato, finitura opaca setosa", "Bordeaux profondo, raffinato e deciso").

2) src/lib/caelia/geometry.ts + textures.ts + src/components/caelia-model.tsx — build the product as Three.js primitives ONLY (no external GLB): a rounded clam-shell case (open position) on a small platform: outer shell in variant.base color with subtle roughness/sheen, inner mirror (metallic light plane), lip liner + lip gloss objects visible inside, debossed "CAELIA" logo area on the lid interior (variant.dark), contrast stitching lines along edges (variant.stitch), leather grain via a procedural canvas texture. Keep polygon count low; group centered at origin facing camera. Export a component <CaeliaModel variant material={variant} view="mirror"|"pocket"> where "mirror" shows the full-size case and "pocket" shows the smaller Mini proportions (scale + gloss only). Tip: reuse one model with a scale/parts toggle.

3) src/components/caelia-viewer.tsx (default-export client, no SSR) — R3F <Canvas dpr={[1,2]} camera={{position:[1.5,0.6,4.4], fov:30}} gl={{antialias:true, alpha:true}}> with ACESFilmic tone mapping on create; lights: ambient 0.3 + directional (3.5,4,5) 0.85 + (-4,2,-3) 0.3; <Environment> with Lightformers for premium soft studio look; <ContactShadows>; <OrbitControls enableZoom={false} autoRotate={autoRotate} autoRotateSpeed≈1.2>; snapshot binding: on prop onSnapshotReady register a function that gl.render(scene,camera) then returns gl.domElement.toDataURL("image/png"). Props: {variant, view, autoRotate, onSnapshotReady}.

4) src/components/caelia-3d-frame.tsx (client) — PDP hero replacement: a 4:5 rounded panel with a static poster <img> underneath (product.images[0]) and the viewer fading in on top; badge top-left "Live 3D · {n} colori" (or "Immagine" when reduced motion) and bottom-left "Trascina per ruotare" / "Scegli un colore qui sotto". Map catalog swatches to 3D variants: #d49b96 or #e9c9c4 -> blush; #1f1d1c -> bordeaux; #efe5d8 -> cognac; default cognac. Mount this inside ProductDetail left column replacing the plain image (keep zoom gallery only as secondary? — keep the layout from Phase 4 but make the primary media this frame + the thumbnail gallery below it).

5) src/components/caelia-3d-explorer.tsx (client) — the home "Studio 3D" section: full-width dark section (bg-charcoal text-cream) grid lg:grid-cols-[1.6fr_1fr] gap-10 items-center, py-20 lg:py-28; left: viewer canvas 4:5 rounded (bg gradient cream-deep/30 to blush/30) with "Live 3D" chip; right panel: eyebrow "Studio 3D", H2 "Prendilo in mano. Ruotalo. Aprilo.", copy "Esplora il Beauty Mirror Case in alta risoluzione. Cambia tonalità, guarda il formato pocket, scarica uno screenshot da condividere."; controls: color swatches (buttons with .chip and gradient backgrounds), format toggle "Beauty Case" / "Pocket" (segmented), auto-rotate toggle, and button "Scarica screenshot" calling the snapshot function and downloading caelia-{variant}-{view}.png. Replace the home teaser placeholder from Phase 3 with this component.
```

**Acceptance criteria**: viewer loads client-side only; reduced-motion shows poster; screenshot downloads a PNG; framerate smooth; build passes (make sure three packages compile with React 19).

---

## PHASE 8 — Content pages, SEO & legal

**Copy-paste prompt**:

```
Context: CAELIA store is complete except content/SEO polish. Build remaining pages (server components, Italian metadata, prose prose-neutral where legal):

1) /about "La nostra storia": long-form brand story: two sisters Carla (LA) and Giulia (Dubai), miles apart but same rhythm of life (work, appointments, gym, travel, last-minute weekends, evenings); the simple need: keep with you what matters without wasting time looking for it; the birth of the Beauty Mirror Case (mirror + lip liner + gloss in one magnetic case); craftsmanship: vegan leather made in Italy, assembled in Florence; closing line signed Carla & Giulia. Design: max-w-5xl, eyebrow + H1 "Due sorelle, due città,<br/><i class=italic text-rose>un'unica idea.</i>", two-column text + imagery placeholders using existing product PNGs.

2) /journal: H1 "Pensieri, rituali,<br/><i class=italic text-rose>dietro le quinte.</i>"; grid of 3 static article cards (no detail pages): "Tre gesti per ripartire" (Settembre 2026 · 3 min — "Aprire, ritoccare, ripartire: la routine pensata per le giornate che cambiano ritmo ogni ora."), "Cosa mettere in borsa a Dubai" (Agosto 2026 · 4 min — "Cinque oggetti che non lascio mai a casa durante le giornate più lunghe. Spoiler: il Beauty Mirror Case è il primo."), "Da Los Angeles con amore" (Luglio 2026 · 5 min — "I momenti che richiedono un ritocco veloce e come il Beauty Mirror Case mi segue ovunque.").

3) /faq with JSON-LD FAQPage — six Q&A: (a) Cosa contiene il Beauty Mirror Case? specchio anti-riflesso, matita contorno labbra cremosa, lip gloss non appiccicoso, chiusura magnetica; (b) La matita e il gloss sono ricaricabili? attualmente monouso, ricariche autunno 2027; (c) Quanto dura la spedizione? Italia 3-5gg, Europa 4-7, USA/Dubai 5-9, express al checkout; (d) Posso regalarlo? sì, indirizzo diretto e biglietto su richiesta; (e) La pelle è vera? no, pelle vegana certificata prodotta in Italia; (f) Avete uno store fisico? solo online; partner retail LA/Dubai in arrivo, newsletter per saperlo prima. Interactive accordion UX.

4) /shipping "Spedizioni e resi": H1 "Spediamo con cura, rimborsiamo senza domande." Cards: Italia Standard 3-5gg €4,90 · gratuita sopra €60; Express 1-2gg €8. Europa Standard 4-7gg da €9,90 / Express 2-3gg da €19. Regno Unito da £9,90 / da £19. USA & Dubai Standard 5-9gg da $19 / Express 2-4gg da $35. Returns: 30 giorni, gratuiti; how-to (email ciao@caelia.com, etichetta prepagata, rimborso in 5-10gg).

5) /sostenibilita "Sostenibilità": 4 numbered pillars 01-04 with title+body: Pelle vegana certificata (filiere certificate Italia); Matita e gloss cruelty-free (formulati in Lombardia, VeganOK, no parabeni/siliconi); Packaging riciclato (carta FSC, inchiostri vegetali, pluriball biodegradabile, impatto zero); Produzione locale (assemblato in un laboratorio artigiano a Firenze).

6) /press "Stampa e media kit.": intro per giornalisti + press@caelia.com; founder bios (Carla: LA — design e brand; Giulia: Dubai — finanza e operations); brand palette table (use the REAL current tokens from globals.css — do not copy stale values); typography card (Inter per tutto — nota: il font display è Inter); product images; note "Immagini ad alta risoluzione disponibili su richiesta".

7) Legal pages /privacy, /terms, /cookies — clear, structured prose with "Ultimo aggiornamento: 3 settembre 2026", headings H2; cookies page lists cookie types (tecnici: carrello, wishlist, consenso, preferenze lingua; analytics con consenso) with durations; each with a "Cookie" row table/cards. Also /contact (H1 "Scrivici.", promise "Carla e Giulia leggono ogni messaggio. Ti rispondiamo entro 24 ore, sempre.", form Nome/Email/Ordine opzionale/Messaggio — front-end only) and /cookies copy about the banner.

8) SEO wiring: layout already has metadata; add per-page metadata everywhere above; /search robots index:false follow:true; create src/app/sitemap.ts (static routes with priorities + all product pages, base URL from an env NEXT_PUBLIC_SITE_URL defaulting to https://caelia.com), public/robots.txt (allow all + sitemap), keep public/manifest.webmanifest, favicon.svg, logo.svg, og.svg (simple CAELIA wordmark on cream with rose accent). error.tsx ("Non era previsto." + Riprova + digest) and global-error.tsx; not-found.tsx ("Pagina non trovata." + CTA); loading.tsx skeleton matching brand (bg-mist/40 pulse blocks).

9) src/lib/json-ld.ts helpers used on layout/faq/PDP: organizationJsonLd (name CAELIA, founders Carla/Giulia, foundingDate 2026, Milano IT), websiteJsonLd with SearchAction, productJsonLd, breadcrumbJsonLd, faqJsonLd.
```

**Acceptance criteria**: every route has Italian metadata; JSON-LD valid; sitemap+robots served; 404/500 branded; legal copy dated 3 settembre 2026; lighthouse SEO ≥95.

---

## PHASE 9 — Polish, QA & deploy (Vercel)

**Copy-paste prompt**:

```
Context: CAELIA store complete. Final polish pass:

1) Double-check all design-system fidelity rules: no transition:all; hover animations only within @media (hover:hover) and (pointer:fine); press feedback on buttons (scale 0.97 on :active) on fine pointers and opacity on touch; reduced-motion kills motion but keeps color/opacity; stagger reveals for grids (60ms per item) only on initial mount; drawers/modals use --ease-drawer / scale .97->1; no ease-in anywhere for UI; toasts and rapidly repeated elements use transitions, not keyframes.
2) Verify localStorage keys exactly: caelia_cart_v1, caelia_wishlist_v1, caelia_currency_v1, caelia_orders_v1, caelia_recently_viewed_v1, caelia_abandoned_cart_v1, caelia_abandoned_dismissed_v1, caelia_cookie_consent_v1 ("all"|"essential-only"), caelia_exit_intent_v1, caelia_support_open_v1, caelia_back_in_stock_v1. Consent gates analytics (custom event caelia:consent).
3) Add conversion extras used by the original store (client components, they render on every page): ExitIntentModal (after 8s on page + mouse leaving top edge, once per visitor, stores key, shows welcome offer with code COMEBACK 15% -> /checkout), RecoveredCartBanner (when caelia_abandoned_cart_v1 is older than 30 min and cart is empty: "Ti abbiamo lasciato qualcosa nel carrello" + CTA to cart + dismiss storing caelia_abandoned_dismissed_v1), SupportWidget (floating bubble bottom-right after 6s, first visit only; panel "Hai bisogno di aiuto?" with email ciao@caelia.com + FAQ link).
4) Performance: next/image everywhere with sizes; product front images priority on hero; add width/height or fill properly; keep WebGL dpr [1,2]; no layout shift (fixed aspect ratios); loading skeleton for catalog.
5) vercel.json with headers: X-Content-Type-Options nosniff, X-Frame-Options DENY, Referrer-Policy strict-origin-when-cross-origin, Permissions-Policy camera=(), microphone=(), geolocation=(); framework nextjs.
6) Run npm run build, npm run lint, fix warnings. Then summarize what was built as a checklist you verified (routes, copy, tokens, storage keys, API contracts).
```

**Acceptance criteria**: all rules verified; zero ESLint errors; production build succeeds; no console errors at runtime; conversion widgets unobtrusive (no overlap with cookie banner).

---

## PHASE 10 — (Optional) Shopify activation & real commerce

**Copy-paste prompt**:

```
Context: CAELIA storefront runs with the local catalog + local checkout. Wire real commerce without breaking the fallback:

1) src/lib/shopify.ts — Storefront API adapter (2024-10): function shopifyFetch(query, variables) POSTing to https://{SHOPIFY_STORE_DOMAIN}/api/2024-10/graphql.json with X-Shopify-Storefront-Access-Token, cache next:{revalidate:60}; fetch products with a ProductFields fragment (id, handle, title, vendor, productType, tags, descriptionHtml, options, images(first:8) {url altText}, variants(first:25) {id sku title availableForSale selectedOptions image price}); map to the local Product type: Italian fields from metafields when present (or fall back to generic copy), images url+altText, variants price + availableForSale, sku. Export loadProducts(), loadProductByHandle(handle), isShopifyConfigured().
2) src/lib/catalog.ts — catalogSource = isShopifyConfigured() ? "shopify" : "local"; listProducts()/getProduct(handle) try Shopify and fall back to local with console.warn/error logs "[catalog] Shopify ... falling back to local".
3) Keep local inventory/checkout as-is (badge from SKU hash, /api/checkout local) — but add TODO comments where Shopify inventoryQuantity and Shopify Checkout/Stripe should replace them.
Deploy: set SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_API_TOKEN as Vercel env vars. Removing them rolls back to local automatically — document this in README.
```

**Acceptance criteria**: with env vars set, /products lists Shopify products (ISR 60s); without env vars the site works from the local catalog; README documents activation + rollback.

---

## Appendices (fonte della verità / source of truth)

- Reference repo: **`Hackergut/caelia-store`** (master → Vercel production). This skill mirrors that codebase 1:1, including its quirks; when a prompt above says "like the original", treat the repo as normative.
- Full design tokens, motion utilities, data model, localStorage keys, API contracts and Known Issues (incl. the two broken hero `.svg` references and the Fraunces/press-page inconsistency): see **`SKILL.md`** in this folder.
- Foto prodotto: riutilizzare da `public/products/*.png` del repo; per scatti reali seguire `docs/PRODUCT-PHOTOS.md` (4:5, ≥1600×2000, sfondo cream, colore fedele agli swatch Rose #d49b96 / Noir #1f1d1c / Ivory #efe5d8).
- Docs di supporto nel repo: `docs/MOTION.md`, `docs/SHOPIFY.md`, `docs/PRODUCT-PHOTOS.md`.
