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

- `earth-time.webp` is a crop of the real ISS aurora photograph listed below.
- The other 20 images are deterministic abstract field maps generated locally
  by `tools/build-hero-images.py`.
- They are original code-generated project assets. They depict paths, networks,
  instruments, waves and other abstract ideas. They are not depictions of
  Earth.
- The page places each hero beneath its own scrim at 50 percent media opacity.

### NASA SVS 31281

- Source page: <https://svs.gsfc.nasa.gov/31281/>
- Local source: `assets/media/nasa-iss-aurora-2022.jpg`.
- Local hero derivative: `assets/heroes/earth-time.webp`.
- Subject: Aurora Australis photographed from the International Space Station
  on 17 August 2022, with the sequence ending over Perth.
- Credit: NASA Scientific Visualization Studio.
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

No historic protest photograph will be copied into the site without appropriate rights.
