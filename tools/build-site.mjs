import { readFile, writeFile } from "node:fs/promises";
import { pages, navGroups, site } from "../src/site-data.mjs";

const pageBySlug = new Map(pages.map((page) => [page.slug, page]));
const activePages = pages.filter((page) => !page.redirectTo);
const sequencePages = navGroups
  .flatMap((group) => group.pages)
  .map((slug) => pageBySlug.get(slug))
  .filter(Boolean);

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function isExternalHref(href = "") {
  return /^https?:\/\//.test(href);
}

function externalAttributes(href) {
  return isExternalHref(href)
    ? ' target="_blank" rel="noopener noreferrer"'
    : "";
}

function externalCue(href) {
  return isExternalHref(href)
    ? '<span class="sr-only"> (opens in a new tab)</span>'
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
        ? `<a class="signal-card" href="${card.href}"${externalAttributes(card.href)}>${body}${externalCue(card.href)}<span class="card-arrow" aria-hidden="true">&#8599;</span></a>`
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
        `<a href="${link.href}"${externalAttributes(link.href)}>${escapeHtml(link.label)}${externalCue(link.href)}<span aria-hidden="true">&#8599;</span></a>`,
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
      <a href="${source.sourceUrl}"${externalAttributes(source.sourceUrl)}>${escapeHtml(source.credit)}${externalCue(source.sourceUrl)}<span aria-hidden="true">&#8599;</span></a>
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
          <p>Your browser cannot play this film. <a href="${media.sourceUrl}"${externalAttributes(media.sourceUrl)}>Open it at the source${externalCue(media.sourceUrl)}</a>.</p>
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
      ${section.showSeam === true || (page.showSeams === true && index > 0) ? renderKintsugiSeam(`section-${page.slug}-${index}`, index) : ""}
      <section class="content-section" id="${toId(section.title)}">
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
        <p id="lab-privacy-note">Your words stay in this browser. Save locally or download a copy when you choose.</p>
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
      <button type="button" role="tab" id="lab-tab-preference" aria-controls="lab-panel-preference" aria-selected="false" data-lab-tab="preference" data-lab-optional>
        <span>02</span><strong>Compare paths</strong><small>Optional. Keep more than two doors open.</small>
      </button>
      <button type="button" role="tab" id="lab-tab-experiment" aria-controls="lab-panel-experiment" aria-selected="false" data-lab-tab="experiment" data-lab-optional>
        <span>03</span><strong>Live and observe</strong><small>Optional. Record what reality changed.</small>
      </button>
      <button type="button" role="tab" id="lab-tab-source" aria-controls="lab-panel-source" aria-selected="false" data-lab-tab="source" data-lab-optional>
        <span>04</span><strong>Source card</strong><small>Optional. Choose how the record may travel.</small>
      </button>
    </nav>

    <form class="lab-form" data-lab-form aria-describedby="lab-privacy-note">
      <section class="lab-panel" id="lab-panel-jra" role="tabpanel" aria-labelledby="lab-tab-jra" data-lab-panel="jra">
        <div class="lab-panel-heading">
          <span>Instrument 01</span>
          <h3>My Joyful Responsible Abundance map</h3>
          <p>Name a working definition for the terrain you are actually crossing, then revise it when the terrain answers back.</p>
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
            <textarea name="responsibility" data-lab-field rows="5" placeholder="Where do consent, protection, limits, checking or a safe return path belong?"></textarea>
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

      <section class="lab-panel" id="lab-panel-preference" role="tabpanel" aria-labelledby="lab-tab-preference" data-lab-panel="preference" data-lab-optional>
        <div class="lab-panel-heading">
          <span>Optional instrument 02</span>
          <h3>Compare paths without accepting a false binary.</h3>
          <p>Two options can reveal a tension while leaving another door open.</p>
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
            <label><input type="radio" name="preference" value="another" data-lab-field> I would explore another path</label>
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

      <section class="lab-panel" id="lab-panel-experiment" role="tabpanel" aria-labelledby="lab-tab-experiment" data-lab-panel="experiment" data-lab-optional>
        <div class="lab-panel-heading">
          <span>Optional instrument 03</span>
          <h3>Let reality answer back.</h3>
          <p>A lived experiment is a small, revisable action. Its value comes from what reality reveals, including surprise and disagreement.</p>
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

      <section class="lab-panel" id="lab-panel-source" role="tabpanel" aria-labelledby="lab-tab-source" data-lab-panel="source" data-lab-optional>
        <div class="lab-panel-heading">
          <span>Optional instrument 04</span>
          <h3>Choose how this record may travel.</h3>
          <p>This source card describes your record, its permissions and the context needed for any later review.</p>
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
              <option value="no_sharing">Keep private</option>
              <option value="download_review">Download for my review</option>
              <option value="explicit_later">Return to me before sharing</option>
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
            <textarea name="use_boundaries" data-lab-field rows="3" placeholder="Where may this record travel, and where does the boundary sit?"></textarea>
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
        <span>Record state</span>
        <strong><output data-lab-progress>0 answers</output></strong>
        <span class="lab-progress-track" aria-hidden="true"><span data-lab-progress-bar></span></span>
      </div>
      <div class="lab-action-buttons">
        <button type="button" class="button primary" data-lab-save>Save to this browser</button>
        <button type="button" class="button secondary" data-lab-download="markdown" aria-describedby="lab-export-note">Download Markdown</button>
        <button type="button" class="button secondary" data-lab-download="json" aria-describedby="lab-export-note">Download JSON</button>
        <button type="button" class="button secondary" data-lab-download="jsonl" aria-describedby="lab-export-note">Download JSONL</button>
        <button type="button" class="quiet-button" data-lab-clear>Clear local record</button>
      </div>
      <p id="lab-export-note">Downloads remain personal records or raw contribution material until someone deliberately reviews their context and permissions.</p>
    </footer>
  </section>`;
}

function renderMeetingTool() {
  return `<section class="planner-tool" data-planner="meeting" id="meeting-circle-builder" aria-labelledby="meeting-circle-builder-title">
    <header class="planner-intro">
      <div>
        <span class="eyebrow">Meeting circle builder</span>
        <h2 id="meeting-circle-builder-title">Make the invitation.</h2>
        <p>A title, one question, a place and a time. The result is ready to share from this browser.</p>
      </div>
      <p class="planner-status" data-planner-status role="status" aria-live="polite" aria-atomic="true">Private until you share it.</p>
    </header>
    <div class="planner-grid">
      <form class="planner-form" data-planner-form>
        <div class="lab-fields two-column">
          <label class="full-field">
            <span>Meeting title</span>
            <input type="text" name="title" placeholder="Meeting of minds for Joyful Responsible Abundance">
          </label>
          <label>
            <span>Place or link</span>
            <input type="text" name="location" placeholder="Room, town, island or call link">
          </label>
          <label>
            <span>Date</span>
            <input type="date" name="date">
          </label>
          <label>
            <span>Start time</span>
            <input type="time" name="time">
          </label>
          <label>
            <span>End time (optional)</span>
            <input type="time" name="end">
          </label>
          <label class="full-field">
            <span>The question</span>
            <textarea name="question" rows="4" placeholder="What might self-alignment and AI alignment recognise, protect and help grow here?"></textarea>
          </label>
          <label class="full-field">
            <span>Access and shared trace</span>
            <textarea name="trace" rows="3" placeholder="Access needs, private notes, anonymous themes, named public line, or no public trace"></textarea>
          </label>
        </div>
      </form>
      <aside class="planner-preview" aria-labelledby="meeting-preview-title">
        <h3 id="meeting-preview-title">Invitation preview</h3>
        <pre data-planner-output tabindex="0"></pre>
        <div class="planner-actions">
          <button type="button" class="button primary" data-planner-copy>Copy invitation</button>
          <button type="button" class="button secondary" data-planner-download>Download Markdown</button>
          <button type="button" class="button secondary" data-planner-ics>Download calendar file</button>
          <button type="button" class="button secondary" data-planner-email>Open email draft</button>
          <button type="button" class="button secondary" data-planner-whatsapp>Open WhatsApp draft</button>
        </div>
      </aside>
    </div>
  </section>`;
}

function renderEventTool() {
  return `<section class="planner-tool" data-planner="event" id="field-kit-builder" aria-labelledby="field-kit-builder-title">
    <header class="planner-intro">
      <div>
        <span class="eyebrow">Your field kit</span>
        <h2 id="field-kit-builder-title">Shape one gathering from invitation to return.</h2>
        <p>Build it on a phone or computer. The preview grows beside your answers and stays here until you copy, download or share it.</p>
      </div>
      <p class="planner-status" data-planner-status role="status" aria-live="polite" aria-atomic="true">Ready in this browser.</p>
    </header>
    <div class="planner-grid">
      <form class="planner-form" data-planner-form>
        <div class="lab-fields two-column">
          <label class="full-field">
            <span>Kit name</span>
            <input type="text" name="title" placeholder="Saturday market listening station">
          </label>
          <label>
            <span>Gathering type</span>
            <select name="kind">
              <option>Listening station</option>
              <option>Tech help corner</option>
              <option>Public question circle</option>
              <option>Festival table</option>
              <option>Workshop</option>
            </select>
          </label>
          <label>
            <span>Place</span>
            <input type="text" name="location" placeholder="Market, library, hall, island, town">
          </label>
          <label>
            <span>Date</span>
            <input type="date" name="date">
          </label>
          <label>
            <span>Start time</span>
            <input type="time" name="time">
          </label>
          <label>
            <span>End time (optional)</span>
            <input type="time" name="end">
          </label>
          <label class="full-field">
            <span>Question on the table</span>
            <textarea name="question" rows="4" placeholder="What does Joyful Responsible Abundance mean in ordinary life here?"></textarea>
          </label>
          <label>
            <span>Useful help offered</span>
            <textarea name="joy" rows="4" placeholder="Phones, forms, printing, setup, translation, listening, directions"></textarea>
          </label>
          <label>
            <span>Care and consent</span>
            <textarea name="responsibility" rows="4" placeholder="No hard sell, no hidden capture, named or anonymous by choice"></textarea>
          </label>
          <label class="full-field">
            <span>Return path</span>
            <textarea name="next" rows="3" placeholder="How can someone correct, remove or follow up on anything they shared?"></textarea>
          </label>
        </div>
      </form>
      <aside class="planner-preview" aria-labelledby="field-kit-preview-title">
        <h3 id="field-kit-preview-title">Field kit preview</h3>
        <pre data-planner-output tabindex="0"></pre>
        <div class="planner-actions">
          <button type="button" class="button primary" data-planner-copy>Copy field kit</button>
          <button type="button" class="button secondary" data-planner-download>Download Markdown</button>
          <button type="button" class="button secondary" data-planner-ics>Download calendar file</button>
          <button type="button" class="button secondary" data-planner-email>Open email draft</button>
          <button type="button" class="button secondary" data-planner-whatsapp>Open WhatsApp draft</button>
        </div>
      </aside>
    </div>
  </section>`;
}

function renderCultureTool() {
  return `<section class="planner-tool" data-culture-tool id="culture-tool" aria-labelledby="culture-tool-title">
    <header class="planner-intro">
      <div>
        <span class="eyebrow">Conversation starter</span>
        <h2 id="culture-tool-title">Make a conversation card.</h2>
        <p>Choose a lens, make a short card and share it through a channel you already use.</p>
      </div>
      <p class="planner-status" data-culture-status role="status" aria-live="polite" aria-atomic="true">Private until you choose an action.</p>
    </header>
    <div class="planner-grid">
      <form class="planner-form" data-culture-form>
        <div class="lab-fields two-column">
          <fieldset class="full-field choice-field">
            <legend>Conversation lens</legend>
            <input type="hidden" name="lens" value="joy">
            <div role="group" aria-label="Choose a conversation lens">
              <button type="button" data-culture-lens="joy" aria-pressed="true">Joy</button>
              <button type="button" data-culture-lens="responsibility" aria-pressed="false">Responsibility</button>
              <button type="button" data-culture-lens="abundance" aria-pressed="false">Abundance</button>
              <button type="button" data-culture-lens="bridge" aria-pressed="false">Every border a bridge</button>
            </div>
          </fieldset>
          <label class="full-field">
            <span>Card title</span>
            <input type="text" name="title" placeholder="A question worth carrying">
          </label>
          <label class="full-field">
            <span>What have you noticed?</span>
            <textarea name="notes" rows="4" placeholder="A story, tension, lyric, place or possibility"></textarea>
          </label>
          <label class="full-field">
            <span>Question to open</span>
            <textarea name="question" rows="3" placeholder="What would you like another mind to explore with you?"></textarea>
          </label>
          <label class="full-field">
            <span>Possible next step</span>
            <textarea name="next" rows="3" placeholder="A conversation, listening station, song, gathering or shared experiment"></textarea>
          </label>
        </div>
      </form>
      <aside class="planner-preview" aria-labelledby="culture-preview-title">
        <h3 id="culture-preview-title">Conversation card preview</h3>
        <pre data-culture-output tabindex="0"></pre>
        <div class="planner-actions">
          <button type="button" class="button primary" data-culture-copy>Copy card</button>
          <button type="button" class="button secondary" data-culture-download>Download Markdown</button>
          <button type="button" class="button secondary" data-culture-email>Open email draft</button>
          <button type="button" class="button secondary" data-culture-whatsapp>Open WhatsApp draft</button>
          <button type="button" class="button secondary" data-culture-sms>Open SMS draft</button>
        </div>
      </aside>
    </div>
  </section>`;
}

function renderContributionTool() {
  return `<section class="planner-tool" data-contribution-tool id="contribution-tool" aria-labelledby="contribution-tool-title">
    <header class="planner-intro">
      <div>
        <span class="eyebrow">Draft a trace</span>
        <h2 id="contribution-tool-title">Prepare a contribution you control.</h2>
        <p>The preview gathers the source, broad location, consent and correction route into one reviewable packet.</p>
      </div>
      <p class="planner-status" data-contribution-status role="status" aria-live="polite" aria-atomic="true">Private draft.</p>
    </header>
    <div class="planner-grid">
      <form class="planner-form" data-contribution-form>
        <div class="lab-fields two-column">
          <label class="full-field">
            <span>Trace title</span>
            <input type="text" name="title" placeholder="A name a reviewer will recognise">
          </label>
          <label>
            <span>Contribution type</span>
            <select name="contribution_type">
              <option value="group">Group or working circle</option>
              <option value="event">Event or future watch lead</option>
              <option value="atlas">Atlas trace</option>
              <option value="field-kit">Field kit</option>
              <option value="source">Source or research lead</option>
              <option value="correction">Correction</option>
            </select>
          </label>
          <label>
            <span>Contributor or group</span>
            <input type="text" name="contributor" placeholder="A name, group name or anonymous">
          </label>
          <label class="full-field">
            <span>Broad location</span>
            <input type="text" name="broad_location" placeholder="Town, island, region, country scale or online">
          </label>
          <label class="full-field">
            <span>Source link</span>
            <input type="url" name="source" inputmode="url" placeholder="https://">
          </label>
          <label class="full-field">
            <span>Public summary</span>
            <textarea name="summary" rows="5" placeholder="What is useful, who it may serve and why it belongs in the shared field"></textarea>
          </label>
          <label>
            <span>Consent for review</span>
            <select name="consent">
              <option value="private-review">Private review only</option>
              <option value="contact-first">Contact me before publication</option>
              <option value="public-candidate">Public candidate after review</option>
            </select>
          </label>
          <label>
            <span>Contact route</span>
            <input type="text" name="contact" placeholder="Email, phone or another route you choose">
          </label>
          <label class="full-field">
            <span>Correction or return path</span>
            <textarea name="correction" rows="3" placeholder="How can this trace be corrected, updated or withdrawn?"></textarea>
          </label>
        </div>
      </form>
      <aside class="planner-preview" aria-labelledby="contribution-preview-title">
        <h3 id="contribution-preview-title">Contribution package preview</h3>
        <pre data-contribution-output tabindex="0"></pre>
        <div class="planner-actions">
          <button type="button" class="button primary" data-contribution-copy>Copy package</button>
          <button type="button" class="button secondary" data-contribution-download>Download Markdown</button>
          <button type="button" class="button secondary" data-contribution-email>Open email draft</button>
          <button type="button" class="button secondary" data-contribution-whatsapp>Open WhatsApp draft</button>
          <button type="button" class="button secondary" data-contribution-sms>Open SMS draft</button>
        </div>
      </aside>
    </div>
  </section>`;
}

function formatWatchDate(record) {
  const start = new Date(`${record.dateStart}T12:00:00Z`);
  if (record.datePrecision === "month") {
    return new Intl.DateTimeFormat("en-AU", {
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }).format(start);
  }
  const format = new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
  if (!record.dateEnd || record.dateEnd === record.dateStart) return format.format(start);
  return `${format.format(start)} to ${format.format(new Date(`${record.dateEnd}T12:00:00Z`))}`;
}

function renderUpcomingWatch(data) {
  const records = [...data.records].sort((a, b) => a.dateStart.localeCompare(b.dateStart));
  const cards = records
    .map(
      (record) => `<article class="approaching-card" data-watch-record data-routes="${escapeHtml(record.routes.join(" "))}" data-search="${escapeHtml(
        [record.title, record.organiser, record.location, record.summary, record.jraQuestion, ...record.routes].join(" ").toLowerCase(),
      )}">
        <div class="approaching-date">
          <time datetime="${escapeHtml(record.dateStart)}">${escapeHtml(formatWatchDate(record))}</time>
          <span>${escapeHtml(record.access)}</span>
        </div>
        <div class="approaching-body">
          <div class="approaching-routes" aria-label="Ways to take part">
            ${record.routes.map((route) => `<span>${escapeHtml(route)}</span>`).join("")}
          </div>
          <h3>${escapeHtml(record.title)}</h3>
          <p class="approaching-meta">${escapeHtml(record.organiser)} &middot; ${escapeHtml(record.location)}</p>
          <p>${escapeHtml(record.summary)}</p>
          <p class="approaching-question"><strong>A question to carry:</strong> ${escapeHtml(record.jraQuestion)}</p>
          <p class="approaching-time">${escapeHtml(record.timeLabel)}</p>
          <div class="approaching-actions">
            <a class="button primary" href="${escapeHtml(record.actionUrl)}"${externalAttributes(record.actionUrl)}>${escapeHtml(record.actionLabel)}${externalCue(record.actionUrl)}</a>
            ${record.datePrecision === "month" ? "" : `<button class="button secondary" type="button" data-watch-calendar="${escapeHtml(record.id)}">Add to calendar</button>`}
          </div>
          <p class="approaching-source">Checked ${escapeHtml(record.checked)}${record.sourceUrl === record.actionUrl ? "" : ` &middot; <a href="${escapeHtml(record.sourceUrl)}"${externalAttributes(record.sourceUrl)}>${escapeHtml(record.sourceLabel)}${externalCue(record.sourceUrl)}</a>`}</p>
        </div>
      </article>`,
    )
    .join("");

  return `<section class="approaching-watch" data-upcoming-watch id="approaching" aria-labelledby="approaching-title">
    <header class="approaching-intro">
      <div>
        <span class="eyebrow">What is approaching</span>
        <h2 id="approaching-title">Upcoming routes into live work.</h2>
        <p>Upcoming events, consultations and broadcasts with a visible participation route. Each organiser's page carries the latest programme and access details.</p>
      </div>
      <p><strong>${records.length}</strong> source-linked opportunities<br><small>Last checked ${escapeHtml(data.updated)}</small></p>
    </header>
    <div class="approaching-controls" aria-label="Filter upcoming opportunities">
      <div class="approaching-filter" role="group" aria-label="Participation route">
        <button type="button" data-watch-filter="all" aria-pressed="true">All</button>
        <button type="button" data-watch-filter="attend" aria-pressed="false">Attend</button>
        <button type="button" data-watch-filter="influence" aria-pressed="false">Influence</button>
        <button type="button" data-watch-filter="watch" aria-pressed="false">Watch</button>
      </div>
      <label>
        <span>Search the watch</span>
        <input type="search" data-watch-search placeholder="Climate, cities, online, UN">
      </label>
      <p data-watch-status role="status" aria-live="polite">${records.length} opportunities shown.</p>
    </div>
    <div class="approaching-list" data-watch-list>${cards}</div>
    <p class="approaching-note">${escapeHtml(data.purpose)}</p>
    <script type="application/json" id="gajra-upcoming-watch-data">${serialiseJsonForHtml(data)}</script>
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
  const index = sequencePages.findIndex((page) => page.slug === currentSlug);
  const previous = index > 0 ? sequencePages[index - 1] : null;
  const next = index >= 0 && index < sequencePages.length - 1 ? sequencePages[index + 1] : null;
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

