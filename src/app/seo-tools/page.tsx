import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ToolJsonLd from "../components/ToolJsonLd";

export const metadata: Metadata = {
  title: "Free Online SEO Tools - Meta Tags, Schema, Keywords | FreeAIKit",
  description:
    "Free SEO tools online: generate meta tags, schema markup, robots.txt, check keyword density, and preview Open Graph cards. All browser-based, no signup required.",
  alternates: {
    canonical: "https://freeaikit.app/seo-tools",
  },
};

const tools = [
  {
    slug: "meta-tag-generator",
    name: "Meta Tag Generator",
    description:
      "Generate SEO meta tags with live Google, Facebook, and Twitter previews. Copy HTML instantly.",
  },
  {
    slug: "schema-generator",
    name: "Schema Markup Generator",
    description:
      "Generate JSON-LD structured data for Google rich results. Article, Product, FAQ, and more.",
  },
  {
    slug: "robots-generator",
    name: "Robots.txt Generator",
    description:
      "Generate robots.txt to control search engine crawling. Add rules, sitemaps, and crawl delay.",
  },
  {
    slug: "keyword-density",
    name: "Keyword Density Checker",
    description:
      "Analyze keyword density, word frequency, and n-gram phrases. Optimize content for SEO.",
  },
  {
    slug: "og-preview",
    name: "Open Graph Preview",
    description:
      "Preview how your page looks when shared on Facebook, Twitter, LinkedIn, and Discord.",
  },
];

const faqItems = [
  {
    question: "What SEO tools does FreeAIKit offer?",
    answer:
      "FreeAIKit provides five free SEO tools: a Meta Tag Generator for creating HTML meta tags with live SERP previews, a Schema Markup Generator for producing JSON-LD structured data, a Robots.txt Generator for controlling search engine crawlers, a Keyword Density Checker for analyzing on-page content, and an Open Graph Preview tool for checking how links appear on social platforms.",
  },
  {
    question: "Do these SEO tools require signup or payment?",
    answer:
      "No. Every SEO tool on FreeAIKit is completely free to use with no account registration, no email required, and no usage limits. All processing happens directly in your browser, so your data is never uploaded to any server.",
  },
  {
    question: "Are the generated meta tags and schema markup valid?",
    answer:
      "Yes. The Meta Tag Generator outputs standards-compliant HTML meta tags following current best practices for Google, Facebook Open Graph, and Twitter Cards. The Schema Markup Generator produces valid JSON-LD structured data that you can verify with Google's Rich Results Test tool.",
  },
  {
    question: "Can I use these tools for multiple websites?",
    answer:
      "Absolutely. There are no restrictions on how many websites or pages you can use these tools for. Generate meta tags, schema markup, and robots.txt files for as many sites as you need, completely free of charge.",
  },
];

export default function SeoToolsPage() {
  return (
    <>
      <ToolJsonLd
        name="Free Online SEO Tools"
        description="Free browser-based SEO tools: meta tag generator, schema markup generator, robots.txt generator, keyword density checker, and Open Graph preview."
        slug="seo-tools"
        faqItems={faqItems}
      />

      <main className="min-h-screen bg-gray-50">
        {/* Hero */}
        <section className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Free Online SEO Tools
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Search engine optimization can feel overwhelming, but the right
              tools make it manageable. FreeAIKit gives webmasters, content
              creators, and digital marketers a complete suite of browser-based
              SEO utilities that run entirely on your device. Generate
              standards-compliant meta tags with live Google SERP previews so you
              can see exactly how your pages will appear in search results.
              Create valid JSON-LD structured data to unlock rich snippets and
              improve click-through rates. Build a properly formatted robots.txt
              file to guide search engine crawlers through your site
              architecture. Analyze your content with a keyword density checker
              that reveals word frequency, phrase distribution, and
              optimization opportunities. Preview how your links will render
              across Facebook, Twitter, LinkedIn, and Discord before you hit
              publish. Every tool works instantly in your browser with zero
              signup, zero file uploads, and zero cost. Whether you are
              launching a new site, auditing an existing one, or fine-tuning
              individual pages for higher rankings, these SEO tools help you
              work faster and smarter without leaving your browser.
            </p>
          </div>
        </section>

        {/* Tool Cards */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/${tool.slug}`}
                className="group bg-white rounded-2xl border border-gray-200 p-6 hover:border-blue-600 hover:shadow-lg transition-all duration-200"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {tool.name}
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {tool.description}
                </p>
                <span className="inline-flex items-center text-blue-600 text-sm font-medium">
                  Try it free
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-10">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-gray-200 p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
