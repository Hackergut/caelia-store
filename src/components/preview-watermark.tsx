import { useEffect } from "react";
import { consumePaidUnlockFromUrl, useLock } from "@/lib/lock";

/* Remove this component at product delivery. */

export function PreviewWatermark() {
  const unlocked = useLock((s) => s.unlocked);

  useEffect(() => {
    consumePaidUnlockFromUrl();
  }, []);

  if (unlocked) return null;
  return <div className="preview-watermark" aria-hidden />;
}
