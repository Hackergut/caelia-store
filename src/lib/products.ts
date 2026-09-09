export type ProductImage = { src: string; alt: string };

export type Product = {
  handle: string;
  title: string;
  price: number;
  swatch: string;
  tone: "berry" | "cacao" | "rosa";
  tagline: string;
  description: string;
  images: ProductImage[];
  features: string[];
};

export const palette = [
  { name: "Burgundy Berry", hex: "#973851", rgb: "151 · 56 · 81" },
  { name: "Rosa nude", hex: "#ffddde", rgb: "255 · 221 · 222" },
  { name: "Marrone", hex: "#5b3f33", rgb: "91 · 63 · 51" },
  { name: "Burgundy", hex: "#4a0e16", rgb: "74 · 14 · 22" },
] as const;

const features = [
  "Specchio integrato, nitido",
  "Tasca per fino a 5 matite",
  "Pelle PU premium",
  "Logo debossato tono su tono",
];

export const products: Product[] = [
  {
    handle: "burgundy-caelia",
    title: "Burgundy Berry",
    price: 58,
    swatch: "#973851",
    tone: "berry",
    tagline: "Il colore maison",
    description:
      "Beauty Mirror Case in Burgundy Berry. Astuccio e specchio, stesso gesto.",
    images: [
      { src: "/campaign/pair-berry.jpg", alt: "Burgundy Berry — astuccio e specchio" },
      { src: "/campaign/model-berry-pencils.jpg", alt: "Burgundy Berry — cinque matite" },
      { src: "/campaign/life-carla.jpg", alt: "Carla con CAELIA" },
      { src: "/campaign/life-plane.jpg", alt: "Burgundy Berry in viaggio" },
      { src: "/campaign/model-berry.jpg", alt: "Burgundy Berry — packshot" },
    ],
    features,
  },
  {
    handle: "crema-caelia",
    title: "Rosa nude",
    price: 58,
    swatch: "#ffddde",
    tone: "rosa",
    tagline: "Polvere",
    description:
      "Beauty Mirror Case in Rosa nude. Pelle polvere, specchio, tasca.",
    images: [
      { src: "/campaign/pair-rosa.jpg", alt: "Rosa nude — astuccio e specchio" },
      { src: "/campaign/model-rosa.jpg", alt: "Rosa nude — packshot" },
      { src: "/campaign/life-apply.jpg", alt: "Rosa nude, il gesto" },
      { src: "/campaign/life-flatlay.jpg", alt: "Tre colori, still life" },
    ],
    features,
  },
  {
    handle: "cacao-caelia",
    title: "Marrone",
    price: 58,
    swatch: "#5b3f33",
    tone: "cacao",
    tagline: "Marrone",
    description:
      "Beauty Mirror Case in Marrone. Pelle bruna, specchio, tasca.",
    images: [
      { src: "/campaign/pair-cacao.jpg", alt: "Marrone — astuccio e specchio" },
      { src: "/campaign/cacao-front.jpg", alt: "Marrone — astuccio" },
      { src: "/campaign/cacao-mirror.jpg", alt: "Marrone — specchio" },
      { src: "/campaign/cacao-side.jpg", alt: "Marrone — profilo" },
      { src: "/campaign/cacao-angle.jpg", alt: "Marrone — tre quarti" },
    ],
    features,
  },
];

export function getProduct(handle: string) {
  return products.find((p) => p.handle === handle);
}
