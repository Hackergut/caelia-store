import type { Product, ProductVariant } from "./types";

const beautyCaseDefault: ProductVariant = {
  id: "beauty-case-rose",
  sku: "CAELIA-BC-ROSE-01",
  title: "Beauty Mirror Case — Rose",
  price: { amount: "58.00", currencyCode: "EUR" },
  available: true,
  swatch: "#d49b96",
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
      "L'astuccio compatto che racchiude tutto cio che serve per un ritocco veloce: matita contorno labbra, lip gloss e specchio. Pensato per le giornate che cambiano ritmo ogni ora.",
    descriptionEn:
      "A compact case that holds everything you need for a fast touch-up: lip liner, lip gloss and mirror. Designed for days that shift tempo every hour.",
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
      material: "Esterno in pelle vegana color rosa cipria, interno in raso.",
      dimensions: "11,5 x 7,5 x 2 cm",
      weight: "120 g",
      madeIn: "Italia",
    },
    detailsEn: {
      material: "Vegan leather shell in dusty rose, satin interior.",
      dimensions: "11.5 x 7.5 x 2 cm",
      weight: "120 g",
      madeIn: "Italy",
    },
    images: [
      {
        src: "/products/beauty-case-rose-front.png",
        alt: "Beauty Mirror Case Rose vista frontale",
      },
      {
        src: "/products/beauty-case-rose-open.png",
        alt: "Beauty Mirror Case Rose aperto con specchio e prodotti",
      },
      {
        src: "/products/beauty-case-rose-detail.png",
        alt: "Beauty Mirror Case Rose dettaglio della chiusura magnetica",
      },
      {
        src: "/products/beauty-case-rose-lifestyle.png",
        alt: "Beauty Mirror Case Rose in uso su un tavolino da caffe",
      },
    ],
    variants: [
      beautyCaseDefault,
      {
        id: "beauty-case-noir",
        sku: "CAELIA-BC-NOIR-01",
        title: "Beauty Mirror Case — Noir",
        price: { amount: "58.00", currencyCode: "EUR" },
        available: true,
        swatch: "#1f1d1c",
      },
      {
        id: "beauty-case-ivory",
        sku: "CAELIA-BC-IVO-01",
        title: "Beauty Mirror Case — Ivory",
        price: { amount: "58.00", currencyCode: "EUR" },
        available: true,
        swatch: "#efe5d8",
      },
    ],
    seo: {
      title: "CAELIA Beauty Mirror Case — astuccio beauty con specchio",
      description:
        "Compatto, elegante, sempre con te. Scopri il Beauty Mirror Case CAELIA in tre varianti.",
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
      "La versione Mini del Beauty Mirror Case: solo specchio e gloss, perfetta per la pochette della sera.",
    descriptionEn:
      "The Mini version of the Beauty Mirror Case: mirror and gloss only, perfect for an evening clutch.",
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
        src: "/products/beauty-case-mini-rose.png",
        alt: "Beauty Mirror Case Mini Rose vista frontale",
      },
      {
        src: "/products/beauty-case-mini-noir.png",
        alt: "Beauty Mirror Case Mini Noir vista frontale",
      },
      {
        src: "/products/beauty-case-mini-ivory.png",
        alt: "Beauty Mirror Case Mini Ivory vista frontale",
      },
      {
        src: "/products/beauty-case-mini-open.png",
        alt: "Beauty Mirror Case Mini Rose aperto con specchio e gloss",
      },
    ],
    variants: [
      {
        id: "beauty-case-mini-rose",
        sku: "CAELIA-BCM-ROSE-01",
        title: "Beauty Mirror Case Mini — Rose",
        price: { amount: "38.00", currencyCode: "EUR" },
        available: true,
        swatch: "#d49b96",
      },
      {
        id: "beauty-case-mini-noir",
        sku: "CAELIA-BCM-NOIR-01",
        title: "Beauty Mirror Case Mini — Noir",
        price: { amount: "38.00", currencyCode: "EUR" },
        available: true,
        swatch: "#1f1d1c",
      },
    ],
    seo: {
      title: "CAELIA Beauty Mirror Case Mini",
      description:
        "Specchio e gloss in formato tascabile. Il Mini entra in ogni borsa.",
    },
  },
];

export function getProductByHandle(handle: string): Product | undefined {
  return products.find((p) => p.handle === handle);
}

export function getDefaultVariant(product: Product): ProductVariant {
  return product.variants[0];
}
