import type { Metadata } from "next";
import ImageBlurClient from "./ImageBlurClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "Blur Image / Face Blur - Free Online | FreeAIKit",
  description:
    "Blur faces, regions, or sensitive areas in images. Draw rectangles to blur. Adjustable blur intensity. Free, instant, runs in your browser.",
  keywords: ["blur image", "blur face", "blur region", "censor image", "pixelate face", "blur photo online", "redact image", "face blur tool"],
  openGraph: {
    title: "Blur Image / Face Blur - Free Online",
    description: "Blur faces and regions in images. Free and private — runs in your browser.",
    url: "https://freeaikit.app/image-blur",
  },
};

export default function ImageBlurPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd name="Blur Image / Face Blur" description="Blur faces, regions, or sensitive areas in images. Draw rectangles to blur. Adjustable blur intensity. Free, instant, runs in your browser." slug="image-blur" />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          Blur Image / Face Blur
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Blur faces, license plates, or any sensitive area in your images.
          Draw rectangles to select regions. Free, instant, in-browser.
        </p>
      </div>
      <ImageBlurClient />
      <section className="mt-20 max-w-3xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold text-center">FAQ</h2>
        {[
          {
            q: "How do I blur a face in a photo?",
            a: "Upload your image, then click and drag to draw a rectangle over the face or area you want to blur. You can add multiple blur regions and adjust the blur intensity.",
          },
          {
            q: "Can I undo a blur region?",
            a: "Yes! Each blur region has a delete button. Remove any region and re-draw if needed. The original image is preserved until you download.",
          },
          {
            q: "Is my image uploaded to a server?",
            a: "No. All blurring happens in your browser using the HTML5 Canvas API. Your image never leaves your device.",
          },
          {
            q: "What blur effects are available?",
            a: "You can choose between Gaussian blur (smooth) and pixelation (mosaic). Adjust the intensity slider for more or less blurring.",
          },
        ].map(({ q, a }) => (
          <div key={q}>
            <h3 className="font-semibold mb-1">{q}</h3>
            <p className="text-gray-600 text-sm">{a}</p>
          </div>
        ))}
      </section>
      <RelatedTools currentSlug="image-blur" />
    </div>
  );
}
