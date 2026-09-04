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
      "Le nostre giornate non hanno un unico fuso. Carla esce da un set a Silver Lake mentre Giulia entra in una riunione a DIFC.",
      "Aprire. La chiusura magnetica del Beauty Mirror Case risponde a una sola mano.",
      "Ritoccare. Specchio anti-riflesso, matita cremosa, gloss che non appiccica.",
      "Ripartire. Richiudi e sei già oltre. Questo è CAELIA.",
    ],
  },
  {
    slug: "cosa-mettere-in-borsa-a-dubai",
    title: "Cosa mettere in borsa a Dubai",
    excerpt:
      "Cinque oggetti che non lascio mai a casa. Spoiler: il Beauty Mirror Case è il primo.",
    date: "Agosto 2026",
    readTime: "4 min",
    author: "Giulia",
    city: "Dubai",
    body: [
      "Dubai è aria condizionata, sole, trasferte, cene che iniziano tardi.",
      "Uno: il Beauty Mirror Case. Specchio, matita, gloss.",
      "Due: un foulard di seta. Tre: un taccuino. Quattro: un rossetto di scorta. Cinque: le chiavi.",
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
      "Los Angeles è una sequenza di parcheggi, caffè, call, prove trucco.",
      "Il Beauty Mirror Case sta nella tasca laterale della tote.",
      "Abbiamo disegnato la Mini per la pochette della sera. Stesso specchio, stesso gloss.",
    ],
  },
];

export function getPost(slug: string): JournalPost | undefined {
  return journalPosts.find((p) => p.slug === slug);
}
