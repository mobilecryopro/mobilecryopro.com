import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const sandboxDir = path.dirname(fileURLToPath(import.meta.url));
const guideDir = path.join(sandboxDir, "guides");

const context = {
  window: {},
  document: { querySelector: () => null },
  URLSearchParams
};
vm.createContext(context);
for (const file of ["blog-content.js", "blog-extra-content.js"]) {
  vm.runInContext(fs.readFileSync(path.join(sandboxDir, file), "utf8"), context, { filename: file });
}

const { articles, sources } = context.window.mobileCryoBlogCatalog;
const bySlug = new Map(articles.map((article) => [article.slug, article]));
const defaultRelated = {
  "complete-guide": ["mobile-cryotherapy-appointment", "cryotherapy-safety", "localized-vs-whole-body"],
  "how-cryotherapy-works": ["complete-guide", "cryotherapy-safety", "cold-therapy-pain-inflammation"],
  "cryotherapy-safety": ["questions-before-booking", "choose-a-provider", "mobile-cryotherapy-appointment"],
  "cryotherapy-vs-ice-packs": ["localized-vs-whole-body", "how-cryotherapy-works", "cryotherapy-exercise-recovery"],
  "cold-therapy-pain-inflammation": ["cryotherapy-exercise-recovery", "cryotherapy-safety", "how-cryotherapy-works"],
  "localized-vs-whole-body": ["cryotherapy-vs-ice-packs", "complete-guide", "mobile-cryotherapy-appointment"],
  "choose-a-provider": ["questions-before-booking", "cryotherapy-safety", "mobile-cryotherapy-appointment"],
  "questions-before-booking": ["choose-a-provider", "mobile-cryotherapy-appointment", "cryotherapy-safety"]
};

const clean = (value = "") => String(value)
  .replaceAll("â€”", "—")
  .replaceAll("â€“", "–")
  .replaceAll("â€œ", "“")
  .replaceAll("â€", "”")
  .replaceAll("â€™", "’")
  .replaceAll("â€˜", "‘")
  .replaceAll("Â·", "·")
  .replaceAll("Â°C", "°C")
  .replaceAll("Â", "")
  .replace(/[ \t]+$/gm, "");