function renderWorldMapDisclosure() {
  return `<details class="source-disclosure world-map-source">
    <summary aria-label="Show map source acknowledgement" title="Map source acknowledgement"><span aria-hidden="true">i</span></summary>
    <div class="source-disclosure-panel">
      <strong>Map sources</strong>
      <p>Base imagery is Sentinel-2 cloudless by EOX IT Services GmbH, containing modified Copernicus Sentinel data 2016. The map engine is MapLibre GL JS.</p>
      <a href="docs/ASSET_PROVENANCE.md">Read map source notes<span aria-hidden="true">&#8599;</span></a>
    </div>
  </details>`;
}

function serialiseJsonForHtml(data) {
  return JSON.stringify(data).replaceAll("</", "<\\/");
}

function heroImageFor(page, fallbackSrc, fallbackWidth = 1920, fallbackHeight = 720) {
  if (typeof page.heroImage === "string") {
    return {
      src: page.heroImage,
      width: fallbackWidth,
      height: fallbackHeight,
      alt: "",
    };
  }
  if (page.heroImage && typeof page.heroImage === "object") {
    return {
      src: page.heroImage.src || fallbackSrc,
      width: page.heroImage.width || fallbackWidth,
      height: page.heroImage.height || fallbackHeight,
      alt: page.heroImage.alt || "",
    };
  }
  return {
    src: fallbackSrc,
    width: fallbackWidth,
    height: fallbackHeight,
    alt: "",
  };
}

