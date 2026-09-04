/**
 * Shopify Storefront API adapter for CAELIA.
 *
 * Drop-in replacement for the static product catalog in products.ts.
 * Wire it by setting SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_ACCESS_TOKEN
 * in your environment, then call loadProducts() / loadProductByHandle()
 * from your page server components.
 *
 * Store structure: each colour (Burgundy / Cacao / Crema) of the Beauty
 * Mirror Case is its own Shopify product with a single default variant —
 * there are no Shopify product variants/options in play. Colour metadata
 * is derived from each product's tags.
 *
 * The shape returned by this adapter matches `Product` from @/lib/types so
 * the existing components (ProductCard, ProductDetail, etc.) work without
 * any changes.
 */
import type { Product, ProductVariant, ProductImage, Money } from "./types";

const DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const API_VERSION = "2026-07";

type ShopifyResponse<T> = { data?: T; errors?: Array<{ message: string }> };

async function shopifyFetch<T>(
  query: string,
  variables: Record<string, unknown> = {},
  options: { cache?: "no-store"; revalidate?: number } = {},
): Promise<T> {
  if (!DOMAIN || !TOKEN) {
    throw new Error(
      "Shopify env vars missing: set SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_ACCESS_TOKEN",
    );
  }
  const res = await fetch(`https://${DOMAIN}/api/${API_VERSION}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    ...(options.cache === "no-store"
      ? { cache: "no-store" as const }
      : { next: { revalidate: options.revalidate ?? 60 } }),
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

// ---- colour metadata (derived from product tags) ----

const COLOR_SWATCHES: Record<string, string> = {
  burgundy: "#5c1a24",
  cacao: "#6b4630",
  crema: "#efe6d8",
};

const COLOR_LABELS: Record<string, string> = {
  burgundy: "Burgundy",
  cacao: "Cacao",
  crema: "Crema",
};

function colorFromTags(tags: string[]): { key: string; label: string; swatch: string } | null {
  for (const tag of tags) {
    const key = tag.toLowerCase();
    if (COLOR_SWATCHES[key]) {
      return { key, label: COLOR_LABELS[key], swatch: COLOR_SWATCHES[key] };
    }
  }
  return null;
}

/** Known sibling handles for the Beauty Mirror Case colour family. */
export const BEAUTY_MIRROR_CASE_HANDLES = [
  "caelia-beauty-mirror-case-burgundy",
  "caelia-beauty-mirror-case-cacao",
  "caelia-beauty-mirror-case-crema",
];

const PRODUCT_FRAGMENT = /* GraphQL */ `
  fragment ProductFields on Product {
    id
    handle
    title
    vendor
    productType
    tags
    descriptionHtml
    images(first: 8) {
      edges { node { url altText } }
    }
    variants(first: 1) {
      edges {
        node {
          id
          sku
          title
          availableForSale
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
  },
  colorLabel: string,
  swatch: string,
): ProductVariant {
  return {
    id: node.id,
    sku: node.sku ?? node.id,
    title: colorLabel,
    price: mapMoney(node.price),
    available: node.availableForSale,
    swatch,
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

type RawProduct = {
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
      };
    }>;
  };
  seo: { title: string | null; description: string | null };
};

function mapProduct(p: RawProduct): Product {
  const images = p.images.edges.map((e) => mapImage(e.node));
  const color = colorFromTags(p.tags);
  const colorLabel = color?.label ?? "Unica";
  const swatch = color?.swatch ?? "#cfc7be";
  const variants = p.variants.edges.map((e) => mapVariant(e.node, colorLabel, swatch));
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
    features: [
      "Specchio integrato, anti-riflesso",
      "Chiusura magnetica sicura",
      "Fodera in microfibra per pulizia rapida",
    ],
    featuresEn: [
      "Built-in anti-glare mirror",
      "Secure magnetic closure",
      "Microfiber lining for quick wipe",
    ],
    details: {
      material: "Pelle vegana, fodera in microfibra.",
      dimensions: "11,5 x 7,5 x 2 cm",
      weight: "120 g",
      madeIn: "Italia",
    },
    detailsEn: {
      material: "Vegan leather, microfiber lining.",
      dimensions: "11.5 x 7.5 x 2 cm",
      weight: "120 g",
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

// ---- public API: catalog ----

export async function loadProducts(limit = 25): Promise<Product[]> {
  const data = await shopifyFetch<{
    products: { edges: Array<{ node: RawProduct }> };
  }>(PRODUCTS_QUERY, { first: limit });
  return data.products.edges.map((e) => mapProduct(e.node));
}

export async function loadProductByHandle(handle: string): Promise<Product | null> {
  const data = await shopifyFetch<{ product: RawProduct | null }>(
    PRODUCT_BY_HANDLE_QUERY,
    { handle },
  );
  return data.product ? mapProduct(data.product) : null;
}

/** Colour siblings for the Beauty Mirror Case line, excluding the given handle. */
export async function loadColorSiblings(handle: string): Promise<Product[]> {
  if (!BEAUTY_MIRROR_CASE_HANDLES.includes(handle)) return [];
  const others = BEAUTY_MIRROR_CASE_HANDLES.filter((h) => h !== handle);
  const results = await Promise.all(others.map((h) => loadProductByHandle(h)));
  return results.filter((p): p is Product => p !== null);
}

export function isShopifyConfigured(): boolean {
  return Boolean(DOMAIN && TOKEN);
}

// ---- public API: cart ----

export type ShopifyCartLine = {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    price: Money;
    image: { url: string; altText?: string | null } | null;
    product: { title: string; handle: string };
  };
};

export type ShopifyCart = {
  id: string;
  checkoutUrl: string;
  lines: ShopifyCartLine[];
};

const CART_FIELDS = /* GraphQL */ `
  fragment CartFields on Cart {
    id
    checkoutUrl
    lines(first: 50) {
      nodes {
        id
        quantity
        merchandise {
          ... on ProductVariant {
            id
            title
            price { amount currencyCode }
            image { url altText }
            product { title handle }
          }
        }
      }
    }
  }
`;

type RawCart = {
  id: string;
  checkoutUrl: string;
  lines: {
    nodes: Array<{
      id: string;
      quantity: number;
      merchandise: {
        id: string;
        title: string;
        price: { amount: string; currencyCode: string };
        image: { url: string; altText?: string | null } | null;
        product: { title: string; handle: string };
      };
    }>;
  };
};

function mapCart(c: RawCart): ShopifyCart {
  return {
    id: c.id,
    checkoutUrl: withOnlineStoreChannel(c.checkoutUrl),
    lines: c.lines.nodes.map((n) => ({
      id: n.id,
      quantity: n.quantity,
      merchandise: {
        id: n.merchandise.id,
        title: n.merchandise.title,
        price: mapMoney(n.merchandise.price),
        image: n.merchandise.image,
        product: n.merchandise.product,
      },
    })),
  };
}

/** Ensures the checkout URL bypasses the "password required" screen. */
function withOnlineStoreChannel(url: string): string {
  try {
    const u = new URL(url);
    u.searchParams.set("channel", "online_store");
    return u.toString();
  } catch {
    return url;
  }
}

const CART_CREATE_MUTATION = /* GraphQL */ `
  ${CART_FIELDS}
  mutation CartCreate($lines: [CartLineInput!]) {
    cartCreate(input: { lines: $lines }) {
      cart { ...CartFields }
      userErrors { field message }
    }
  }
`;

const CART_LINES_ADD_MUTATION = /* GraphQL */ `
  ${CART_FIELDS}
  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart { ...CartFields }
      userErrors { field message }
    }
  }
`;

const CART_LINES_UPDATE_MUTATION = /* GraphQL */ `
  ${CART_FIELDS}
  mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart { ...CartFields }
      userErrors { field message }
    }
  }
`;

const CART_LINES_REMOVE_MUTATION = /* GraphQL */ `
  ${CART_FIELDS}
  mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart { ...CartFields }
      userErrors { field message }
    }
  }
`;

const CART_GET_QUERY = /* GraphQL */ `
  ${CART_FIELDS}
  query CartGet($cartId: ID!) {
    cart(id: $cartId) { ...CartFields }
  }
`;

export async function createCart(
  lines: Array<{ merchandiseId: string; quantity: number }> = [],
): Promise<ShopifyCart> {
  const data = await shopifyFetch<{
    cartCreate: { cart: RawCart | null; userErrors: Array<{ field: string[]; message: string }> };
  }>(CART_CREATE_MUTATION, { lines }, { cache: "no-store" });
  if (data.cartCreate.userErrors.length) {
    throw new Error(data.cartCreate.userErrors.map((e) => e.message).join("; "));
  }
  if (!data.cartCreate.cart) throw new Error("Shopify did not return a cart");
  return mapCart(data.cartCreate.cart);
}

export async function addLinesToCart(
  cartId: string,
  lines: Array<{ merchandiseId: string; quantity: number }>,
): Promise<ShopifyCart> {
  const data = await shopifyFetch<{
    cartLinesAdd: { cart: RawCart | null; userErrors: Array<{ field: string[]; message: string }> };
  }>(CART_LINES_ADD_MUTATION, { cartId, lines }, { cache: "no-store" });
  if (data.cartLinesAdd.userErrors.length) {
    throw new Error(data.cartLinesAdd.userErrors.map((e) => e.message).join("; "));
  }
  if (!data.cartLinesAdd.cart) throw new Error("Shopify did not return a cart");
  return mapCart(data.cartLinesAdd.cart);
}

export async function updateCartLines(
  cartId: string,
  lines: Array<{ id: string; quantity: number }>,
): Promise<ShopifyCart> {
  const data = await shopifyFetch<{
    cartLinesUpdate: { cart: RawCart | null; userErrors: Array<{ field: string[]; message: string }> };
  }>(CART_LINES_UPDATE_MUTATION, { cartId, lines }, { cache: "no-store" });
  if (data.cartLinesUpdate.userErrors.length) {
    throw new Error(data.cartLinesUpdate.userErrors.map((e) => e.message).join("; "));
  }
  if (!data.cartLinesUpdate.cart) throw new Error("Shopify did not return a cart");
  return mapCart(data.cartLinesUpdate.cart);
}

export async function removeCartLines(cartId: string, lineIds: string[]): Promise<ShopifyCart> {
  const data = await shopifyFetch<{
    cartLinesRemove: { cart: RawCart | null; userErrors: Array<{ field: string[]; message: string }> };
  }>(CART_LINES_REMOVE_MUTATION, { cartId, lineIds }, { cache: "no-store" });
  if (data.cartLinesRemove.userErrors.length) {
    throw new Error(data.cartLinesRemove.userErrors.map((e) => e.message).join("; "));
  }
  if (!data.cartLinesRemove.cart) throw new Error("Shopify did not return a cart");
  return mapCart(data.cartLinesRemove.cart);
}

export async function getCart(cartId: string): Promise<ShopifyCart | null> {
  const data = await shopifyFetch<{ cart: RawCart | null }>(
    CART_GET_QUERY,
    { cartId },
    { cache: "no-store" },
  );
  return data.cart ? mapCart(data.cart) : null;
}
