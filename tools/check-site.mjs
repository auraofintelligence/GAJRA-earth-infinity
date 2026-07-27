import { access, readFile, readdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { pages } from "../src/site-data.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const missing = [];
const oldClaims = [];
const heroImages = new Set();
const emDashFiles = [];
const misplacedHistory = [];
const emDash = "\u2014";

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

for (const page of pages) {
  for (const section of page.sections || []) {
    for (const card of section.cards || []) {
      if (!card.href) {
        missing.push(`${page.file}: dead-end card "${card.title}"`);
      }
    }
  }

  const filePath = resolve(root, page.file);
  const html = await readFile(filePath, "utf8");
  if (!html.includes("<!doctype html>")) missing.push(`${page.file}: doctype`);
  if (!html.includes('lang="en-AU"')) missing.push(`${page.file}: language`);
  if (!html.includes('class="skip-link"')) missing.push(`${page.file}: skip link`);
  if (!html.includes('<main id="main">')) missing.push(`${page.file}: main landmark`);
  if (!html.includes("<h1")) missing.push(`${page.file}: level-one heading`);
  if ((html.match(/<h1\b/g) || []).length !== 1) missing.push(`${page.file}: exactly one level-one heading`);
  if (!html.includes('href="site-map.html"')) missing.push(`${page.file}: site map link`);
  if (page.question) {
    const questionCount = html.split(escapeHtml(page.question)).length - 1;
    if (questionCount > 1) {
      missing.push(`${page.file}: repeated reflection question without an explicit reason`);
    }
  }
  if (/planned to launch|token sale|actively recruiting/i.test(html)) {
    oldClaims.push(page.file);
  }
  if (html.includes(emDash)) emDashFiles.push(page.file);
  if (
    page.slug !== "archive"
    && /older planning documents|unbuilt technical source material|\bICO\b|\bDAO\b|Live ?Aid 2025/i.test(html)
  ) {
    misplacedHistory.push(page.file);
  }

  if (page.worldMap) {
    const worldMapRequirements = [
      'class="page-hero world-map-visual-hero"',
      'assets/media/nasa-blue-marble-2012.jpg',
      'class="world-map-tool"',
      'data-world-map',
      'assets/world-map.js?v=',
      'assets/vendor/maplibre-gl.css?v=',
      'id="gajra-world-map-data"',
      'data-map-projection="globe"',
      'data-map-projection="mercator"',
      'data-map-record-button=',
    ];
    for (const requirement of worldMapRequirements) {
      if (!html.includes(requirement)) missing.push(`${page.file}: ${requirement}`);
    }
    const heroMatch = html.match(/<header class="page-hero world-map-visual-hero"[\s\S]*?<\/header>/);
    if (heroMatch && heroMatch[0].includes("data-world-map")) {
      missing.push(`${page.file}: functional map should not live inside the hero`);
    }
  } else if (!page.home) {
    const expectedHero = `assets/heroes/${page.slug}.webp`;
    if (!html.includes(`src="${expectedHero}"`)) {
      missing.push(`${page.file}: unique hero ${expectedHero}`);
    }
    if (heroImages.has(expectedHero)) {
      missing.push(`${page.file}: duplicate hero ${expectedHero}`);
    }
    heroImages.add(expectedHero);
  }

  for (const match of html.matchAll(/(?:href|src)="([^"#?]+)(?:[?#][^"]*)?"/g)) {
    const reference = match[1];
    if (/^(?:https?:|mailto:|tel:|data:)/.test(reference)) continue;
    const target = resolve(dirname(filePath), reference);
    try {
      await access(target);
    } catch {
      missing.push(`${page.file} -> ${reference}`);
    }
  }
}

if (oldClaims.length) {
  console.error(`Active launch language found in: ${oldClaims.join(", ")}`);
  process.exitCode = 1;
}

if (misplacedHistory.length) {
  console.error(`Old planning or launch language found outside the Archive note: ${misplacedHistory.join(", ")}`);
  process.exitCode = 1;
}

const textExtensions = new Set([".css", ".html", ".js", ".json", ".md", ".mjs", ".py", ".txt"]);

async function findEmDashes(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === ".git" || entry.name === "node_modules") continue;
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) {
      if (path === resolve(root, "assets", "vendor")) continue;
      await findEmDashes(path);
      continue;
    }
    const extension = entry.name.includes(".")
      ? entry.name.slice(entry.name.lastIndexOf(".")).toLowerCase()
      : "";
    if (!textExtensions.has(extension)) continue;
    const text = await readFile(path, "utf8");
    if (text.includes(emDash)) emDashFiles.push(path.slice(root.length + 1));
  }
}