function renderDecorativeHeroImage(page, fallbackSrc, fallbackWidth, fallbackHeight) {
  const image = heroImageFor(page, fallbackSrc, fallbackWidth, fallbackHeight);
  return `<img src="${escapeHtml(image.src)}" width="${escapeHtml(image.width)}" height="${escapeHtml(image.height)}" alt="${escapeHtml(image.alt)}">`;
}

function renderWorldMapVisualHero(page) {
  const sourceDisclosure = page.heroImage
    ? ""
    : renderSourceDisclosure(
        {
          label: "Earth image source",
          caption: "The Earth image uses NASA's 2012 Blue Marble raster. The interactive atlas opens below.",
          sourceUrl: "https://svs.gsfc.nasa.gov/30002/",
          credit: "Source and full credits: NASA SVS 30002",
        },
        "world-map-hero-source",
      );
  return `<header class="page-hero world-map-visual-hero${page.compactHero ? " compact-hero" : ""}">
    <figure class="page-hero-media" aria-hidden="true">
      ${renderDecorativeHeroImage(page, "assets/media/nasa-blue-marble-2012.jpg", 2048, 2048)}
    </figure>
    <div class="page-hero-copy">
      <span class="status-chip">${escapeHtml(page.status)}</span>
      <p class="eyebrow">${escapeHtml(page.eyebrow)}</p>
      <h1>${escapeHtml(page.title)}</h1>
      <p class="page-intro">${escapeHtml(page.intro)}</p>
    </div>
    ${sourceDisclosure}
  </header>`;
}

