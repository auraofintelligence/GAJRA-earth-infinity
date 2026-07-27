"""Build deterministic raster hero images for every non-home GAJRA Earth page.

These are abstract field maps, not depictions of Earth. The Earth Time hero is
made separately from the credited NASA ISS aurora photograph supplied by the
earlier GAJRA Earth build.
"""

from __future__ import annotations

import math
import random
from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = ROOT / "assets" / "heroes"
EARTH_SOURCE = ROOT / "assets" / "media" / "nasa-iss-aurora-2022.jpg"
SIZE = (1920, 720)


SPECS = {
    "about": ((13, 28, 43), (76, 227, 204), (255, 183, 76), "petals"),
    "jra": ((24, 13, 38), (255, 94, 132), (93, 225, 215), "bands"),
    "commitment": ((25, 20, 15), (255, 190, 75), (165, 119, 255), "path"),
    "alignment-lab": ((7, 24, 32), (73, 228, 213), (255, 193, 84), "grid"),
    "data-garden": ((7, 31, 24), (75, 214, 146), (225, 189, 83), "branches"),
    "simulations": ((13, 18, 42), (100, 168, 255), (184, 121, 255), "branches"),
    "experiments": ((35, 13, 26), (255, 111, 166), (255, 198, 81), "rings"),
    "events": ((38, 20, 13), (255, 173, 76), (255, 93, 132), "nodes"),
    "event-system": ((10, 26, 36), (82, 218, 255), (255, 177, 69), "network"),
    "culture": ((31, 12, 38), (201, 126, 255), (255, 104, 155), "waves"),
    "everyday": ((40, 25, 12), (255, 193, 83), (106, 220, 188), "windows"),
    "frontier-labs": ((7, 21, 38), (81, 178, 255), (246, 102, 171), "grid"),
    "ai-builders": ((9, 24, 30), (86, 232, 207), (183, 132, 255), "circuits"),
    "ecosystem": ((13, 31, 30), (80, 220, 164), (255, 186, 74), "network"),
    "research": ((25, 15, 37), (181, 129, 255), (86, 211, 224), "branches"),
    "status": ((8, 29, 36), (76, 230, 215), (255, 189, 75), "beacons"),
    "archive": ((28, 21, 17), (223, 170, 93), (128, 114, 217), "strata"),
    "contribute": ((31, 16, 26), (255, 112, 157), (83, 222, 202), "path"),
    "site-map": ((11, 23, 40), (87, 174, 255), (255, 187, 73), "network"),
    "build-log": ((26, 22, 17), (255, 190, 76), (255, 93, 132), "workshop"),
    "not-found": ((15, 15, 28), (126, 111, 224), (79, 220, 201), "path"),
}


def mix(a: int, b: int, amount: float) -> int:
    return round(a + (b - a) * amount)


def colour_mix(a: tuple[int, int, int], b: tuple[int, int, int], amount: float):
    return tuple(mix(a[i], b[i], amount) for i in range(3))


def base_field(seed: int, dark: tuple[int, int, int], accent: tuple[int, int, int]):
    width, height = SIZE
    pixels = Image.new("RGB", SIZE)
    data = []
    for y in range(height):
        vertical = y / max(1, height - 1)
        for x in range(width):
            horizontal = x / max(1, width - 1)
            amount = 0.08 + 0.11 * horizontal + 0.05 * (1 - vertical)
            data.append(colour_mix(dark, accent, amount))
    pixels.putdata(data)

    rng = random.Random(seed)
    noise_small = Image.new("L", (96, 36))
    noise_small.putdata([rng.randrange(20, 235) for _ in range(96 * 36)])
    noise = noise_small.resize(SIZE, Image.Resampling.BICUBIC).filter(
        ImageFilter.GaussianBlur(22)
    )
    noise_colour = Image.new("RGB", SIZE, accent)
    noise_colour.putalpha(noise.point(lambda value: round(value * 0.18)))
    return Image.alpha_composite(pixels.convert("RGBA"), noise_colour)


