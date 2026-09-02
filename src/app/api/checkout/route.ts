import { NextResponse } from "next/server";

type CheckoutPayload = {
  email?: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  city?: string;
  zip?: string;
  country?: string;
  shipping?: "standard" | "express";
  payment?: "card" | "paypal" | "klarna";
  lines?: Array<{
    variantId: string;
    quantity: number;
    price: { amount: string; currencyCode: "EUR" };
  }>;
};

export async function POST(req: Request) {
  let payload: CheckoutPayload;
  try {
    payload = (await req.json()) as CheckoutPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!payload.email || !payload.lines || payload.lines.length === 0) {
    return NextResponse.json(
      { error: "Missing email or lines" },
      { status: 422 },
    );
  }

  const subtotal = payload.lines.reduce(
    (sum, l) => sum + Number(l.price.amount) * l.quantity,
    0,
  );
  const shipping =
    payload.shipping === "express" ? 8 : subtotal >= 60 ? 0 : 4.9;
  const total = subtotal + shipping;

  // In produzione: crea un ordine su Shopify tramite Storefront API o una
  // sessione Stripe Checkout, poi invia l evento a Meta CAPI.
  const orderId = `CAELIA-${Math.floor(Math.random() * 99999)
    .toString()
    .padStart(5, "0")}`;

  console.log("[CAELIA order]", {
    orderId,
    email: payload.email,
    total,
    currency: payload.lines[0].price.currencyCode,
  });

  return NextResponse.json({
    ok: true,
    orderId,
    total: total.toFixed(2),
    currencyCode: payload.lines[0].price.currencyCode,
  });
}
