/**
 * Shopify Storefront API adapter for CAELIA.
 *
 * Drop-in replacement for the static product catalog in products.ts.
 * Wire it by setting SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_API_TOKEN
 * in your environment, then call loadProducts() / loadProductByHandle()
 * from your page server components.
 *
 * The shape returned by this adapter matches `Product` from @/lib/types so
 * the existing components (ProductCard, ProductDetail, etc.) work without
 * any changes.
 */
import type { Product, ProductVariant, ProductImage, Money } from "./types";

function firstEnv(...names: string[]): string | undefined {
  for (const name of names) {
    const v = process.env[name]?.trim();
    if (v) return v;
  }
  return undefined;
}

const DOMAIN = firstEnv(
  "SHOPIFY_STORE_DOMAIN",
  "NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN",
  "SHOPIFY_STOREFRONT_DOMAIN",
);
const TOKEN = firstEnv(
  "SHOPIFY_STOREFRONT_API_TOKEN",
  "SHOPIFY_STOREFRONT_ACCESS_TOKEN",
  "NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN",
  "NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_TOKEN",
);

type ShopifyResponse<T> = { data?: T; errors?: Array<{ message: string }> };

async function shopifyFetch<T>(query: string, variables: Record<string, unknown> = {}): Promise<T> {
  if (!DOMAIN || !TOKEN) {
    throw new Error(
      "Shopify env vars missing: set SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_API_TOKEN",
    );
  }
  const res = await fetch(`https://${DOMAIN}/api/2024-10/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 }, // ISR: cache 60s
  });
  if (!res.ok) {
    throw new Error(`Shopify Storefront API ${res.status}: ${res.statusText}`);
  }
  const json = (await res.json()) as ShopifyResponse<T>;
  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join("; "));
  }
  if (!json.data) {
    throw new Error("Shopify returned no data");
  }
  return json.data;
}

const PRODUCT_FRAGMENT = /* GraphQL */ `
  fragment ProductFields on Product {
    id
    handle
    title
    vendor
    productType
    tags
    descriptionHtml
    options { name values }
    images(first: 8) {
      edges { node { url altText } }
    }
    variants(first: 25) {
      edges {
        node {
          id
          sku
          title
          availableForSale
          selectedOptions { name value }
          image { url altText }
          price { amount currencyCode }
          compareAtPrice { amount currencyCode }
        }
      }
    }
    seo { title description }
  }
`;

const PRODUCT_BY_HANDLE_QUERY = /* GraphQL */ `
  ${PRODUCT_FRAGMENT}
  query ProductByHandle($handle: String!) {
    product(handle: $handle) { ...ProductFields }
  }
`;

const PRODUCTS_QUERY = /* GraphQL */ `
  ${PRODUCT_FRAGMENT}
  query Products($first: Int!) {
    products(first: $first) { edges { node { ...ProductFields } } }
  }
`;

// ---- mapping helpers ----

function mapMoney(money: { amount: string; currencyCode: string }): Money {
  const code = money.currencyCode as Money["currencyCode"];
  return { amount: money.amount, currencyCode: code };
}

function mapImage(node: { url: string; altText?: string | null }): ProductImage {
  return { src: node.url, alt: node.altText ?? "" };
}

function mapVariant(
  node: {
    id: string;
    sku: string | null;
    title: string;
    availableForSale: boolean;
    price: { amount: string; currencyCode: string };
    image: { url: string; altText?: string | null } | null;
    selectedOptions: Array<{ name: string; value: string }>;
  },
  defaultImage: string,
): ProductVariant {
  // Use the first selected option as the visual swatch proxy when no swatch
  // metadata is shipped. The product detail UI picks colour names from
  // the variant title.
  const colorOpt = node.selectedOptions.find((o) =>
    /colore|color|tinto/i.test(o.name),
  );
  const swatch = colorOpt?.value?.toLowerCase();
  const colorMap: Record<string, string> = {
    rose: "#5c2e38",
    burgundy: "#5c2e38",
    noir: "#6d403b",
    cacao: "#6d403b",
    ivory: "#e5d1bd",
    crema: "#e5d1bd",
    cream: "#e5d1bd",
  };
  return {
    id: node.id,
    sku: node.sku ?? node.id,
    title: node.title,
    price: mapMoney(node.price),
    available: node.availableForSale,
    swatch: swatch ? colorMap[swatch] ?? "#cfc7be" : "#cfc7be",
  };
}

function htmlToText(html: string): string {
  return html
    .replace(/<br\s*\/?>/g, "\n")
    .replace(/<\/p>/g, "\n\n")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+\n/g, "\n")
    .trim();
}

function mapProduct(p: {
  id: string;
  handle: string;
  title: string;
  vendor: string;
  productType: string;
  tags: string[];
  descriptionHtml: string;
  images: { edges: Array<{ node: { url: string; altText?: string | null } }> };
  variants: {
    edges: Array<{
      node: {
        id: string;
        sku: string | null;
        title: string;
        availableForSale: boolean;
        price: { amount: string; currencyCode: string };
        image: { url: string; altText?: string | null } | null;
        selectedOptions: Array<{ name: string; value: string }>;
      };
    }>;
  };
  seo: { title: string | null; description: string | null };
}): Product {
  const images = p.images.edges.map((e) => mapImage(e.node));
  const variants = p.variants.edges.map((e) =>
    mapVariant(e.node, images[0]?.src ?? ""),
  );
  const description = htmlToText(p.descriptionHtml);
  return {
    id: p.id,
    handle: p.handle,
    title: p.title,
    vendor: p.vendor,
    productType: p.productType,
    tags: p.tags,
    description,
    descriptionEn: description,
    features: [],
    featuresEn: [],
    details: {
      material: "",
      dimensions: "",
      weight: "",
      madeIn: "Italia",
    },
    detailsEn: {
      material: "",
      dimensions: "",
      weight: "",
      madeIn: "Italy",
    },
    images,
    variants,
    seo: {
      title: p.seo.title ?? p.title,
      description: p.seo.description ?? description.slice(0, 160),
    },
  };
}

// ---- public API ----

export async function loadProducts(limit = 25): Promise<Product[]> {
  const data = await shopifyFetch<{
    products: { edges: Array<{ node: Parameters<typeof mapProduct>[0] }> };
  }>(PRODUCTS_QUERY, { first: limit });
  return data.products.edges.map((e) => mapProduct(e.node));
}

export async function loadProductByHandle(handle: string): Promise<Product | null> {
  const data = await shopifyFetch<{
    product: Parameters<typeof mapProduct>[0] | null;
  }>(PRODUCT_BY_HANDLE_QUERY, { handle });
  return data.product ? mapProduct(data.product) : null;
}

export function isShopifyConfigured(): boolean {
  return Boolean(DOMAIN && TOKEN);
}
