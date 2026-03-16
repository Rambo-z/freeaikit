import type { Metadata } from "next";
import WordCounterClient from "./WordCounterClient";

export const metadata: Metadata = {
  title: "Word Counter - Free Online Character & Word Count | FreeAIKit",
  description:
    "Count words, characters, sentences, paragraphs and reading time instantly. Find top keywords. Free online word counter with real-time stats. No signup required.",
  keywords: ["word counter", "character counter", "word count online", "character count", "reading time calculator", "word frequency", "text analyzer"],
  openGraph: {
    title: "Word Counter - Free Online Character & Word Count",
    description: "Real-time word, character, sentence and paragraph counter with reading time and keyword frequency.",
    url: "https://freeaikit.app/word-counter",
  },
};

export default function WordCounterPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          Word Counter
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Instantly count words, characters, sentences, paragraphs and estimate
          reading time. Paste any text and see real-time stats.
        </p>
      </div>
      <WordCounterClient />
      <section className="mt-20 max-w-3xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold text-center">FAQ</h2>
        {[
          {
            q: "How is reading time calculated?",
            a: "Reading time is estimated at 200 words per minute, which is the average adult reading speed. Academic and technical content is typically read slower (150 wpm); casual content faster (250+ wpm).",
          },
          {
            q: "How are sentences counted?",
            a: "Sentences are detected by terminal punctuation: periods (.), exclamation marks (!), and question marks (?). Abbreviations may occasionally be counted as sentence endings.",
          },
          {
            q: "What are the keyword exclusions?",
            a: "Common stop words (the, a, and, is, etc.) are excluded from keyword frequency to highlight the meaningful words in your text.",
          },
          {
            q: "Is there a character or word limit?",
            a: "No. The tool runs entirely in your browser and can handle any amount of text your browser memory supports — from tweets to full novels.",
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