await findEmDashes(root);

if (emDashFiles.length) {
  const uniqueEmDashFiles = [...new Set(emDashFiles)];
  console.error(`Em dash found in project text: ${uniqueEmDashFiles.join(", ")}`);
  process.exitCode = 1;
}

const labHtml = await readFile(resolve(root, "alignment-lab.html"), "utf8");
const labScript = await readFile(resolve(root, "assets/alignment-lab.js"), "utf8");
const labRequirements = [
  'data-alignment-lab',
  'data-lab-panel="jra"',
  'data-lab-panel="preference"',
  'data-lab-panel="experiment"',
  'data-lab-panel="source"',
  'data-lab-download="markdown"',
  'data-lab-download="json"',
  'data-lab-download="jsonl"',
  'aria-describedby="lab-privacy-note"',
  'role="status" aria-live="polite"',
  'aria-describedby="lab-export-note"',
  `assets/alignment-lab.js?v=`,
];
for (const requirement of labRequirements) {
  if (!labHtml.includes(requirement)) missing.push(`alignment-lab.html: ${requirement}`);
}
if (/\bfetch\s*\(|XMLHttpRequest|sendBeacon\s*\(/.test(labScript)) {
  missing.push("assets/alignment-lab.js: unexpected network transmission API");
}

const formControls = [...labHtml.matchAll(/<(input|select|textarea)\b[^>]*>/g)];
for (const control of formControls) {
  const before = labHtml.slice(Math.max(0, control.index - 250), control.index);
  const tag = control[0];
  if (!before.includes("<label") && !/aria-label=|aria-labelledby=/.test(tag)) {
    missing.push(`alignment-lab.html: unlabelled ${control[1]} control`);
  }
}

const mapHtml = await readFile(resolve(root, "ecosystem.html"), "utf8");
const mapScript = await readFile(resolve(root, "assets/world-map.js"), "utf8");
const mapData = JSON.parse(await readFile(resolve(root, "data/map-records.json"), "utf8"));
if (/tile\.openstreetmap\.org|ukraine|flagcdn|leaflet/i.test(`${mapHtml}\n${mapScript}`)) {
  missing.push("world map: forbidden map chrome or flag source");
}
if (!JSON.stringify(mapData.policy || {}).includes("No national flags")) {
  missing.push("data/map-records.json: no-flag policy");
}
if (!mapScript.includes("s2cloudless_3857")) {
  missing.push("assets/world-map.js: neutral satellite tile source");
}
if (/GeolocateControl|navigator\.geolocation/i.test(mapScript)) {
  missing.push("assets/world-map.js: unexpected geolocation request");
}

const notFoundHtml = await readFile(resolve(root, "404.html"), "utf8");
if (!notFoundHtml.includes('src="assets/heroes/not-found.webp"')) {
  missing.push("404.html: unique hero assets/heroes/not-found.webp");
}

if (missing.length) {
  console.error(`Site checks failed:\n${missing.map((item) => `- ${item}`).join("\n")}`);
  process.exitCode = 1;
}

if (!process.exitCode) {
  console.log(`Checked ${pages.length} generated pages: links, unique heroes, accessibility structure, status language and punctuation pass.`);
}
