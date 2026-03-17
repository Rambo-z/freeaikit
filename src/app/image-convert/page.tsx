import type { Metadata } from "next";
import ImageConvertClient from "./ImageConvertClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "Image Format Converter - Convert JPG, PNG, WebP Free | FreeAIKit",
  description:
    "Convert images between JPG, PNG, and WebP instantly in your browser. Free, no upload, no signup. Batch convert multiple images at once.",
  keywords: [
    "image format converter",
    "convert jpg to png",
    "convert png to webp",
    "convert image online",
    "jpg to webp",
    "png to jpg",
    "free image converter",
    "batch image converter",
  ],
  openGraph: {
    title: "Image Format Converter - Convert JPG, PNG, WebP Free",
    description:
      "Convert images between JPG, PNG, and WebP online for free. No upload to server, runs in your browser.",
    url: "https://freeaikit.app/image-convert",
  },
};

export default function ImageConvertPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd name="Image Format Converter" description="Convert images between JPG, PNG, and WebP instantly in your browser. Free, no upload, no signup. Batch convert multiple images at once." slug="image-convert" />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          Image Format Converter
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Convert JPG, PNG, WebP images instantly. 100% free, runs entirely in
          your browser — no upload, no signup.
        </p>
      </div>

      <ImageConvertClient />

      <section className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          How Does Image Conversion Work?
        </h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-600 leading-relaxed mb-4">
            Your browser decodes the source image using the Canvas API, then
            re-encodes it using industry-grade WebAssembly engines — MozJPEG for
            JPG, libwebp for WebP, and a lossless encoder for PNG. Everything
            runs locally on your device; your images are never sent to a server.
          </p>

          <h3 className="text-lg font-semibold mt-6 mb-3">Which Format Should I Use?</h3>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start gap-2">
              <span className="font-semibold text-gray-800 w-12 flex-shrink-0">JPG</span>
              <span>Best for photos and images with many colors. Widely supported everywhere. Lossy compression.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-semibold text-gray-800 w-12 flex-shrink-0">PNG</span>
              <span>Best for graphics, screenshots, or images that need transparency. Lossless — no quality loss.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-semibold text-gray-800 w-12 flex-shrink-0">WebP</span>
              <span>Best for web use. 25–35% smaller than JPG at the same quality. Supported by all modern browsers.</span>
            </li>
          </ul>

          <h3 className="text-lg font-semibold mt-6 mb-3">Features</h3>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">&#10003;</span>
              <span><strong>Batch Conversion</strong> — Convert multiple images at once</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">&#10003;</span>
              <span><strong>Quality Control</strong> — Adjust quality for JPG and WebP output</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">&#10003;</span>
              <span><strong>Lossless PNG</strong> — PNG output preserves every pixel</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">&#10003;</span>
              <span><strong>Privacy First</strong> — Images never leave your device</span>
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
            <h3 className="font-semibold mb-1">Does converting change image quality?</h3>
            <p className="text-gray-600 text-sm">
              Converting to PNG is always lossless — no quality loss. Converting to JPG
              or WebP uses the quality slider you set. At 85%, the result is visually
              identical to the original.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-1">Can I convert GIF or BMP files?</h3>
            <p className="text-gray-600 text-sm">
              Yes — any format your browser can display (GIF, BMP, TIFF, AVIF) can be
              used as input. Output is JPG, PNG, or WebP.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-1">Why convert to WebP?</h3>
            <p className="text-gray-600 text-sm">
              WebP files are 25–35% smaller than equivalent JPG files with the same
              visual quality, making pages load faster. All modern browsers support it.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-1">Is there a file size limit?</h3>
            <p className="text-gray-600 text-sm">
              No server-side limit. Processing happens in your browser, so very large
              images may take a few seconds depending on your device.
            </p>
          </div>
        </div>
      </section>
      <RelatedTools currentSlug="image-convert" />
    </div>
  );
}
