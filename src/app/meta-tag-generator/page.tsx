import type { Metadata } from "next";
import MetaTagGeneratorClient from "./MetaTagGeneratorClient";

export const metadata: Metadata = {
  title: "Meta Tag Generator - Free Online SEO Tool | FreeAIKit",
  description:
    "Generate perfect meta tags for SEO. Preview how your page looks on Google, Facebook, and Twitter. Open Graph and Twitter Card support. Free, instant.",
  keywords: ["meta tag generator", "seo meta tags", "open graph generator", "twitter card generator", "meta description generator", "og tags", "seo tools free"],
  openGraph: {
    title: "Meta Tag Generator - Free Online SEO Tool",
    description: "Generate meta tags with Google/Facebook/Twitter preview. Free and instant.",
    url: "https://freeaikit.app/meta-tag-generator",
  },
};

export default function MetaTagGeneratorPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          Meta Tag Generator
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Generate SEO-optimized meta tags with live Google, Facebook, and Twitter
          previews. Copy the HTML and paste into your site&apos;s &lt;head&gt;.
        </p>
      </div>
      <MetaTagGeneratorClient />
      <section className="mt-20 max-w-3xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold text-center">FAQ</h2>
        {[
          {
            q: "What are meta tags?",
            a: "Meta tags are HTML elements in your page's <head> section that provide metadata about the page. They tell search engines and social platforms what your page is about, what title to display, and which image to use when shared.",
          },
          {
            q: "Which meta tags are most important for SEO?",
            a: "The most critical are: <title> (displayed in search results), meta description (the snippet below the title), and canonical URL (prevents duplicate content). Open Graph tags are essential for social media sharing.",
          },
          {
            q: "What is the ideal meta description length?",
            a: "Google typically displays 150-160 characters of the meta description. Write concise, compelling descriptions within this limit. Descriptions that are too long will be truncated in search results.",
          },
          {
            q: "What are Open Graph tags?",
            a: "Open Graph (og:) tags control how your page appears when shared on Facebook, LinkedIn, and other platforms. They define the title, description, image, and URL shown in the share preview card.",
          },
        ].map(({ q, a }) => (
          <div key={q}>
            <h3 className="font-semibold mb-1">{q}</h3>
            <p className="text-gray-600 text-sm">{a}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
