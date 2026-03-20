import type { Metadata } from "next";
import TimestampConverterClient from "../timestamp-converter/TimestampConverterClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "Time Converter - Convert Time Zones & Timestamps Free | FreeAIKit",
  description: "Convert time between formats online for free. Unix timestamp to date, date to timestamp. Instant, browser-based, no signup.",
  keywords: [
    "time converter",
    "time converter online",
    "convert time",
    "timestamp converter",
    "unix time converter",
    "epoch converter",
    "time zone converter",
  ],
  openGraph: {
    title: "Time Converter - Convert Time Zones & Timestamps Free",
    description: "Convert time between formats online for free. Unix timestamp to date, date to timestamp. Instant, browser-based, no signup.",
    url: "https://freeaikit.app/time-converter",
  },
  alternates: {
    canonical: "https://freeaikit.app/time-converter",
  },
};

export default function TimeConverterPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd
        name="Time Converter"
        description="Convert time between formats online for free. Unix timestamp to date, date to timestamp. Instant, browser-based, no signup."
        slug="time-converter"
      />

      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          Time Converter
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Convert between Unix timestamps and human-readable dates. Free, instant, browser-based.
        </p>
      </div>

      <TimestampConverterClient />

      <section className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
          { q: "How do I convert a Unix timestamp?", a: "Paste your Unix timestamp and instantly see the human-readable date and time in multiple formats." },
          { q: "What is a Unix timestamp?", a: "A Unix timestamp counts the number of seconds since January 1, 1970 (UTC). It's used extensively in programming." },
          { q: "Can I convert a date to timestamp?", a: "Yes. Enter any date and time to get the corresponding Unix timestamp in seconds or milliseconds." },
          { q: "Does it handle milliseconds?", a: "Yes. The tool auto-detects whether your input is in seconds or milliseconds." },
          ].map(({ q, a }) => (
            <div key={q}>
              <h3 className="font-semibold mb-1">{q}</h3>
              <p className="text-gray-600 text-sm">{a}</p>
            </div>
          ))}
        </div>
      </section>

      <RelatedTools currentSlug="timestamp-converter" />
    </div>
  );
}