function renderWorldMapTool(mapRecordsData) {
  return `<section class="world-map-tool" aria-labelledby="world-map-tool-title">
    <header class="world-map-tool-head">
      <div>
        <p class="eyebrow">Bridge atlas</p>
        <h2 id="world-map-tool-title">Where the next trace appears.</h2>
        <p id="world-map-description" class="page-intro">Move between sphere and flat views, open a public trace and follow its source. Each record begins at the location scale chosen by its contributor.</p>
      </div>
      <div class="world-map-tool-panel" aria-label="Map controls">
        <div class="world-map-controls" aria-label="Map view controls">
          <button type="button" data-map-projection="globe" aria-pressed="true">Sphere</button>
          <button type="button" data-map-projection="mercator" aria-pressed="false">Flat</button>
          <button type="button" data-map-reset>Reset view</button>
        </div>
        <a class="button secondary" href="contribute.html#contribution-tool">Draft a trace</a>
      </div>
    </header>
    <div class="world-map-frame">
      <div
        id="gajra-world-map"
        class="world-map-canvas"
        data-world-map
        role="region"
        aria-describedby="world-map-description world-map-status"
        aria-label="Borderless satellite atlas of public GAJRA Earth records"
      >
        <img class="world-map-fallback" src="assets/media/nasa-blue-marble-2012.jpg" width="2048" height="2048" alt="">
      </div>
      <p class="world-map-status" id="world-map-status" role="status" aria-live="polite">Loading neutral satellite atlas.</p>
      ${renderWorldMapDisclosure()}
      <script type="application/json" id="gajra-world-map-data">${serialiseJsonForHtml(mapRecordsData)}</script>
    </div>
  </section>`;
}

