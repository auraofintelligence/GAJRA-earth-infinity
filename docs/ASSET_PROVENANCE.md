# Asset Provenance

## Current public assets

| Asset | Source | Rights and use | Status |
| --- | --- | --- | --- |
| `assets/favicon.ico` | Existing GAJRA Earth repository | GAJRA Earth project asset | Retained but not used in the current head |
| `assets/aura-heart-*.png` | Supplied `GAJRA-earth-new` build | Original Aura heart header and browser icons | Retained |

## Permanent Earth-image rule

Do not depict the real Earth with vector art, CSS gradients, procedural canvas circles or a generated substitute. Use credited raster photography or film unless Luke explicitly asks for a practice exercise or clearly labelled placeholder. Symbolic art may include an Earth-like form only when it is labelled as symbolism rather than documentary Earth imagery.

## Build 2 media

### NASA SVS 31375

- Source page: <https://svs.gsfc.nasa.gov/31375/>
- Subject: ISS views of the November 11-13, 2025 geomagnetic storm.
- Required credit: Earth Science and Remote Sensing Unit, NASA Johnson Space Center; video editor Marit Jentoft-Nilsen (Global Science and Technology, Inc.).
- Local poster source: `assets/media/nasa-iss-aurora-2025.png`.
- Web poster: `assets/media/nasa-iss-aurora-2025.webp` (99 KB).
- Motion source: official NASA-hosted 1920 x 1080 WebM file, loaded with metadata only until playback.
- Treatment: factual context, visible source credit, no NASA endorsement and no NASA marks in GAJRA branding.

### Original flower-force artwork

- Source artwork: `assets/media/gajra-flower-force-original.png` (2.2 MB).
- Web delivery version: `assets/media/gajra-flower-force.webp` (178 KB).
- Method: generated with OpenAI's built-in image generation tool from a project-specific prompt on 27 July 2026.
- Prompt intent: an unfamiliar flower-force form holding a small Earth-like sphere; translucent botanical membranes, repaired seams and restrained cosmic negative space.
- Treatment: original symbolic project work. It does not imitate a named artist, copy an identifiable historic photo or present generated symbolism as documentary evidence.
- Commercial boundary: the project licence reserves commercial rights, but the generated asset remains subject to any applicable OpenAI service terms.

### Page hero field maps

Every non-home public page has its own 1920 by 720 raster hero in
`assets/heroes/`.

- `about.webp` is the first replacement in the new generated hero series. Its
  source is `assets/media/generated/about-hero-source-v1.png`.
- It was generated with OpenAI's built-in image-generation tool on 27 July
  2026 as a cinematic, tactile flower-garland threshold with the left side kept
  calm for readable page copy. The prompt explicitly excluded Earth, globes,
  vector art, text, logos and watermarks.
- `earth-time.webp` is a crop of the real ISS aurora photograph listed below.
- The remaining abstract images are temporary deterministic field maps
  generated locally by `tools/build-hero-images.py`. They are queued for
  replacement only after the smaller functional page architecture is settled.
- They are original code-generated project assets. They depict paths, networks,
  instruments, waves and other abstract ideas. They are not depictions of
  Earth.
- The page places each hero beneath its own scrim at 50 percent media opacity.

### NASA SVS 31281

- Source page: <https://svs.gsfc.nasa.gov/31281/>
- Active home-page poster: `assets/media/nasa-aurora-australis-2022.jpg`.
- Earlier local source: `assets/media/nasa-iss-aurora-2022.jpg`.
- Local hero derivative: `assets/heroes/earth-time.webp`.
- Motion source: official NASA-hosted 1920 x 1080 WebM file, loaded with
  metadata only until playback.
- Subject: Aurora Australis photographed from the International Space Station
  on 17 August 2022. The sequence begins above the Southern Ocean between
  Africa and Antarctica, then ends with Australia and Perth in view.
- Credit: Earth Science and Remote Sensing Unit, NASA Johnson Space Center;
  image processing by Marit Jentoft-Nilsen.
- Treatment: factual and educational Earth imagery with NASA credited and no
  endorsement claim.

### NASA SVS 30002, Suomi NPP Blue Marble

- Source page: <https://svs.gsfc.nasa.gov/30002/>
- Local raster: `assets/media/nasa-blue-marble-2012.jpg`.
- Subject: a composite full-Earth view using Suomi NPP VIIRS observations from
  4 January 2012.
- Credit: NASA/NOAA/GSFC/Suomi NPP/VIIRS/Norman Kuring.
- Treatment: the only depiction of Earth inside the home-page Sol system
  diagram. It is drawn into the canvas as a raster crop, never reconstructed as
  vector or procedural planet art.

## Build 4 map sources

### Sentinel-2 cloudless 2016

- Source page: <https://cloudless.eox.at/>
- Tile source: `https://tiles.maps.eox.at/wmts/1.0.0/s2cloudless_3857/default/g/{z}/{y}/{x}.jpg`
- Credit: Sentinel-2 cloudless by EOX IT Services GmbH, contains modified
  Copernicus Sentinel data 2016.
- Licence: CC BY 4.0.
- Treatment: neutral satellite imagery only. GAJRA Earth does not load a
  political boundary layer, national flag layer or OpenStreetMap tile layer.

### MapLibre GL JS 6.0.0

- Source page: <https://maplibre.org/maplibre-gl-js/docs/>
- Local files: `assets/vendor/maplibre-gl.mjs`,
  `assets/vendor/maplibre-gl-shared.mjs`, `assets/vendor/maplibre-gl.css` and
  `assets/vendor/maplibre-gl-LICENSE.txt`.
- Licence: BSD-3-Clause, with included notices retained.
- Treatment: open-source rendering engine. It does not imply MapLibre
  endorsement of GAJRA Earth.

No historic protest photograph will be copied into the site without appropriate rights.
