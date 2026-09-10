# CAELIA — tema Shopify 2.0

Tema premium Online Store 2.0. Stesso design system del sito CAELIA: Tenor Sans, Burgundy Berry, cart drawer, checkout nativo (Shop Pay / Apple Pay / Google Pay).

## Installazione (10 minuti)

1. **Online Store → Themes → Add theme → Upload zip** → `caelia-shopify-theme.zip`
2. **Publish**
3. **Products → Import** `products.csv` (tre colori, 58 €)
4. Crea collezione **CAELIA**, handle `caelia`, aggiungi i tre prodotti
5. **Customize** → ingranaggio:
   - Collezione home = `caelia`
   - Menu header / footer
   - Checkout dinamico = on
   - Cart drawer = on
6. **Settings → Payments** → Shopify Payments
7. **Settings → Checkout** → accent `#973851`

Guida completa: [CONFIG.md](./CONFIG.md)

## Cosa puoi fare da Customize (senza codice)

| Sezione | Uso |
| --- | --- |
| Hero 3D | Immagine o video, didascalia |
| Tre colori | Collezione Shopify, fino a 9 prodotti |
| Capitolo film | Foto full-bleed + testo |
| Mappa prodotto | Pin 01–06 sulla foto del case |
| Prodotto in evidenza | Un prodotto + pulsanti acquisto |
| Immagine e testo | Storia / lookbook |
| Testo editoriale | Titolo grande + CTA |
| Newsletter | Iscrizione customer |
| Barra annuncio | Spedizione / promo |

Home, prodotto, collezione, carrello, search, 404, account, contatti: tutti JSON OS 2.0. Aggiungi sezioni dal bottone **Add section**.

## Checkout

- Pulsante **Aggiungi al carrello** (test A/B opzionale)
- **Shop Pay / Apple Pay / Google Pay** sotto, se Shopify Payments è attivo
- Cart drawer AJAX, poi checkout Shopify

## CLI

```
shopify theme dev --store tuo-negozio.myshopify.com
shopify theme push
```

v1.2.0 · HACKGUT
