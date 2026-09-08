#!/usr/bin/env python3
"""Recolor CAELIA packshot leather to an exact brand hex.

Keeps marble, gold clasp, lighting, logo placement. 1:1 clone, new leather color.
"""

from __future__ import annotations

import sys
from collections import deque
from pathlib import Path

import numpy as np
from PIL import Image

# Brand book
BERRY = "#973851"
ROSA = "#ffddde"
CACAO = "#604c46"
CREMA = "#dfc0b4"
BURGUNDY = "#4a0e16"


def hex_to_rgb(h: str) -> np.ndarray:
    h = h.lstrip("#")
    return np.array([int(h[i : i + 2], 16) for i in (0, 2, 4)], dtype=np.float32)


def srgb_to_linear(c: np.ndarray) -> np.ndarray:
    x = c / 255.0
    return np.where(x <= 0.04045, x / 12.92, ((x + 0.055) / 1.055) ** 2.4)


def linear_to_srgb(c: np.ndarray) -> np.ndarray:
    c = np.clip(c, 0, None)
    s = np.where(c <= 0.0031308, 12.92 * c, 1.055 * np.power(c, 1.0 / 2.4) - 0.055)
    return np.clip(s * 255.0, 0, 255)


def rgb_to_lab(rgb: np.ndarray) -> np.ndarray:
    lin = srgb_to_linear(rgb)
    m = np.array(
        [
            [0.4124564, 0.3575761, 0.1804375],
            [0.2126729, 0.7151522, 0.0721750],
            [0.0193339, 0.1191920, 0.9503041],
        ]
    )
    xyz = lin @ m.T
    # D65 white
    w = np.array([0.95047, 1.0, 1.08883])
    t = xyz / w
    d = 6 / 29
    f = np.where(t > d**3, np.cbrt(t), t / (3 * d * d) + 4 / 29)
    L = 116 * f[..., 1] - 16
    a = 500 * (f[..., 0] - f[..., 1])
    b = 200 * (f[..., 1] - f[..., 2])
    return np.stack([L, a, b], axis=-1)


def lab_to_rgb(lab: np.ndarray) -> np.ndarray:
    L, a, b = lab[..., 0], lab[..., 1], lab[..., 2]
    fy = (L + 16) / 116
    fx = a / 500 + fy
    fz = fy - b / 200
    d = 6 / 29

    def finv(f):
        return np.where(f > d, f**3, 3 * d * d * (f - 4 / 29))

    xyz = np.stack([finv(fx) * 0.95047, finv(fy) * 1.0, finv(fz) * 1.08883], axis=-1)
    m = np.array(
        [
            [3.2404542, -1.5371385, -0.4985314],
            [-0.9692660, 1.8760108, 0.0415560],
            [0.0556434, -0.2040259, 1.0572252],
        ]
    )
    lin = xyz @ m.T
    return linear_to_srgb(lin)


def flood_background(arr: np.ndarray, luma_min: float = 188, sat_max: float = 0.28) -> np.ndarray:
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


def gold_mask(arr: np.ndarray, leather: np.ndarray) -> np.ndarray:
    r, g, b = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2]
    y = 0.2126 * r + 0.7152 * g + 0.0722 * b
    # warm gold / brass clasp
    return leather & (r > 120) & (g > 90) & (r > b + 18) & (g > b + 8) & (y > 90) & (r + g > 2.15 * b)


def recolor(src: Path, dst: Path, target_hex: str, luma_min: float = 188) -> None:
    im = Image.open(src).convert("RGB")
    arr = np.asarray(im).astype(np.float32)
    bg = flood_background(arr, luma_min=luma_min)
    product = ~bg
    gold = gold_mask(arr, product)
    leather = product & ~gold

    if leather.sum() < 200:
        raise SystemExit(f"leather mask too small on {src}: {leather.sum()}")

    lab = rgb_to_lab(arr)
    target_rgb = hex_to_rgb(target_hex)
    target_lab = rgb_to_lab(target_rgb.reshape(1, 1, 3))[0, 0]

    core = leather.copy()
    L = lab[..., 0]
    # ignore crushed blacks / blown specs for mean
    core &= (L > 8) & (L < 92)
    if core.sum() < 200:
        core = leather

    mean = lab[core].mean(axis=0)
    # scale lightness so mean leather L matches target, keep local contrast
    l_scale = float(np.clip(target_lab[0] / max(mean[0], 1.0), 0.35, 3.4))
    a_shift = target_lab[1] - mean[1]
    b_shift = target_lab[2] - mean[2]

    out = lab.copy()
    out[leather, 0] = np.clip(L[leather] * l_scale, 0, 100)
    # keep a bit of local chroma variation
    out[leather, 1] = lab[leather, 1] - mean[1] + target_lab[1]
    out[leather, 2] = lab[leather, 2] - mean[2] + target_lab[2]

    rgb = lab_to_rgb(out)
    # restore marble + gold from original
    rgb[bg] = arr[bg]
    rgb[gold] = arr[gold]
    # keep the brightest leather specular mostly intact so it still reads as leather
    y = 0.2126 * arr[:, :, 0] + 0.7152 * arr[:, :, 1] + 0.0722 * arr[:, :, 2]
    spec = leather & (y > 235)
    rgb[spec] = 0.45 * rgb[spec] + 0.55 * arr[spec]

    Image.fromarray(np.clip(rgb, 0, 255).astype(np.uint8)).save(
        dst, quality=92, optimize=True, subsampling=1
    )
    # report achieved mean on leather
    achieved = rgb[core].mean(axis=0)
    print(
        f"{dst.name}: leather {leather.mean():.1%} gold {gold.mean():.1%}  "
        f"mean {mean.round(1)} → target LAB {target_lab.round(1)}  "
        f"achieved RGB {achieved.round(1)} vs {target_rgb}  Lscale {l_scale:.2f}"
    )


def main() -> None:
    root = Path("/workspace/public/campaign")
    jobs = [
        (root / "packshot-burgundy.jpg", root / "packshot-berry.jpg", BERRY, 188),
        (root / "packshot-cacao.jpg", root / "packshot-cacao-exact.jpg", CACAO, 175),
        (root / "packshot-crema.jpg", root / "packshot-rosa.jpg", ROSA, 200),
        (root / "packshot-burgundy.jpg", root / "packshot-burgundy-exact.jpg", BURGUNDY, 188),
        (root / "packshot-crema.jpg", root / "packshot-crema-exact.jpg", CREMA, 200),
        (root / "splash-burgundy-drip.jpg", root / "splash-berry-drip.jpg", BERRY, 40),
        (root / "splash-burgundy-pour.jpg", root / "splash-berry-pour.jpg", BERRY, 40),
        (root / "hero-splash-crema.jpg", root / "hero-splash-rosa.jpg", ROSA, 40),
        (root / "splash-crema-open.jpg", root / "splash-rosa-open.jpg", ROSA, 40),
        (root / "packshot-burgundy-upright.jpg", root / "packshot-berry-upright.jpg", BERRY, 170),
        (root / "packshot-crema-upright.jpg", root / "packshot-rosa-upright.jpg", ROSA, 190),
    ]
    for src, dst, hex_, luma in jobs:
        if not src.exists():
            print(f"skip missing {src}")
            continue
        recolor(src, dst, hex_, luma_min=luma)


if __name__ == "__main__":
    sys.exit(main())
