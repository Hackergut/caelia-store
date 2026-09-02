import { NextResponse } from "next/server";

function buildOrderEmail(args: {
  orderId: string;
  firstName?: string;
  total: number;
  currencyCode: "EUR" | "USD" | "GBP";
  lines: Array<{ variantId: string; quantity: number; price: { amount: string; currencyCode: "EUR" } }>;
  giftWrap: boolean;
  giftMessage: string;
}): string {
  const lineRows = args.lines
    .map(
      (l) =>
        `<tr><td style="padding:8px 0">${l.variantId}</td><td style="padding:8px 0;text-align:center">x${l.quantity}</td><td style="padding:8px 0;text-align:right">€${(Number(l.price.amount) * l.quantity).toFixed(2)}</td></tr>`,
    )
    .join("");
  return `<!doctype html><html><body style="font-family:Georgia,serif;background:#f7f1ea;color:#2a2624;padding:32px">
    <div style="max-width:560px;margin:0 auto;background:#fff;padding:32px;border-radius:8px">
      <p style="letter-spacing:0.32em;text-transform:uppercase;font-size:11px;color:#b8655f;margin:0">CAELIA</p>
      <h1 style="font-size:32px;line-height:1.1;margin:8px 0 0">Grazie, ${args.firstName || "amica"}.</h1>
      <p style="margin-top:16px">Il tuo ordine <strong>${args.orderId}</strong> è in preparazione. Ti abbiamo inviato questa email come conferma.</p>
      <table style="width:100%;border-collapse:collapse;margin-top:24px">${lineRows}</table>
      <p style="text-align:right;font-size:24px;margin-top:16px"><strong>€${args.total.toFixed(2)}</strong></p>
      ${args.giftWrap ? '<p style="margin-top:8px;color:#b8655f">Confezione regalo inclusa.</p>' : ''}
      ${args.giftMessage ? '<p style="margin-top:12px;font-style:italic">"' + args.giftMessage + '"</p>' : ''}
      <p style="margin-top:24px;font-size:14px;color:#7a716a">Riceverai il numero di tracciamento non appena il pacco lascera il nostro magazzino. Per qualsiasi cosa, scrivici a ciao@caelia.com.</p>
      <p style="margin-top:32px;font-style:italic">Aprire. Ritoccare. Ripartire.</p>
    </div>
  </body></html>`;
}

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
  discountCode?: string;
  giftWrap?: boolean;
  giftMessage?: string;
  notes?: string;
  lines?: Array<{
    variantId: string;
    quantity: number;
    price: { amount: string; currencyCode: "EUR" };
  }>;
};

const DISCOUNT_CODES: Record<string, number> = {
  CAELIA10: 10,
  WELCOME: 10,
  COMEBACK: 15,
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
  const discountPct = payload.discountCode
    ? DISCOUNT_CODES[payload.discountCode.toUpperCase()] ?? 0
    : 0;
  const discountAmount = Number((subtotal * discountPct / 100).toFixed(2));
  const giftWrapCost = payload.giftWrap ? 4.9 : 0;
  const total = Number(
    (subtotal + shipping - discountAmount + giftWrapCost).toFixed(2),
  );

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

  // Try to send a transactional order-confirmation email via Resend.
  // Falls back to a no-op (just logs) if RESEND_API_KEY is not set, so
  // the local-dev experience is unchanged.
  if (process.env.RESEND_API_KEY && payload.email) {
    try {
      const emailHtml = buildOrderEmail({
        orderId,
        firstName: payload.firstName,
        total,
        currencyCode: payload.lines[0].price.currencyCode,
        lines: payload.lines,
        giftWrap: payload.giftWrap === true,
        giftMessage: payload.giftMessage ?? "",
      });
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "CAELIA <ordini@caelia.com>",
          to: payload.email,
          subject: `CAELIA — conferma ordine ${orderId}`,
          html: emailHtml,
        }),
      });
      if (!res.ok) {
        console.warn("[CAELIA email] Resend error", res.status, await res.text());
      }
    } catch (err) {
      console.warn("[CAELIA email] failed", err);
    }
  }

  return NextResponse.json({
    ok: true,
    orderId,
    total: total.toFixed(2),
    currencyCode: payload.lines[0].price.currencyCode,
    discountCode: discountPct > 0 ? payload.discountCode : undefined,
    discountAmount: discountPct > 0 ? discountAmount : undefined,
    giftWrap: payload.giftWrap === true,
  });
}
