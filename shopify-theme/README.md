# CAELIA — tema Shopify 2.0 (premium)

Tema Online Store 2.0 completo: Customize senza codice, cart drawer, Shop Pay / Apple Pay / Google Pay, icone pagamento, policy, mercati.

## Installazione

1. **Online Store → Themes → Upload zip** → Publish  
2. **Products → Import** `products.csv`  
3. Collezione **CAELIA** handle `caelia` (automated: tag = caelia)  
4. **Settings → Payments** → Shopify Payments (carta, Shop Pay, Apple Pay, Google Pay)  
5. **Settings → Checkout** → accent `#973851`  
6. **Settings → Policies** → spedizione, reso, privacy  
7. Customize → ingranaggio: collezione home, menu, pagamenti, fiducia

## Customize (tutto editabile)

| Gruppo | Cosa regola |
| --- | --- |
| Colori maison | Berry, rosa, avorio, marrone, ink |
| Brand | Logo, favicon, nome, tagline |
| Catalogo e menu | Collezione home, header, footer, search, account |
| **Pagamenti e checkout** | Drawer, Shop Pay/Apple Pay, icone carte, nota spedizione, mercati |
| Pagina prodotto | Quantità, SKU, vendor, share, 3 righe fiducia |
| Test A/B | Copy pulsante acquisto |
| SEO / Social | Title, OG, Instagram, TikTok, X, Pinterest |

**Add section** in home: Hero, Tre colori, Il gesto, Tutto intorno, Mappa prodotto, Prodotto in evidenza, Immagine e testo, Testo editoriale, Newsletter.

## Pagamenti

Non si “attivano” nel tema: si attivano in **Admin → Payments**. Il tema, se Shopify Payments è on, mostra:

- Pulsante **Aggiungi al carrello**
- **Shop Pay / Apple Pay / Google Pay** (`payment_button`)
- Icone Visa / Mastercard / Amex / ecc. in footer e carrello (`shop.enabled_payment_types`)
- Checkout Shopify dal drawer

## CLI

```
shopify theme dev --store tuo-negozio.myshopify.com
shopify theme push
```

v2.0.0 · HACKGUT
