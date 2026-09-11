import { useEffect, useState } from "react";
import { getConsent, type Consent } from "@/lib/consent";

const GA4 = import.meta.env.VITE_GA4_ID as string | undefined;
const META = import.meta.env.VITE_META_PIXEL as string | undefined;

export function Analytics() {
  const [consent, setConsent] = useState<Consent>("pending");

  useEffect(() => {
    const sync = () => setConsent(getConsent());
    sync();
    window.addEventListener("caelia-consent", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("caelia-consent", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  useEffect(() => {
    if (consent !== "accepted") return;
    if (GA4) {
      const s = document.createElement("script");
      s.async = true;
      s.src = `https://www.googletagmanager.com/gtag/js?id=${GA4}`;
      document.head.appendChild(s);
      const w = window as Window & { dataLayer?: unknown[]; gtag?: (...a: unknown[]) => void };
      w.dataLayer = w.dataLayer || [];
      w.gtag = (...args) => {
        w.dataLayer!.push(args);
      };
      w.gtag("js", new Date());
      w.gtag("config", GA4, { anonymize_ip: true });
    }
    if (META) {
      const s = document.createElement("script");
      s.innerHTML = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${META}');fbq('track','PageView');`;
      document.head.appendChild(s);
    }
  }, [consent]);

  return null;
}
