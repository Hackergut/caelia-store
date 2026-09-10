import { useEffect } from "react";
import { hydrateLock } from "@/lib/lock";

export function PreviewWatermark() {
  useEffect(() => {
    hydrateLock();
  }, []);
  return null;
}
