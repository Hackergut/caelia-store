export const LEGAL = {
  brand: "CAELIA",
  legalName: "CAELIA",
  address: "Milano, Italia",
  email: "info@caelia.store",
  pec: "pec@caelia.store",
  piva: "P.IVA da inserire in Shopify",
  rea: "REA da inserire",
  sdi: "Codice SDI da inserire",
  vatRate: 22,
  price: 58,
  freeShippingFrom: 60,
  withdrawalDays: 14,
  shippingItaly: "2–4 giorni lavorativi",
  shippingEu: "5–8 giorni lavorativi",
} as const;

export const legalNav = [
  { to: "/legal/privacy", label: "Privacy" },
  { to: "/legal/cookies", label: "Cookie" },
  { to: "/legal/termini", label: "Termini" },
  { to: "/legal/reso", label: "Resi" },
  { to: "/legal/spedizione", label: "Spedizioni" },
] as const;

export type LegalDoc = {
  title: string;
  kicker: string;
  updated: string;
  body: { h: string; p: string }[];
};

export const legalDocs: Record<string, LegalDoc> = {
  privacy: {
    title: "Privacy",
    kicker: "GDPR",
    updated: "11 settembre 2026",
    body: [
      {
        h: "Titolare",
        p: `${LEGAL.legalName} («CAELIA»), ${LEGAL.address}. Email ${LEGAL.email}. PEC ${LEGAL.pec}. ${LEGAL.piva}. Trattiamo i dati per vendere il Beauty Mirror Case, rispondere e — solo se accetti i cookie — misurare il sito.`,
      },
      {
        h: "Dati",
        p: "Identità e contatto (ordini, form), pagamento (Shopify/Stripe, non conserviamo carte), navigazione (IP, device) se acconsenti, newsletter se ti iscrivi. Base: contratto, obblighi di legge, consenso, legittimo interesse (sicurezza).",
      },
      {
        h: "Destinatari",
        p: "Shopify, corrieri, pagamento, hosting. Extra-UE solo con clausole tipo. Conservazione: ordini 10 anni (fiscale), marketing fino a revoca, log tecnici 12 mesi.",
      },
      {
        h: "Diritti",
        p: "Accesso, rettifica, cancellazione, limitazione, portabilità, opposizione, reclamo al Garante. Scrivi a " +
          LEGAL.email +
          ". Nessun processo automatizzato con effetti giuridici.",
      },
    ],
  },
  cookies: {
    title: "Cookie",
    kicker: "Consenso",
    updated: "11 settembre 2026",
    body: [
      {
        h: "Necessari",
        p: "Carrello, sessione, scelta cookie. Sempre attivi, non richiedono consenso.",
      },
      {
        h: "Analytics e ads",
        p: "Google Analytics 4 e Meta Pixel solo dopo Accetta. Rifiuta o cambia idea dal banner. Nessun tracking prima del consenso.",
      },
      {
        h: "Durata",
        p: "La scelta resta 12 mesi, poi rivedi il banner. Terze parti: policy Google e Meta.",
      },
    ],
  },
  termini: {
    title: "Termini di vendita",
    kicker: "Contratto",
    updated: "11 settembre 2026",
    body: [
      {
        h: "Venditore",
        p: `${LEGAL.legalName}, ${LEGAL.address}. ${LEGAL.piva}. ${LEGAL.email}. Il contratto si conclude quando confermi l’ordine e ricevi l’email di conferma.`,
      },
      {
        h: "Prodotto e prezzo",
        p: `Beauty Mirror Case, tre colori. Prezzo ${LEGAL.price},00 € IVA inclusa (${LEGAL.vatRate} %). Disponibilità in checkout. Foto indicative; il colore maison è Burgundy Berry.`,
      },
      {
        h: "Pagamento",
        p: "Shopify Payments, carte, Apple Pay, Google Pay, Shop Pay — se attivati sul negozio. Nessun addebito extra oltre spedizione.",
      },
      {
        h: "Legge",
        p: "Legge italiana, Codice del Consumo. Foro del consumatore. Clausole nulle non travolgono il resto.",
      },
    ],
  },
  reso: {
    title: "Diritto di recesso",
    kicker: "14 giorni",
    updated: "11 settembre 2026",
    body: [
      {
        h: "Termine",
        p: `Hai ${LEGAL.withdrawalDays} giorni dalla consegna per recedere senza motivazione (art. 52 Codice del Consumo). Scrivi a ${LEGAL.email} con numero ordine.`,
      },
      {
        h: "Rientro",
        p: "Rispedisci entro 14 giorni dalla comunicazione, integro, non usato come tuo. Le spese di reso sono a tuo carico salvo difetto. Rimborso con lo stesso mezzo entro 14 giorni dal rientro.",
      },
      {
        h: "Ecccezioni",
        p: "Nessuna per il case sigillato integro. Se aperto e usato, possiamo decurtare la svalutazione. Prodotti difettosi: sostituzione o rimborso, spese nostre.",
      },
    ],
  },
  spedizione: {
    title: "Spedizioni",
    kicker: "Italia e UE",
    updated: "11 settembre 2026",
    body: [
      {
        h: "Italia",
        p: `Spedizione ${LEGAL.shippingItaly}. Gratuita da ${LEGAL.freeShippingFrom} €. Sotto soglia, costo in checkout. Tracking via email.`,
      },
      {
        h: "Unione europea",
        p: `${LEGAL.shippingEu}. Dazi extra-UE a carico del destinatario se previsti.`,
      },
      {
        h: "Ritiro e danni",
        p: "Controlla il collo. Danni da trasporto: foto e segnalazione entro 48 ore a " +
          LEGAL.email +
          ". Non spediamo a caselle postali.",
      },
    ],
  },
};
