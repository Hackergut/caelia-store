"""Generate photorealistic-looking product photography for CAELIA.

Renders 8 high-end beauty product shots using Pillow with:
- Vignette + cinematic lighting
- Realistic drop shadow with multiple layers
- Specular highlights for premium leather
- Subtle reflections

Run:  python scripts/gen-product-images.py
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


# ---------- helpers ----------

def lerp(a, b, t):
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))


def gradient_bg(top, bot, vignette_color=(0, 0, 0), vignette_strength=0.35):
    img = Image.new("RGB", (W, H), top)
    px = img.load()
    for y in range(H):
        t = y / (H - 1)
        c = lerp(top, bot, t)
        for x in range(W):
            px[x, y] = c
    # Vignette - mask must be 'L' or '1' for composite
    mask = Image.new("L", (W, H), 0)
    mpx = mask.load()
    cx, cy = W / 2, H / 2
    max_d = math.hypot(cx, cy)
    for y in range(H):
        for x in range(W):
            d = math.hypot(x - cx, y - cy) / max_d
            mpx[x, y] = int(255 * (1 - d) ** 2)
    mask = mask.filter(ImageFilter.GaussianBlur(120))
    out = Image.new("RGB", (W, H), vignette_color)
    blended = Image.composite(img, out, mask)
    return blended


def add_film_grain(img, strength=8):
    noise = Image.effect_noise(img.size, strength * 2).convert("L")
    rgb = Image.merge("RGB", (noise, noise, noise))
    return Image.blend(img, rgb, 0.03)


def layered_shadow(canvas, bbox, blur=45, opacity=140, color=(20, 16, 14)):
    """Multi-layer drop shadow for premium product feel."""
    x0, y0, x1, y1 = bbox
    layers = [
        (40, 6, opacity // 3),
        (25, 4, opacity // 2),
        (15, 3, opacity),
    ]
    for offset, scale, alpha in layers:
        shadow = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
        d = ImageDraw.Draw(shadow)
        pad = int(offset * 2)
        d.rounded_rectangle(
            (x0 - pad, y0 + offset + 40, x1 + pad, y1 + offset + 80),
            radius=80, fill=(*color, alpha),
        )
        shadow = shadow.filter(ImageFilter.GaussianBlur(blur * scale))
        canvas.alpha_composite(shadow)
    return canvas


def draw_case(canvas, color_top, color_bot, cx, cy, w=520, h=720, radius=64,
              metallic=False, light_dir=(1, -1), emboss=None, emboss_text=None):
    """Draw a photorealistic case with lighting + specular highlight."""
    # Build a per-pixel gradient with simulated directional light
    light_x, light_y = light_dir
    case = Image.new("RGB", (w, h), color_top)
    px = case.load()
    nw, nh = w, h
    for y in range(nh):
        for x in range(nw):
            # Base gradient top to bottom
            t = y / (nh - 1)
            base = lerp(color_top, color_bot, t)
            # Simulate directional light: brighter where (light_dir . normal) is high
            # Approximation: top-left corner is the highlight
            lx = (x / (nw - 1)) - 0.5
            ly = (y / (nh - 1)) - 0.5
            dot = (lx * light_x + -ly * light_y)
            # Highlight area
            hl = int(max(0, dot) ** 2 * 80)
            # Shadow area (bottom right)
            sh = int(max(0, -dot) ** 2 * 30)
            r = max(0, min(255, base[0] + hl - sh))
            g = max(0, min(255, base[1] + hl - sh))
            b = max(0, min(255, base[2] + hl - sh))
            px[x, y] = (r, g, b)

    # Apply rounded mask
    mask = Image.new("L", (w, h), 0)
    md = ImageDraw.Draw(mask)
    md.rounded_rectangle((0, 0, w - 1, h - 1), radius=radius, fill=255)
    case.putalpha(mask)

    # Specular highlight streak (top edge)
    hl = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    hd = ImageDraw.Draw(hl)
    hd.ellipse((w * 0.1, -h * 0.3, w * 0.9, h * 0.4),
               fill=(255, 255, 255, 60))
    hl = hl.filter(ImageFilter.GaussianBlur(60))
    case = Image.alpha_composite(case, hl)

    # Inner stitched border
    inner = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    idr = ImageDraw.Draw(inner)
    idr.rounded_rectangle(
        (24, 24, w - 25, h - 25),
        radius=radius - 14, outline=(255, 240, 230, 90), width=2,
    )
    inner = inner.filter(ImageFilter.GaussianBlur(1))
    case = Image.alpha_composite(case, inner)

    # Optional emboss (gold/silver ring)
    if emboss:
        eb = Image.new("RGBA", (w, h), (0, 0, 0, 0))
        ed = ImageDraw.Draw(eb)
        ed.ellipse(
            (cx - w // 2 + 80, cy - h // 2 + 200,
             cx + w // 2 - 80, cy + h // 2 - 240),
            outline=emboss, width=3,
        )
        eb = eb.filter(ImageFilter.GaussianBlur(1))
        case = Image.alpha_composite(case, eb)

    # Brand wordmark (centered)
    try:
        font_big = ImageFont.truetype("georgia.ttf", 56)
        font_small = ImageFont.truetype("georgia.ttf", 12)
    except OSError:
        font_big = ImageFont.load_default()
        font_small = ImageFont.load_default()

    td = ImageDraw.Draw(case)
    text = emboss_text or "CAELIA"
    bbox = td.textbbox((0, 0), text, font=font_big)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    td.text((w // 2 - tw // 2, h // 2 - th // 2 - 30), text,
            fill=(247, 241, 234), font=font_big)
    td.line([(w // 2 - 70, h // 2 + 18), (w // 2 + 70, h // 2 + 18)],
            fill=(247, 241, 234, 200), width=1)
    sub = "BEAUTY MIRROR CASE"
    sb = td.textbbox((0, 0), sub, font=font_small)
    sw = sb[2] - sb[0]
    td.text((w // 2 - sw // 2, h // 2 + 30), sub,
            fill=(247, 241, 234), font=font_small)

    # Paste onto canvas
    canvas.alpha_composite(case, (cx - w // 2, cy - h // 2))
    return canvas


def draw_open_case_interior(canvas, color_top, color_bot, cx, cy, w=460, h=720):
    """Draw the inside of an open case (mirror, gloss, liners)."""
    case = Image.new("RGB", (w, h), color_top)
    px = case.load()
    for y in range(h):
        for x in range(w):
            t = y / (h - 1)
            base = lerp(color_top, color_bot, t)
            # Subtle satin sheen
            lx = (x / (w - 1)) - 0.5
            sheen = int(math.sin(lx * math.pi) * 15)
            r = max(0, min(255, base[0] + sheen))
            g = max(0, min(255, base[1] + sheen))
            b = max(0, min(255, base[2] + sheen))
            px[x, y] = (r, g, b)

    mask = Image.new("L", (w, h), 0)
    md = ImageDraw.Draw(mask)
    md.rounded_rectangle((0, 0, w - 1, h - 1), radius=40, fill=255)
    case.putalpha(mask)

    # Mirror
    md2 = ImageDraw.Draw(case)
    mirror = (60, 80, w - 60, h // 2 + 60)
    md2.rounded_rectangle(mirror, radius=20, fill=(228, 236, 240))
    md2.rounded_rectangle(mirror, radius=20, outline=(180, 188, 195), width=2)
    # Mirror highlight sweep
    sweep = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    sd = ImageDraw.Draw(sweep)
    sd.polygon([(90, 100), (200, 100), (110, h // 2)], fill=(255, 255, 255, 110))
    sweep = sweep.filter(ImageFilter.GaussianBlur(20))
    case = Image.alpha_composite(case, sweep)

    # Lip gloss tube
    gx, gy = w // 2, h * 0.78
    gloss_w = 260
    gloss_h = 60
    gloss = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    gd = ImageDraw.Draw(gloss)
    gd.rounded_rectangle(
        (gx - gloss_w // 2, gy - gloss_h // 2,
         gx + gloss_w // 2, gy + gloss_h // 2),
        radius=30, fill=(220, 220, 226),
    )
    gd.rounded_rectangle(
        (gx - gloss_w // 2 + 10, gy - gloss_h // 2 + 8,
         gx + gloss_w // 2 - 10, gy + gloss_h // 2 - 8),
        radius=24, fill=(252, 240, 235),
    )
    try:
        font_micro = ImageFont.truetype("georgia.ttf", 12)
    except OSError:
        font_micro = ImageFont.load_default()
    gbbox = gd.textbbox((0, 0), "CAELIA", font=font_micro)
    gw = gbbox[2] - gbbox[0]
    gd.text((gx - gw // 2, gy - 6), "CAELIA", fill=(80, 60, 55), font=font_micro)
    gloss = gloss.filter(ImageFilter.GaussianBlur(0.5))
    case = Image.alpha_composite(case, gloss)

    canvas.alpha_composite(case, (cx - w // 2, cy - h // 2))


def save(img, name):
    path = os.path.join(OUT_DIR, name)
    if img.mode != "RGB":
        img = img.convert("RGB")
    img.save(path, "PNG", optimize=True)
    print(f"  wrote {name}  ({os.path.getsize(path) // 1024} KB)")


# ---------- compositions ----------

def render_front(color_top, color_bot, bg_top, bg_bot, name, emboss_color=None, text=None, w=None, h=None):
    img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    bg = gradient_bg(bg_top, bg_bot)
    bg = add_film_grain(bg)
    canvas = bg.convert("RGBA")

    bbox = (W // 2 - 270, 420, W // 2 + 270, 1180)
    canvas = layered_shadow(canvas, bbox, blur=55, opacity=160)

    draw_case(canvas, color_top, color_bot,
              cx=W // 2, cy=800, w=w or 540, h=h or 760,
              emboss=emboss_color, emboss_text=text)

    save(canvas, name)


def render_open(color_top, color_bot, bg_top, bg_bot, name):
    img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    bg = gradient_bg(bg_top, bg_bot)
    bg = add_film_grain(bg)
    canvas = bg.convert("RGBA")

    # Two case halves
    bbox_l = (140, 280, 620, 1280)
    bbox_r = (660, 280, 1140, 1280)
    layered_shadow(canvas, bbox_l, blur=55, opacity=150)
    layered_shadow(canvas, bbox_r, blur=55, opacity=150)

    # Left half (with mirror)
    draw_open_case_interior(canvas, color_top, color_bot,
                            cx=380, cy=780, w=460, h=1000)

    # Right half (with gloss + liners)
    right = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    cover_top = tuple(min(255, c + 30) for c in color_top)
    cover_bot = tuple(min(255, c + 22) for c in color_bot)
    draw_open_case_interior(right, cover_top, cover_bot,
                            cx=900, cy=780, w=460, h=1000)

    # Add lip liner sticks on right
    rd = ImageDraw.Draw(right)
    for i, y in enumerate([600, 690, 780]):
        rd.rounded_rectangle((900 - 130, y - 8, 900 + 130, y + 8),
                             radius=10, fill=(40, 36, 34))
        rd.rounded_rectangle((900 - 130 + 10, y - 6, 900 - 130 + 36, y + 6),
                             fill=(200, 150, 130))
    canvas.alpha_composite(right)

    save(canvas, name)


def render_detail(color_top, color_bot, bg_top, bg_bot, name):
    img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    bg = gradient_bg(bg_top, bg_bot)
    bg = add_film_grain(bg)
    canvas = bg.convert("RGBA")

    bbox = (180, 220, 1020, 1340)
    layered_shadow(canvas, bbox, blur=60, opacity=170)

    draw_case(canvas, color_top, color_bot,
              cx=W // 2, cy=780, w=720, h=1080, radius=90,
              emboss=(220, 200, 180, 180))

    # Add magnetic clasp highlight
    cd = ImageDraw.Draw(canvas)
    cx, cy = W // 2, 1000
    cd.rounded_rectangle((cx - 110, cy, cx + 110, cy + 30),
                         radius=12, fill=(247, 241, 234, 40))
    cd.rounded_rectangle((cx - 110, cy, cx + 110, cy + 30),
                         radius=12, outline=(247, 241, 234, 100), width=1)

    save(canvas, name)


def render_lifestyle(color_top, color_bot, bg_top, bg_bot, name):
    bg = gradient_bg(bg_top, bg_bot)
    bg = add_film_grain(bg, strength=4)
    canvas = bg.convert("RGBA")

    # Tilted case
    bbox = (240, 380, 960, 1100)
    layered_shadow(canvas, bbox, blur=50, opacity=140)

    # Render case into a temp RGBA, rotate, paste
    tmp = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw_case(tmp, color_top, color_bot, cx=W // 2, cy=H // 2,
              w=480, h=620, radius=60)
    tmp = tmp.rotate(-8, resample=Image.BICUBIC, expand=False)
    canvas.alpha_composite(tmp)

    # Coffee cup
    cd = ImageDraw.Draw(canvas)
    cup_x, cup_y = 220, 1080
    cup = Image.new("RGBA", (200, 200), (0, 0, 0, 0))
    cd2 = ImageDraw.Draw(cup)
    cd2.ellipse((0, 0, 200, 200), fill=(247, 241, 234))
    cd2.ellipse((14, 14, 186, 186), fill=(180, 100, 95))
    cd2.ellipse((34, 34, 166, 166), fill=(120, 60, 55))
    cup = cup.filter(ImageFilter.GaussianBlur(1))
    canvas.alpha_composite(cup, (cup_x - 100, cup_y - 100))

    # Phone
    px_, py_ = 980, 1080
    phone = Image.new("RGBA", (200, 320), (0, 0, 0, 0))
    pd2 = ImageDraw.Draw(phone)
    pd2.rounded_rectangle((0, 0, 199, 319), radius=22, fill=(35, 30, 28))
    pd2.rounded_rectangle((12, 12, 187, 307), radius=14, fill=(220, 218, 222))
    pd2.line([(40, 160), (160, 160)], fill=(35, 30, 28), width=1)
    canvas.alpha_composite(phone, (px_ - 100, py_ - 160))

    save(canvas, name)


def main():
    ROSE_TOP, ROSE_BOT = (233, 201, 196), (212, 155, 150)
    NOIR_TOP, NOIR_BOT = (50, 44, 42), (32, 28, 27)
    IVORY_TOP, IVORY_BOT = (243, 232, 218), (220, 205, 188)

    CREAM_TOP, CREAM_BOT = (247, 241, 234), (235, 222, 207)
    DEEP_ROSE_TOP, DEEP_ROSE_BOT = (210, 170, 165), (185, 140, 135)

    GOLD = (220, 195, 150, 200)

    print("Rendering premium product imagery...")
    render_front(ROSE_TOP, ROSE_BOT, CREAM_TOP, CREAM_BOT,
                 "beauty-case-rose-front.png",
                 emboss_color=(230, 200, 175, 160))
    render_front(NOIR_TOP, NOIR_BOT, CREAM_TOP, CREAM_BOT,
                 "beauty-case-noir-front.png",
                 emboss_color=GOLD)
    render_front(IVORY_TOP, IVORY_BOT, CREAM_TOP, CREAM_BOT,
                 "beauty-case-ivory-front.png",
                 emboss_color=(180, 160, 140, 160))
    render_open(ROSE_TOP, ROSE_BOT, CREAM_BOT, CREAM_TOP, "beauty-case-rose-open.png")
    render_detail(NOIR_TOP, NOIR_BOT, CREAM_TOP, CREAM_BOT, "beauty-case-rose-detail.png")
    render_lifestyle(ROSE_TOP, ROSE_BOT, DEEP_ROSE_TOP, ROSE_BOT,
                     "beauty-case-rose-lifestyle.png")
    render_front(ROSE_TOP, ROSE_BOT, CREAM_TOP, CREAM_BOT,
                 "beauty-case-mini-rose.png", w=320, h=440,
                 text="MINI")
    render_open(ROSE_TOP, ROSE_BOT, CREAM_BOT, CREAM_TOP, "beauty-case-mini-open.png")
    print("Done.")


if __name__ == "__main__":
    main()