const esc = (value) => clean(value).replace(/[&<>\"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[character]);
const asset = (value) => clean(value).replace(/^\.\.\/assets\//, "/assets/");
const guideUrl = (slug) => `/sandbox/guides/${slug}.html`;
const rootUrl = (slug) => `https://mobilecryopro.com/sandbox/guides/${slug}.html`;
const leafletStylesheet = '<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin="" />';
const readingTime = (article) => {
  const text = [article.description, ...article.takeaways, ...article.sections.map((section) => `${section.heading} ${section.body.replace(/<[^>]+>/g, " ")}`)].join(" ");
  const words = clean(text).trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(3, Math.ceil(words / 200))} min read`;
};

articles.forEach((article) => { article.readTime = readingTime(article); });

const header = (current = "guides") => `
  <header class="site-header">
    <a class="brand" href="/sandbox/index.html" aria-label="Mobile Cryo Pro sandbox home"><img class="brand-logo" src="/assets/mobile-cryo-pro-logo.png?v=9" alt="Mobile Cryo Pro" width="1100" height="360" /></a>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Toggle navigation"><span></span><span></span></button>
    <nav class="site-nav" id="site-nav"><a href="/sandbox/index.html">Home</a><a href="/about.html">About</a><a href="/services.html">Services</a><a href="/sandbox/index.html#service-area">Service Area</a><a href="/sandbox/guides/"${current === "guides" ? ' aria-current="page"' : ""}>Guides</a><a href="/faq.html">FAQ</a><a class="nav-call" href="tel:+17074139366">(707) 413-9366</a><a class="nav-cta" href="/sandbox/index.html#contact-form">Check Availability</a></nav>
  </header>`;

const fallbackFooter = `
  <footer class="site-footer"><div class="footer-shell"><div class="footer-bar"><p>Mobile Cryo Pro sandbox preview</p><div class="footer-links"><a href="/sandbox/index.html">Home</a><a href="/services.html">Services</a><a href="/sandbox/guides/">Guides</a><a href="/faq.html">FAQ</a></div></div></div></footer>`;

const card = (article, compact = false) => `
  <article class="blog-card evidence-card${compact ? " blog-card-compact" : ""}" data-guide-card data-topic="${esc(article.topic)}" data-search="${esc(`${article.title} ${article.description} ${article.topic}`.toLowerCase())}">
    <a class="blog-card-image" href="${guideUrl(article.slug)}" aria-label="Read ${esc(article.title)}"><img src="${asset(article.image)}" alt="${esc(article.imageAlt)}" width="1200" height="800" loading="lazy" /><span class="evidence-card-number" aria-hidden="true">${esc(article.order)}</span></a>
    <div class="blog-card-copy"><div class="blog-meta-row"><span>${esc(article.topic)}</span><span>${esc(article.readTime)}</span></div><h3><a href="${guideUrl(article.slug)}">${esc(article.title)}</a></h3><p>${esc(article.description)}</p><a class="text-link" href="${guideUrl(article.slug)}">Read this guide</a></div>
  </article>`;

const sourceList = (article) => {
  if (!article.refs.length) {
    const contextLink = article.slug === "equine-barn-visit" ? "/equine-cryotherapy.html" : "/services.html";
    return `<p>This practical guide uses current Mobile Cryo Pro service information. Confirm appointment-specific details directly before booking.</p><ul class="reference-list"><li><a href="${contextLink}">Current Mobile Cryo Pro service information</a></li><li><a href="/faq.html">Mobile Cryo Pro frequently asked questions</a></li></ul>`;
  }
  return `<ol class="reference-list">${article.refs.map((key, index) => {
    const source = sources[key];
    return `<li id="source-${key}"><a href="${source.url}" target="_blank" rel="noopener noreferrer">${esc(source.label)} <span class="visually-hidden">(opens in a new tab)</span></a><span class="source-type">Source ${index + 1}</span></li>`;
  }).join("")}</ol><p class="source-disclosure">The cited research may involve different cooling methods, populations, and protocols. The surrounding text explains what each source can—and cannot—support.</p>`;
};

const articlePage = (article) => {
  const relatedSlugs = article.related || defaultRelated[article.slug] || [];
  const related = relatedSlugs.map((slug) => bySlug.get(slug)).filter(Boolean).slice(0, 3);
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: `https://mobilecryopro.com${asset(article.image)}`,
    mainEntityOfPage: rootUrl(article.slug),
    author: { "@type": "Organization", name: "Mobile Cryo Pro" },
    publisher: { "@type": "Organization", name: "Mobile Cryo Pro", logo: { "@type": "ImageObject", url: "https://mobilecryopro.com/assets/mobile-cryo-pro-logo.png" } },
    dateModified: "2026-07-21"
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://mobilecryopro.com/sandbox/" },
      { "@type": "ListItem", position: 2, name: "Guides", item: "https://mobilecryopro.com/sandbox/guides/" },
      { "@type": "ListItem", position: 3, name: article.title, item: rootUrl(article.slug) }
    ]
  };

  return clean(`<!doctype html>
<html lang="en" data-sandbox-preview="true"><head>
  <meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><meta name="robots" content="noindex, nofollow, noarchive" />
  <title>${esc(article.title)} | Mobile Cryo Pro</title><meta name="description" content="${esc(article.description)}" /><link rel="canonical" href="${rootUrl(article.slug)}" />
  <meta property="og:type" content="article" /><meta property="og:title" content="${esc(article.title)}" /><meta property="og:description" content="${esc(article.description)}" /><meta property="og:url" content="${rootUrl(article.slug)}" /><meta property="og:image" content="https://mobilecryopro.com${asset(article.image)}" />
  <meta name="twitter:card" content="summary_large_image" /><meta name="twitter:title" content="${esc(article.title)}" /><meta name="twitter:description" content="${esc(article.description)}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin /><link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,600;0,700;0,800;1,700;1,800&amp;family=Inter:wght@400;500;600;700;800&amp;display=swap" rel="stylesheet" />${leafletStylesheet}<link rel="stylesheet" href="/sandbox/styles.css?v=192" /><link rel="icon" href="/favicon.ico?v=9" sizes="any" />
  <script type="application/ld+json">${JSON.stringify(schema)}</script><script type="application/ld+json">${JSON.stringify(breadcrumb)}</script>
</head><body class="blog-post-page evidence-article-page"><a class="skip-link" href="#main-content">Skip to content</a><div class="page-shell">
  ${header()}
  <aside class="sandbox-banner" role="status"><strong>Sandbox preview</strong><span>This guide is an unpublished draft for review.</span></aside>
  <main id="main-content" tabindex="-1"><article class="article-shell evidence-article-shell">
    <nav class="article-breadcrumbs" aria-label="Breadcrumb"><a href="/sandbox/guides/">Guides</a><span aria-hidden="true">/</span><a href="/sandbox/guides/?topic=${encodeURIComponent(article.topic)}">${esc(article.topic)}</a></nav>
    <header class="article-hero evidence-article-hero"><div class="article-hero-copy"><p class="eyebrow">${esc(article.topic)}</p><h1>${esc(article.displayTitle)}</h1><p>${esc(article.description)}</p><div class="article-byline"><span>By Mobile Cryo Pro</span><span>Draft updated July 21, 2026</span><span>${esc(article.readTime)}</span></div></div><figure class="article-hero-media"><img src="${asset(article.image)}" alt="${esc(article.imageAlt)}" width="1200" height="800" /></figure></header>
    <div class="article-layout"><aside class="article-sidebar evidence-sidebar"><p class="panel-label">Quick note</p><p>General education, not medical advice or a promise of results. Personal concerns belong with an appropriately licensed professional.</p><nav aria-label="On this page"><strong>In this guide</strong><ol>${article.sections.map((section, index) => `<li><a href="#section-${index + 1}">${esc(section.heading)}</a></li>`).join("")}</ol></nav><a class="button button-secondary" href="/services.html">See services & pricing</a></aside>
      <div class="article-content evidence-article-content"><section class="key-takeaways" aria-labelledby="takeaways-heading"><p class="panel-label">The short version</p><h2 id="takeaways-heading">What to know</h2><ul>${article.takeaways.map((item) => `<li>${esc(item)}</li>`).join("")}</ul></section>
      ${article.sections.map((section, index) => `<section id="section-${index + 1}" class="article-section"><h2>${esc(section.heading)}</h2>${clean(section.body)}</section>`).join("")}
      <aside class="article-conversion"><p class="eyebrow">Questions about a service?</p><h2>Talk with Dan before you book.</h2><p>Tell him which service you are considering, where you are located, and what you want to know. He will confirm the current options and availability.</p><div class="article-conversion-actions"><a class="button button-primary" href="/sandbox/index.html#contact-form">Check availability</a><a class="button button-secondary" href="/services.html">See services & pricing</a></div></aside>
      <section class="article-sources" aria-labelledby="sources-heading"><p class="eyebrow">Sources & context</p><h2 id="sources-heading">Where this guide comes from</h2>${sourceList(article)}</section>
      </div>
    </div></article>
    <section class="related-posts-section related-guides-section"><div class="section-heading"><p class="eyebrow">Keep exploring</p><h2>Useful next reads.</h2></div><div class="blog-card-grid">${related.map((entry) => card(entry, true)).join("")}</div></section>
  </main>${fallbackFooter}</div><script src="/sandbox/footer.js?v=4"></script><script src="/sandbox/script.js?v=25"></script></body></html>`);
};

