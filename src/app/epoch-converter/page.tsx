import type { Metadata } from "next";
import TimestampConverterClient from "../timestamp-converter/TimestampConverterClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "Epoch Converter - Unix Epoch Time Converter Free Online | FreeAIKit",
  description: "Convert Unix epoch timestamps to human-readable dates and vice versa. Free online epoch converter. No signup required.",
  keywords: [
    "epoch converter",
    "epoch time converter",
    "unix epoch",
    "epoch to date",
    "date to epoch",
    "epoch timestamp",
    "unix epoch converter",
  ],
  openGraph: {
    title: "Epoch Converter - Unix Epoch Time Converter Free Online",
    description: "Convert Unix epoch timestamps to human-readable dates and vice versa. Free online epoch converter. No signup required.",
    url: "https://freeaikit.app/epoch-converter",
  },
  alternates: {
    canonical: "https://freeaikit.app/epoch-converter",
  },
};

export default function EpochConverterPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd
        name="Epoch Time Converter"
        description="Convert Unix epoch timestamps to human-readable dates and vice versa. Free online epoch converter. No signup required."
        slug="epoch-converter"
      />

      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          Epoch Time Converter
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Convert Unix epoch time to date and date to epoch. Free, instant, runs in your browser.
        </p>
      </div>

      <TimestampConverterClient />

      <section className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
          { q: "What is epoch time?", a: "Epoch (Unix) time counts seconds since January 1, 1970 00:00:00 UTC. It's the standard time representation in computing." },
          { q: "How do I convert epoch to date?", a: "Paste the epoch timestamp and instantly see the corresponding date and time in your local timezone." },
          { q: "What's the difference between seconds and milliseconds?", a: "Unix timestamps in seconds are 10 digits (e.g., 1700000000). In milliseconds they're 13 digits. The tool handles both." },
          { q: "Is this tool accurate?", a: "Yes. It uses your browser's native Date API for precise conversion." },
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
