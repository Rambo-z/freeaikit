import type { Metadata } from "next";
import ImageConvertClient from "../image-convert/ImageConvertClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "GIF to JPG Converter - Convert GIF to JPG Free Online | FreeAIKit",
  description: "Convert GIF to JPG online for free. Extract the first frame as a high-quality JPG image. No upload, browser-based.",
  keywords: [
    "gif to jpg",
    "convert gif to jpg",
    "gif to jpg converter",
    "gif to jpeg",
    "gif to jpg free",
  ],
  openGraph: {
    title: "GIF to JPG Converter - Convert GIF to JPG Free Online",
    description: "Convert GIF to JPG online for free. Extract the first frame as a high-quality JPG image. No upload, browser-based.",
    url: "https://freeaikit.app/gif-to-jpg",
  },
  alternates: {
    canonical: "https://freeaikit.app/gif-to-jpg",
  },
};

export default function GifToJpgPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd
        name="GIF to JPG Converter"
        description="Convert GIF to JPG online for free. Extract the first frame as a high-quality JPG image. No upload, browser-based."
        slug="gif-to-jpg"
      />

      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          GIF to JPG Converter
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Convert GIF images to JPG format. Extract frames as JPG. Free, private, instant.
        </p>
      </div>

      <ImageConvertClient />

      <section className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
          { q: "What happens to the animation?", a: "The first frame of the GIF is extracted and saved as a static JPG image." },
          { q: "Can I choose which frame to extract?", a: "The tool converts the first frame. For frame-by-frame extraction, use a specialized GIF editor." },
          { q: "Is the quality good?", a: "Yes. The JPG output is high quality. Adjust the quality slider for your preferred balance." },
          { q: "Can I batch convert?", a: "Yes. Upload multiple GIF files and convert them all to JPG at once." },
          ].map(({ q, a }) => (
            <div key={q}>
              <h3 className="font-semibold mb-1">{q}</h3>
              <p className="text-gray-600 text-sm">{a}</p>
            </div>
          ))}
        </div>
      </section>

      <RelatedTools currentSlug="image-convert" />
    </div>
  );
}
