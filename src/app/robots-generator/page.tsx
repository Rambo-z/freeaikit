import type { Metadata } from "next";
import RobotsGeneratorClient from "./RobotsGeneratorClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "Robots.txt Generator - Free Online SEO Tool | FreeAIKit",
  description:
    "Generate a robots.txt file for your website. Control search engine crawling with allow/disallow rules, sitemaps, and crawl delay. Free, instant.",
  keywords: ["robots.txt generator", "robots txt", "seo robots", "search engine robots", "crawl control", "robots.txt maker", "robots file generator"],
  openGraph: {
    title: "Robots.txt Generator - Free Online SEO Tool",
    description: "Generate robots.txt with allow/disallow rules and sitemap. Free and instant.",
    url: "https://freeaikit.app/robots-generator",
  },
};

export default function RobotsGeneratorPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd name="Robots.txt Generator" description="Generate a robots.txt file for your website. Control search engine crawling with allow/disallow rules, sitemaps, and crawl delay. Free, instant." slug="robots-generator" />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          Robots.txt Generator
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Generate a robots.txt file to control how search engines crawl your site.
          Add rules, sitemaps, and crawl delays. Free, instant.
        </p>
      </div>
      <RobotsGeneratorClient />
      <section className="mt-20 max-w-3xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold text-center">FAQ</h2>
        {[
          {
            q: "What is robots.txt?",
            a: "robots.txt is a text file placed at the root of your website (e.g., example.com/robots.txt) that tells search engine crawlers which pages or directories they can or cannot access. It follows the Robots Exclusion Protocol.",
          },
          {
            q: "Does robots.txt affect SEO?",
            a: "Yes. robots.txt controls which pages get crawled, but it does NOT remove pages from search results (use noindex for that). Blocking important resources can hurt SEO, while blocking irrelevant pages helps crawl budget efficiency.",
          },
          {
            q: "What is crawl-delay?",
            a: "Crawl-delay tells bots to wait a specified number of seconds between requests. It helps reduce server load from aggressive crawlers. Note: Google ignores crawl-delay (use Search Console instead) but Bing and others respect it.",
          },
          {
            q: "Should I include a sitemap in robots.txt?",
            a: "Yes! Adding a Sitemap directive in robots.txt helps search engines discover your sitemap.xml automatically. This is one of the simplest ways to ensure all your important pages get indexed.",
          },
        ].map(({ q, a }) => (
          <div key={q}>
            <h3 className="font-semibold mb-1">{q}</h3>
            <p className="text-gray-600 text-sm">{a}</p>
          </div>
        ))}
      </section>
      <RelatedTools currentSlug="robots-generator" />
    </div>
  );
}
