/**
 * SEO Landing Page Generator
 *
 * Generates page.tsx files for SEO landing pages that reuse existing tool components.
 * Also updates sitemap.xml with the new pages.
 *
 * Usage: npx tsx scripts/seo-pages/generate-seo-pages.ts
 */

import * as fs from "fs";
import * as path from "path";
import { SEO_PAGES, type SeoPageConfig } from "./seo-pages-config";

const PROJECT_ROOT = path.resolve(__dirname, "../..");
const APP_DIR = path.join(PROJECT_ROOT, "src/app");
const SITEMAP_PATH = path.join(PROJECT_ROOT, "public/sitemap.xml");

function generatePageTsx(config: SeoPageConfig): string {
  const faqArray = config.faq
    .map(
      (item) =>
        `          { q: ${JSON.stringify(item.q)}, a: ${JSON.stringify(item.a)} }`
    )
    .join(",\n");

  const keywordsArray = config.keywords.map((k) => `    ${JSON.stringify(k)}`).join(",\n");

  return `import type { Metadata } from "next";
import ${config.clientComponent} from "../${config.parentTool}/${config.clientComponent}";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: ${JSON.stringify(config.title)},
  description: ${JSON.stringify(config.description)},
  keywords: [
${keywordsArray},
  ],
  openGraph: {
    title: ${JSON.stringify(config.title.split(" | ")[0])},
    description: ${JSON.stringify(config.description)},
    url: ${JSON.stringify(`https://freeaikit.app/${config.slug}`)},
  },
  alternates: {
    canonical: ${JSON.stringify(`https://freeaikit.app/${config.slug}`)},
  },
};

export default function ${toPascalCase(config.slug)}Page() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd
        name=${JSON.stringify(config.h1)}
        description=${JSON.stringify(config.description)}
        slug=${JSON.stringify(config.slug)}
      />

      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          ${config.h1}
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          ${config.subtitle}
        </p>
      </div>

      <${config.clientComponent} />

      <section className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
${faqArray},
          ].map(({ q, a }) => (
            <div key={q}>
              <h3 className="font-semibold mb-1">{q}</h3>
              <p className="text-gray-600 text-sm">{a}</p>
            </div>
          ))}
        </div>
      </section>

      <RelatedTools currentSlug=${JSON.stringify(config.parentTool)} />
    </div>
  );
}
`;
}

function toPascalCase(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}

function updateSitemap(newSlugs: string[]): void {
  let sitemap = fs.readFileSync(SITEMAP_PATH, "utf-8");
  const today = new Date().toISOString().split("T")[0];

  const newEntries = newSlugs
    .filter((slug) => !sitemap.includes(`freeaikit.app/${slug}`))
    .map(
      (slug) => `  <url>
    <loc>https://freeaikit.app/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>`
    )
    .join("\n");

  if (newEntries) {
    sitemap = sitemap.replace("</urlset>", `${newEntries}\n</urlset>`);
    fs.writeFileSync(SITEMAP_PATH, sitemap, "utf-8");
    console.log(`  Updated sitemap.xml with ${newSlugs.length} new entries`);
  }
}

function main() {
  console.log(`\nSEO Landing Page Generator`);
  console.log(`==========================\n`);
  console.log(`Generating ${SEO_PAGES.length} SEO landing pages...\n`);

  const generated: string[] = [];
  const skipped: string[] = [];

  for (const config of SEO_PAGES) {
    const pageDir = path.join(APP_DIR, config.slug);
    const pagePath = path.join(pageDir, "page.tsx");

    // Check parent tool exists
    const parentDir = path.join(APP_DIR, config.parentTool);
    const clientPath = path.join(parentDir, `${config.clientComponent}.tsx`);
    if (!fs.existsSync(clientPath)) {
      console.log(`  SKIP ${config.slug} - parent client not found: ${clientPath}`);
      skipped.push(config.slug);
      continue;
    }

    // Create directory
    if (!fs.existsSync(pageDir)) {
      fs.mkdirSync(pageDir, { recursive: true });
    }

    // Generate page
    const content = generatePageTsx(config);
    fs.writeFileSync(pagePath, content, "utf-8");
    console.log(`  OK   ${config.slug}/page.tsx -> ${config.parentTool}/${config.clientComponent}`);
    generated.push(config.slug);
  }

  // Update sitemap
  if (generated.length > 0) {
    console.log("");
    updateSitemap(generated);
  }

  console.log(`\nDone!`);
  console.log(`  Generated: ${generated.length}`);
  console.log(`  Skipped:   ${skipped.length}`);
  console.log(`\nNew pages:`);
  generated.forEach((slug) => console.log(`  https://freeaikit.app/${slug}`));
}

main();
