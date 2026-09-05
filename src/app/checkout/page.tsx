"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/cart-context";
import { LockIcon, PaymentIcons } from "@/components/trust-icons";
import { DiscountField, type AppliedDiscount } from "@/components/discount-field";
import { CheckoutExtrasForm, type CheckoutExtras } from "@/components/checkout-extras";
import { events } from "@/lib/track";
import { recordOrder } from "@/lib/orders-history";
import { validateCheckout, type FieldErrors } from "@/app/api/checkout/validate";
import { Price } from "@/lib/currency";
import { formatMoney } from "@/lib/format";

export default function CheckoutPage() {
  const { lines, subtotal, clear } = useCart();
  const [hydrated, setHydrated] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [discount, setDiscount] = useState<AppliedDiscount | null>(null);
  const [extras, setExtras] = useState<CheckoutExtras>({
    giftWrap: false,
    giftMessage: "",
    notes: "",
  });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zip: "",
    country: "Italia",
    shipping: "standard" as "standard" | "express",
    payment: "card" as "card" | "paypal" | "klarna",
  });

  useEffect(() => setHydrated(true), []);
  useEffect(() => {
    if (hydrated && lines.length > 0) {
      events.initiateCheckout({
        value: Number(subtotal.amount),
        currency: subtotal.currencyCode,
        items: lines.length,
      });
    }
  }, [hydrated, lines.length]);

  const shippingCost =
    form.shipping === "express"
      ? 8
      : subtotal && Number(subtotal.amount) >= 60
        ? 0
        : 4.9;
  const discountAmount = discount?.amount ?? 0;
  const giftWrapCost = extras.giftWrap ? 4.9 : 0;
  const total =
    Number(subtotal.amount || "0") + shippingCost - discountAmount + giftWrapCost;


  

  if (!hydrated) {
    return (
      <div className="shell py-24 text-center text-ink/60">
        Caricamento...
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="shell max-w-3xl py-24 text-center">
        <h1 className="font-serif text-4xl">Il carrello è vuoto.</h1>
        <p className="mt-4 text-ink/70">
          Aggiungi un Beauty Mirror Case prima di procedere.
        </p>
        <Link
          href="/products"
          className="mt-8 inline-flex min-h-12 w-full items-center justify-center bg-charcoal px-8 text-xs uppercase tracking-[0.22em] text-cream transition-colors hover:bg-burgundy sm:w-auto"
        >
          Scopri la collezione
        </Link>
      </div>
    );
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errors = validateCheckout({
      email: form.email,
      firstName: form.firstName,
      lastName: form.lastName,
      address: form.address,
      city: form.city,
      zip: form.zip,
      country: form.country,
    });
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      // Scroll the first errored field into view
      const firstKey = Object.keys(errors)[0];
      if (typeof document !== "undefined") {
        const el = document.querySelector(`[name="${firstKey}"]`);
        if (el && "scrollIntoView" in el) {
          (el as HTMLElement).scrollIntoView({ behavior: "smooth", block: "center" });
          (el as HTMLElement).focus();
        }
      }
      return;
    }
    setFieldErrors({});
    setSubmitting(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          firstName: form.firstName,
          lastName: form.lastName,
          address: form.address,
          city: form.city,
          zip: form.zip,
          country: form.country,
          shipping: form.shipping,
          payment: form.payment,
          giftWrap: extras.giftWrap,
          giftMessage: extras.giftMessage,
          notes: extras.notes,
          lines: lines.map((l) => ({
            variantId: l.variantId,
            quantity: l.quantity,
            price: l.price,
          })),
        }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as {
          error?: string;
        };
        throw new Error(body.error ?? "Errore durante l ordine");
      }
      const data = (await res.json()) as { orderId: string };
      events.purchase({
        orderId: data.orderId,
        value: Number(data.orderId ? total : 0),
        currency: subtotal.currencyCode,
        items: lines.length,
      });
      recordOrder({
        orderId: data.orderId,
        total: Number(total.toFixed(2)),
        currencyCode: subtotal.currencyCode,
        placedAt: Date.now(),
        items: lines.length,
      });
      clear();
      window.location.assign(`/checkout/success?order=${data.orderId}`);
    } catch (err) {
      setSubmitting(false);
      alert(err instanceof Error ? err.message : "Errore durante l ordine");
    }
  }

  return (
    <div className="shell grid gap-8 pt-8 pb-24 md:pt-12 lg:grid-cols-[1.4fr_1fr] lg:gap-12 lg:pt-16">
      <form onSubmit={submit} className="order-2 space-y-8 md:space-y-10 lg:order-1">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl">Checkout</h1>
          <p className="mt-2 text-sm text-ink/60">
            Pagamenti sicuri via Stripe · Crittografia SSL
          </p>
        </div>

        <Section title="Contatto">
          <Input
            label="Email"
            required
            type="email"
            name="email"
            value={form.email}
            onChange={(v) => setForm({ ...form, email: v })}
            error={fieldErrors.email}
          />
        </Section>

        <Section title="Spedizione">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="Nome"
              required
              name="firstName"
              value={form.firstName}
              onChange={(v) => setForm({ ...form, firstName: v })}
              error={fieldErrors.firstName}
            />
            <Input
              label="Cognome"
              required
              name="lastName"
              value={form.lastName}
              onChange={(v) => setForm({ ...form, lastName: v })}
              error={fieldErrors.lastName}
            />
          </div>
          <Input
            label="Indirizzo"
            required
            name="address"
            value={form.address}
            onChange={(v) => setForm({ ...form, address: v })}
            error={fieldErrors.address}
          />
          <div className="grid gap-4 sm:grid-cols-3">
            <Input
              label="Città"
              required
              name="city"
              value={form.city}
              onChange={(v) => setForm({ ...form, city: v })}
              error={fieldErrors.city}
            />
            <Input
              label="CAP"
              required
              name="zip"
              value={form.zip}
              onChange={(v) => setForm({ ...form, zip: v })}
              error={fieldErrors.zip}
            />
            <Select
              label="Paese"
              value={form.country}
              onChange={(v) => setForm({ ...form, country: v })}
              options={["Italia", "Francia", "Germania", "Spagna", "Regno Unito", "Stati Uniti", "Emirati Arabi Uniti"]}
            />
          </div>

          <div className="mt-6 space-y-3">
            <ShippingOption
              selected={form.shipping === "standard"}
              onSelect={() => setForm({ ...form, shipping: "standard" })}
              title="Standard"
              eta="3-5 giorni lavorativi"
              cost={
                Number(subtotal.amount) >= 60
                  ? "Gratuita"
                  : formatMoney({ amount: "4.90", currencyCode: "EUR" })
              }
            />
            <ShippingOption
              selected={form.shipping === "express"}
              onSelect={() => setForm({ ...form, shipping: "express" })}
              title="Express"
              eta="1-2 giorni lavorativi"
              cost={formatMoney({ amount: "8.00", currencyCode: "EUR" })}
            />
          </div>
        </Section>

<Section title="Regalo e note">
          <CheckoutExtrasForm value={extras} onChange={setExtras} />
        </Section>

        <Section title="Codice sconto">
          <DiscountField
            subtotal={Number(subtotal.amount || "0")}
            currencyCode="EUR"
            onApply={setDiscount}
          />
        </Section>

        <Section title="Pagamento">
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { id: "card", label: "Carta di credito" },
              { id: "paypal", label: "PayPal" },
              { id: "klarna", label: "Klarna" },
            ].map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() =>
                  setForm({ ...form, payment: opt.id as typeof form.payment })
                }
                className={`border rounded-md py-3 text-xs uppercase tracking-[0.18em] transition-colors ${
                  form.payment === opt.id
                    ? "border-charcoal"
                    : "border-mist hover:border-charcoal/60"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <p className="mt-4 text-xs text-ink/60 inline-flex items-center gap-2">
            <LockIcon className="h-4 w-4" />
            Pagamento elaborato in modo sicuro. I dati della carta non vengono
            mai salvati sui nostri server.
          </p>
          <PaymentIcons className="mt-4" />
        </Section>

        <button
          type="submit"
          disabled={submitting}
          className="btn-press sticky bottom-3 z-10 flex min-h-14 w-full items-center justify-center bg-charcoal text-xs uppercase tracking-[0.22em] text-cream transition-colors hover:bg-burgundy disabled:opacity-50"
        >
          {submitting ? "Elaborazione..." : `Conferma ordine · ${formatMoney({ amount: total.toFixed(2), currencyCode: "EUR" })}`}
        </button>
      </form>

      <aside className="order-1 self-start rounded-md bg-cream-deep p-5 md:p-8 lg:sticky lg:top-28 lg:order-2">
        <p className="mb-4 font-serif text-xl md:mb-6 md:text-2xl">Riepilogo</p>
        <ul className="space-y-4">
          {lines.map((line) => (
            <li key={line.variantId} className="flex gap-4">
              <div className="relative h-16 w-16 rounded bg-cream shrink-0 overflow-hidden">
                <Image src={line.image} alt={line.productTitle} fill sizes="64px" className="object-cover" />
              </div>
              <div className="flex-1 text-sm">
                <p>{line.productTitle}</p>
                <p className="text-xs uppercase tracking-[0.18em] text-ink/60">
                  {line.variantTitle} · ×{line.quantity}
                </p>
              </div>
              <p className="text-sm">
                {formatMoney({
                  amount: (Number(line.price.amount) * line.quantity).toFixed(2),
                  currencyCode: line.price.currencyCode,
                })}
              </p>
            </li>
          ))}
        </ul>
        <hr className="my-6 border-mist/60" />
        <SummaryRow label="Subtotale" value={formatMoney(subtotal)} />
        {giftWrapCost > 0 && (
            <SummaryRow
              label="Confezione regalo"
              value={<Price amountEUR={giftWrapCost} /> as unknown as string}
            />
          )}
          <SummaryRow
          label="Spedizione"
          value={shippingCost === 0 ? "Gratuita" : formatMoney({ amount: shippingCost.toFixed(2), currencyCode: "EUR" })}
        />
        <SummaryRow label="Totale" value={formatMoney({ amount: total.toFixed(2), currencyCode: "EUR" })} large />
      </aside>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-4 font-serif text-xl md:text-2xl">{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function FormFieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p role="alert" className="mt-1 text-xs text-burgundy">{msg}</p>;
}

function Input({
  label,
  value,
  onChange,
  type = "text",
  required,
  name,
  error,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  name?: string;
  error?: string;
}) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-[0.22em] text-ink/60 mb-1">
        {label}
      </span>
      <input
        type={type}
        required={required}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`min-h-12 w-full rounded-md border bg-cream px-4 text-base focus:border-charcoal focus:outline-none md:min-h-11 md:text-sm ${
          error ? "border-burgundy" : "border-mist"
        }`}
      />
      <FormFieldError msg={error} />
    </label>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-[0.22em] text-ink/60 mb-1">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-12 w-full rounded-md border border-mist bg-cream px-4 text-base focus:border-charcoal focus:outline-none md:min-h-11 md:text-sm"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

function ShippingOption({
  selected,
  onSelect,
  title,
  eta,
  cost,
}: {
  selected: boolean;
  onSelect: () => void;
  title: string;
  eta: string;
  cost: string;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full flex items-center justify-between border rounded-md p-4 transition-colors ${
        selected ? "border-charcoal" : "border-mist hover:border-charcoal/60"
      }`}
    >
      <div>
        <p className="font-serif text-lg">{title}</p>
        <p className="text-xs text-ink/60">{eta}</p>
      </div>
      <p className="text-sm">{cost}</p>
    </button>
  );
}

function SummaryRow({
  label,
  value,
  large = false,
}: {
  label: string;
  value: string;
  large?: boolean;
}) {
  return (
    <div className="flex justify-between py-1.5">
      <span className="text-sm text-ink/70">{label}</span>
      <span className={large ? "text-2xl" : "text-sm"}>{value}</span>
    </div>
  );
}
