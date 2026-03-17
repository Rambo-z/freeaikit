import type { Metadata } from "next";
import TimestampConverterClient from "./TimestampConverterClient";

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
  return <TimestampConverterClient />;
}
