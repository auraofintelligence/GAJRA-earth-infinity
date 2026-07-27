import { readFile, writeFile } from "node:fs/promises";
import { pages, navGroups, site } from "../src/site-data.mjs";

const pageBySlug = new Map(pages.map((page) => [page.slug, page]));

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function externalAttributes(href) {
  return /^https?:\/\//.test(href)
    ? ' target="_blank" rel="noopener noreferrer"'
    : "";
}

function toId(value = "") {
  return String(value)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function renderNav(currentSlug) {
  return navGroups
    .map((group) => {
      const links = group.pages
        .map((slug) => {
          const page = pageBySlug.get(slug);
          const current = slug === currentSlug ? ' aria-current="page"' : "";
          return `<a href="${page.file}"${current}>${escapeHtml(page.navLabel)}</a>`;
        })
        .join("");
      return `<details class="nav-world"${group.pages.includes(currentSlug) ? " data-current-group" : ""}>
        <summary>${escapeHtml(group.label)}</summary>
        <div class="nav-world-links">${links}</div>
      </details>`;
    })
    .join("");
}

function renderFooter() {
  return navGroups
    .map((group) => {
      const links = group.pages
        .map((slug) => {
          const page = pageBySlug.get(slug);
          return `<li><a href="${page.file}">${escapeHtml(page.navLabel)}</a></li>`;
        })
        .join("");
      return `<div class="footer-group">
        <h2>${escapeHtml(group.label)}</h2>
        <ul>${links}</ul>
      </div>`;
    })
    .join("");
}

function renderCards(cards = []) {
  if (!cards.length) return "";
  return `<div class="card-grid">${cards
    .map((card) => {
      const body = `<span class="card-label">${escapeHtml(card.label)}</span>
        <h3>${escapeHtml(card.title)}</h3>
        <p>${escapeHtml(card.text)}</p>`;
      return card.href
        ? `<a class="signal-card" href="${card.href}"${externalAttributes(card.href)}>${body}<span class="card-arrow" aria-hidden="true">↗</span></a>`
        : `<article class="signal-card">${body}</article>`;
    })
    .join("")}</div>`;
}

function renderSteps(steps = []) {
  if (!steps.length) return "";
  return `<ol class="action-sequence">${steps
    .map(
      (step, index) => `<li>
        <span>${String(index + 1).padStart(2, "0")}</span>
        <div>
          <h3>${escapeHtml(step.title)}</h3>
          <p>${escapeHtml(step.text)}</p>
        </div>
      </li>`,
    )
    .join("")}</ol>`;
}

function renderPrompts(prompts = []) {
  if (!prompts.length) return "";
  return `<div class="prompt-grid">${prompts
    .map(
      (prompt) => `<article>
        <span>${escapeHtml(prompt.label)}</span>
        <h3>${escapeHtml(prompt.title)}</h3>
        <p>${escapeHtml(prompt.text)}</p>
      </article>`,
    )
    .join("")}</div>`;
}

function renderLinks(links = []) {
  if (!links.length) return "";
  return `<div class="link-field">${links
    .map(
      (link) =>
        `<a href="${link.href}"${externalAttributes(link.href)}>${escapeHtml(link.label)}<span aria-hidden="true">↗</span></a>`,
    )
    .join("")}</div>`;
}

function renderSourceDisclosure(source, extraClass = "", descriptionId = "") {
  const labelledSource = escapeHtml(source.label);
  const descriptionAttribute = descriptionId ? ` id="${descriptionId}"` : "";
  return `<details class="source-disclosure${extraClass ? ` ${extraClass}` : ""}">
    <summary aria-label="Show source acknowledgement: ${labelledSource}" title="Source acknowledgement"><span aria-hidden="true">i</span></summary>
    <div class="source-disclosure-panel">
      <strong>${labelledSource}</strong>
      <p${descriptionAttribute}>${escapeHtml(source.caption)}</p>
      <a href="${source.sourceUrl}"${externalAttributes(source.sourceUrl)}>${escapeHtml(source.credit)}<span aria-hidden="true">↗</span></a>
    </div>
  </details>`;
}

function renderMedia(media) {
  if (!media) return "";
  const descriptionId = `media-description-${toId(media.label)}`;

  const visual =
    media.type === "video"
      ? `<video data-motion-video muted loop playsinline controls preload="metadata" poster="${media.poster}" aria-label="${escapeHtml(media.alt)}" aria-describedby="${descriptionId}">
          <source src="${media.src}" type="${media.mime}">
          <p>Your browser cannot play this film. <a href="${media.sourceUrl}"${externalAttributes(media.sourceUrl)}>Open it at the source</a>.</p>
        </video>`
      : `<picture>
          <source srcset="${media.src}" type="image/webp">
          <img src="${media.fallback}" width="${media.width}" height="${media.height}" loading="lazy" alt="${escapeHtml(media.alt)}" aria-describedby="${descriptionId}">
        </picture>`;

  return `<figure class="media-feature media-feature--${media.type}">
    <div class="media-frame">${visual}</div>
    ${renderSourceDisclosure(media, "", descriptionId)}
  </figure>`;
}

const seamShapes = [
  {
    path: "M0 24 L130 20 L215 28 L305 14 L360 26 L475 18 L530 30 L645 16 L740 24 L810 10 L890 26 L1000 18 L1090 26 L1200 22",
    branches: ["M305 14 L320 4", "M530 30 L545 42", "M810 10 L796 2", "M1000 18 L1016 35"],
  },
  {
    path: "M0 22 L110 26 L190 14 L275 28 L370 18 L440 30 L560 16 L650 24 L760 12 L850 26 L940 18 L1050 28 L1130 20 L1200 24",
    branches: ["M190 14 L176 4", "M440 30 L452 42", "M760 12 L774 3", "M1050 28 L1037 41"],
  },
];

function renderKintsugiSeam(id, variant = 0) {
  const shape = seamShapes[variant % seamShapes.length];
  const gradientId = `rgb-${id}`;
  return `<div class="kintsugi-seam" data-kintsugi aria-hidden="true">
    <svg viewBox="0 0 1200 46" preserveAspectRatio="none" focusable="false">
      <defs>
        <linearGradient class="seam-gradient" id="${gradientId}" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#ff4654"/>
          <stop offset=".17" stop-color="#ffbf52"/>
          <stop offset=".35" stop-color="#73f4df"/>
          <stop offset=".54" stop-color="#236bff"/>
          <stop offset=".72" stop-color="#b194ff"/>
          <stop offset=".87" stop-color="#ff5ba3"/>
          <stop offset="1" stop-color="#ff4654"/>
        </linearGradient>
      </defs>
      <path class="seam-path" pathLength="1" stroke="url(#${gradientId})" d="${shape.path}"/>
      ${shape.branches
        .map(
          (branch) =>
            `<path class="seam-path seam-branch" pathLength="1" stroke="url(#${gradientId})" d="${branch}"/>`,
        )
        .join("")}
    </svg>
  </div>`;
}

function renderTicker() {
  const words = ["Joy", "Responsibility", "Abundance", "Balance", "Care", "Play", "Consent", "Truth", "Repair", "Courage"];
  const loop = words
    .map((word) => `<span class="ticker-word">${escapeHtml(word)}</span>`)
    .join("");
  return `<div class="ticker" aria-hidden="true">
    <div class="ticker-track">
      <span class="ticker-group">${loop}</span><span class="ticker-group">${loop}</span>
    </div>
  </div>`;
}

function renderSections(page) {
  return page.sections
    .filter((section) => section.placement !== "below-ticker")
    .map(
      (section, index) => `
      ${index ? renderKintsugiSeam(`section-${page.slug}-${index}`, index) : ""}
      <section class="content-section">
        <div class="section-heading">
          <span class="section-number">${String(index + 1).padStart(2, "0")}</span>
          <h2>${escapeHtml(section.title)}</h2>
        </div>
        ${section.lead ? `<p class="section-lead">${escapeHtml(section.lead)}</p>` : ""}
        ${(section.paragraphs || []).map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
        ${renderMedia(section.media)}
        ${renderSteps(section.steps)}
        ${renderPrompts(section.prompts)}
        ${renderCards(section.cards)}
        ${renderLinks(section.links)}
      </section>`,
    )
    .join("");
}

function renderBelowTicker(page) {
  const section = page.sections.find((candidate) => candidate.placement === "below-ticker");
  if (!section?.media) return "";
  return `<section class="home-observation" aria-label="${escapeHtml(section.title)}">
    ${renderMedia(section.media)}
  </section>`;
}

function renderAlignmentLab() {
  return `<section class="alignment-lab" data-alignment-lab id="lab-workbench">
    <header class="lab-intro">
      <div>
        <span class="eyebrow">Private workbench</span>
        <h2>Make a map you can revise.</h2>
        <p id="lab-privacy-note">This tool does not send your words anywhere. Save to this browser only when you choose, or download a copy you control.</p>
      </div>
      <div class="lab-local-state">
        <span aria-hidden="true">●</span>
        <strong>Local only</strong>
        <small data-lab-state role="status" aria-live="polite" aria-atomic="true">No record saved on this device.</small>
      </div>
    </header>

    <nav class="lab-tabs" aria-label="Alignment Lab instruments" role="tablist">
      <button type="button" role="tab" id="lab-tab-jra" aria-controls="lab-panel-jra" aria-selected="true" data-lab-tab="jra">
        <span>01</span><strong>My JRA map</strong><small>Name your coordinates.</small>
      </button>
      <button type="button" role="tab" id="lab-tab-preference" aria-controls="lab-panel-preference" aria-selected="false" data-lab-tab="preference">
        <span>02</span><strong>Compare paths</strong><small>Keep more than two doors open.</small>
      </button>
      <button type="button" role="tab" id="lab-tab-experiment" aria-controls="lab-panel-experiment" aria-selected="false" data-lab-tab="experiment">
        <span>03</span><strong>Live and observe</strong><small>Record what reality changed.</small>
      </button>
      <button type="button" role="tab" id="lab-tab-source" aria-controls="lab-panel-source" aria-selected="false" data-lab-tab="source">
        <span>04</span><strong>Source card</strong><small>Choose how the record may travel.</small>
      </button>
    </nav>

    <form class="lab-form" data-lab-form aria-describedby="lab-privacy-note">
      <section class="lab-panel" id="lab-panel-jra" role="tabpanel" aria-labelledby="lab-tab-jra" data-lab-panel="jra">
        <div class="lab-panel-heading">
          <span>Instrument 01</span>
          <h3>My Joyful Responsible Abundance map</h3>
          <p>There is no final definition hiding here. Name what these ideas mean in the terrain you are actually crossing.</p>
        </div>
        <div class="lab-fields two-column">
          <label class="full-field">
            <span>Record title</span>
            <input type="text" name="record_title" data-lab-field placeholder="A short name you will recognise later">
          </label>
          <label>
            <span>Life, project or question</span>
            <input type="text" name="context_domain" data-lab-field placeholder="Home, work, research, event, community">
          </label>
          <label>
            <span>Place or culture, as broad as you choose</span>
            <input type="text" name="place_culture" data-lab-field placeholder="Optional">
          </label>
          <label class="value-field joy-field">
            <span>Joy is the light</span>
            <textarea name="joy" data-lab-field rows="5" placeholder="What makes this life or situation worth illuminating?"></textarea>
          </label>
          <label class="value-field responsibility-field">
            <span>Responsibility is the hedge</span>
            <textarea name="responsibility" data-lab-field rows="5" placeholder="What needs consent, protection, limits, checking or a safe return path?"></textarea>
          </label>
          <label class="value-field abundance-field">
            <span>Abundance is the gift</span>
            <textarea name="abundance" data-lab-field rows="5" placeholder="What capability, time, care, knowledge or choice could grow here?"></textarea>
          </label>
          <label class="value-field balance-field">
            <span>Balance is the catalyst</span>
            <textarea name="balance" data-lab-field rows="5" placeholder="Where do these values pull in different directions, and what may help them move together?"></textarea>
          </label>
          <label class="full-field">
            <span>Who or what could be affected?</span>
            <textarea name="stakeholders" data-lab-field rows="3" placeholder="People, communities, other species, places, future generations"></textarea>
          </label>
        </div>
      </section>

      <section class="lab-panel" id="lab-panel-preference" role="tabpanel" aria-labelledby="lab-tab-preference" data-lab-panel="preference">
        <div class="lab-panel-heading">
          <span>Instrument 02</span>
          <h3>Compare paths without accepting a false binary.</h3>
          <p>Two options can reveal a tension. They do not have to imprison the question.</p>
        </div>
        <div class="lab-fields two-column">
          <label>
            <span>Path A</span>
            <textarea name="path_a" data-lab-field rows="5" placeholder="One plausible action, policy or future"></textarea>
          </label>
          <label>
            <span>Path B</span>
            <textarea name="path_b" data-lab-field rows="5" placeholder="Another plausible action, policy or future"></textarea>
          </label>
          <fieldset class="full-field choice-field">
            <legend>Where are you leaning now?</legend>
            <label><input type="radio" name="preference" value="path_a" data-lab-field> Path A</label>
            <label><input type="radio" name="preference" value="path_b" data-lab-field> Path B</label>
            <label><input type="radio" name="preference" value="conditional" data-lab-field> Both, under different conditions</label>
            <label><input type="radio" name="preference" value="neither" data-lab-field> Neither</label>
            <label><input type="radio" name="preference" value="another" data-lab-field> I need another path</label>
          </fieldset>
          <label class="full-field">
            <span>Conditions, reasoning and missing options</span>
            <textarea name="preference_reasoning" data-lab-field rows="5" placeholder="What matters in this context? What would change your leaning?"></textarea>
          </label>
          <label class="full-field range-field">
            <span id="uncertainty-label">Uncertainty <output data-uncertainty-output>50</output>%</span>
            <input type="range" name="uncertainty" data-lab-field data-uncertainty min="0" max="100" value="50" aria-labelledby="uncertainty-label" aria-describedby="uncertainty-help">
            <small id="uncertainty-help">0 means your current view feels clear. 100 means the map is mostly fog.</small>
          </label>
        </div>
      </section>

      <section class="lab-panel" id="lab-panel-experiment" role="tabpanel" aria-labelledby="lab-tab-experiment" data-lab-panel="experiment">
        <div class="lab-panel-heading">
          <span>Instrument 03</span>
          <h3>Let reality answer back.</h3>
          <p>A lived experiment is a small, revisable action. It is not a performance score or proof that the idea is universally right.</p>
        </div>
        <div class="lab-fields two-column">
          <label class="full-field">
            <span>Commitment</span>
            <textarea name="commitment" data-lab-field rows="3" placeholder="What small practice will you try?"></textarea>
          </label>
          <label>
            <span>Before: baseline</span>
            <textarea name="baseline" data-lab-field rows="5" placeholder="What is happening now, before the experiment?"></textarea>
          </label>
          <label>
            <span>Action and boundary</span>
            <textarea name="action_boundary" data-lab-field rows="5" placeholder="What will you do, for how long, and what limit will you keep?"></textarea>
          </label>
          <label>
            <span>Observed outcome</span>
            <textarea name="observed_outcome" data-lab-field rows="5" placeholder="What actually changed?"></textarea>
          </label>
          <label>
            <span>Unexpected effects</span>
            <textarea name="unexpected_effects" data-lab-field rows="5" placeholder="What surprised you, helped elsewhere or created a new cost?"></textarea>
          </label>
          <label class="full-field">
            <span>Externalities and people not in the room</span>
            <textarea name="externalities" data-lab-field rows="4" placeholder="Who or what carried a cost, risk or benefit that was easy to miss?"></textarea>
          </label>
          <label>
            <span>Next move</span>
            <select name="next_move" data-lab-field>
              <option value="">Choose later</option>
              <option value="repeat">Repeat</option>
              <option value="change">Change</option>
              <option value="stop">Stop</option>
              <option value="share">Share carefully</option>
              <option value="teach">Teach with context</option>
            </select>
          </label>
          <label>
            <span>Revision</span>
            <textarea name="revision" data-lab-field rows="4" placeholder="What would you redraw before the next journey?"></textarea>
          </label>
        </div>
      </section>

      <section class="lab-panel" id="lab-panel-source" role="tabpanel" aria-labelledby="lab-tab-source" data-lab-panel="source">
        <div class="lab-panel-heading">
          <span>Instrument 04</span>
          <h3>Choose how this record may travel.</h3>
          <p>This source card describes your record. It does not make the record training-ready or grant permission you have not chosen.</p>
        </div>
        <div class="lab-fields two-column">
          <label>
            <span>Authorship</span>
            <select name="authorship" data-lab-field>
              <option value="human">Human-authored</option>
              <option value="ai_assisted">AI-assisted</option>
              <option value="synthetic">AI-generated or synthetic</option>
              <option value="mixed">Mixed</option>
            </select>
          </label>
          <label>
            <span>Tool, model or seed</span>
            <input type="text" name="assistance" data-lab-field placeholder="Optional, include what materially shaped the record">
          </label>
          <label>
            <span>Privacy</span>
            <select name="privacy" data-lab-field>
              <option value="private_local">Private local draft</option>
              <option value="anonymous_review">Anonymous review copy</option>
              <option value="named_review">Named review copy</option>
              <option value="public_candidate">Possible public contribution</option>
            </select>
          </label>
          <label>
            <span>Consent</span>
            <select name="consent" data-lab-field>
              <option value="no_sharing">Do not share</option>
              <option value="download_review">Download for my review</option>
              <option value="explicit_later">Ask me again before any sharing</option>
            </select>
          </label>
          <label>
            <span>Licence</span>
            <select name="record_licence" data-lab-field>
              <option value="undecided">Private draft, undecided</option>
              <option value="cc_by_4">CC BY 4.0</option>
              <option value="cc0">CC0 public domain dedication</option>
              <option value="custom">Custom terms written below</option>
            </select>
          </label>
          <label>
            <span>Review state</span>
            <select name="review_state" data-lab-field>
              <option value="draft">Draft</option>
              <option value="self_reviewed">Self-reviewed</option>
              <option value="peer_reviewed">Reviewed with another person</option>
              <option value="revised">Revised after consequences</option>
            </select>
          </label>
          <label class="full-field">
            <span>Intended uses</span>
            <textarea name="intended_uses" data-lab-field rows="3" placeholder="What could this record usefully inform?"></textarea>
          </label>
          <label class="full-field">
            <span>Boundaries and prohibited uses</span>
            <textarea name="use_boundaries" data-lab-field rows="3" placeholder="Where should this record not travel or be used?"></textarea>
          </label>
          <label class="full-field">
            <span>Known blind spots</span>
            <textarea name="blind_spots" data-lab-field rows="3" placeholder="Whose view, experience or evidence is missing?"></textarea>
          </label>
        </div>
      </section>
    </form>

    <footer class="lab-actions">
      <div class="lab-progress" aria-live="polite">
        <span>Map filled</span>
        <strong><output data-lab-progress>0</output>%</strong>
        <span class="lab-progress-track" aria-hidden="true"><span data-lab-progress-bar></span></span>
      </div>
      <div class="lab-action-buttons">
        <button type="button" class="button primary" data-lab-save>Save to this browser</button>
        <button type="button" class="button secondary" data-lab-download="markdown" aria-describedby="lab-export-note">Download Markdown</button>
        <button type="button" class="button secondary" data-lab-download="json" aria-describedby="lab-export-note">Download JSON</button>
        <button type="button" class="button secondary" data-lab-download="jsonl" aria-describedby="lab-export-note">Download JSONL</button>
        <button type="button" class="quiet-button" data-lab-clear>Clear local record</button>
      </div>
      <p id="lab-export-note">Downloads are personal records or raw contribution material. They are not automatically valid training datasets.</p>
    </footer>
  </section>`;
}

function renderSitemap() {
  return `<div class="map-grid">${navGroups
    .map(
      (group) => `<section>
        <span class="map-label">${escapeHtml(group.label)}</span>
        ${group.pages
          .map((slug) => {
            const page = pageBySlug.get(slug);
            return `<a href="${page.file}">
              <strong>${escapeHtml(page.navLabel)}</strong>
              <span>${escapeHtml(page.description)}</span>
            </a>`;
          })
          .join("")}
      </section>`,
    )
    .join("")}</div>`;
}

function renderMarkdown(markdown) {
  const lines = markdown.split(/\r?\n/);
  const output = [];
  let listOpen = false;

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (line.startsWith("- ")) {
      if (!listOpen) {
        output.push("<ul>");
        listOpen = true;
      }
      output.push(`<li>${escapeHtml(line.slice(2))}</li>`);
      continue;
    }
    if (listOpen) {
      output.push("</ul>");
      listOpen = false;
    }
    if (!line) continue;
    if (line.startsWith("## ")) {
      output.push(`<h2>${escapeHtml(line.slice(3))}</h2>`);
    } else if (line.startsWith("# ")) {
      output.push(`<h2>${escapeHtml(line.slice(2))}</h2>`);
    } else {
      output.push(`<p>${escapeHtml(line)}</p>`);
    }
  }
  if (listOpen) output.push("</ul>");
  return `<div class="build-entries">${output.join("")}</div>`;
}

