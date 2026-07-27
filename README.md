# GAJRA Earth

GAJRA Earth is the **Global Association for Joyful Responsible Abundance on Earth**: an evolving public concept, participatory alignment practice and local-first experimentation framework.

It is not currently a registered global association. The ICO, DAO and Live Aid 2025 plans did not launch and are retained only in the archive and reality layer.

## Live site

Staging and source-history site:

https://auraofintelligence.github.io/GAJRA-earth-infinity/

Planned public domain after DNS migration:

https://gajra.earth/

## Public build method

The site is being built in visible layers so the Git history and [public build log](BUILD_LOG.md) show how the work changes.

- Build 1: multi-page spine, grouped navigation, status boundaries and motion control.
- Build 2: cinematic media system and rights-safe visual language.
- Build 3: local-first Alignment Lab builders and exports.
- Build 4: borderless world map with satellite, flat and sphere views.
- Build 5: prune the early 22-page spine into about eight useful visitor journeys.
- Build 6: add useful atlas layers and map workbenches where location does real work.
- Build 7: browser-first group join package and human review path.
- Build 8: final accessibility, motion, mobile, performance and overstatement review.

## Architecture

The site uses a small dependency-free Node generator:

- `src/site-data.mjs` contains the page map, navigation and public copy.
- `tools/build-site.mjs` renders the root HTML pages, sitemap and 404 page.
- `assets/site.css` owns the visual and responsive system.
- `assets/site.js` owns navigation and the persistent 0-100 Motion Vibrancy control.
- `assets/cosmos.js` owns the first canvas solar-system treatment.
- `assets/alignment-lab.js` owns the browser-local Alignment Lab, explicit local save and Markdown, JSON and JSONL exports.
- `assets/world-map.js` owns the borderless satellite atlas and `data/map-records.json` owns public map records.
- `tools/check-site.mjs` checks generated pages, local links and superseded launch language.
- `docs/RECONNAISSANCE.md` records the source decisions and public boundaries.
- `docs/ASSET_PROVENANCE.md` records media sources and rights treatment.
- `docs/VOICE_AND_TONE.md` keeps the public voice self-sovereign and explorer-facing.
- `docs/DESIGN.md` keeps visual and interaction notes out of public page copy.

Generated HTML is committed so GitHub Pages can serve the site without a server or build action.

## Build locally

```powershell
npm.cmd run build:heroes
npm.cmd run build
npm.cmd run check
python -m http.server 4179
```

Then open `http://localhost:4179/`.

## Privacy

The GitHub Pages phase is local-first. Personal reflections and builder drafts stay in the browser unless the visitor explicitly downloads or shares an export. No analytics or third-party tracking is added.

## Licence

[Strange But True Public Source Licence](LICENSE): personal and non-commercial use is allowed with attribution. All commercial and corporate rights are reserved to Luke Nathan Hayes.
