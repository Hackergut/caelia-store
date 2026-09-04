import type { Product } from "./types";

type JsonLd = Record<string, unknown> | Array<Record<string, unknown>>;

export function organizationJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "CAELIA",
    alternateName: "CAELIA Beauty Mirror Case",
    url: "https://caelia.com",
    logo: "https://caelia.com/logo.svg",
    description:
      "CAELIA nasce dall incontro di due sorelle, Carla e Giulia, divise da migliaia di chilometri ma unite dallo stesso modo di vivere il mondo.",
    foundingDate: "2026",
    founders: [
      { "@type": "Person", name: "Carla" },
      { "@type": "Person", name: "Giulia" },
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "IT",
      addressLocality: "Milano",
    },
    sameAs: [
      "https://instagram.com/caelia",
      "https://tiktok.com/@caelia",
    ],
  };
}

export function websiteJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "CAELIA",
    url: "https://caelia.com",
    inLanguage: ["it-IT", "en-US"],
    potentialAction: {
      "@type": "SearchAction",
      target: "https://caelia.com/products?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };
}

export function productJsonLd(product: Product): JsonLd {
  const variant = product.variants[0];
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.images.map((i) => i.src),
    sku: variant.sku,
    brand: { "@type": "Brand", name: "CAELIA" },
    category: product.productType,
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: variant.price.currencyCode,
      lowPrice: variant.price.amount,
      highPrice: variant.price.amount,
      offerCount: product.variants.length,
      availability:
        product.variants.some((v) => v.available)
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      seller: { "@type": "Organization", name: "CAELIA" },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "127",
      bestRating: "5",
      worstRating: "1",
    },
  };
}

export function breadcrumbJsonLd(
  items: Array<{ name: string; href: string }>,
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `https://caelia.com${it.href}`,
    })),
  };
}

export function faqJsonLd(
  items: Array<{ question: string; answer: string }>,
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.question,
      acceptedAnswer: { "@type": "Answer", text: it.answer },
    })),
  };
}
