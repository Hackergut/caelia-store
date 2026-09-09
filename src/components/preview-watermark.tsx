import { useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { hydrateLock, useLock } from "@/lib/lock";

/* Remove this component at product delivery. */

const HIDE = new Set(["/consegnato", "/paid", "/paga", "/download"]);

export function PreviewWatermark() {
  const unlocked = useLock((s) => s.unlocked);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    hydrateLock();
  }, [pathname]);

  if (unlocked || HIDE.has(pathname)) return null;
  return <div className="preview-watermark" aria-hidden />;
}
