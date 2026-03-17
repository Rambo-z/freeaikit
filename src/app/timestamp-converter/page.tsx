import type { Metadata } from "next";
import TimestampConverterClient from "./TimestampConverterClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "Unix Timestamp Converter - Free Online Epoch Time Tool",
  description:
    "Convert Unix timestamps to human-readable dates and vice versa. Supports seconds and milliseconds, multiple timezones, ISO 8601, RFC 2822. Free, no signup.",
  keywords: [
    "unix timestamp converter",
    "epoch time converter",
    "timestamp to date",
    "date to timestamp",
    "unix time online",
    "epoch converter",
  ],
  openGraph: {
    title: "Unix Timestamp Converter - Free Online Epoch Time Tool",
    description:
      "Convert Unix timestamps to human-readable dates and vice versa. Real-time clock, multiple formats.",
    url: "https://freeaikit.app/timestamp-converter",
  },
};

export default function TimestampConverterPage() {
  return (
    <>
      <ToolJsonLd name="Timestamp Converter" description="Convert Unix timestamps to human-readable dates and vice versa. Supports seconds and milliseconds, multiple timezones, ISO 8601, RFC 2822. Free, no signup." slug="timestamp-converter" />
      <TimestampConverterClient />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <RelatedTools currentSlug="timestamp-converter" />
      </div>
    </>
  );
}
