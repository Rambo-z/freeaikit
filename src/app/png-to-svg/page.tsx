import type { Metadata } from "next";
import ImageToSvgClient from "../image-to-svg/ImageToSvgClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "PNG to SVG Converter - Convert PNG to SVG Free Online | FreeAIKit",
  description: "Convert PNG to SVG vector format online for free. Trace raster images to scalable vectors. No upload, runs in your browser.",
  keywords: [
    "png to svg",
    "convert png to svg",
    "png to svg converter",
    "raster to vector",
    "png to svg free",
    "image to svg",
    "vectorize image",
  ],
  openGraph: {
    title: "PNG to SVG Converter - Convert PNG to SVG Free Online",
    description: "Convert PNG to SVG vector format online for free. Trace raster images to scalable vectors. No upload, runs in your browser.",
    url: "https://freeaikit.app/png-to-svg",
  },
  alternates: {
    canonical: "https://freeaikit.app/png-to-svg",
  },
};

export default function PngToSvgPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd
        name="PNG to SVG Converter"
        description="Convert PNG to SVG vector format online for free. Trace raster images to scalable vectors. No upload, runs in your browser."
        slug="png-to-svg"
      />

      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          PNG to SVG Converter
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Convert raster PNG images to scalable SVG vector format. Perfect for logos and icons. Free, private, browser-based.
        </p>
      </div>

      <ImageToSvgClient />

      <section className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
          { q: "How does PNG to SVG conversion work?", a: "The tool traces the edges and colors in your PNG image to create a scalable vector SVG. Best results with simple graphics, logos, and icons." },
          { q: "Will the SVG look exactly like the PNG?", a: "For simple graphics and logos, the result is very close. Complex photos may lose some detail since SVG represents shapes, not pixels." },
          { q: "What images work best?", a: "Logos, icons, line art, and simple graphics convert best. Photos and complex images are better kept as PNG/JPG." },
          { q: "Can I edit the SVG afterwards?", a: "Yes. The output SVG can be opened and edited in any vector editor like Inkscape, Illustrator, or Figma." },
          ].map(({ q, a }) => (
            <div key={q}>
              <h3 className="font-semibold mb-1">{q}</h3>
              <p className="text-gray-600 text-sm">{a}</p>
            </div>
          ))}
        </div>
      </section>

      <RelatedTools currentSlug="image-to-svg" />
    </div>
  );
}
