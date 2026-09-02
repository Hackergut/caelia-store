export type Money = {
  amount: string;
  currencyCode: "EUR" | "USD" | "GBP";
};

export type ProductImage = {
  src: string;
  alt: string;
};

export type ProductVariant = {
  id: string;
  sku: string;
  title: string;
  price: Money;
  available: boolean;
  swatch?: string;
};

export type Product = {
  id: string;
  handle: string;
  title: string;
  vendor: string;
  productType: string;
  tags: string[];
  description: string;
  descriptionEn: string;
  features: string[];
  featuresEn: string[];
  details: {
    material: string;
    dimensions: string;
    weight: string;
    madeIn: string;
  };
  detailsEn: {
    material: string;
    dimensions: string;
    weight: string;
    madeIn: string;
  };
  images: ProductImage[];
  variants: ProductVariant[];
  seo: {
    title: string;
    description: string;
  };
};

export type CartLine = {
  productHandle: string;
  productTitle: string;
  variantId: string;
  variantTitle: string;
  price: Money;
  quantity: number;
  image: string;
};
