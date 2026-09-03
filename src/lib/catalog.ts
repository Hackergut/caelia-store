/**
 * Catalog adapter — chooses Shopify when env vars are set, otherwise
 * falls back to the local seed catalog. No call sites need to change
 * when wiring Shopify in or out: same function names, same `Product`
 * type, same shape.
 *
 *   const products = await listProducts();
 *   const product  = await getProduct(handle);
 *
 * To wire Shopify:
 *   1. Create a Custom App in Shopify admin (Settings → Apps and sales
 *      channels → Develop apps).
 *   2. Enable Storefront API scopes: unauthenticated_read_product_listings,
 *      unauthenticated_read_product_inventory, unauthenticated_read_product_listing_images.
 *   3. Install and copy the Storefront API access token.
 *   4. Add env vars on Vercel:
 *        SHOPIFY_STORE_DOMAIN=tuonegozio.myshopify.com
 *        SHOPIFY_STOREFRONT_API_TOKEN=xxxxx
 *   5. Redeploy. No code change required.
 */
import { products as localProducts, getProductByHandle as localGetProductByHandle } from "./products";
import {
  loadProducts as shopifyLoadProducts,
  loadProductByHandle as shopifyLoadProductByHandle,
  isShopifyConfigured,
} from "./shopify";
import type { Product } from "./types";

export const catalogSource: "shopify" | "local" = isShopifyConfigured()
  ? "shopify"
  : "local";

export async function listProducts(): Promise<Product[]> {
  if (catalogSource === "shopify") {
    try {
      const list = await shopifyLoadProducts();
      if (list.length > 0) return list;
      console.warn("[catalog] Shopify returned 0 products, falling back to local");
    } catch (err) {
      console.error("[catalog] Shopify fetch failed, falling back to local:", err);
    }
  }
  return localProducts;
}

export async function getProduct(handle: string): Promise<Product | null> {
  if (catalogSource === "shopify") {
    try {
      const p = await shopifyLoadProductByHandle(handle);
      if (p) return p;
    } catch (err) {
      console.error("[catalog] Shopify getProduct failed, falling back to local:", err);
    }
  }
  return localGetProductByHandle(handle) ?? null;
}