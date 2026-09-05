"use client";

/** CAELIA wordmark: Tenor Sans, all-caps (stampatello). */
export function LogoWordmark({ className = "" }: { className?: string }) {
  return <span className={`logo-wordmark ${className}`.trim()}>CAELIA</span>;
}
