"""AI Pusulası eklenti simgelerini çizer (pusula iğnesi). Kullanım: python3 tools/make_icons.py"""
from pathlib import Path
from PIL import Image, ImageDraw

OUT = Path(__file__).resolve().parent.parent / "extension" / "icons"
OUT.mkdir(parents=True, exist_ok=True)

TEAL, NAVY, GOLD, WHITE = (14, 124, 123), (22, 35, 61), (242, 181, 68), (255, 255, 255)

def draw(size: int) -> Image.Image:
    s = size * 4  # yüksek çözünürlükte çiz, sonra küçült (kenar yumuşatma)
    im = Image.new("RGBA", (s, s), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    m = s * 0.04
    d.ellipse([m, m, s - m, s - m], fill=TEAL)
    r = s * 0.36
    c = s / 2
    d.ellipse([c - r, c - r, c + r, c + r], outline=WHITE, width=max(2, int(s * 0.04)))
    w = s * 0.11
    d.polygon([(c, c - r * 0.92), (c + w, c), (c, c + w * 0.2), (c - w, c)], fill=GOLD)   # kuzey
    d.polygon([(c, c + r * 0.92), (c + w, c), (c, c - w * 0.2), (c - w, c)], fill=WHITE)  # güney
    d.ellipse([c - s * 0.035, c - s * 0.035, c + s * 0.035, c + s * 0.035], fill=NAVY)
    return im.resize((size, size), Image.LANCZOS)

for n in (16, 32, 48, 128):
    draw(n).save(OUT / f"icon{n}.png")
print("icons ->", OUT)
