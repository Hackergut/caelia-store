export type ProductImage = { src: string; alt: string };

export type Product = {
  handle: string;
  title: string;
  price: number;
  swatch: string;
  tone: "berry" | "avorio" | "rosa";
  tagline: string;
  description: string;
  images: ProductImage[];
  features: string[];
};

export const palette = [
  { name: "Burgundy Berry", hex: "#973851", rgb: "151 · 56 · 81" },
  { name: "Rosa nude", hex: "#ffddde", rgb: "255 · 221 · 222" },
  { name: "Avorio caldo", hex: "#dfc0b4", rgb: "223 · 192 · 180" },
  { name: "Cacao", hex: "#604c46", rgb: "96 · 76 · 70" },
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
      "Beauty Mirror Case in Burgundy Berry: #973851. Astuccio e specchio, stesso gesto.",
    images: [
      { src: "/campaign/pair-berry.jpg", alt: "Burgundy Berry — astuccio e specchio" },
      { src: "/campaign/model-berry.jpg", alt: "Burgundy Berry — packshot" },
      { src: "/campaign/zoom-berry-logo.jpg", alt: "Logo CAELIA inciso" },
      { src: "/campaign/edit-drip.jpg", alt: "Gloss sul logo" },
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
      "Beauty Mirror Case in Rosa nude: #ffddde. Pelle polvere, specchio, tasca.",
    images: [
      { src: "/campaign/pair-rosa.jpg", alt: "Rosa nude — astuccio e specchio" },
      { src: "/campaign/model-rosa.jpg", alt: "Rosa nude — packshot" },
      { src: "/campaign/life-apply.jpg", alt: "Rosa nude, il gesto" },
      { src: "/campaign/life-hold-rosa.jpg", alt: "Rosa nude in mano" },
      { src: "/campaign/life-flatlay.jpg", alt: "Rosa nude, still life" },
    ],
    features,
  },
  {
    handle: "cacao-caelia",
    title: "Avorio caldo",
    price: 58,
    swatch: "#dfc0b4",
    tone: "avorio",
    tagline: "Avorio",
    description:
      "Beauty Mirror Case in Avorio caldo: #dfc0b4. Pelle nuda, specchio, un gesto.",
    images: [
      { src: "/campaign/pair-avorio.jpg", alt: "Avorio caldo — astuccio e specchio" },
      { src: "/campaign/model-avorio.jpg", alt: "Avorio caldo — packshot" },
      { src: "/campaign/close-avorio-pocket.jpg", alt: "Tasca, cucitura" },
      { src: "/campaign/zoom-logo.jpg", alt: "Logo inciso" },
      { src: "/campaign/zoom-stitch.jpg", alt: "Cucitura a sella" },
    ],
    features,
  },
];

export function getProduct(handle: string) {
  return products.find((p) => p.handle === handle);
}
