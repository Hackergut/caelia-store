import type { Product, ProductVariant } from "./types";

const burgundy: ProductVariant = {
  id: "beauty-case-burgundy",
  sku: "CAELIA-BC-BURG-01",
  title: "Burgundy Caelia",
  price: { amount: "58.00", currencyCode: "EUR" },
  available: true,
  swatch: "#4a0e16",
};

export const products: Product[] = [
  {
    id: "gid://caelia/Product/beauty-mirror-case",
    handle: "beauty-mirror-case",
    title: "CAELIA Beauty Mirror Case",
    vendor: "CAELIA",
    productType: "Beauty Accessory",
    tags: ["beauty", "mirror", "essentials", "travel"],
    description:
      "L'astuccio compatto che racchiude tutto cio che serve per un ritocco veloce: matita contorno labbra, lip gloss e specchio. Pensato per le giornate che cambiano ritmo ogni ora. Tre colorazioni: Burgundy Caelia, Cacao Caelia, Crema Caelia.",
    descriptionEn:
      "A compact case that holds everything you need for a fast touch-up: lip liner, lip gloss and mirror. Three colorways: Burgundy Caelia, Cacao Caelia, Crema Caelia.",
    features: [
      "Specchio integrato, anti-riflesso",
      "Matita contorno labbra, formula cremosa",
      "Lip gloss non appiccicoso",
      "Chiusura magnetica sicura",
      "Fodera in microfibra per pulizia rapida",
    ],
    featuresEn: [
      "Built-in anti-glare mirror",
      "Creamy lip liner",
      "Non-sticky lip gloss",
      "Secure magnetic closure",
      "Microfiber lining for quick wipe",
    ],
    details: {
      material: "Esterno in pelle vegana, interno in raso. Tre colorazioni maison.",
      dimensions: "11,5 x 7,5 x 2 cm",
      weight: "120 g",
      madeIn: "Italia",
    },
    detailsEn: {
      material: "Vegan leather shell, satin interior. Three maison colorways.",
      dimensions: "11.5 x 7.5 x 2 cm",
      weight: "120 g",
      madeIn: "Italy",
    },
    images: [
      {
        src: "/products/beauty-case-burgundy-front.jpg",
        alt: "Beauty Mirror Case Burgundy Caelia vista laterale",
      },
      {
        src: "/products/beauty-case-burgundy-open.jpg",
        alt: "Beauty Mirror Case Burgundy Caelia specchio e tasca",
      },
      {
        src: "/products/beauty-case-burgundy-detail.jpg",
        alt: "Beauty Mirror Case Burgundy Caelia dettaglio cucitura e logo",
      },
      {
        src: "/products/beauty-case-burgundy-lifestyle.jpg",
        alt: "Beauty Mirror Case Burgundy Caelia su marmo",
      },
      {
        src: "/products/beauty-case-burgundy-pocket.jpg",
        alt: "Beauty Mirror Case Burgundy Caelia con matite",
      },
      {
        src: "/products/beauty-case-cacao-front.jpg",
        alt: "Beauty Mirror Case Cacao Caelia specchio e tasca",
      },
      {
        src: "/products/beauty-case-crema-front.jpg",
        alt: "Beauty Mirror Case Crema Caelia con matite e specchio",
      },
    ],
    variants: [
      burgundy,
      {
        id: "beauty-case-cacao",
        sku: "CAELIA-BC-CACAO-01",
        title: "Cacao Caelia",
        price: { amount: "58.00", currencyCode: "EUR" },
        available: true,
        swatch: "#7b5644",
      },
      {
        id: "beauty-case-crema",
        sku: "CAELIA-BC-CREMA-01",
        title: "Crema Caelia",
        price: { amount: "58.00", currencyCode: "EUR" },
        available: true,
        swatch: "#efe5d8",
      },
    ],
    seo: {
      title: "CAELIA Beauty Mirror Case — Burgundy, Cacao, Crema",
      description:
        "Compatto, elegante, sempre con te. Tre colorazioni: Burgundy Caelia, Cacao Caelia, Crema Caelia.",
    },
  },
  {
    id: "gid://caelia/Product/beauty-mirror-case-mini",
    handle: "beauty-mirror-case-mini",
    title: "CAELIA Beauty Mirror Case Mini",
    vendor: "CAELIA",
    productType: "Beauty Accessory",
    tags: ["beauty", "mirror", "essentials", "travel", "mini"],
    description:
      "La versione Mini del Beauty Mirror Case: solo specchio e gloss, perfetta per la pochette della sera. Stesse tre colorazioni maison.",
    descriptionEn:
      "The Mini version of the Beauty Mirror Case: mirror and gloss only. Same three maison colorways.",
    features: [
      "Specchio integrato",
      "Lip gloss non appiccicoso",
      "Formato tascabile",
      "Fodera in raso",
    ],
    featuresEn: [
      "Built-in mirror",
      "Non-sticky lip gloss",
      "Pocket-sized",
      "Satin lining",
    ],
    details: {
      material: "Pelle vegana, raso.",
      dimensions: "8,5 x 5,5 x 1,5 cm",
      weight: "65 g",
      madeIn: "Italia",
    },
    detailsEn: {
      material: "Vegan leather, satin.",
      dimensions: "8.5 x 5.5 x 1.5 cm",
      weight: "65 g",
      madeIn: "Italy",
    },
    images: [
      {
        src: "/products/beauty-case-burgundy-pocket.jpg",
        alt: "Beauty Mirror Case Mini Burgundy Caelia",
      },
      {
        src: "/products/beauty-case-cacao-pocket.jpg",
        alt: "Beauty Mirror Case Mini Cacao Caelia",
      },
      {
        src: "/products/beauty-case-crema-pocket.jpg",
        alt: "Beauty Mirror Case Mini Crema Caelia",
      },
      {
        src: "/products/beauty-case-crema-front.jpg",
        alt: "Beauty Mirror Case Mini Crema Caelia con specchio",
      },
    ],
    variants: [
      {
        id: "beauty-case-mini-burgundy",
        sku: "CAELIA-BCM-BURG-01",
        title: "Burgundy Caelia",
        price: { amount: "38.00", currencyCode: "EUR" },
        available: true,
        swatch: "#4a0e16",
      },
      {
        id: "beauty-case-mini-cacao",
        sku: "CAELIA-BCM-CACAO-01",
        title: "Cacao Caelia",
        price: { amount: "38.00", currencyCode: "EUR" },
        available: true,
        swatch: "#7b5644",
      },
      {
        id: "beauty-case-mini-crema",
        sku: "CAELIA-BCM-CREMA-01",
        title: "Crema Caelia",
        price: { amount: "38.00", currencyCode: "EUR" },
        available: true,
        swatch: "#efe5d8",
      },
    ],
    seo: {
      title: "CAELIA Beauty Mirror Case Mini — Burgundy, Cacao, Crema",
      description:
        "Specchio e gloss in formato tascabile. Tre colorazioni: Burgundy, Cacao, Crema Caelia.",
    },
  },
];

export function getProductByHandle(handle: string): Product | undefined {
  return products.find((p) => p.handle === handle);
}

export function getDefaultVariant(product: Product): ProductVariant {
  return product.variants[0];
}
