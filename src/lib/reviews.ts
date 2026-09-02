import type { Review } from "@/lib/types";

const SEED: Record<string, Review[]> = {
  "beauty-mirror-case": [
    {
      id: "r1",
      author: "Sofia M.",
      location: "Milano",
      rating: 5,
      title: "Lo uso ogni giorno",
      body: "Lo tengo in borsa da due mesi. Specchio nitido, matita e gloss perfetti. Lo consiglio a chi va sempre di fretta.",
      date: "2026-07-18",
      verified: true,
    },
    {
      id: "r2",
      author: "Giulia P.",
      location: "Dubai",
      rating: 5,
      title: "Pensato per chi viaggia",
      body: "Tra lavoro e weekend fuori, finalmente ho tutto in un posto. La chiusura magnetica è sicura.",
      date: "2026-08-02",
      verified: true,
    },
    {
      id: "r3",
      author: "Carla R.",
      location: "Los Angeles",
      rating: 4,
      title: "Bellissimo",
      body: "La confezione è curata nei minimi dettagli. Il colore rose si abbina a tutto.",
      date: "2026-08-14",
      verified: true,
    },
    {
      id: "r4",
      author: "Beatrice L.",
      location: "Roma",
      rating: 5,
      title: "Regalo perfetto",
      body: "L ho regalato a mia sorella, è stato il regalo di compleanno più apprezzato dell anno.",
      date: "2026-08-21",
      verified: true,
    },
  ],
  "beauty-mirror-case-mini": [
    {
      id: "r5",
      author: "Anna T.",
      location: "Milano",
      rating: 5,
      title: "Tascabile",
      body: "Formato perfetto per la pochette della sera.",
      date: "2026-07-30",
      verified: true,
    },
    {
      id: "r6",
      author: "Francesca D.",
      location: "Torino",
      rating: 5,
      title: "Lo porto sempre",
      body: "Gloss e specchio sono sufficienti per la sera. Lo adoro.",
      date: "2026-08-09",
      verified: true,
    },
  ],
};

export function getReviewsForProduct(handle: string): Review[] {
  return SEED[handle] ?? [];
}
