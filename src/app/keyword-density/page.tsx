import type { Metadata } from "next";
import KeywordDensityClient from "./KeywordDensityClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "Keyword Density Checker - Free Online SEO Tool | FreeAIKit",
  description:
    "Analyze keyword density and word frequency in your text. Find top keywords, 2-word and 3-word phrases. Optimize for SEO. Free, instant, runs in your browser.",
  keywords: ["keyword density checker", "keyword density", "seo keyword tool", "word frequency", "keyword analysis", "seo content analysis", "keyword counter"],
  openGraph: {
    title: "Keyword Density Checker - Free Online SEO Tool",
    description: "Analyze keyword density and word frequency for SEO optimization. Free and instant.",
    url: "https://freeaikit.app/keyword-density",
  },
};

export default function KeywordDensityPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd name="Keyword Density Checker" description="Analyze keyword density and word frequency in your text. Find top keywords, 2-word and 3-word phrases. Optimize for SEO. Free, instant, runs in your browser." slug="keyword-density" />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          Keyword Density Checker
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Analyze keyword density, word frequency, and n-gram phrases in your content.
          Optimize your text for SEO. Free, instant, in-browser.
        </p>
      </div>
      <KeywordDensityClient />
      <section className="mt-20 max-w-3xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold text-center">FAQ</h2>
        {[
          {
            q: "What is keyword density?",
            a: "Keyword density is the percentage of times a keyword or phrase appears in your text relative to the total word count. For example, if 'SEO' appears 5 times in 100 words, the keyword density is 5%.",
          },
          {
            q: "What is the ideal keyword density for SEO?",
            a: "There's no magic number, but most SEO experts recommend 1-3% for primary keywords. Overstuffing (>5%) can trigger search engine penalties. Focus on natural writing and semantic relevance rather than hitting an exact percentage.",
          },
          {
            q: "What are n-grams?",
            a: "N-grams are contiguous sequences of n words. 1-gram = single words, 2-gram = two-word phrases (e.g., 'search engine'), 3-gram = three-word phrases (e.g., 'search engine optimization'). Analyzing n-grams reveals important multi-word keywords.",
          },
          {
            q: "Are stop words excluded?",
            a: "Common stop words (the, a, is, in, at, etc.) are excluded from the analysis by default so you can focus on meaningful keywords. The total word count still includes all words.",
          },
        ].map(({ q, a }) => (
          <div key={q}>
            <h3 className="font-semibold mb-1">{q}</h3>
            <p className="text-gray-600 text-sm">{a}</p>
          </div>
        ))}
      </section>
      <RelatedTools currentSlug="keyword-density" />
    </div>
  );
}
