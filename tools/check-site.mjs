import { access, readFile, readdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { navGroups, pages } from "../src/site-data.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const missing = [];
const oldClaims = [];
const heroImages = new Set();
const emDashFiles = [];
const misplacedHistory = [];
const emDash = "\u2014";
const expectedDoorSlugs = [
  "index",
  "alignment-lab",
  "about",
  "events",
  "ecosystem",
  "frontier-labs",
  "culture",
  "contribute",
];
const navDoorSlugs = navGroups.flatMap((group) => group.pages);
const pageBySlug = new Map(pages.map((page) => [page.slug, page]));
const htmlCache = new Map();

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function expectedHeroSource(page) {
  if (typeof page.heroImage === "string") return page.heroImage;
  if (page.heroImage && typeof page.heroImage === "object") return page.heroImage.src;
  return `assets/heroes/${page.slug}.webp`;
}

function countMatches(text, pattern) {
  return [...text.matchAll(pattern)].length;
}

async function readHtml(filePath) {
  if (!htmlCache.has(filePath)) {
    htmlCache.set(filePath, await readFile(filePath, "utf8"));
  }
  return htmlCache.get(filePath);
}

function hasFragment(html, fragment) {
  let decoded = fragment;
  try {
    decoded = decodeURIComponent(fragment);
  } catch {
    decoded = fragment;
  }
  const escaped = escapeHtml(decoded);
  return html.includes(`id="${escaped}"`) || html.includes(`name="${escaped}"`);
}

async function checkInternalReference(sourceFilePath, sourceFile, reference) {
  if (/^(?:https?:|mailto:|tel:|data:|javascript:)/i.test(reference)) return;
  const [pathAndQuery, rawFragment = ""] = reference.split("#", 2);
  const pathPart = pathAndQuery.split("?", 1)[0];
  const target = pathPart
    ? pathPart.startsWith("/")
      ? resolve(root, pathPart.replace(/^\/+/, ""))
      : resolve(dirname(sourceFilePath), pathPart)
    : sourceFilePath;
  try {
    await access(target);
  } catch {
    missing.push(`${sourceFile} -> ${pathPart || reference}`);
    return;
  }
  if (!rawFragment) return;
  const targetHtml = await readHtml(target);
  if (!hasFragment(targetHtml, rawFragment)) {
    missing.push(`${sourceFile} -> ${pathPart || sourceFile}#${rawFragment}: missing fragment target`);
  }
}

if (
  navDoorSlugs.length !== expectedDoorSlugs.length
  || navDoorSlugs.some((slug, index) => slug !== expectedDoorSlugs[index])
) {
  missing.push(`navigation doors: expected ${expectedDoorSlugs.join(", ")}, found ${navDoorSlugs.join(", ")}`);
}
if (new Set(navDoorSlugs).size !== navDoorSlugs.length) {
  missing.push("navigation doors: duplicate page");
}
for (const slug of expectedDoorSlugs) {
  const page = pageBySlug.get(slug);
  if (!page || page.redirectTo) {
    missing.push(`navigation door ${slug}: missing active page`);
    continue;
  }
  for (const field of ["visitor", "task", "outcome"]) {
    if (!page.contract || typeof page.contract[field] !== "string" || !page.contract[field].trim()) {
      missing.push(`${page.file}: private contract.${field}`);
    }
  }
}

for (const page of pages) {
  const filePath = resolve(root, page.file);
  const html = await readHtml(filePath);

  if (page.redirectTo) {
    if (!html.includes("<!doctype html>")) missing.push(`${page.file}: doctype`);
    if (!html.includes('lang="en-AU"')) missing.push(`${page.file}: language`);
    if (!html.includes('http-equiv="refresh"')) missing.push(`${page.file}: redirect refresh`);
    if (!html.includes(`href="${escapeHtml(page.redirectTo)}"`)) missing.push(`${page.file}: redirect link`);
    await checkInternalReference(filePath, page.file, page.redirectTo);
    continue;
  }

  for (const section of page.sections || []) {
    for (const card of section.cards || []) {
      if (!card.href) {
        missing.push(`${page.file}: dead-end card "${card.title}"`);
      }
    }
  }

  if (!html.includes("<!doctype html>")) missing.push(`${page.file}: doctype`);
  if (!html.includes('lang="en-AU"')) missing.push(`${page.file}: language`);
  if (!html.includes('class="skip-link"')) missing.push(`${page.file}: skip link`);
  if (!html.includes('<main id="main">')) missing.push(`${page.file}: main landmark`);
  if (!html.includes("<h1")) missing.push(`${page.file}: level-one heading`);
  if ((html.match(/<h1\b/g) || []).length !== 1) missing.push(`${page.file}: exactly one level-one heading`);
  if (!html.includes('href="site-map.html"')) missing.push(`${page.file}: site map link`);
  if (html.includes(">Pause here<")) missing.push(`${page.file}: generic Pause heading`);
  if (navDoorSlugs.includes(page.slug) && page.contract) {
    for (const value of Object.values(page.contract)) {
      if (value && html.includes(escapeHtml(value))) {
        missing.push(`${page.file}: private page contract rendered front-facing`);
      }
    }
  }

  const tickerCount = countMatches(html, /class="ticker"/g);
  if (page.showTicker === true ? tickerCount !== 1 : tickerCount !== 0) {
    missing.push(`${page.file}: showTicker contract`);
  }
  const questionSurfaceCount =
    countMatches(html, /class="question-pause"/g)
    + countMatches(html, /class="opening-statement"/g);
  const shouldShowQuestion = page.showQuestion === true && Boolean(page.question);
  if (shouldShowQuestion ? questionSurfaceCount !== 1 : questionSurfaceCount !== 0) {
    missing.push(`${page.file}: showQuestion contract`);
  }
  const sequenceCount = countMatches(html, /class="page-sequence"/g);
  if (page.showSequence === true ? sequenceCount !== 1 : sequenceCount !== 0) {
    missing.push(`${page.file}: showSequence contract`);
  }
  const seamCount = countMatches(html, /class="kintsugi-seam"/g);
  const sectionSeamOptIn = (page.sections || []).some((section) => section.showSeam === true);
  if (page.showSeams !== true && !sectionSeamOptIn && seamCount !== 0) {
    missing.push(`${page.file}: decorative seam without opt-in`);
  }
  if (page.compactHero === true && !html.includes("compact-hero")) {
    missing.push(`${page.file}: compactHero contract`);
  }
  const pageAssetContracts = [
    [page.alignmentLab === true, "assets/alignment-lab.js?v="],
    [page.meetingTool === true || page.eventTool === true, "assets/meeting-tools.js?v="],
    [page.upcomingWatch === true, "assets/upcoming-watch.js?v="],
    [page.worldMap === true, "assets/world-map.js?v="],
    [page.cultureTool === true, "assets/culture-tool.js?v="],
    [page.contributionTool === true, "assets/contribution-tool.js?v="],
  ];
  for (const [enabled, asset] of pageAssetContracts) {
    if (enabled !== html.includes(asset)) missing.push(`${page.file}: asset contract ${asset}`);
  }
  for (const externalLink of html.matchAll(/<a\b(?=[^>]*target="_blank")[^>]*>([\s\S]*?)<\/a>/g)) {
    if (!externalLink[1].includes("opens in a new tab")) {
      missing.push(`${page.file}: external new-tab link lacks an accessible cue`);
    }
  }
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
      'class="page-hero world-map-visual-hero',
      'class="world-map-tool"',
      'data-world-map',
      'role="region"',
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
    const expectedMapHero = page.heroImage
      ? expectedHeroSource(page)
      : "assets/media/nasa-blue-marble-2012.jpg";
    if (!html.includes(`src="${expectedMapHero}"`)) missing.push(`${page.file}: map hero ${expectedMapHero}`);
    if (html.includes('role="application"')) missing.push(`${page.file}: world map should be a labelled region`);
    if (countMatches(html, />Draft a trace</g) !== 1) missing.push(`${page.file}: exactly one Draft a trace link`);
    for (const repeatedCountLabel of ["Records</dt>", "Joined groups</dt>", "Published records</dt>", "Bridge lines</dt>"]) {
      if (html.includes(repeatedCountLabel)) missing.push(`${page.file}: repeated map count ${repeatedCountLabel}`);
    }
    const heroMatch = html.match(/<header class="page-hero world-map-visual-hero[^"]*"[\s\S]*?<\/header>/);
    if (heroMatch && heroMatch[0].includes("data-world-map")) {
      missing.push(`${page.file}: functional map should not live inside the hero`);
    }
  } else if (!page.home) {
    const expectedHero = expectedHeroSource(page);
    if (!html.includes(`src="${expectedHero}"`)) {
      missing.push(`${page.file}: unique hero ${expectedHero}`);
    }
    if (heroImages.has(expectedHero)) {
      missing.push(`${page.file}: duplicate hero ${expectedHero}`);
    }
    heroImages.add(expectedHero);
  }

  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const reference = match[1];
    await checkInternalReference(filePath, page.file, reference);
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
  "data-lab-optional",
  "data-lab-progress>0 answers",
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
if (/data-lab-progress[^>]*>[^<]*%/.test(labHtml)) {
  missing.push("alignment-lab.html: optional stages should not create a hard-coded completion percentage");
}
if (/\bfetch\s*\(|XMLHttpRequest|sendBeacon\s*\(/.test(labScript)) {
  missing.push("assets/alignment-lab.js: unexpected network transmission API");
}

const formControls = [...labHtml.matchAll(/<(input|select|textarea)\b[^>]*>/g)];
for (const control of formControls) {
  const before = labHtml.slice(Math.max(0, control.index - 250), control.index);
  const tag = control[0];
  if (/type="hidden"/.test(tag)) continue;
  if (!before.includes("<label") && !/aria-label=|aria-labelledby=/.test(tag)) {
    missing.push(`alignment-lab.html: unlabelled ${control[1]} control`);
  }
}

const meetingHtml = await readFile(resolve(root, "about.html"), "utf8");
const eventsHtml = await readFile(resolve(root, "events.html"), "utf8");
const meetingToolsScript = await readFile(resolve(root, "assets/meeting-tools.js"), "utf8");
const upcomingWatchScript = await readFile(resolve(root, "assets/upcoming-watch.js"), "utf8");
const upcomingWatchData = JSON.parse(await readFile(resolve(root, "data/upcoming-events.json"), "utf8"));
const plannerRequirements = [
  [meetingHtml, "about.html", ['data-planner="meeting"', 'id="meeting-circle-builder"', 'name="end"', "Copy invitation", "Download calendar file", "Open WhatsApp draft"]],
  [eventsHtml, "events.html", ['data-planner="event"', 'id="field-kit-builder"', 'name="end"', "Copy field kit", "Field kit preview", "Download calendar file", "Open WhatsApp draft"]],
];
for (const [html, file, requirements] of plannerRequirements) {
  if (!html.includes("assets/meeting-tools.js?v=")) missing.push(`${file}: assets/meeting-tools.js?v=`);
  for (const requirement of requirements) {
    if (!html.includes(requirement)) missing.push(`${file}: ${requirement}`);
  }
  const controls = [...html.matchAll(/<(input|select|textarea)\b[^>]*>/g)];
  for (const control of controls) {
    const before = html.slice(Math.max(0, control.index - 250), control.index);
    const tag = control[0];
    if (/type="hidden"/.test(tag)) continue;
    if (!before.includes("<label") && !/aria-label=|aria-labelledby=/.test(tag)) {
      missing.push(`${file}: unlabelled ${control[1]} control`);
    }
  }
}
if (/\bfetch\s*\(|XMLHttpRequest|sendBeacon\s*\(/.test(meetingToolsScript)) {
  missing.push("assets/meeting-tools.js: unexpected network transmission API");
}
if (!meetingToolsScript.includes("mailto:") || !meetingToolsScript.includes("wa.me") || !meetingToolsScript.includes("DTEND")) {
  missing.push("assets/meeting-tools.js: missing handoff channel or calendar end");
}
for (const unwanted of ["A gathering can keep its own name.", "Field kits and gathering tools."]) {
  if (eventsHtml.includes(unwanted)) missing.push(`events.html: competing journey remains: ${unwanted}`);
}
if (!Array.isArray(upcomingWatchData.records) || upcomingWatchData.records.length < 1) {
  missing.push("data/upcoming-events.json: no source-linked opportunities");
}
for (const record of upcomingWatchData.records || []) {
  for (const field of ["id", "title", "dateStart", "routes", "actionUrl", "sourceUrl", "checked"]) {
    if (!record[field] || (Array.isArray(record[field]) && !record[field].length)) {
      missing.push(`data/upcoming-events.json: ${record.id || "unknown record"} missing ${field}`);
    }
  }
}
if (/\bfetch\s*\(|XMLHttpRequest|sendBeacon\s*\(/.test(upcomingWatchScript)) {
  missing.push("assets/upcoming-watch.js: unexpected network transmission API");
}
if (!upcomingWatchScript.includes("text/calendar") || !upcomingWatchScript.includes("data-watch-filter")) {
  missing.push("assets/upcoming-watch.js: missing calendar or participation filters");
}
const watchPages = pages.filter((page) => !page.redirectTo && page.upcomingWatch === true);
if (!watchPages.length) missing.push("site-data: no active page renders Future Watch");
for (const page of watchPages) {
  const html = await readHtml(resolve(root, page.file));
  for (const requirement of [
    "data-upcoming-watch",
    'id="approaching"',
    "data-watch-filter",
    "data-watch-search",
    "data-watch-record",
    'id="gajra-upcoming-watch-data"',
    "assets/upcoming-watch.js?v=",
  ]) {
    if (!html.includes(requirement)) missing.push(`${page.file}: Future Watch ${requirement}`);
  }
}

const browserToolContracts = [
  {
    flag: "cultureTool",
    label: "culture",
    asset: "assets/culture-tool.js",
    rootSelector: "data-culture-tool",
    requirements: [
      "data-culture-form",
      "data-culture-output",
      "data-culture-status",
      "data-culture-lens",
      "data-culture-copy",
      "data-culture-download",
      "data-culture-email",
      "data-culture-whatsapp",
      "data-culture-sms",
      'name="lens"',
      'name="title"',
      'name="notes"',
      'name="question"',
      'name="next"',
    ],
  },
  {
    flag: "contributionTool",
    label: "contribution",
    asset: "assets/contribution-tool.js",
    rootSelector: "data-contribution-tool",
    requirements: [
      "data-contribution-form",
      "data-contribution-output",
      "data-contribution-status",
      "data-contribution-copy",
      "data-contribution-download",
      "data-contribution-email",
      "data-contribution-whatsapp",
      "data-contribution-sms",
      'name="title"',
      'name="contribution_type"',
      'name="contributor"',
      'name="broad_location"',
      'name="source"',
      'name="summary"',
      'name="consent"',
      'name="contact"',
      'name="correction"',
    ],
  },
];

for (const contract of browserToolContracts) {
  const toolPages = pages.filter((page) => !page.redirectTo && page[contract.flag] === true);
  if (!toolPages.length) missing.push(`site-data: no active page renders the ${contract.label} tool`);
  const script = await readFile(resolve(root, contract.asset), "utf8");
  if (/\bfetch\s*\(|XMLHttpRequest|sendBeacon\s*\(/.test(script)) {
    missing.push(`${contract.asset}: unexpected network transmission API`);
  }
  for (const handoff of ["mailto:", "wa.me", "sms:"]) {
    if (!script.includes(handoff)) missing.push(`${contract.asset}: missing ${handoff} handoff`);
  }
  for (const page of toolPages) {
    const html = await readHtml(resolve(root, page.file));
    if (!html.includes(`${contract.asset}?v=`)) missing.push(`${page.file}: ${contract.asset}?v=`);
    for (const requirement of [contract.rootSelector, ...contract.requirements]) {
      if (!html.includes(requirement)) missing.push(`${page.file}: ${requirement}`);
    }
    for (const control of html.matchAll(/<(input|select|textarea)\b[^>]*>/g)) {
      const tag = control[0];
      if (/type="hidden"/.test(tag)) continue;
      const before = html.slice(Math.max(0, control.index - 250), control.index);
      if (!before.includes("<label") && !/aria-label=|aria-labelledby=/.test(tag)) {
        missing.push(`${page.file}: unlabelled ${control[1]} control`);
      }
    }
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