function renderWorldMapLedger(mapRecordsData) {
  const records = mapRecordsData.records || [];
  const joinedRecords = records.filter((record) => record.kind !== "project-origin");
  const recordItems = records
    .map(
      (record) => `<li>
        <button type="button" data-map-record-button="${escapeHtml(record.id)}">
          <span>${escapeHtml(record.kind.replaceAll("-", " "))}</span>
          <strong>${escapeHtml(record.name)}</strong>
          <small>${escapeHtml(record.locationLabel)} &middot; ${escapeHtml(record.precision)}</small>
        </button>
        <p>${escapeHtml(record.publicNote)}</p>
        ${record.url ? `<a href="${escapeHtml(record.url)}"${externalAttributes(record.url)}>Open source${externalCue(record.url)}</a>` : ""}
      </li>`,
    )
    .join("");

  return `<section class="world-map-ledger" aria-labelledby="world-map-ledger-title">
    <div class="section-heading">
      <span class="section-number">01</span>
      <h2 id="world-map-ledger-title">Public map records.</h2>
    </div>
    <div class="world-map-ledger-grid">
      <div>
        <p class="section-lead">Select a public record to open its story, broad location and source.</p>
      </div>
      <div class="world-map-records" data-map-record-list>
        <h3>Records in view</h3>
        <ol>${recordItems}</ol>
        ${
          joinedRecords.length
            ? ""
            : `<p class="quiet-note">The first group invitation is open. Each new marker can carry consent, place precision, source notes and a way back for correction.</p>`
        }
      </div>
    </div>
  </section>`;
}

