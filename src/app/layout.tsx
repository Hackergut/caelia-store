import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Fraunces, Inter } from "next/font/google";
import { CartProvider } from "@/lib/cart-context";
import { WishlistProvider } from "@/lib/wishlist-context";
import { SiteChrome } from "@/components/site-chrome";
import { CookieBanner } from "@/components/cookie-banner";
import { Analytics } from "@/components/analytics";
import { ExitIntentModal } from "@/components/exit-intent-modal";
import { organizationJsonLd, websiteJsonLd } from "@/lib/json-ld";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["SOFT", "opsz"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#1f1d1c",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "CAELIA — Aprire. Ritoccare. Ripartire.",
    template: "%s · CAELIA",
  },
  description:
    "CAELIA Beauty Mirror Case: lastuccio compatto con specchio che racchiude matita, gloss e tutto cio che serve per un ritocco veloce. Pensato per chi vive di continuo passaggio.",
  applicationName: "CAELIA",
  metadataBase: new URL("https://caelia.com"),
  keywords: [
    "beauty case",
    "specchio portatile",
    "matita labbra",
    "lip gloss",
    "beauty essentials",
    "CAELIA",
  ],
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: "CAELIA — Aprire. Ritoccare. Ripartire.",
    description:
      "Lastuccio beauty con specchio per le donne che non si fermano. Carla e Giulia, da Los Angeles e Dubai.",
    type: "website",
    locale: "it_IT",
    alternateLocale: ["en_US"],
    images: [{ url: "/og.svg", width: 1200, height: 630, alt: "CAELIA" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CAELIA — Aprire. Ritoccare. Ripartire.",
    description:
      "Lastuccio beauty con specchio per le donne che non si fermano.",
    images: ["/og.svg"],
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="it"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink font-sans">
        <CartProvider>
          <WishlistProvider>
            <SiteChrome>{children}</SiteChrome>
            <CookieBanner />
            <Analytics />
          </WishlistProvider>
        </CartProvider>

        <Script
          id="ld-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd()),
          }}
        />
        <Script
          id="ld-site"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd()),
          }}
        />
      </body>
    </html>
  );
}
