"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const CONSENT_KEY = "caelia_cookie_consent_v1";

/**
 * Analytics: Vercel Analytics + Meta Pixel + Plausible (optional).
 *
 * Reads consent from localStorage. If consent is missing, defers loading
 * until the CookieBanner stores a value. Only essential / no scripts
 * load by default.
 */
export function Analytics() {
  const [ready, setReady] = useState(false);
  const [consent, setConsent] = useState<"all" | "essential-only" | null>(
    null,
  );

  useEffect(() => {
    try {
      const v = window.localStorage.getItem(CONSENT_KEY) as
        | "all"
        | "essential-only"
        | null;
      if (v) {
        setConsent(v);
        setReady(true);
      }
    } catch {
      // ignore
    }

    function onConsent(e: Event) {
      const detail = (e as CustomEvent<"all" | "essential-only">).detail;
      setConsent(detail);
      setReady(true);
    }
    window.addEventListener("caelia:consent", onConsent);
    return () => window.removeEventListener("caelia:consent", onConsent);
  }, []);

  if (!ready || consent !== "all") return null;

  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  return (
    <>
      {pixelId ? (
        <>
          <Script id="meta-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${pixelId}');fbq('track','PageView');`}
          </Script>
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height="1"
              width="1"
              alt=""
              src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
            />
          </noscript>
        </>
      ) : null}
    </>
  );
}