function renderPageSequence(currentSlug) {
  const index = pages.findIndex((page) => page.slug === currentSlug);
  const previous = index > 0 ? pages[index - 1] : null;
  const next = index < pages.length - 1 ? pages[index + 1] : null;
  return `<nav class="page-sequence" aria-label="Page sequence">
    ${
      previous
        ? `<a class="sequence-link previous" href="${previous.file}"><span>Previous</span><strong>${escapeHtml(previous.navLabel)}</strong></a>`
        : "<span></span>"
    }
    ${
      next
        ? `<a class="sequence-link next" href="${next.file}"><span>Next</span><strong>${escapeHtml(next.navLabel)}</strong></a>`
        : "<span></span>"
    }
  </nav>`;
}

function renderMotionControl() {
  return `<details class="motion-control">
    <summary aria-label="Open Motion Vibrancy control">
      <span class="motion-glyph" aria-hidden="true"></span>
      <span>Motion</span>
      <output data-motion-summary>50</output>
    </summary>
    <div class="motion-panel">
      <label for="motion-vibrancy">Motion Vibrancy</label>
      <p id="motion-help">0 is still. 50 is balanced. 100 is highly expressive.</p>
      <div class="motion-row">
        <input id="motion-vibrancy" data-motion-slider type="range" min="0" max="100" step="1" value="50" aria-describedby="motion-help">
        <output for="motion-vibrancy" data-motion-output>50</output>
      </div>
      <button type="button" data-motion-reset>Reset to 50</button>
    </div>
  </details>`;
}

