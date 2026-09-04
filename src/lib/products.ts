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

const beautyCaseProducts: Product[] = [
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
      { src: "/products/burgundy-caelia-pocket.jpg", alt: "Burgundy Caelia — tasca" },
      { src: "/products/burgundy-caelia-pencils.jpg", alt: "Burgundy Caelia — matite in tasca" },
      { src: "/products/burgundy-caelia-logo.jpg", alt: "Burgundy Caelia — logo CAELIA" },
      { src: "/products/burgundy-caelia-stitch.jpg", alt: "Burgundy Caelia — cucitura e pelle" },
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
      { src: "/products/cacao-caelia-pair.jpg", alt: "Cacao Caelia — astuccio e specchio" },
      { src: "/products/cacao-caelia-pencils.jpg", alt: "Cacao Caelia — matite in tasca" },
      { src: "/products/cacao-caelia-logo.jpg", alt: "Cacao Caelia — logo CAELIA" },
      { src: "/products/cacao-caelia-angle.jpg", alt: "Cacao Caelia — tre quarti" },
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
      { src: "/products/crema-caelia-pair.jpg", alt: "Crema Caelia — astuccio e specchio" },
      { src: "/products/crema-caelia-pencils.jpg", alt: "Crema Caelia — matite in tasca" },
      { src: "/products/crema-caelia-logo.jpg", alt: "Crema Caelia — logo CAELIA" },
      { src: "/products/crema-caelia-angle.jpg", alt: "Crema Caelia — tre quarti" },
    ],
    variants: [oneVariant("crema-caelia", "CAELIA-BC-CREMA-01", "Crema Caelia", "#efe5d8")],
    seo: {
      title: "Crema Caelia — Beauty Mirror Case",
      description: "Astuccio beauty crema con specchio. Crema Caelia.",
    },
  },
];

/* -------------------------------------------------------------------------
   Slim Mirror Card Case — la nuova silhouette piatta, formato carta.
   Stessi tre colori maison del Beauty Mirror Case.
   ------------------------------------------------------------------------- */
const slimShared = {
  vendor: "CAELIA",
  productType: "Beauty Accessory",
  tags: ["beauty", "mirror", "slim", "card", "travel"],
  features: [
    "Formato carta: entra in ogni tasca",
    "Specchio infrangibile su cornice cucita",
    "Tasca curva per carta o matita piatta",
    "Logo CAELIA impresso a caldo",
    "Cucitura tono su tono a filo",
  ],
  featuresEn: [
    "Card format: fits any pocket",
    "Shatterproof mirror in a stitched frame",
    "Curved pocket for a card or flat pencil",
    "Heat-debossed CAELIA wordmark",
    "Tonal edge stitching",
  ],
  details: {
    material: "Esterno in pelle vegana liscia, specchio infrangibile.",
    dimensions: "10,2 x 6,4 x 0,6 cm",
    weight: "45 g",
    madeIn: "Italia",
  },
  detailsEn: {
    material: "Smooth vegan leather shell, shatterproof mirror.",
    dimensions: "10.2 x 6.4 x 0.6 cm",
    weight: "45 g",
    madeIn: "Italy",
  },
};

function slimVariant(
  id: string,
  sku: string,
  title: string,
  swatch: string,
): ProductVariant {
  return {
    id,
    sku,
    title,
    price: { amount: "42.00", currencyCode: "EUR" },
    available: true,
    swatch,
  };
}

const slimProducts: Product[] = [
  {
    id: "gid://caelia/Product/burgundy-slim-card",
    handle: "burgundy-slim-card",
    title: "Burgundy Slim Card",
    ...slimShared,
    description:
      "Slim Mirror Card Case in Burgundy Caelia: due pezzi piatti, formato carta. Sleeve con tasca curva e cornice specchio, nel bordeaux maison.",
    descriptionEn:
      "Slim Mirror Card Case in Burgundy Caelia — two flat card-format pieces: a curved-pocket sleeve and a mirror frame, in the maison burgundy.",
    images: [
      {
        src: "/products/burgundy-caelia-slim-pair.jpg",
        alt: "Burgundy Slim Card — sleeve e cornice specchio",
      },
      {
        src: "/products/burgundy-caelia-logo.jpg",
        alt: "Burgundy Slim Card — logo CAELIA impresso",
      },
      {
        src: "/products/burgundy-caelia-stitch.jpg",
        alt: "Burgundy Slim Card — cucitura e pelle",
      },
    ],
    variants: [
      slimVariant("burgundy-slim-card", "CAELIA-SC-BURG-01", "Burgundy Slim Card", "#4a0e16"),
    ],
    seo: {
      title: "Burgundy Slim Card — Slim Mirror Card Case",
      description: "Specchio e sleeve formato carta in bordeaux. Burgundy Slim Card.",
    },
  },
  {
    id: "gid://caelia/Product/cacao-slim-card",
    handle: "cacao-slim-card",
    title: "Cacao Slim Card",
    ...slimShared,
    description:
      "Slim Mirror Card Case in Cacao Caelia: cuoio caldo, spessore minimo. Sleeve con tasca curva e cornice specchio.",
    descriptionEn:
      "Slim Mirror Card Case in Cacao Caelia — warm cocoa leather, minimal thickness. Curved-pocket sleeve and mirror frame.",
    images: [
      {
        src: "/products/cacao-caelia-slim-pair.jpg",
        alt: "Cacao Slim Card — sleeve e cornice specchio",
      },
      {
        src: "/products/cacao-caelia-logo.jpg",
        alt: "Cacao Slim Card — logo CAELIA impresso",
      },
      {
        src: "/products/cacao-caelia-angle.jpg",
        alt: "Cacao Slim Card — tre quarti",
      },
    ],
    variants: [
      slimVariant("cacao-slim-card", "CAELIA-SC-CACAO-01", "Cacao Slim Card", "#7b5644"),
    ],
    seo: {
      title: "Cacao Slim Card — Slim Mirror Card Case",
      description: "Specchio e sleeve formato carta in cacao. Cacao Slim Card.",
    },
  },
  {
    id: "gid://caelia/Product/crema-slim-card",
    handle: "crema-slim-card",
    title: "Crema Slim Card",
    ...slimShared,
    description:
      "Slim Mirror Card Case in Crema Caelia: pelle chiara e luminosa, due pezzi piatti da tenere insieme o separati.",
    descriptionEn:
      "Slim Mirror Card Case in Crema Caelia — pale luminous leather, two flat pieces to keep together or apart.",
    images: [
      {
        src: "/products/crema-caelia-slim-pair.jpg",
        alt: "Crema Slim Card — sleeve e cornice specchio",
      },
      {
        src: "/products/crema-caelia-logo.jpg",
        alt: "Crema Slim Card — logo CAELIA impresso",
      },
      {
        src: "/products/crema-caelia-angle.jpg",
        alt: "Crema Slim Card — tre quarti",
      },
    ],
    variants: [
      slimVariant("crema-slim-card", "CAELIA-SC-CREMA-01", "Crema Slim Card", "#efe5d8"),
    ],
    seo: {
      title: "Crema Slim Card — Slim Mirror Card Case",
      description: "Specchio e sleeve formato carta in crema. Crema Slim Card.",
    },
  },
];

export const products: Product[] = [...beautyCaseProducts, ...slimProducts];

export function getProductByHandle(handle: string): Product | undefined {
  return products.find((p) => p.handle === handle);
}

export function getDefaultVariant(product: Product): ProductVariant {
  return product.variants[0];
}
