import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const email = (body as { email?: string })?.email?.toString().trim() ?? "";
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Email non valida" }, { status: 422 });
  }

  // In produzione: salva su Klaviyo / Mailchimp / Shopify Customer Marketing.
  // Per ora logghiamo solo.
  console.log("[CAELIA newsletter]", email);

  return NextResponse.json({ ok: true });
}