function renderHero(page) {
  if (page.home) {
    return `<section class="home-hero" aria-labelledby="home-choice-title">
      <canvas class="cosmos-canvas" data-cosmos aria-hidden="true"></canvas>
      <p class="sr-only">A labelled orbital diagram shows our Sol system with Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus and Neptune. The diagram is not to scale.</p>
      <div class="home-hero-scrim"></div>
      <div class="hero-copy">
        <span class="status-chip">${escapeHtml(page.status)}</span>
        <p class="eyebrow">${escapeHtml(page.eyebrow)}</p>
        <h1 id="home-choice-title">I see infinity.<br><em>I choose infinity.</em></h1>
        <p>${escapeHtml(page.intro)}</p>
        <div class="hero-actions">
          <a class="button primary" href="commitment.html">Make the choice</a>
          <a class="button secondary" href="alignment-lab.html">Enter the Alignment Lab</a>
        </div>
      </div>
      ${renderSourceDisclosure(
        {
          label: "Earth image in our Sol system",
          caption: "The orbital model shows Sol and the eight named planets. Earth is drawn from the 2012 Suomi NPP Blue Marble raster. The diagram is not to scale.",
          sourceUrl: "https://svs.gsfc.nasa.gov/30002/",
          credit: "Source and full credits · NASA SVS 30002",
        },
        "sol-source-disclosure",
      )}
    </section>`;
  }
  return `<header class="page-hero">
    <figure class="page-hero-media" aria-hidden="true">
      <img src="assets/heroes/${escapeHtml(page.slug)}.webp" width="1920" height="720" alt="">
    </figure>
    <div class="page-hero-copy">
      <span class="status-chip">${escapeHtml(page.status)}</span>
      <p class="eyebrow">${escapeHtml(page.eyebrow)}</p>
      <h1>${escapeHtml(page.title)}</h1>
      <p class="page-intro">${escapeHtml(page.intro)}</p>
    </div>
  </header>`;
}

