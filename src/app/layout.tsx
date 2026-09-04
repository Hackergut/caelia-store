import type { Metadata, Viewport } from "next";
import { Inter, Tenor_Sans } from "next/font/google";
import { CartProvider } from "@/lib/cart-context";
import { WishlistProvider } from "@/lib/wishlist-context";
import { CurrencyProvider } from "@/lib/currency";
import { SiteChrome } from "@/components/site-chrome";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Logo/wordmark face — Tenor Sans, used only for the CAELIA logo mark
// (header + footer), never for body or UI copy.
const tenorSans = Tenor_Sans({
  variable: "--font-tenor-sans",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#4a0e16",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "CAELIA — Aprire. Ritoccare. Ripartire.",
    template: "%s · CAELIA",
  },
  description:
    "CAELIA design system: la palette calda cacao/burgundy/rosa, la tipografia Inter e i token di movimento in stile Emil Kowalski dietro il negozio online CAELIA.",
  applicationName: "CAELIA",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="it"
      className={`${inter.variable} ${tenorSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink font-sans">
        <CartProvider>
          <WishlistProvider>
            <CurrencyProvider>
              <SiteChrome>{children}</SiteChrome>
            </CurrencyProvider>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
