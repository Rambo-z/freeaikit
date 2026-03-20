import type { Metadata } from "next";
import BgRemoverClient from "../bg-remover/BgRemoverClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "Remove Background from Image Free Online - AI Background Remover | FreeAIKit",
  description: "Remove background from images online for free using AI. Instant, automatic background removal. No signup, no watermark. Runs in your browser.",
  keywords: [
    "remove background",
    "remove background from image",
    "background remover",
    "remove bg",
    "background eraser",
    "remove image background",
    "transparent background",
    "remove background free",
  ],
  openGraph: {
    title: "Remove Background from Image Free Online - AI Background Remover",
    description: "Remove background from images online for free using AI. Instant, automatic background removal. No signup, no watermark. Runs in your browser.",
    url: "https://freeaikit.app/remove-background",
  },
  alternates: {
    canonical: "https://freeaikit.app/remove-background",
  },
};

export default function RemoveBackgroundPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd
        name="Remove Background from Image"
        description="Remove background from images online for free using AI. Instant, automatic background removal. No signup, no watermark. Runs in your browser."
        slug="remove-background"
      />

      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          Remove Background from Image
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Remove image backgrounds instantly with AI. No signup, no watermark, no upload to server. 100% free and private.
        </p>
      </div>

      <BgRemoverClient />

      <section className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
          { q: "How do I remove a background from an image?", a: "Upload your image and the AI automatically detects and removes the background. Download the result as a transparent PNG." },
          { q: "Is the background removal AI-powered?", a: "Yes. It uses a machine learning model that runs directly in your browser for instant, accurate results." },
          { q: "Will there be a watermark?", a: "No. The output is completely clean with no watermarks, logos, or branding. It's 100% free." },
          { q: "What image formats are supported?", a: "Upload JPG, PNG, or WebP images. The output is always a PNG with transparent background." },
          ].map(({ q, a }) => (
            <div key={q}>
              <h3 className="font-semibold mb-1">{q}</h3>
              <p className="text-gray-600 text-sm">{a}</p>
            </div>
          ))}
        </div>
      </section>

      <RelatedTools currentSlug="bg-remover" />
    </div>
  );
}
