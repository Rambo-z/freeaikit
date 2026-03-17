import type { Metadata } from "next";
import ImageCompressClient from "./ImageCompressClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "Image Compressor - Compress JPG, PNG, WebP Free | FreeAIKit",
  description:
    "Compress images online for free. Reduce JPG, PNG, WebP file size while maintaining quality. No upload, runs in your browser. No signup required.",
  keywords: [
    "image compressor",
    "compress image",
    "reduce image size",
    "compress jpg",
    "compress png",
    "image compression online",
    "free image compressor",
    "reduce file size",
  ],
  openGraph: {
    title: "Image Compressor - Compress Images Free Online",
    description:
      "Compress JPG, PNG, WebP images online for free. No upload to server, runs in your browser.",
    url: "https://freeaikit.app/image-compress",
  },
};

export default function ImageCompressPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd name="Image Compressor" description="Compress images online for free. Reduce JPG, PNG, WebP file size while maintaining quality. No upload, runs in your browser. No signup required." slug="image-compress" />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          Image Compressor
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Compress images up to 80% smaller while keeping quality. 100% free, runs entirely in your browser.
        </p>
      </div>

      <ImageCompressClient />

      <section className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          How Does Image Compression Work?
        </h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-600 leading-relaxed mb-4">
            Our image compressor uses industry-grade WebAssembly (WASM) engines compiled from
            native C libraries — MozJPEG for JPG, libwebp for WebP, and libimagequant (the same
            engine behind TinyPNG) for PNG. PNG compression uses perceptual color quantization,
            reducing file size by 60–80% while keeping the image visually identical. All
            processing runs locally in your browser — your images never leave your device.
          </p>
          <h3 className="text-lg font-semibold mt-6 mb-3">Features</h3>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">&#10003;</span>
              <span><strong>Batch Processing</strong> — Compress multiple images at once</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">&#10003;</span>
              <span><strong>Quality Control</strong> — Adjust compression level with a slider</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">&#10003;</span>
              <span><strong>Live Preview</strong> — See file size reduction before downloading</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">&#10003;</span>
              <span><strong>Privacy First</strong> — Images never leave your device</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">&#10003;</span>
              <span><strong>Multiple Formats</strong> — Supports JPG, PNG, and WebP</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="mt-16 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-1">Is this really free?</h3>
            <p className="text-gray-600 text-sm">
              Yes, completely free with no limits. Compress as many images as you want.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-1">Will compression reduce image quality?</h3>
            <p className="text-gray-600 text-sm">
              You control the quality level with a slider. At 80% quality, most images look
              identical to the original while being significantly smaller.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-1">What formats are supported?</h3>
            <p className="text-gray-600 text-sm">
              We support JPG/JPEG, PNG, and WebP. You can also convert between formats
              during compression.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-1">Is there a file size limit?</h3>
            <p className="text-gray-600 text-sm">
              Since everything runs in your browser, there&apos;s no server-side limit. Very large
              images (50MB+) may be slower to process depending on your device.
            </p>
          </div>
        </div>
      </section>
      <RelatedTools currentSlug="image-compress" />
    </div>
  );
}
