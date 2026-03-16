import type { Metadata } from "next";
import UrlEncoderClient from "./UrlEncoderClient";

export const metadata: Metadata = {
  title: "URL Encoder / Decoder - Free Online | FreeAIKit",
  description:
    "Encode and decode URLs and query strings with encodeURIComponent / decodeURIComponent. Parse any URL into its components. Free, instant, runs in browser.",
  keywords: ["url encoder", "url decoder", "encode url online", "decode url", "percent encoding", "url parser", "query string encoder", "urlencode online"],
  openGraph: {
    title: "URL Encoder / Decoder - Free Online",
    description: "Encode, decode and parse URLs instantly. Free and private — runs in your browser.",
    url: "https://freeaikit.app/url-encoder",
  },
};

export default function UrlEncoderPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          URL Encoder / Decoder
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Encode special characters for use in URLs, decode percent-encoded
          strings, and parse any URL into its components. Free and instant.
        </p>
      </div>
      <UrlEncoderClient />
      <section className="mt-20 max-w-3xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold text-center">FAQ</h2>
        {[
          {
            q: "What is URL encoding?",
            a: "URL encoding (percent encoding) replaces unsafe ASCII characters with a % followed by two hexadecimal digits. For example, a space becomes %20. This ensures URLs can be transmitted safely over the internet.",
          },
          {
            q: "What is the difference between encodeURI and encodeURIComponent?",
            a: "encodeURI encodes a full URL and leaves characters like /, :, @, and ? intact. encodeURIComponent encodes a URL component (like a query value) and encodes those characters too. Use encodeURIComponent for individual parameters.",
          },
          {
            q: "When should I URL-encode query parameters?",
            a: "Always encode user-supplied values before inserting them into a URL. Special characters like &, =, +, and # in parameter values will break URL parsing if not encoded.",
          },
          {
            q: "Why does a space sometimes become + instead of %20?",
            a: "In HTML form encoding (application/x-www-form-urlencoded), spaces are encoded as +. In standard percent-encoding (RFC 3986), spaces are %20. This tool uses the standard %20 encoding.",
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
