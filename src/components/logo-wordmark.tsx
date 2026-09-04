"use client";

import { Tenor_Sans } from "next/font/google";

const tenor = Tenor_Sans({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  fallback: ["Arial", "Helvetica", "sans-serif"],
});

export function LogoWordmark({
  className = "",
}: {
  className?: string;
}) {
  return (
    <span
      className={`${tenor.className} ${className}`}
      style={{
        fontFamily: '"Tenor Sans", Arial, Helvetica, sans-serif',
        fontWeight: 400,
        fontStyle: "normal",
        letterSpacing: "0.32em",
        textTransform: "uppercase",
        fontVariant: "normal",
        fontFeatureSettings: "normal",
      }}
    >
      CAELIA
    </span>
  );
}
