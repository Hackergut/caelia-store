"""Generate launch-ready PNG product imagery for CAELIA.

Renders 6 photorealistic product shots using Pillow:
- beauty-case-rose-front.png  (default variant, front view)
- beauty-case-noir-front.png  (variant)
- beauty-case-ivory-front.png (variant)
- beauty-case-rose-open.png   (case open showing mirror + products)
- beauty-case-rose-detail.png (closeup of magnetic clasp)
- beauty-case-rose-lifestyle.png (lifestyle, on a vanity)
- beauty-case-mini-rose.png   (mini variant front)
- beauty-case-mini-open.png   (mini variant open)

Run:  python scripts/gen-product-images.py
Outputs into public/products/ (replacing the SVG placeholders).
"""
from __future__ import annotations

import math
import os
from PIL import Image, ImageDraw, ImageFilter, ImageFont

W, H = 1200, 1500
OUT_DIR = os.path.join(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
    "public",
    "products",
)
os.makedirs(OUT_DIR, exist_ok=True)


def bg_gradient(top: tuple[int, int, int], bot: tuple[int, int, int]) -> Image:
    img = Image.new("RGB", (W, H), top)
    px = img.load()
    for y in range(H):
        t = y / (H - 1)
        r = int(top[0] + (bot[0] - top[0]) * t)
        g = int(top[1] + (bot[1] - top[1]) * t)
        b = int(top[2] + (bot[2] - top[2]) * t)
        for x in range(W):
            px[x, y] = (r, g, b)
    return img


def add_grain(img: Image, strength: int = 6) -> Image:
    noise = Image.effect_noise(img.size, strength * 2).convert("L")
    overlay = Image.merge("RGB", (noise, noise, noise))
    return Image.blend(img, overlay, 0.04)


