import type { Metadata } from "next";
import ImageToSvgClient from "./ImageToSvgClient";

export const metadata: Metadata = {
  title: "Image to SVG Converter - Free Online PNG/JPG to SVG | FreeAIKit",
  description:
    "Convert PNG, JPG, WebP images to SVG vector format for free. No upload to server, runs in your browser. Perfect for logos, icons, and illustrations.",
  keywords: [
    "image to svg",
    "png to svg",
    "jpg to svg",
    "convert image to vector",
    "raster to vector",
    "vectorize image",
    "free svg converter",
    "image vectorizer",
  ],
  openGraph: {
    title: "Image to SVG Converter - Free Online",
    description: "Convert PNG, JPG, WebP to SVG vector format. No upload, runs in your browser.",
    url: "https://freeaikit.app/image-to-svg",
  },
};

export default function ImageToSvgPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          Image to SVG Converter
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Convert PNG, JPG, and WebP images into scalable SVG vector files.
          100% free, runs entirely in your browser.
        </p>
      </div>

      <ImageToSvgClient />

      <section className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          How Does Image to SVG Conversion Work?
        </h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-600 leading-relaxed mb-4">
            Our converter uses ImageTracer.js to trace the outlines and color
            regions in your image and convert them into SVG paths. This process
            — called raster-to-vector conversion — works best on images with
            clear edges, flat colors, and limited gradients such as logos,
            icons, and illustrations.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            SVG files are infinitely scalable, making them ideal for use on
            websites, in print, and in design tools. Unlike JPG or PNG, an SVG
            stays sharp at any size.
          </p>

          <h3 className="text-lg font-semibold mt-6 mb-3">Conversion Styles</h3>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start gap-2">
              <span className="font-semibold text-gray-800 w-20 flex-shrink-0">Detailed</span>
              <span>32 colors, tight thresholds. Best for logos and icons with fine details.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-semibold text-gray-800 w-20 flex-shrink-0">Balanced</span>
              <span>16 colors, default settings. Good for most images.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-semibold text-gray-800 w-20 flex-shrink-0">Simple</span>
              <span>8 colors, loose thresholds. Smaller SVG file, great for flat illustrations.</span>
            </li>
          </ul>

          <h3 className="text-lg font-semibold mt-6 mb-3">Features</h3>
          <ul className="space-y-2 text-gray-600">
            {[
              ["Batch conversion", "Convert multiple images at once"],
              ["3 quality presets", "Detailed, Balanced, and Simple modes"],
              ["Live SVG preview", "See the vectorized result before downloading"],
              ["Privacy first", "Files never leave your device"],
            ].map(([title, desc]) => (
              <li key={title} className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">&#10003;</span>
                <span><strong>{title}</strong> — {desc}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-16 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            {
              q: "What types of images work best?",
              a: "Images with clear edges, flat or limited colors, and simple shapes — such as logos, icons, clip art, and illustrations. Photos with gradients and complex textures will produce large, complex SVG files.",
            },
            {
              q: "Will the SVG look exactly like the original?",
              a: "The SVG is a traced approximation of the original. Simple images will look very close to the original; complex photos will look more like a stylized vector interpretation.",
            },
            {
              q: "Is there a file size limit?",
              a: "No server-side limit. Everything runs in your browser. Very large images (over 4000×4000px) may be slow to process depending on your device.",
            },
            {
              q: "Can I use the SVG commercially?",
              a: "Yes. The converted SVG is yours to use however you like. FreeAIKit does not retain any rights to your files.",
            },
          ].map(({ q, a }) => (
            <div key={q}>
              <h3 className="font-semibold mb-1">{q}</h3>
              <p className="text-gray-600 text-sm">{a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