def add_glow(
    image: Image.Image,
    centre: tuple[int, int],
    radius: int,
    colour: tuple[int, int, int],
    strength: int = 95,
):
    layer = Image.new("RGBA", SIZE, (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)
    steps = 16
    for step in range(steps, 0, -1):
        proportion = step / steps
        r = round(radius * proportion)
        alpha = round(strength * (1 - proportion) ** 1.8)
        draw.ellipse(
            (
                centre[0] - r,
                centre[1] - r,
                centre[0] + r,
                centre[1] + r,
            ),
            fill=(*colour, alpha),
        )
    image.alpha_composite(layer.filter(ImageFilter.GaussianBlur(radius / 14)))


def polyline(
    draw: ImageDraw.ImageDraw,
    points,
    colour: tuple[int, int, int],
    width: int = 4,
    alpha: int = 170,
):
    draw.line(points, fill=(*colour, alpha), width=width, joint="curve")


def draw_petals(draw, rng, primary, secondary):
    centre = (1450, 360)
    for index in range(11):
        angle = index * math.tau / 11 + 0.12
        tip = (
            centre[0] + math.cos(angle) * rng.randint(170, 330),
            centre[1] + math.sin(angle) * rng.randint(120, 270),
        )
        box = (
            tip[0] - rng.randint(90, 160),
            tip[1] - rng.randint(45, 95),
            tip[0] + rng.randint(90, 160),
            tip[1] + rng.randint(45, 95),
        )
        colour = primary if index % 2 else secondary
        draw.ellipse(box, outline=(*colour, 145), width=5)
        polyline(draw, (centre, tip), colour, 2, 90)


def draw_bands(draw, rng, primary, secondary):
    for band in range(3):
        points = []
        for x in range(-40, 2001, 70):
            y = 185 + band * 150 + math.sin(x / 165 + band * 1.7) * (55 + band * 8)
            y += rng.randint(-9, 9)
            points.append((x, y))
        polyline(draw, points, primary if band != 1 else secondary, 12 - band * 2, 160)


def draw_path(draw, rng, primary, secondary):
    points = [(1910, 90)]
    x, y = points[0]
    for _ in range(12):
        x -= rng.randint(110, 185)
        y = max(70, min(660, y + rng.randint(-115, 120)))
        points.append((x, y))
    polyline(draw, points, primary, 9, 185)
    for index, point in enumerate(points[1:-1], 1):
        if index % 3 == 0:
            radius = 13
            draw.ellipse(
                (point[0] - radius, point[1] - radius, point[0] + radius, point[1] + radius),
                fill=(*secondary, 205),
            )


def draw_grid(draw, rng, primary, secondary):
    horizon = rng.randint(330, 470)
    for x in range(860, 2000, 95):
        polyline(draw, ((x, 720), (960 + (x - 960) * 0.28, horizon)), primary, 2, 100)
    for y in range(horizon, 760, 55):
        spread = (y - horizon) * 2.9
        polyline(draw, ((960 - spread, y), (960 + spread, y)), primary, 2, 85)
    for _ in range(7):
        x = rng.randint(1060, 1840)
        y = rng.randint(115, 590)
        draw.rectangle((x - 22, y - 22, x + 22, y + 22), outline=(*secondary, 180), width=4)


def draw_branches(draw, rng, primary, secondary):
    def branch(start, angle, length, depth):
        end = (
            start[0] + math.cos(angle) * length,
            start[1] + math.sin(angle) * length,
        )
        polyline(draw, (start, end), primary if depth % 2 else secondary, max(2, depth * 2), 165)
        if depth <= 1:
            draw.ellipse((end[0] - 5, end[1] - 5, end[0] + 5, end[1] + 5), fill=(*primary, 210))
            return
        branch(end, angle - rng.uniform(0.28, 0.58), length * rng.uniform(0.58, 0.74), depth - 1)
        branch(end, angle + rng.uniform(0.28, 0.58), length * rng.uniform(0.58, 0.74), depth - 1)

    branch((1760, 660), -2.5, 280, 5)
    branch((1460, 690), -2.0, 230, 4)


def draw_rings(draw, rng, primary, secondary):
    for index in range(14):
        x = rng.randint(920, 1880)
        y = rng.randint(80, 650)
        radius = rng.randint(22, 125)
        colour = primary if index % 2 else secondary
        draw.ellipse((x - radius, y - radius, x + radius, y + radius), outline=(*colour, 145), width=rng.randint(2, 7))


def node_positions(rng, count=19):
    return [(rng.randint(900, 1870), rng.randint(70, 660)) for _ in range(count)]


def draw_nodes(draw, rng, primary, secondary, dense=False):
    points = node_positions(rng, 26 if dense else 17)
    reach = 290 if dense else 230
    for index, point in enumerate(points):
        neighbours = sorted(
            points[index + 1 :],
            key=lambda other: (point[0] - other[0]) ** 2 + (point[1] - other[1]) ** 2,
        )[: 3 if dense else 2]
        for other in neighbours:
            distance = math.dist(point, other)
            if distance < reach:
                polyline(draw, (point, other), primary, 2, 85)
    for index, point in enumerate(points):
        radius = rng.randint(5, 15)
        colour = secondary if index % 4 == 0 else primary
        draw.ellipse((point[0] - radius, point[1] - radius, point[0] + radius, point[1] + radius), fill=(*colour, 205))


def draw_waves(draw, rng, primary, secondary):
    for row in range(7):
        points = []
        for x in range(780, 1960, 28):
            y = 155 + row * 68 + math.sin(x / (70 + row * 13) + row) * (18 + row * 5)
            points.append((x, y))
        polyline(draw, points, primary if row % 2 else secondary, 3, 135)


def draw_windows(draw, rng, primary, secondary):
    for row in range(3):
        for column in range(6):
            x = 930 + column * 150 + rng.randint(-20, 20)
            y = 120 + row * 185 + rng.randint(-16, 16)
            width = rng.randint(55, 105)
            height = rng.randint(70, 135)
            colour = primary if (row + column) % 3 else secondary
            draw.rounded_rectangle(
                (x, y, x + width, y + height),
                radius=9,
                outline=(*colour, 150),
                fill=(*colour, rng.randint(12, 32)),
                width=4,
            )


def draw_circuits(draw, rng, primary, secondary):
    for row in range(7):
        y = 100 + row * 88
        x = 880
        points = [(x, y)]
        for _ in range(8):
            x += rng.randint(70, 135)
            y += rng.choice((-42, 0, 42))
            points.append((x, y))
        polyline(draw, points, primary if row % 2 else secondary, 4, 140)
        for point in points[2::3]:
            draw.rectangle((point[0] - 7, point[1] - 7, point[0] + 7, point[1] + 7), fill=(*secondary, 210))


def draw_beacons(draw, rng, primary, secondary):
    for index in range(8):
        x = 920 + index * 130 + rng.randint(-25, 25)
        height = rng.randint(120, 560)
        polyline(draw, ((x, 660), (x, 660 - height)), primary, 3, 115)
        radius = rng.randint(16, 35)
        y = 660 - height
        draw.ellipse((x - radius, y - radius, x + radius, y + radius), outline=(*secondary, 190), width=5)


def draw_strata(draw, rng, primary, secondary):
    for row in range(9):
        points = []
        for x in range(720, 1960, 60):
            y = 90 + row * 73 + math.sin(x / 140 + row * 0.8) * 18 + rng.randint(-7, 7)
            points.append((x, y))
        polyline(draw, points, primary if row % 3 else secondary, rng.randint(2, 6), 130)


def draw_workshop(draw, rng, primary, secondary):
    draw_grid(draw, rng, primary, secondary)
    path = [(820, 390), (1030, 410), (1160, 335), (1325, 390), (1480, 310), (1645, 355), (1910, 250)]
    polyline(draw, path, secondary, 9, 200)
    for point in path[2::2]:
        polyline(draw, ((point[0] - 28, point[1] + 45), point), primary, 4, 180)


DRAWERS = {
    "petals": draw_petals,
    "bands": draw_bands,
    "path": draw_path,
    "grid": draw_grid,
    "branches": draw_branches,
    "rings": draw_rings,
    "nodes": lambda draw, rng, primary, secondary: draw_nodes(draw, rng, primary, secondary),
    "network": lambda draw, rng, primary, secondary: draw_nodes(draw, rng, primary, secondary, dense=True),
    "waves": draw_waves,
    "windows": draw_windows,
    "circuits": draw_circuits,
    "beacons": draw_beacons,
    "strata": draw_strata,
    "workshop": draw_workshop,
}


def build_abstract(slug, dark, primary, secondary, motif):
    seed = sum((index + 1) * ord(character) for index, character in enumerate(slug))
    rng = random.Random(seed)
    image = base_field(seed, dark, primary)
    add_glow(image, (rng.randint(1200, 1750), rng.randint(180, 560)), rng.randint(280, 520), primary)
    add_glow(image, (rng.randint(900, 1850), rng.randint(100, 650)), rng.randint(180, 390), secondary, 65)
    layer = Image.new("RGBA", SIZE, (0, 0, 0, 0))
    DRAWERS[motif](ImageDraw.Draw(layer), rng, primary, secondary)
    layer = layer.filter(ImageFilter.GaussianBlur(0.35))
    image.alpha_composite(layer)
    image.convert("RGB").save(
        OUTPUT_DIR / f"{slug}.webp",
        "WEBP",
        quality=83,
        method=6,
    )


def build_earth_time():
    if not EARTH_SOURCE.exists():
        raise FileNotFoundError(
            f"Missing credited NASA source image: {EARTH_SOURCE}"
        )
    image = Image.open(EARTH_SOURCE).convert("RGB")
    source_ratio = image.width / image.height
    target_ratio = SIZE[0] / SIZE[1]
    if source_ratio > target_ratio:
        crop_width = round(image.height * target_ratio)
        left = max(0, (image.width - crop_width) // 2)
        image = image.crop((left, 0, left + crop_width, image.height))
    else:
        crop_height = round(image.width / target_ratio)
        top = max(0, round((image.height - crop_height) * 0.38))
        image = image.crop((0, top, image.width, top + crop_height))
    image = image.resize(SIZE, Image.Resampling.LANCZOS)
    image = ImageEnhance.Contrast(image).enhance(1.08)
    image.save(OUTPUT_DIR / "earth-time.webp", "WEBP", quality=84, method=6)


def main():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    for slug, (dark, primary, secondary, motif) in SPECS.items():
        build_abstract(slug, dark, primary, secondary, motif)
    build_earth_time()
    print(f"Built {len(SPECS) + 1} unique page heroes in {OUTPUT_DIR}")


if __name__ == "__main__":
    main()
