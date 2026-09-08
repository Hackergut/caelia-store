#!/usr/bin/env python3
"""Cut marble/studio backgrounds to alpha and compress lifestyle stills."""

from __future__ import annotations

from collections import deque
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path("/workspace/public/campaign")
ATT = Path("/workspace/attachments")


def flood_background(arr: np.ndarray, luma_min: float, sat_max: float) -> np.ndarray:
    h, w = arr.shape[:2]
    r, g, b = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2]
    y = 0.2126 * r + 0.7152 * g + 0.0722 * b
    mx = np.maximum(np.maximum(r, g), b)
    mn = np.minimum(np.minimum(r, g), b)
    sat = np.where(mx > 1.0, (mx - mn) / mx, 0.0)
    bg_like = (y >= luma_min) & (sat <= sat_max)
    visited = np.zeros((h, w), dtype=bool)
    q: deque[tuple[int, int]] = deque()

    def seed(yy: int, xx: int) -> None:
        if bg_like[yy, xx] and not visited[yy, xx]:
            visited[yy, xx] = True
            q.append((yy, xx))

    for xx in range(0, w, 2):
        seed(0, xx)
        seed(h - 1, xx)
    for yy in range(0, h, 2):
        seed(yy, 0)
        seed(yy, w - 1)
    while q:
        yy, xx = q.popleft()
        for dy, dx in ((-1, 0), (1, 0), (0, -1), (0, 1)):
            ny, nx = yy + dy, xx + dx
            if 0 <= ny < h and 0 <= nx < w and not visited[ny, nx] and bg_like[ny, nx]:
                visited[ny, nx] = True
                q.append((ny, nx))
    return visited


def box_blur(a: np.ndarray, k: int = 3, times: int = 2) -> np.ndarray:
    out = a.astype(np.float32)
    kernel = np.ones((k, k), dtype=np.float32) / (k * k)
    pad = k // 2
    for _ in range(times):
        p = np.pad(out, pad, mode="edge")
        acc = np.zeros_like(out)
        for i in range(k):
            for j in range(k):
                acc += p[i : i + out.shape[0], j : j + out.shape[1]] * kernel[i, j]
        out = acc
    return out


def cutout(src: Path, dst: Path, luma_min: float, sat_max: float) -> None:
    im = Image.open(src).convert("RGB")
    arr = np.asarray(im).astype(np.float32)
    bg = flood_background(arr, luma_min=luma_min, sat_max=sat_max)
    keep = ~bg
    if keep.mean() < 0.04 or keep.mean() > 0.92:
        print(f"WARN {src.name}: keep {keep.mean():.1%} — skip")
        return
    alpha = box_blur(keep.astype(np.float32) * 255.0, k=3, times=2)
    alpha = np.clip(alpha, 0, 255).astype(np.uint8)
    rgba = np.dstack([arr.astype(np.uint8), alpha])
    # crop to opaque bounds + pad
    ys, xs = np.where(alpha > 12)
    y0, y1 = max(ys.min() - 12, 0), min(ys.max() + 13, alpha.shape[0])
    x0, x1 = max(xs.min() - 12, 0), min(xs.max() + 13, alpha.shape[1])
    cropped = Image.fromarray(rgba[y0:y1, x0:x1], "RGBA")
    cropped.save(dst, optimize=True)
    print(f"cut {dst.name}: keep {keep.mean():.1%} {cropped.size} {dst.stat().st_size // 1024}KB")


def web(src: Path, dst: Path, max_side: int = 1600, q: int = 84) -> None:
    im = Image.open(src).convert("RGB")
    w, h = im.size
    s = max_side / max(w, h)
    if s < 1:
        im = im.resize((int(w * s), int(h * s)), Image.Resampling.LANCZOS)
    dst.parent.mkdir(parents=True, exist_ok=True)
    im.save(dst, quality=q, optimize=True, subsampling=1)
    print(f"life {dst.name}: {im.size} {dst.stat().st_size // 1024}KB")


def main() -> None:
    ROOT.mkdir(parents=True, exist_ok=True)
    jobs = [
        (ROOT / "packshot-berry.jpg", ROOT / "cut-berry.png", 188, 0.28),
        (ROOT / "packshot-berry-studio.jpg", ROOT / "cut-berry-studio.png", 175, 0.28),
        (ROOT / "packshot-berry-upright.jpg", ROOT / "cut-berry-upright.png", 150, 0.22),
        (ROOT / "packshot-cacao-exact.jpg", ROOT / "cut-cacao.png", 175, 0.28),
        (ROOT / "packshot-rosa.jpg", ROOT / "cut-rosa.png", 200, 0.22),
        (ROOT / "packshot-rosa-upright.jpg", ROOT / "cut-rosa-upright.png", 160, 0.22),
        (ROOT / "packshot-cacao.jpg", ROOT / "cut-cacao-orig.png", 175, 0.28),
    ]
    for src, dst, luma, sat in jobs:
        if src.exists():
            cutout(src, dst, luma, sat)
        else:
            print("missing", src)

    lives = [
        ("WhatsApp Image 2026-09-05 at 23.39.32.jpeg", "life-meadow.jpg", 1800),
        ("WhatsApp Image 2026-09-05 at 23.33.11.jpeg", "life-liner.jpg", 1600),
        ("WhatsApp Image 2026-09-05 at 23.25.48.jpeg", "life-hold.jpg", 1600),
        ("WhatsApp Image 2026-09-05 at 03.46.58.jpeg", "life-vanity.jpg", 1600),
        ("WhatsApp Image 2026-09-05 at 03.53.53.jpeg", "life-portrait.jpg", 1600),
        ("WhatsApp Image 2026-09-05 at 23.23.46.jpeg", "life-flowers.jpg", 1600),
    ]
    for name, dst, side in lives:
        src = ATT / name
        if src.exists():
            web(src, ROOT / dst, max_side=side)
        else:
            print("missing life", name)


if __name__ == "__main__":
    main()
