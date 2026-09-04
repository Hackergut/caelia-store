import type { Product, ProductVariant } from "./types";

const shared = {
  vendor: "CAELIA",
  productType: "Beauty Accessory",
  tags: ["beauty", "mirror", "essentials", "travel"],
  features: [
    "Specchio integrato, anti-riflesso",
    "Matita contorno labbra, formula cremosa",
    "Lip gloss non appiccicoso",
    "Tasca che tiene le matite al sicuro",
    "Fodera in microfibra",
  ],
  featuresEn: [
    "Built-in anti-glare mirror",
    "Creamy lip liner",
    "Non-sticky lip gloss",
    "Secure pencil pocket",
    "Microfiber lining",
  ],
  details: {
    material: "Esterno in pelle vegana, interno in raso.",
    dimensions: "11,5 x 7,5 x 2 cm",
    weight: "120 g",
    madeIn: "Italia",
  },
  detailsEn: {
    material: "Vegan leather shell, satin interior.",
    dimensions: "11.5 x 7.5 x 2 cm",
    weight: "120 g",
    madeIn: "Italy",
  },
};

function oneVariant(
  id: string,
  sku: string,
  title: string,
  swatch: string,
): ProductVariant {
  return {
    id,
    sku,
    title,
    price: { amount: "58.00", currencyCode: "EUR" },
    available: true,
    swatch,
  };
}

export const products: Product[] = [
  {
    id: "gid://caelia/Product/burgundy-caelia",
    handle: "burgundy-caelia",
    title: "Burgundy Caelia",
    ...shared,
    description:
      "Beauty Mirror Case in Burgundy Caelia: il bordeaux maison. Specchio, matita e gloss in un astuccio compatto.",
    descriptionEn:
      "Beauty Mirror Case in Burgundy Caelia — the maison burgundy. Mirror, liner and gloss in one slim case.",
    images: [
      { src: "/products/new-beauty-case-burgundy-front.jpg", alt: "Burgundy Caelia — astuccio e specchio" },
      { src: "/products/new-beauty-case-burgundy-open.jpg", alt: "Burgundy Caelia — vista frontale" },
      { src: "/products/new-beauty-case-crema-logo.jpg", alt: "Burgundy Caelia — su fondo crema" },
      { src: "/products/new-beauty-case-burgundy-logo.jpg", alt: "Burgundy Caelia — tasca con matite" },
      { src: "/products/new-beauty-case-burgundy-texture.jpg", alt: "Burgundy Caelia — texture e logo" },
      { src: "/products/new-beauty-case-burgundy-texture-2.jpg", alt: "Burgundy Caelia — dettaglio pelle" },
      { src: "/products/new-beauty-case-burgundy-pocket.jpg", alt: "Burgundy Caelia — tasca" },
      { src: "/products/new-beauty-case-burgundy-logo-2.jpg", alt: "Burgundy Caelia — logo in rilievo" },
      { src: "/products/new-beauty-case-burgundy-set.jpg", alt: "Burgundy Caelia — set" },
    ],
    variants: [oneVariant("burgundy-caelia", "CAELIA-BC-BURG-01", "Burgundy Caelia", "#4a0e16")],
    seo: {
      title: "Burgundy Caelia — Beauty Mirror Case",
      description: "Astuccio beauty bordeaux con specchio. Burgundy Caelia.",
    },
  },
  {
    id: "gid://caelia/Product/cacao-caelia",
    handle: "cacao-caelia",
    title: "Cacao Caelia",
    ...shared,
    description:
      "Beauty Mirror Case in Cacao Caelia: cuoio caldo, marrone cacao. Stessa forma, solo il colore cambia.",
    descriptionEn:
      "Beauty Mirror Case in Cacao Caelia — warm cocoa leather. Same form, different colour.",
    images: [
      { src: "/products/new-beauty-case-cacao-open.jpg", alt: "Cacao Caelia — astuccio e specchio" },
      { src: "/products/new-beauty-case-cacao-angle.jpg", alt: "Cacao Caelia — tre quarti" },
      { src: "/products/new-beauty-case-cacao-front.jpg", alt: "Cacao Caelia — logo in rilievo" },
      { src: "/products/new-beauty-case-cacao-logo.jpg", alt: "Cacao Caelia — tasca con matite" },
    ],
    variants: [oneVariant("cacao-caelia", "CAELIA-BC-CACAO-01", "Cacao Caelia", "#7b5644")],
    seo: {
      title: "Cacao Caelia — Beauty Mirror Case",
      description: "Astuccio beauty cacao con specchio. Cacao Caelia.",
    },
  },
  {
    id: "gid://caelia/Product/crema-caelia",
    handle: "crema-caelia",
    title: "Crema Caelia",
    ...shared,
    description:
      "Beauty Mirror Case in Crema Caelia: pelle chiara, luminosa. Specchio e tasca, stesso design.",
    descriptionEn:
      "Beauty Mirror Case in Crema Caelia — pale cream leather. Same design, light colourway.",
    images: [
      { src: "/products/new-beauty-case-crema-front.jpg", alt: "Crema Caelia — astuccio e specchio" },
      { src: "/products/new-beauty-case-crema-angle.jpg", alt: "Crema Caelia — tre quarti" },
      { src: "/products/new-beauty-case-crema-open.jpg", alt: "Crema Caelia — tasca con matite" },
    ],
    variants: [oneVariant("crema-caelia", "CAELIA-BC-CREMA-01", "Crema Caelia", "#efe5d8")],
    seo: {
      title: "Crema Caelia — Beauty Mirror Case",
      description: "Astuccio beauty crema con specchio. Crema Caelia.",
    },
  },
];

export function getProductByHandle(handle: string): Product | undefined {
  return products.find((p) => p.handle === handle);
}

export function getDefaultVariant(product: Product): ProductVariant {
  return product.variants[0];
}