function renderPage(page, buildLogMarkdown) {
  const pageContent = page.sitemap
    ? renderSitemap()
    : page.buildLog
      ? renderMarkdown(buildLogMarkdown)
      : page.alignmentLab
        ? renderAlignmentLab()
        : renderSections(page);
  const question = page.question && !page.home
    ? `<aside class="question-pause" aria-labelledby="reflection-question-${page.slug}">
        <h2 id="reflection-question-${page.slug}">Pause here</h2>
        <p>${escapeHtml(page.question)}</p>
        <a href="${page.alignmentLab ? "#lab-workbench" : "alignment-lab.html"}">${page.alignmentLab ? "Open the first instrument" : "Carry this question into the Lab"}</a>
      </aside>`
    : "";

  return `<!doctype html>
<html lang="en-AU">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(page.title)} · ${site.name}</title>
  <meta name="description" content="${escapeHtml(page.description)}">
  <meta name="theme-color" content="#07070a">
  <meta property="og:title" content="${escapeHtml(page.title)} · ${site.name}">
  <meta property="og:description" content="${escapeHtml(page.description)}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${site.baseUrl}${page.file}">
  <link rel="icon" href="assets/aura-heart-32.png" sizes="32x32" type="image/png">
  <link rel="icon" href="assets/aura-heart-192.png" sizes="192x192" type="image/png">
  <link rel="apple-touch-icon" href="assets/aura-heart-180.png">
  <link rel="stylesheet" href="assets/site.css?v=${site.assetVersion}">
  <script>document.documentElement.classList.add("js");</script>
  <script defer src="assets/site.js?v=${site.assetVersion}"></script>
  ${page.home ? `<script defer src="assets/cosmos.js?v=${site.assetVersion}"></script>` : ""}
  ${page.alignmentLab ? `<script defer src="assets/alignment-lab.js?v=${site.assetVersion}"></script>` : ""}
</head>
<body id="top" data-page="${page.slug}">
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header">
    <a class="brand" href="index.html" aria-label="${site.name} home">
      <img class="brand-mark" src="assets/aura-heart-192.png" width="192" height="192" alt="">
      <span><strong>${site.name}</strong><small>${site.longName}</small></span>
    </a>
    <button class="menu-toggle" type="button" data-menu-toggle aria-expanded="false" aria-controls="primary-navigation">Menu</button>
    <nav id="primary-navigation" class="primary-navigation" aria-label="Primary" data-primary-nav>
      ${renderNav(page.slug)}
    </nav>
    ${renderMotionControl()}
  </header>

  <main id="main">
    ${renderHero(page)}
    ${renderTicker()}
    ${page.home ? renderBelowTicker(page) : ""}
    <div class="page-shell">
      ${page.home ? `<div class="opening-statement"><p>${escapeHtml(page.question)}</p></div>` : ""}
      ${pageContent}
      ${question}
      ${renderPageSequence(page.slug)}
    </div>
  </main>

  ${renderKintsugiSeam("footer", 1)}
  <footer class="site-footer">
    <div class="footer-intro">
      <span class="eyebrow">${site.buildLabel}</span>
      <h2>A living public doorway.</h2>
      <p>This site is an evolving concept, practice and research invitation, not a registered global association or announced global event.</p>
    </div>
    <div class="footer-map">${renderFooter()}</div>
    <div class="colophon">
      <p>Built on Minjerribah, Quandamooka Country, Australia. No analytics, cookies or invisible form transmission.</p>
      <p><a href="LICENSE">Strange But True Public Source Licence</a>: non-commercial use with credit; all commercial rights reserved. <a href="${site.repositoryUrl}" target="_blank" rel="noopener noreferrer">Source repository</a>.</p>
    </div>
  </footer>
  <a class="back-to-top" href="#top" aria-label="Back to top">↑</a>
</body>
</html>`;
}

