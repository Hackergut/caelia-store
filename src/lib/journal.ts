export type JournalPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  author: string;
  city: string;
  body: string[];
};

export const journalPosts: JournalPost[] = [
  {
    slug: "tre-gesti-per-ripartire",
    title: "Tre gesti per ripartire",
    excerpt:
      "Aprire, ritoccare, ripartire: la routine pensata per le giornate che cambiano ritmo ogni ora.",
    date: "Settembre 2026",
    readTime: "3 min",
    author: "Carla & Giulia",
    city: "Los Angeles · Dubai",
    body: [
      "Le nostre giornate non hanno un unico fuso. Carla esce da un set a Silver Lake mentre Giulia entra in una riunione a DIFC. Lo stesso rituale, due fusi orari.",
      "Aprire. La chiusura magnetica del Beauty Mirror Case risponde a una sola mano. Niente zip, niente elastici, niente disordine.",
      "Ritoccare. Specchio anti-riflesso, matita cremosa, gloss che non appiccica. Tre secondi, non tre minuti.",
      "Ripartire. Richiudi e sei già oltre. Questo è CAELIA: non un beauty case da tavolo, un gesto da borsa.",
    ],
  },
  {
    slug: "cosa-mettere-in-borsa-a-dubai",
    title: "Cosa mettere in borsa a Dubai",
    excerpt:
      "Cinque oggetti che non lascio mai a casa durante le giornate più lunghe. Spoiler: il Beauty Mirror Case è il primo.",
    date: "Agosto 2026",
    readTime: "4 min",
    author: "Giulia",
    city: "Dubai",
    body: [
      "Dubai è aria condizionata, sole, trasferte, cene che iniziano tardi. La borsa deve pesare poco e contenere tutto.",
    "Uno: il Beauty Mirror Case. Specchio, matita, gloss. Basta.",
    "Due: un foulard di seta. Serve da scialle in ufficio e da copricapo se il vento al marina si alza.",
    "Tre: un piccolo taccuino. Le idee arrivano in macchina, non alla scrivania.",
    "Quattro: un rossetto di scorta nello stesso tono del gloss CAELIA, per la sera.",
    "Cinque: le chiavi, e niente di più. Il resto sta a casa.",
    ],
  },
  {
    slug: "da-los-angeles-con-amore",
    title: "Da Los Angeles con amore",
    excerpt:
      "I momenti che richiedono un ritocco veloce e come il Beauty Mirror Case mi segue ovunque.",
    date: "Luglio 2026",
    readTime: "5 min",
    author: "Carla",
    city: "Los Angeles",
    body: [
      "Los Angeles è una sequenza di parcheggi, caffè, call, prove trucco. Il ritocco non è vanità: è continuità.",
      "Il Beauty Mirror Case sta nella tasca laterale della tote. Lo apro nel retro di un'auto, nel bagno di un ristorante, sul set tra una take e l'altra.",
      "Abbiamo disegnato la versione Mini per la pochette della sera. Stesso specchio, stesso gloss, metà volume.",
      "Se CAELIA funziona è perché è nato da una mancanza vera. Non da un moodboard.",
    ],
  },
];

export function getPost(slug: string): JournalPost | undefined {
  return journalPosts.find((p) => p.slug === slug);
}
