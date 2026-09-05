import type { Product, ProductVariant } from "./types";
import { leatherById } from "./caelia/variants";

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
      { src: "/products/burgundy-caelia-pair.jpg", alt: "Burgundy Caelia — astuccio e specchio" },
      { src: "/products/burgundy-caelia-lifestyle.jpg", alt: "Burgundy Caelia — sul vanity di marmo" },
      { src: "/products/burgundy-caelia-pocket.jpg", alt: "Burgundy Caelia — tasca" },
      { src: "/products/burgundy-caelia-pencils.jpg", alt: "Burgundy Caelia — matite in tasca" },
      { src: "/products/burgundy-caelia-logo.jpg", alt: "Burgundy Caelia — logo CAELIA" },
      { src: "/products/burgundy-caelia-stitch.jpg", alt: "Burgundy Caelia — cucitura e pelle" },
    ],
    variants: [oneVariant("burgundy-caelia", "CAELIA-BC-BURG-01", "Burgundy Caelia", leatherById("burgundy").swatch)],
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
      { src: "/products/cacao-caelia-pair.jpg", alt: "Cacao Caelia — astuccio e specchio" },
      { src: "/products/cacao-caelia-pencils.jpg", alt: "Cacao Caelia — matite in tasca" },
      { src: "/products/cacao-caelia-logo.jpg", alt: "Cacao Caelia — logo CAELIA" },
      { src: "/products/cacao-caelia-angle.jpg", alt: "Cacao Caelia — tre quarti" },
    ],
    variants: [oneVariant("cacao-caelia", "CAELIA-BC-CACAO-01", "Cacao Caelia", leatherById("cacao").swatch)],
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
      { src: "/products/crema-caelia-pair.jpg", alt: "Crema Caelia — astuccio e specchio" },
      { src: "/products/crema-caelia-lifestyle.jpg", alt: "Crema Caelia — sul tavolo, con matite e specchio" },
      { src: "/products/crema-caelia-pencils.jpg", alt: "Crema Caelia — matite in tasca" },
      { src: "/products/crema-caelia-logo.jpg", alt: "Crema Caelia — logo CAELIA" },
      { src: "/products/crema-caelia-angle.jpg", alt: "Crema Caelia — tre quarti" },
    ],
    variants: [oneVariant("crema-caelia", "CAELIA-BC-CREMA-01", "Crema Caelia", leatherById("crema").swatch)],
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
