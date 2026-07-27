# Design Notes

This file holds visual and interaction decisions for future iterations. These
notes belong in the repository, not in visitor-facing page copy.

## Core visual language

- Use the original Aura heart logo and matching PNG browser icons.
- Never depict Earth with vector art, CSS gradients, procedural canvas circles
  or generated substitutes. Use credited raster photography or film unless Luke
  explicitly asks for a practice exercise or labelled placeholder.
- Give every active page a unique, full-width bitmap hero image or video beneath
  a strong text scrim.
- Home and the Bridge Atlas use credited Earth imagery. Meeting Circle retains
  its strong existing artwork. Alignment Lab, Field Kit, Future Watch and Join
  or Build use original cinematic raster scenes made for their precise jobs.
  Culture Compass uses the original flower-force artwork.
- Procedural hero fields remain only on redirect and utility pages. They are
  not the visual standard for the eight active public doors.
- The home Sol system must show Sol and all eight planets in named order. It is
  a readable diagram rather than a scale model. Earth alone uses a credited
  NASA Blue Marble raster inside the canvas.
- Use full-width RGB kintsugi cracks for section seams.
- The ticker must loop seamlessly with no empty interval. Give every word a
  wide cell and RGB accent rather than compressing the vocabulary.
- RGB ticker rails move more slowly than the text and in the opposite direction.
- The kintsugi line stays in place while its colour spectrum moves. Do not use
  a bright slug travelling along the line.
- Pointer light and card lift can respond to mouse and touch when motion is on.
- Motion Vibrancy 0 must leave content visible and useful.

## Active page contracts

Each active door has one visitor, one task and one useful outcome. The private
contract also lives beside that page in `src/site-data.mjs` so the checker can
catch later drift.

| Door | Visitor | Task | Outcome |
| --- | --- | --- | --- |
| Home | Someone arriving without prior context | Understand the purpose and choose a first action | A route into reflection, gathering or fieldwork |
| Alignment Lab | An explorer beginning privately | Use any useful local instrument | A revisable browser-local record |
| Meeting Circle | Someone ready to gather a few minds | Shape an invitation and run sheet | A calendar event and shareable meeting plan |
| Field Kit | Someone preparing a public listening or help station | Assemble one focused kit | A downloadable field plan |
| Bridge Atlas | A traveller exploring public traces | Move, filter and inspect the atlas | A useful trace or contribution draft |
| Future Watch | Someone looking for a real upcoming room | Filter source-linked events | One event to attend, influence or watch |
| Culture Compass | A listener or group carrying a live question | Choose a listening lens and notice what shifts | A short cultural trace and next move |
| Join or Build | A person or group carrying a public trace | Draft a sourced, consent-aware packet | A chosen handoff ready for human review |

Site Map and Build Log are utilities. Redirect pages preserve old links without
becoming additional visitor journeys.

## Copy boundary

- Design rationale, prompt history and planning-document analysis stay in
  repository notes.
- Public pages speak to the visitor's exploration.
- The one historical exception is a short, factual Archive note explaining
  that the old ICO did not launch and the LiveAid 2025 event did not occur.
- Em dashes are not part of this design. The site checker must fail if one
  appears in a generated public page.

## Quiet conceptual frame

The work can carry the essence of Luke Nathan Hayes and Luke Catalyst without
turning the public site into biography or founder mythology:

- Joy is the light: reveal terrain, relationships and hidden trade-offs, then
  welcome wanderers home.
- Abundance is the gift: create enough to offer, exchange and share without
  demanding allegiance.
- Responsibility is the hedge: create layered, permeable protection around
  exploration so one breach does not reach everything.
- Catalyst: lower the energy needed for meaningful change while leaving agency
  and credit with the people doing the work.

This frame should be felt through illumination, generosity, bounded exploration
and useful transformation. Do not place Luke's name, portrait, initials, coded
praise or an idolised founder story into public copy to express it.

## Songline spine

Use the i C. infinity catalogue as a private-to-repo compass, not as the subject
of the public site. `A Protopian Gambit` is a lyrical map for this build, and
`We Go Beyond` is one key in that map.

Carry the themes, not lyric blocks:

- practical hope during crisis;
- care made visible;
- civic stewardship from Earth through the Sun and the Sol system;
- going beyond safe smallness while keeping heart, source and return path;
- exploration without conquest, ownership or a singular throne.

`Every border a bridge` has at least two valid readings. One is repair and
reclamation: harmed ground, harmed people or old systems find a crossing back.
Another is acclaim and celebration: souls, seeds and shared memes already grown
become visible enough to welcome a traveller into a new country or community.
Neither reading is universally better. The page, map layer and invitation should
choose the reading that fits the circumstance.

## Spatial logic

GAJRA Earth is the safer meeting space before exploring infinity. It is not the
authority at the frontier and not the expedition itself.

The visitor journey should repeatedly support this sequence:

1. Meet and compare headings.
2. Surface tensions, permissions and possible consequences.
3. Choose a boundary and a small experiment.
4. Explore without surrendering agency.
5. Return with a trace that can be questioned or kept private.
6. Welcome wanderers home with celebration, story and new knowledge.

Every frontier pathway should preserve a visible return path. Safety language
should describe layered protection, containment and recovery rather than claim
that all harm can be made impossible.

The meeting space can also act as a threshold marketplace and workshop where
maps are bought and shared and journeys are prepared. Commercial activity
should remain transparent and voluntary, with the Strange But True licence
continuing to reserve the project's own commercial rights.

## Functional atlas roadmap

Build map pages only where location does real work. The atlas should support
flat and sphere views, neutral satellite imagery, no nation flags, no political
border layer and no implied endorsement.

Priority layers:

- Groups that have joined after human review.
- Bridge lines between groups that consent to being connected.
- Festivals and gatherings that host a GAJRA question, listening station or
  field-kit room.
- Working group general locations, with broad precision by default.
- AI labs, frontier research groups and AI for Good target-audience pathways,
  without implying United Nations or AI for Good backing.
- Data centres, labelled as infrastructure signals only when source-backed.
- Grant labs, tender labs and Straddie-style local support rooms.
- Global founder atlas records and Straddie digital twin explainers, adapted
  only after auditing the current local and remote repos.
- Starter field kits in the Strange But True and p4a-xyz-cinema style: tech
  help, public awareness, listening stations, no hard sell, meeting people
  where they are and asking what Joyful Responsible Abundance means for them.

Submission model:

1. Browser-first drafting.
2. No database in the public site.
3. Visitor chooses SMS, WhatsApp or email package handoff only after the
   destination proxy is configured.
4. Human review checks consent, source, location precision, wording and safety.
5. Reviewed public records are added to the GitHub repo as static data.

## Page-count usefulness audit

The public journey now has eight active doors, two utilities and twelve
redirect trails. A page returns to draft notes or becomes a redirect whenever
it lacks its own visitor, task and outcome. Repetition is reserved for moments
where the repeat changes the visitor's choice.

Map workbenches should appear only where the map helps someone act:

- Festivals and field-kit hosts: find places to visit, support or learn from.
- Working groups and AI labs: broad public geography with consent and no
  endorsement claim.
- Data centres and infrastructure: source-backed signals, not drama.
- Grants, tenders and local labs: practical help desks and local capability.
- Founder atlas and Straddie digital twin: only after auditing the local and
  remote repos and translating them into GAJRA Earth purpose.

## Regeneration

Run:

```powershell
npm.cmd run build
npm.cmd run check
```

`npm.cmd run build:heroes` is retained only for procedural utility and redirect
art. Running it can overwrite active raster heroes and is not part of the normal
release command.