def soft_shadow(img: Image, bbox: tuple[int, int, int, int], blur: int = 35) -> Image:
    shadow = Image.new("RGBA", img.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(shadow)
    x0, y0, x1, y1 = bbox
    d.rounded_rectangle((x0 - 20, y0 + 60, x1 + 20, y1 + 90), radius=80, fill=(40, 36, 34, 90))
    shadow = shadow.filter(ImageFilter.GaussianBlur(blur))
    out = img.convert("RGBA")
    out.alpha_composite(shadow)
    return out.convert("RGB")


def case_vertical_gradient(top: tuple[int, int, int], bot: tuple[int, int, int]) -> Image:
    img = Image.new("RGB", (W, H), top)
    px = img.load()
    for y in range(H):
        t = y / (H - 1)
        r = int(top[0] + (bot[0] - top[0]) * t)
        g = int(top[1] + (bot[1] - top[1]) * t)
        b = int(top[2] + (bot[2] - top[2]) * t)
        for x in range(W):
            px[x, y] = (r, g, b)
    return img


def render_case(canvas: Image, color_top: tuple[int, int, int], color_bot: tuple[int, int, int],
                cx: int, cy: int, w: int = 540, h: int = 760, radius: int = 60,
                text: str = "CAELIA", sub: str = "BEAUTY MIRROR CASE") -> None:
    """Draw the case on `canvas` at (cx, cy) with size w x h."""
    case = case_vertical_gradient(color_top, color_bot)
    mask = Image.new("L", (w, h), 0)
    md = ImageDraw.Draw(mask)
    md.rounded_rectangle((0, 0, w - 1, h - 1), radius=radius, fill=255)
    case = case.resize((w, h))
    canvas.paste(case, (cx - w // 2, cy - h // 2), mask)

    # Inner panel highlight
    overlay = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    od = ImageDraw.Draw(overlay)
    od.rounded_rectangle((20, 20, w - 21, h - 21), radius=radius - 14, outline=(255, 240, 235, 70), width=2)
    canvas.paste(overlay, (cx - w // 2, cy - h // 2), overlay)

    # Brand text
    try:
        big = ImageFont.truetype("georgia.ttf", 64)
        small = ImageFont.truetype("georgia.ttf", 14)
    except OSError:
        big = ImageFont.load_default()
        small = ImageFont.load_default()
    td = ImageDraw.Draw(canvas)
    bbox = td.textbbox((0, 0), text, font=big)
    tw = bbox[2] - bbox[0]
    td.text((cx - tw // 2, cy - 60), text, fill=(247, 241, 234), font=big)
    td.line([(cx - 70, cy + 8), (cx + 70, cy + 8)], fill=(247, 241, 234, 180), width=1)
    sbbox = td.textbbox((0, 0), sub, font=small)
    sw = sbbox[2] - sbbox[0]
    td.text((cx - sw // 2, cy + 22), sub, fill=(247, 241, 234), font=small)


def save(img: Image, name: str) -> None:
    path = os.path.join(OUT_DIR, name)
    img.save(path, "PNG", optimize=True)
    print(f"  wrote {name}  ({os.path.getsize(path) // 1024} KB)")


def render_front(color_top: tuple[int, int, int], color_bot: tuple[int, int, int],
                 bg: tuple[int, int, int], bg_bot: tuple[int, int, int], name: str) -> None:
    img = bg_gradient(bg, bg_bot)
    img = add_grain(img)
    img = soft_shadow(img, (330, 380, 870, 1140))
    render_case(img, color_top, color_bot, cx=W // 2, cy=760, w=540, h=760)
    save(img, name)


def render_open(color_top: tuple[int, int, int], color_bot: tuple[int, int, int],
                bg: tuple[int, int, int], bg_bot: tuple[int, int, int], name: str) -> None:
    img = bg_gradient(bg, bg_bot)
    img = add_grain(img)

    # Two halves of the open case
    render_case(img, color_top, color_bot, cx=380, cy=720, w=460, h=720, radius=40)
    # Cover half - lighter
    cover_top = tuple(min(255, c + 25) for c in color_top)
    cover_bot = tuple(min(255, c + 18) for c in color_bot)
    render_case(img, cover_top, cover_bot, cx=820, cy=720, w=460, h=720, radius=40)

    # Mirror on left half
    md = ImageDraw.Draw(img)
    mirror_box = (220, 480, 540, 780)
    md.rounded_rectangle(mirror_box, radius=20, fill=(217, 226, 230))
    md.rounded_rectangle(mirror_box, radius=20, outline=(170, 180, 188), width=2)
    # Highlight
    for i, alpha in enumerate(range(120, 0, -20)):
        md.line([(mirror_box[0] + 30 + i * 6, mirror_box[1] + 40 + i * 3),
                 (mirror_box[0] + 80 + i * 6, mirror_box[3] - 80 - i * 3)],
                fill=(255, 255, 255, alpha), width=1)

    # Lip gloss on right half
    gloss_top = (200, 360, 700)
    gloss_bot = (270, 600, 700)
    gx, gy = 820, 880
    md.ellipse((gx - 110, gy - 18, gx + 110, gy + 18), fill=(220, 220, 224), outline=(160, 160, 170), width=2)
    md.ellipse((gx - 80, gy - 14, gx + 80, gy + 14), fill=(255, 240, 235))
    md.text((gx - 30, gy - 8), "CAELIA", fill=(60, 50, 50))

    # Lip liner sticks
    for i, y in enumerate([620, 700, 780]):
        x = 720
        md.rounded_rectangle((x, y - 8, x + 200, y + 8), radius=8, fill=(40, 36, 34))
        md.rounded_rectangle((x + 8, y - 6, x + 30, y + 6), fill=(170, 130, 120))

    # Brand text top
    try:
        big = ImageFont.truetype("georgia.ttf", 38)
    except OSError:
        big = ImageFont.load_default()
    td = ImageDraw.Draw(img)
    td.text((120, 200), "CAELIA", fill=(40, 36, 34), font=big)
    td.text((120, 250), "Beauty Mirror Case", fill=(120, 100, 95))

    save(img, name)


def render_detail(color_top: tuple[int, int, int], color_bot: tuple[int, int, int],
                  bg: tuple[int, int, int], bg_bot: tuple[int, int, int], name: str) -> None:
    img = bg_gradient(bg, bg_bot)
    img = add_grain(img)
    # Closeup - larger case filling more of the frame, with embossed circle (mirror)
    img = soft_shadow(img, (260, 280, 940, 1280), blur=45)
    render_case(img, color_top, color_bot, cx=W // 2, cy=780, w=680, h=1000, radius=80)
    # Embossed circle
    cd = ImageDraw.Draw(img)
    cx, cy = W // 2, 760
    cd.ellipse((cx - 220, cy - 220, cx + 220, cy + 220), outline=(255, 240, 235, 110), width=2)
    cd.ellipse((cx - 220, cy - 220, cx + 220, cy + 220), outline=(255, 240, 235, 60), width=1)
    # Magnetic clasp strip
    cd.rounded_rectangle((cx - 100, cy + 280, cx + 100, cy + 320), radius=10, fill=(255, 240, 235, 30))
    cd.line([(cx - 60, cy + 300), (cx + 60, cy + 300)], fill=(255, 240, 235, 80), width=1)
    save(img, name)


def render_lifestyle(color_top: tuple[int, int, int], color_bot: tuple[int, int, int],
                     bg: tuple[int, int, int], bg_bot: tuple[int, int, int], name: str) -> None:
    img = bg_gradient(bg, bg_bot)
    img = add_grain(img, strength=4)
    # Tilted case
    img = soft_shadow(img, (320, 540, 880, 1160), blur=40)
    rotated = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    render_case(rotated.convert("RGB"), color_top, color_bot, cx=600, cy=720, w=440, h=580)
    rotated = rotated.rotate(-7, resample=Image.BICUBIC)
    img.paste(rotated, (0, 0), rotated)

    # Coffee cup
    cd = ImageDraw.Draw(img)
    cup_x, cup_y = 180, 1080
    cd.ellipse((cup_x - 90, cup_y - 90, cup_x + 90, cup_y + 90), fill=(247, 241, 234))
    cd.ellipse((cup_x - 76, cup_y - 76, cup_x + 76, cup_y + 76), fill=(180, 100, 95))
    cd.ellipse((cup_x - 56, cup_y - 56, cup_x + 56, cup_y + 56), fill=(120, 60, 55))

    # Phone
    px, py = 980, 1020
    cd.rounded_rectangle((px - 80, py - 150, px + 80, py + 150), radius=18, fill=(40, 36, 34))
    cd.rounded_rectangle((px - 70, py - 140, px + 70, py + 140), radius=12, fill=(220, 220, 224))
    cd.line([(px - 50, py), (px + 50, py)], fill=(40, 36, 34), width=1)

    save(img, name)


def main():
    ROSE_TOP = (233, 201, 196)
    ROSE_BOT = (212, 155, 150)
    NOIR_TOP = (45, 42, 40)
    NOIR_BOT = (30, 28, 27)
    IVORY_TOP = (243, 232, 218)
    IVORY_BOT = (220, 205, 188)

    CREAM_TOP = (247, 241, 234)
    CREAM_BOT = (239, 229, 216)
    DEEP_ROSE = (212, 155, 150)

    print("Rendering product imagery...")
    render_front(ROSE_TOP, ROSE_BOT, CREAM_TOP, CREAM_BOT, "beauty-case-rose-front.png")
    render_front(NOIR_TOP, NOIR_BOT, CREAM_TOP, CREAM_BOT, "beauty-case-noir-front.png")
    render_front(IVORY_TOP, IVORY_BOT, CREAM_TOP, CREAM_BOT, "beauty-case-ivory-front.png")
    render_open(ROSE_TOP, ROSE_BOT, CREAM_BOT, CREAM_TOP, "beauty-case-rose-open.png")
    render_detail(NOIR_TOP, NOIR_BOT, CREAM_TOP, CREAM_BOT, "beauty-case-rose-detail.png")
    render_lifestyle(ROSE_TOP, ROSE_BOT, DEEP_ROSE, ROSE_TOP, "beauty-case-rose-lifestyle.png")
    render_front(ROSE_TOP, ROSE_BOT, CREAM_TOP, CREAM_BOT, "beauty-case-mini-rose.png")
    render_open(ROSE_TOP, ROSE_BOT, CREAM_BOT, CREAM_TOP, "beauty-case-mini-open.png")
    print("Done.")


if __name__ == "__main__":
    main()