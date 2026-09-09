import { useLock } from "@/lib/lock";

/* Remove this component at product delivery. */

export function PreviewWatermark() {
  const unlocked = useLock((s) => s.unlocked);
  if (unlocked) return null;
  return <div className="preview-watermark" aria-hidden />;
}
