# Shopify Payments — CAELIA (Italia)

I pagamenti **non si attivano nel tema**. Si attivano in **Shopify Admin**.  
Il tema CAELIA è già pronto: pulsante Shop Pay / Apple Pay / Google Pay, cart drawer, icone carte in footer.

---

## 0. Cosa ottieni

| Metodo | Dove compare | Cosa serve |
| --- | --- | --- |
| Visa, Mastercard, Amex, Maestro, UnionPay | Checkout | Shopify Payments on |
| **Shop Pay** | PDP + checkout (one-click) | Incluso |
| **Apple Pay** | Safari / iPhone | Incluso + SSL sul dominio |
| **Google Pay** | Chrome / Android | Incluso |
| Klarna (opzionale) | Checkout IT/EU | Attivala a parte in Payments |

Prezzo prodotto: **58 € IVA inclusa**. Valuta negozio: **EUR**.

---

## 1. Requisiti (Italia)

Prima di cliccare Completa setup:

1. Negozio con **indirizzo Italia**
2. Titolare maggiorenne, documenti validi
3. **Partita IVA** (o CF se ditta individuale)
4. Conto bancario **EUR + IBAN SEPA** (IT, o altro paese SEPA)
5. Dominio con **HTTPS** (Shopify lo dà di default; sul dominio custom il lucchetto deve essere verde)

Documenti tipici che Stripe/Shopify chiedono:

- Carta d’identità o passaporto del legale rappresentante  
- Codice fiscale  
- Visura / certificato P.IVA  
- IBAN intestato alla stessa persona/società  

Proibiti per Shopify Payments: nicchie high-risk (non è il caso CAELIA beauty accessory).

---

## 2. Attivazione — passo passo

**Settings → Payments → Shopify Payments → Completa il conto**

1. **Business type**
   - Individuale / società  
   - Categoria: **Health & Beauty** / Accessori makeup (Makeup bags)
2. **Dati titolare** — nome, data di nascita, CF, residenza
3. **Azienda** — ragione sociale, P.IVA, sede (Milano se è la maison)
4. **Conto payout** — IBAN EUR  
   I soldi arrivano qui, di solito **2–3 giorni lavorativi** dopo l’ordine
5. **Statement descriptor** — testo in estratto carta: `CAELIA` (max ~22 caratteri)
6. Invia. Lo stato passa a **In revisione** poi **Attivo** (a volte minuti, a volte 1–2 giorni)

Da giugno 2026 i nuovi conti IT hanno **90 giorni** per finire la verifica identità dopo il primo ordine, altrimenti i pagamenti possono essere rimborsati in automatico. Completa i documenti subito.

---

## 3. Carte e checkout veloce

Con Shopify Payments attivo, le carte partono da sole.

**Settings → Payments → Shopify Payments → Gestisci**

- [x] Visa, Mastercard, American Express, Maestro  
- [x] **Shop Pay**  
- [x] **Apple Pay**  
- [x] **Google Pay**  
- Cattura: **Automatica** (non manuale: CAELIA spedisce prodotti fisici già in stock)

Apple Pay: il cliente deve essere su Safari. Google Pay: Chrome. Shop Pay: tutti i browser, email già registrata.

Nessuna commissione extra Apple/Google: paghi solo le fee Shopify Payments.

---

## 4. Metodi locali (consigliati CAELIA)

Sempre in **Payments**, sotto Local payment methods:

| Metodo | Quando |
| --- | --- |
| **Klarna** | Rate su 58 €, alza conversione |
| Bancontact / iDEAL | Solo se vendi in BE/NL |

Non servono PayPal se hai già Shop Pay + Apple Pay. PayPal è un extra (fee più alte).

---

## 5. Checkout (brand CAELIA)

**Settings → Checkout**

| Campo | Valore |
| --- | --- |
| Colore accent / pulsante | `#973851` Burgundy Berry |
| Logo | wordmark CAELIA |
| Lingua | Italiano |
| Telefono | On (spedizioni) |
| Marketing opt-in | Off di default, checkbox |
| Indirizzo | Autocomplete on |

**Settings → Customer accounts** → opzionale (il tema ha già il link Account).

**Settings → Shipping**

- Zona Italia: tariffa unica **oppure gratis da 60 €** (già scritto nel tema)
- Tempi: 2–4 giorni lavorativi
- Non lasciare “calcolata al checkout” senza fasce

**Settings → Taxes**

- Italia IVA **22% inclusa nel prezzo** (58 € già ivato)  
- Markets: EU OSS se vendi fuori IT

**Settings → Policies** (compaiono in footer tema)

- Spedizione  
- Reso 14 giorni  
- Privacy  
- Termini

---

## 6. Allineamento col tema CAELIA

Customize → ingranaggio → **Pagamenti e checkout**

- Cart drawer = on  
- Checkout dinamico = on  ← Shop Pay / Apple Pay sotto “Aggiungi al carrello”  
- Icone pagamento = on  
- Nota: `Spedizione gratuita in Italia oltre 60 €.`

Se i wallet **non** si vedono sulla scheda prodotto:

1. Shopify Payments è Active (non “incompleto”)  
2. Non sei in anteprima tema password-protected senza SSL  
3. Prova su iPhone Safari (Apple Pay) e Chrome (Google Pay)  
4. Il prodotto è **available**, prezzo > 0

---

## 7. Test prima del go-live

1. Payments → **View test card numbers** (o Bogus gateway solo in dev)  
2. Meglio: ordine reale da 58 € con la tua carta, poi rimborso da **Orders → Refund**  
3. Controlla:
   - Shop Pay si apre  
   - Apple Pay sul tuo iPhone  
   - Payout in arrivo sull’IBAN  
   - Email ordine cliente + notifica admin

---

## 8. Payout e commissioni

- Valuta payout: **EUR**  
- Cadenza: tipicamente ogni giorno lavorativo, arrivo 2–3 gg  
- **Settings → Payments → View payouts**  
- Commissioni IT Shopify Payments: percentuale + fisso per transazione (vedi il piano del negozio: Basic / Grow / Advanced). Apple Pay non aggiunge fee.

Chargeback: rispondi da Orders entro i termini. Policy reso chiara riduce le dispute.

---

## 9. Checklist go-live CAELIA

- [ ] Shopify Payments **Active**  
- [ ] IBAN verificato, primo payout ok  
- [ ] Shop Pay + Apple Pay + Google Pay on  
- [ ] Cattura automatica  
- [ ] Checkout colore `#973851`  
- [ ] Spedizione Italia + free ≥ 60 €  
- [ ] IVA 22% inclusa  
- [ ] Policy reso/spedizione pubblicate  
- [ ] Tema: checkout dinamico on  
- [ ] Ordine di prova rimborsato  

Fatto questo, il Beauty Mirror Case a 58 € si paga come un tema premium: un tap su iPhone, Shop Pay sul resto.
