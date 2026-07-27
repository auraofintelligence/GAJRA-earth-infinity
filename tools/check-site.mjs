import { access, readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { pages } from "../src/site-data.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const missing = [];
const oldClaims = [];

for (const page of pages) {
  const filePath = resolve(root, page.file);
  const html = await readFile(filePath, "utf8");
  if (!html.includes("<!doctype html>")) missing.push(`${page.file}: doctype`);
  if (!html.includes('lang="en-AU"')) missing.push(`${page.file}: language`);
  if (!html.includes('href="site-map.html"')) missing.push(`${page.file}: site map link`);
  if (/planned to launch|token sale|actively recruiting/i.test(html)) {
    oldClaims.push(page.file);
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

if (missing.length) {
  console.error(`Site checks failed:\n${missing.map((item) => `- ${item}`).join("\n")}`);
  process.exitCode = 1;
} else {
  console.log(`Checked ${pages.length} generated pages: local links and status language pass.`);
}