function renderHero(page, mapRecordsData) {
  if (page.worldMap) {
    return renderWorldMapVisualHero(page, mapRecordsData);
  }
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
          <a class="button primary" href="about.html#meeting-circle-builder">Plan a meeting circle</a>
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
  return `<header class="page-hero${page.compactHero ? " compact-hero" : ""}">
    <figure class="page-hero-media" aria-hidden="true">
      ${renderDecorativeHeroImage(page, `assets/heroes/${page.slug}.webp`, 1920, 720)}
    </figure>
    <div class="page-hero-copy">
      <span class="status-chip">${escapeHtml(page.status)}</span>
      <p class="eyebrow">${escapeHtml(page.eyebrow)}</p>
      <h1>${escapeHtml(page.title)}</h1>
      <p class="page-intro">${escapeHtml(page.intro)}</p>
    </div>
  </header>`;
}

function renderPage(page, buildLogMarkdown, mapRecordsData, upcomingEventsData) {
  const actionTools = [
    page.meetingTool ? renderMeetingTool() : "",
    page.upcomingWatch ? renderUpcomingWatch(upcomingEventsData) : "",
    page.eventTool ? renderEventTool() : "",
    page.cultureTool ? renderCultureTool() : "",
    page.contributionTool ? renderContributionTool() : "",
  ].join("");
  const pageContent = page.sitemap
    ? renderSitemap()
    : page.buildLog
      ? renderMarkdown(buildLogMarkdown)
      : page.worldMap
        ? `${renderWorldMapTool(mapRecordsData)}${renderWorldMapLedger(mapRecordsData)}${renderSections(page)}`
        : page.alignmentLab
          ? `${renderAlignmentLab()}${renderSections(page)}`
          : `${actionTools}${renderSections(page)}`;
  const question = page.showQuestion === true && page.question && !page.home
    ? `<aside class="question-pause" aria-labelledby="reflection-question-${page.slug}">
        <h2 id="reflection-question-${page.slug}">Question to carry</h2>
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
  ${page.worldMap ? `<link rel="stylesheet" href="assets/vendor/maplibre-gl.css?v=${site.assetVersion}">` : ""}
  <link rel="stylesheet" href="assets/site.css?v=${site.assetVersion}">
  <script>document.documentElement.classList.add("js");</script>
  <script defer src="assets/site.js?v=${site.assetVersion}"></script>
  ${page.home ? `<script defer src="assets/cosmos.js?v=${site.assetVersion}"></script>` : ""}
  ${page.alignmentLab ? `<script defer src="assets/alignment-lab.js?v=${site.assetVersion}"></script>` : ""}
  ${page.meetingTool || page.eventTool ? `<script defer src="assets/meeting-tools.js?v=${site.assetVersion}"></script>` : ""}
  ${page.upcomingWatch ? `<script defer src="assets/upcoming-watch.js?v=${site.assetVersion}"></script>` : ""}
  ${page.cultureTool ? `<script defer src="assets/culture-tool.js?v=${site.assetVersion}"></script>` : ""}
  ${page.contributionTool ? `<script defer src="assets/contribution-tool.js?v=${site.assetVersion}"></script>` : ""}
  ${page.worldMap ? `<script type="module" src="assets/world-map.js?v=${site.assetVersion}"></script>` : ""}
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
    ${renderHero(page, mapRecordsData)}
    ${page.showTicker === true ? renderTicker() : ""}
    ${page.home ? renderBelowTicker(page) : ""}
    <div class="page-shell">
      ${page.home && page.showQuestion === true && page.question ? `<div class="opening-statement"><p>${escapeHtml(page.question)}</p></div>` : ""}
      ${pageContent}
      ${question}
      ${page.showSequence === true ? renderPageSequence(page.slug) : ""}
    </div>
  </main>

  ${page.showSeams === true ? renderKintsugiSeam("footer", 1) : ""}
  <footer class="site-footer">
    <nav class="footer-map" aria-label="Footer">${renderFooter()}</nav>
    <div class="colophon">
      <p>Built on Minjerribah, Quandamooka Country, Australia. Analytics-free, cookie-free and quiet unless you choose an export.</p>
      <p><a href="site-map.html">Site map</a>. <a href="build-log.html">Build log</a>. <a href="LICENSE">Strange But True Public Source Licence</a>: non-commercial use with credit; all commercial rights reserved. <a href="${site.repositoryUrl}"${externalAttributes(site.repositoryUrl)}>Source repository${externalCue(site.repositoryUrl)}</a>.</p>
    </div>
  </footer>
  <a class="back-to-top" href="#top" aria-label="Back to top">↑</a>
</body>
</html>`;
}

