export const SHOP = {
  stripeCheckout: "https://buy.stripe.com/8x2bJ20CBbKE0jk0ecfMA02",
  email: "info@caelia.store",
  domain: "https://caelia-store-x1wb.vercel.app",
  freeFrom: 60,
  italy: 4.9,
  eu: 8.9,
  vat: 22,
} as const;

export const STRIPE_PRICES = {
  "burgundy-caelia": "price_1UEWENLziMO6vZbDMuKMFb0T",
  "crema-caelia": "price_1UEWEeLziMO6vZbDNdowNoMc",
  "cacao-caelia": "price_1UEWEhLziMO6vZbDsIkserRS",
} as const;

export function shippingCost(subtotal: number, zone: "IT" | "EU" = "IT") {
  if (subtotal >= SHOP.freeFrom) return 0;
  return zone === "IT" ? SHOP.italy : SHOP.eu;
}
