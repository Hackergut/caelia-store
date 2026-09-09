import { useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { consumePaidUnlockFromUrl, useLock } from "@/lib/lock";

/* Remove this component at product delivery. */

const OPEN = new Set(["/consegnato", "/paid", "/paga"]);

export function PreviewWatermark() {
  const unlocked = useLock((s) => s.unlocked);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    consumePaidUnlockFromUrl();
    if (OPEN.has(pathname)) useLock.getState().unlock();
  }, [pathname]);

  if (unlocked || OPEN.has(pathname)) return null;
  return <div className="preview-watermark" aria-hidden />;
}
