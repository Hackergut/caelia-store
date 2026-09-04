import type { MetadataRoute } from "next";
import { products } from "@/lib/products";
import { journalPosts } from "@/lib/journal";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://caelia.com";
  const now = new Date();
  const paths = [
    "/",
    "/products",
    "/about",
    "/journal",
    "/faq",
    "/shipping",
    "/returns",
    "/contact",
    "/cookies",
    "/privacy",
    "/terms",
    "/press",
    "/sostenibilita",
    "/stores",
    "/care",
    "/wholesale",
    "/gift-cards",
    "/login",
    "/register",
    "/account",
    "/search",
    "/wishlist",
  ];
  const staticRoutes: MetadataRoute.Sitemap = paths.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: path === "/" || path === "/products" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path === "/products" ? 0.9 : 0.5,
  }));
  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${base}/products/${p.handle}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  }));
  const journalRoutes: MetadataRoute.Sitemap = journalPosts.map((p) => ({
    url: `${base}/journal/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));
  return [...staticRoutes, ...productRoutes, ...journalRoutes];
}
