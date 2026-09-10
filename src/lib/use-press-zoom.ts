import { useEffect, useRef, type RefObject } from "react";

function clamp(n: number, a: number, b: number) {
  return Math.min(b, Math.max(a, n));
}

type Opts = {
  src: string;
  onPoint?: (x: number, y: number) => void;
  mode?: "loupe" | "scale";
};

export function usePressZoom(
  stageRef: RefObject<HTMLElement | null>,
  lensRef: RefObject<HTMLElement | null>,
  opts: Opts,
) {
  const { src, onPoint, mode = "loupe" } = opts;
  const pointRef = useRef(onPoint);
  pointRef.current = onPoint;

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const warm = new Image();
    warm.src = src;

    let pid: number | null = null;
    let raf = 0;
    let latest: PointerEvent | null = null;

    const paint = (e: PointerEvent) => {
      const r = stage.getBoundingClientRect();
      if (!r.width || !r.height) return;
      const x = clamp((e.clientX - r.left) / r.width, 0, 1);
      const y = clamp((e.clientY - r.top) / r.height, 0, 1);
      const touch = e.pointerType !== "mouse";
      const lens = lensRef.current;

      if (mode === "scale") {
        const target = lens ?? (stage.querySelector("img") as HTMLElement | null);
        if (!target) return;
        target.style.transformOrigin = `${x * 100}% ${y * 100}%`;
        target.style.transform = "scale(2.35)";
        target.style.transition = "none";
        target.style.willChange = "transform";
      } else if (lens) {
        const L = touch
          ? Math.round(clamp(r.width * 0.44, 136, 176))
          : Math.round(clamp(r.width * 0.4, 176, 268));
        const zoom = touch ? 2.85 : 3.35;
        const bg = r.width * zoom;
        lens.style.width = `${L}px`;
        lens.style.height = `${L}px`;
        lens.style.backgroundImage = `url("${src}")`;
        lens.style.backgroundRepeat = "no-repeat";
        lens.style.backgroundSize = `${bg}px ${bg}px`;
        lens.style.backgroundPosition = `${L / 2 - x * bg}px ${L / 2 - y * bg}px`;
        lens.style.opacity = "1";
        if (touch) {
          let left = e.clientX - L / 2;
          let top = e.clientY - L - 22;
          left = clamp(left, 8, window.innerWidth - L - 8);
          if (top < 8) top = e.clientY + 22;
          top = clamp(top, 8, window.innerHeight - L - 8);
          lens.style.position = "fixed";
          lens.style.left = `${left}px`;
          lens.style.top = `${top}px`;
          lens.style.transform = "none";
          lens.style.zIndex = "80";
        } else {
          lens.style.position = "absolute";
          lens.style.left = `${x * 100}%`;
          lens.style.top = `${y * 100}%`;
          lens.style.transform = "translate(-50%, -50%)";
          lens.style.zIndex = "30";
        }
      }
      pointRef.current?.(x * 100, y * 100);
    };

    const hide = () => {
      pid = null;
      if (mode === "scale") {
        const target = lensRef.current ?? (stage.querySelector("img") as HTMLElement | null);
        if (target) {
          target.style.transition = "transform 380ms cubic-bezier(0.23,1,0.32,1)";
          target.style.transform = "scale(1)";
        }
      } else if (lensRef.current) {
        lensRef.current.style.opacity = "0";
      }
    };

    const tick = () => {
      raf = 0;
      if (latest) paint(latest);
    };

    const down = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      e.preventDefault();
      pid = e.pointerId;
      try {
        stage.setPointerCapture(e.pointerId);
      } catch {
        /* Safari */
      }
      latest = e;
      paint(e);
    };

    const move = (e: PointerEvent) => {
      if (e.pointerType === "mouse") {
        latest = e;
        if (!raf) raf = requestAnimationFrame(tick);
        return;
      }
      if (pid !== e.pointerId) return;
      e.preventDefault();
      latest = e;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const up = (e: PointerEvent) => {
      if (e.pointerType === "mouse") return;
      if (pid !== null && e.pointerId !== pid) return;
      hide();
    };

    const leave = (e: PointerEvent) => {
      if (e.pointerType === "mouse") hide();
    };

    const opts = { passive: false } as AddEventListenerOptions;
    stage.addEventListener("pointerdown", down, opts);
    stage.addEventListener("pointermove", move, opts);
    stage.addEventListener("pointerup", up);
    stage.addEventListener("pointercancel", up);
    stage.addEventListener("lostpointercapture", up);
    stage.addEventListener("pointerleave", leave);
    const block = (ev: Event) => ev.preventDefault();
    stage.addEventListener("contextmenu", block);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      stage.removeEventListener("pointerdown", down, opts);
      stage.removeEventListener("pointermove", move, opts);
      stage.removeEventListener("pointerup", up);
      stage.removeEventListener("pointercancel", up);
      stage.removeEventListener("lostpointercapture", up);
      stage.removeEventListener("pointerleave", leave);
      stage.removeEventListener("contextmenu", block);
    };
  }, [src, mode, stageRef, lensRef]);
}
