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

function renderLinks(links = []) {
  if (!links.length) return "";
  return `<div class="link-field">${links
    .map(
      (link) =>
        `<a href="${link.href}"${externalAttributes(link.href)}>${escapeHtml(link.label)}<span aria-hidden="true">↗</span></a>`,
    )
    .join("")}</div>`;
}

function renderMedia(media) {
  if (!media) return "";

  const visual =
    media.type === "video"
      ? `<video data-motion-video muted loop playsinline controls preload="metadata" poster="${media.poster}" aria-label="${escapeHtml(media.alt)}">
          <source src="${media.src}" type="${media.mime}">
          <p>Your browser cannot play this film. <a href="${media.sourceUrl}"${externalAttributes(media.sourceUrl)}>Open it at the source</a>.</p>
        </video>`
      : `<picture>
          <source srcset="${media.src}" type="image/webp">
          <img src="${media.fallback}" width="${media.width}" height="${media.height}" loading="lazy" alt="${escapeHtml(media.alt)}">
        </picture>`;

  return `<figure class="media-feature media-feature--${media.type}">
    <div class="media-frame">${visual}<span class="media-halo" aria-hidden="true"></span></div>
    <figcaption>
      <span>${escapeHtml(media.label)}</span>
      <p>${escapeHtml(media.caption)}</p>
      <a href="${media.sourceUrl}"${externalAttributes(media.sourceUrl)}>${escapeHtml(media.credit)}<span aria-hidden="true">↗</span></a>
    </figcaption>
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
        <linearGradient id="${gradientId}" x1="0" y1="0" x2="1" y2="0">
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
      <path class="seam-light" pathLength="1" stroke="url(#${gradientId})" d="${shape.path}"/>
    </svg>
  </div>`;
}

function renderTicker() {
  const words = "JOY · RESPONSIBILITY · ABUNDANCE · BALANCE · CARE · PLAY · CONSENT · TRUTH · REPAIR · COURAGE ·";
  const loop = `${words} ${words}`;
  return `<div class="ticker" aria-hidden="true">
    <div class="ticker-track">
      <span class="ticker-group">${loop}</span>
      <span class="ticker-group">${loop}</span>
    </div>
  </div>`;
}

function renderSections(page) {
  return page.sections
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
        ${renderCards(section.cards)}
        ${renderLinks(section.links)}
      </section>`,
    )
    .join("");
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
    return `<section class="home-hero">
      <canvas class="cosmos-canvas" data-cosmos aria-hidden="true"></canvas>
      <div class="home-hero-scrim"></div>
      <div class="hero-copy">
        <span class="status-chip">${escapeHtml(page.status)}</span>
        <p class="eyebrow">${escapeHtml(page.eyebrow)}</p>
        <h1>I see infinity.<br><em>I choose infinity.</em></h1>
        <p>${escapeHtml(page.intro)}</p>
        <div class="hero-actions">
          <a class="button primary" href="commitment.html">Make the choice</a>
          <a class="button secondary" href="alignment-lab.html">Enter the Alignment Lab</a>
        </div>
      </div>
      <figure class="earth-threshold" aria-hidden="true">
        <img src="assets/media/nasa-iss-aurora-2025.webp" width="1920" height="1080" alt="">
      </figure>
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
      : renderSections(page);
  const question = page.question
    ? `<aside class="question-pause">
        <span>Pause here</span>
        <p>${escapeHtml(page.question)}</p>
        <a href="alignment-lab.html">Carry this question into the Lab</a>
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
