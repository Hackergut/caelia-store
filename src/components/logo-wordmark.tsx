"use client";

/** CAELIA wordmark: Tenor Sans, all-caps (stampatello). */
export function LogoWordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`logo-wordmark ${className}`}
      style={{
        fontFamily: '"Tenor Sans", "Arial Narrow", Arial, Helvetica, sans-serif',
        fontWeight: 400,
        letterSpacing: "0.34em",
        textTransform: "uppercase",
      }}
    >
      CAELIA
    </span>
  );
}