const topics = ["All guides", "Start here", "Compare options", "Recovery", "CryoSkin & facials", "Mobile visits"];
const featured = bySlug.get("complete-guide");
const hub = clean(`<!doctype html>
<html lang="en" data-sandbox-preview="true"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><meta name="robots" content="noindex, nofollow, noarchive" /><title>Cryotherapy Guides | Mobile Cryo Pro Blog</title><meta name="description" content="Clear, useful guides to localized cryotherapy, mobile appointments, CryoSkin services, safety, and recovery—without hype." /><link rel="canonical" href="https://mobilecryopro.com/sandbox/blog.html" /><meta property="og:type" content="website" /><meta property="og:title" content="Cryotherapy Guides | Mobile Cryo Pro" /><meta property="og:description" content="Clear answers about cryotherapy, mobile visits, CryoSkin services, safety, and recovery." /><meta property="og:url" content="https://mobilecryopro.com/sandbox/blog.html" /><link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin /><link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,600;0,700;0,800;1,700;1,800&amp;family=Inter:wght@400;500;600;700;800&amp;display=swap" rel="stylesheet" />${leafletStylesheet}<link rel="stylesheet" href="/sandbox/styles.css?v=192" /><link rel="icon" href="/favicon.ico?v=9" sizes="any" /></head>
<body class="blog-page evidence-blog-page"><a class="skip-link" href="#main-content">Skip to content</a><div class="page-shell">${header()}<aside class="sandbox-banner" role="status"><strong>Sandbox preview</strong><span>These blog drafts are not published or indexed.</span></aside>
<main id="main-content" tabindex="-1"><section class="blog-hero-panel evidence-hero"><div class="blog-hero-copy"><p class="eyebrow">Mobile Cryo Pro resources</p><h1>Cryotherapy, explained for real life.</h1><p>Simple, practical guides to localized cryotherapy, CryoSkin, mobile appointments, and choosing the right service for your goals.</p><div class="blog-hero-actions"><a class="button button-primary" href="#all-guides">Explore the guides</a><a class="text-link" href="/services.html">See services & pricing</a></div></div></section>
<section class="blog-path-section" aria-labelledby="path-heading"><div class="section-heading"><p class="eyebrow">Choose your path</p><h2 id="path-heading">Start with what you want to know.</h2><p>Browse by topic or search the full guide library.</p></div><div class="blog-topic-grid"><a href="#all-guides" data-topic-shortcut="Start here"><strong>New to cryotherapy?</strong><span>Start with the basics, safety, and smart booking questions.</span></a><a href="#all-guides" data-topic-shortcut="Compare options"><strong>Comparing cold options?</strong><span>Understand localized services, ice, and whole-body approaches.</span></a><a href="#all-guides" data-topic-shortcut="CryoSkin & facials"><strong>Exploring CryoSkin?</strong><span>See the body and facial appointment guides.</span></a><a href="#all-guides" data-topic-shortcut="Mobile visits"><strong>Planning a mobile visit?</strong><span>Learn how locations, travel, groups, and barn visits work.</span></a></div></section>
<section class="blog-feature-section"><article class="blog-feature-card"><a class="blog-feature-image" href="${guideUrl(featured.slug)}"><img src="${asset(featured.image)}" alt="${esc(featured.imageAlt)}" width="1200" height="800" /></a><div class="blog-feature-copy"><div class="blog-meta-row"><span>Start here</span><span>${esc(featured.readTime)}</span></div><h2><a href="${guideUrl(featured.slug)}">Localized Cryotherapy: A Practical Guide</a></h2><p>Learn what localized cryotherapy is, what a mobile appointment may involve, and how it differs from ice, cold-water immersion, and whole-body chambers.</p><a class="button button-secondary" href="${guideUrl(featured.slug)}">Start with the basics</a></div></article></section>
<section class="blog-list-section evidence-cluster-section" id="all-guides" aria-labelledby="guides-heading"><div class="section-heading evidence-section-heading"><p class="eyebrow">The guide library</p><h2 id="guides-heading">Answers built for real decisions.</h2><p>Every guide separates useful facts from assumptions and points you toward the next practical step.</p></div><div class="blog-library-tools"><label class="blog-search"><span>Search guides</span><input type="search" placeholder="Try “safety,” “CryoSkin,” or “mobile visit”" data-guide-search /></label><div class="blog-topic-filters" role="group" aria-label="Filter guides by topic">${topics.map((topic, index) => `<button type="button" data-topic-filter="${esc(topic)}" aria-pressed="${index === 0 ? "true" : "false"}">${esc(topic)}</button>`).join("")}</div><p class="blog-result-count" aria-live="polite" data-guide-count>${articles.length} guides</p></div><div class="blog-card-grid evidence-card-grid" data-guide-grid>${articles.map((entry) => card(entry)).join("")}</div><p class="blog-no-results" data-guide-empty hidden>No guides match that search. Try a broader topic or a shorter phrase.</p></section>
</main>${fallbackFooter}</div><script src="/sandbox/blog-filter.js?v=1"></script><script src="/sandbox/footer.js?v=4"></script><script src="/sandbox/script.js?v=25"></script></body></html>`);

