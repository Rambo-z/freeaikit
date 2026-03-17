import type { Metadata } from "next";
import QrCodeClient from "./QrCodeClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "QR Code Generator - Free Online | FreeAIKit",
  description:
    "Generate QR codes for URLs, text, email, phone numbers, and WiFi instantly for free. Customize colors, size, and error correction. Download as PNG or SVG.",
  keywords: ["qr code generator", "free qr code", "create qr code", "qr code maker", "qr code png", "qr code svg", "wifi qr code", "url qr code"],
  openGraph: {
    title: "QR Code Generator - Free Online",
    description: "Generate custom QR codes for URLs, WiFi, email and more. Download PNG or SVG.",
    url: "https://freeaikit.app/qr-code",
  },
};

export default function QrCodePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd name="QR Code Generator" description="Generate QR codes for URLs, text, email, phone numbers, and WiFi instantly for free. Customize colors, size, and error correction. Download as PNG or SVG." slug="qr-code" />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">QR Code Generator</h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Generate QR codes for URLs, text, email, phone numbers, and WiFi.
          Customize colors, size, and format. Free, instant, runs in your browser.
        </p>
      </div>
      <QrCodeClient />
      <section className="mt-20 max-w-3xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold text-center">FAQ</h2>
        {[
          { q: "What can I encode in a QR code?", a: "URLs, plain text, email addresses (mailto:), phone numbers (tel:), and WiFi credentials. Use the preset tabs to get the right format." },
          { q: "What's the difference between PNG and SVG?", a: "PNG is a raster image — great for sharing or printing at a fixed size. SVG is vector — it scales to any size without losing quality, ideal for logos and print materials." },
          { q: "What does error correction level mean?", a: "Higher levels (Q, H) allow the QR code to be read even if part of it is obscured or damaged, but make the code denser. L is smallest, H is most resilient." },
          { q: "Is there a data limit?", a: "QR codes support up to ~3KB of data. Very long URLs or text may produce a dense code that's harder to scan — keep content concise for best results." },
        ].map(({ q, a }) => (
          <div key={q}>
            <h3 className="font-semibold mb-1">{q}</h3>
            <p className="text-gray-600 text-sm">{a}</p>
          </div>
        ))}
      </section>
      <RelatedTools currentSlug="qr-code" />
    </div>
  );
}