function render404() {
  return `<!doctype html>
<html lang="en-AU">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Room not found · ${site.name}</title>
  <meta name="robots" content="noindex">
  <link rel="icon" href="assets/aura-heart-32.png" sizes="32x32" type="image/png">
  <link rel="apple-touch-icon" href="assets/aura-heart-180.png">
  <link rel="stylesheet" href="assets/site.css?v=${site.assetVersion}">
</head>
<body class="error-page">
  <figure class="error-hero-media" aria-hidden="true">
    <img src="assets/heroes/not-found.webp" width="1920" height="720" alt="">
  </figure>
  <main id="main" class="error-panel">
    <span class="status-chip">404</span>
    <p class="eyebrow">This room has not been strung yet</p>
    <h1>The thread continues elsewhere.</h1>
    <p>Try the complete site map or return to the choice.</p>
    <div class="hero-actions">
      <a class="button primary" href="index.html">Return home</a>
      <a class="button secondary" href="site-map.html">Open the site map</a>
    </div>
  </main>
</body>
</html>`;
}

function renderSitemapXml() {
  const urls = pages
    .map(
      (page) => `  <url>
    <loc>${site.baseUrl}${page.file}</loc>
  </url>`,
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

const buildLogMarkdown = await readFile(new URL("../BUILD_LOG.md", import.meta.url), "utf8");

for (const page of pages) {
  const html = renderPage(page, buildLogMarkdown).replace(/^[\t ]+$/gm, "");
  await writeFile(
    new URL(`../${page.file}`, import.meta.url),
    html,
    "utf8",
  );
}

await writeFile(new URL("../404.html", import.meta.url), render404(), "utf8");
await writeFile(new URL("../sitemap.xml", import.meta.url), renderSitemapXml(), "utf8");
await writeFile(
  new URL("../robots.txt", import.meta.url),
  `User-agent: *\nAllow: /\nSitemap: ${site.baseUrl}sitemap.xml\n`,
  "utf8",
);

console.log(`Built ${pages.length} pages, 404.html, sitemap.xml and robots.txt.`);
