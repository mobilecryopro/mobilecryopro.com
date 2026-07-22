import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const sandboxDir = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.dirname(sandboxDir);
const guideDir = path.join(sandboxDir, "guides");
const failures = [];
const leafletIntegrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=";
const context = { window: {}, document: { querySelector: () => null }, URLSearchParams };
vm.createContext(context);
for (const file of ["blog-content.js", "blog-extra-content.js"]) {
  vm.runInContext(fs.readFileSync(path.join(sandboxDir, file), "utf8"), context, { filename: file });
}
const { articles } = context.window.mobileCryoBlogCatalog;
const htmlFiles = [path.join(sandboxDir, "blog.html"), ...fs.readdirSync(guideDir).filter((file) => file.endsWith(".html")).map((file) => path.join(guideDir, file))];

const check = (condition, message) => { if (!condition) failures.push(message); };
const unique = (values) => new Set(values).size === values.length;

check(articles.length === 14, `Expected 14 catalog entries; found ${articles.length}`);
check(unique(articles.map((article) => article.slug)), "Catalog slugs are not unique");
check(htmlFiles.length === 15, `Expected hub plus 14 guide files; found ${htmlFiles.length}`);

const titles = [];
const canonicals = [];
for (const file of htmlFiles) {
  const relative = path.relative(siteRoot, file).replaceAll("\\", "/");
  const html = fs.readFileSync(file, "utf8");
  const title = html.match(/<title>([^<]+)<\/title>/i)?.[1];
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/i)?.[1];
  titles.push(title);
  canonicals.push(canonical);
  check(Boolean(title), `${relative}: missing title`);
  check(Boolean(canonical), `${relative}: missing canonical`);
  check((html.match(/<h1\b/gi) || []).length === 1, `${relative}: expected exactly one H1`);
  check(html.includes('name="robots" content="noindex, nofollow, noarchive"'), `${relative}: sandbox noindex is missing`);
  check(!html.includes("article.html?guide="), `${relative}: legacy query-string article link remains`);
  check(!html.includes("Guide not found"), `${relative}: false progressive-enhancement error remains`);
  check(!html.includes("Editorial status"), `${relative}: internal editorial status is exposed`);
  check(!html.includes("Editorial Team"), `${relative}: invented editorial-team label remains`);
  check(html.includes(`integrity="${leafletIntegrity}"`), `${relative}: correct Leaflet stylesheet integrity is missing`);
  check(!html.includes("â€”") && !html.includes("Â"), `${relative}: mojibake sequence found`);

  for (const block of html.matchAll(/<script type="application\/ld\+json">([^<]+)<\/script>/gi)) {
    try { JSON.parse(block[1]); } catch (error) { failures.push(`${relative}: invalid JSON-LD (${error.message})`); }
  }

  for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/gi)) {
    const target = match[1];
    if (!target.startsWith("/") || target.startsWith("//")) continue;
    const pathname = target.split(/[?#]/)[0];
    if (!pathname || pathname === "/") continue;
    const localPath = path.join(siteRoot, pathname.replace(/^\//, ""));
    check(fs.existsSync(localPath), `${relative}: missing local target ${target}`);
  }
}

check(unique(titles), "Generated page titles are not unique");
check(unique(canonicals), "Generated canonical URLs are not unique");

const hub = fs.readFileSync(path.join(sandboxDir, "blog.html"), "utf8");
check((hub.match(/data-guide-card/g) || []).length === 14, "Hub does not contain 14 server-rendered guide cards");
check(hub.includes("Cryotherapy, explained for real life."), "Hub consumer-first headline is missing");
check(!hub.includes("Editorial status"), "Internal editorial status is exposed to readers");
check(!hub.includes("Useful first. Accurate always."), "Internal standards promo remains on the marketing hub");
check(hub.includes("blog-filter.js"), "Hub filter script is missing");

for (const file of [path.join(siteRoot, "index.html"), path.join(sandboxDir, "index.html")]) {
  const relative = path.relative(siteRoot, file).replaceAll("\\", "/");
  const html = fs.readFileSync(file, "utf8");
  check(html.includes(`integrity="${leafletIntegrity}"`), `${relative}: correct Leaflet stylesheet integrity is missing`);
}

const css = fs.readFileSync(path.join(sandboxDir, "styles.css"), "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
check((css.match(/{/g) || []).length === (css.match(/}/g) || []).length, "CSS braces are unbalanced");

if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Validated ${articles.length} catalog entries, ${htmlFiles.length} HTML pages, unique metadata, JSON-LD, local targets, noindex controls, and CSS structure.`);
}