const guidesHub = hub
  .replace("Cryotherapy Guides | Mobile Cryo Pro Blog", "Cryotherapy Guides | Mobile Cryo Pro")
  .replaceAll("https://mobilecryopro.com/sandbox/blog.html", "https://mobilecryopro.com/sandbox/guides/")
  .replace("These blog drafts are not published or indexed.", "These guides are unpublished and not indexed.")
  .replace("Cryotherapy, explained for real life.", "Cryotherapy guides for real life.");

fs.mkdirSync(guideDir, { recursive: true });
for (const article of articles) fs.writeFileSync(path.join(guideDir, `${article.slug}.html`), articlePage(article));
fs.writeFileSync(path.join(guideDir, "index.html"), guidesHub);
fs.writeFileSync(path.join(sandboxDir, "blog.html"), clean(`<!doctype html>
<html lang="en"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><meta name="robots" content="noindex, nofollow, noarchive" /><meta http-equiv="refresh" content="0; url=/sandbox/guides/" /><link rel="canonical" href="https://mobilecryopro.com/sandbox/guides/" /><title>Cryotherapy Guides | Mobile Cryo Pro</title></head><body><main><h1>Cryotherapy Guides</h1><p>This review library has moved to <a href="/sandbox/guides/">Mobile Cryo Pro Guides</a>.</p></main></body></html>`));
console.log(`Built ${articles.length} static sandbox guides, the Guides hub, and the legacy Blog redirect.`);