function renderRedirectPage(page) {
  const target = page.redirectTo;
  const title = `${page.navLabel} has moved`;
  return `<!doctype html>
<html lang="en-AU">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="refresh" content="0; url=${escapeHtml(target)}">
  <link rel="canonical" href="${escapeHtml(target)}">
  <meta name="robots" content="noindex">
  <title>${escapeHtml(title)} · ${site.name}</title>
  <link rel="icon" href="assets/aura-heart-32.png" sizes="32x32" type="image/png">
  <link rel="stylesheet" href="assets/site.css?v=${site.assetVersion}">
</head>
<body class="error-page">
  <main id="main" class="error-panel">
    <span class="status-chip">Trail moved</span>
    <p class="eyebrow">Pruned into a useful room</p>
    <h1>${escapeHtml(title)}.</h1>
    <p>This older room now opens inside the smaller GAJRA Earth journey.</p>
    <div class="hero-actions">
      <a class="button primary" href="${escapeHtml(target)}">Open the useful room</a>
      <a class="button secondary" href="site-map.html">Open the site map</a>
    </div>
  </main>
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
  const urls = activePages
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
const mapRecordsData = JSON.parse(await readFile(new URL("../data/map-records.json", import.meta.url), "utf8"));
const upcomingEventsData = JSON.parse(await readFile(new URL("../data/upcoming-events.json", import.meta.url), "utf8"));

for (const page of pages) {
  const html = (page.redirectTo
    ? renderRedirectPage(page)
    : renderPage(page, buildLogMarkdown, mapRecordsData, upcomingEventsData)).replace(/^[\t ]+$/gm, "");
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
