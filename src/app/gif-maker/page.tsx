import type { Metadata } from "next";
import GifMakerClient from "./GifMakerClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "GIF Maker - Create Animated GIFs Free | FreeAIKit",
  description:
    "Create animated GIFs from images. Upload multiple images, set frame delay, adjust quality. Free, instant, runs in your browser.",
  keywords: ["gif maker", "create gif", "animated gif", "gif creator", "images to gif", "make gif online", "gif generator", "gif from images"],
  openGraph: {
    title: "GIF Maker - Create Animated GIFs Free",
    description: "Create animated GIFs from images. Free and private — runs in your browser.",
    url: "https://freeaikit.app/gif-maker",
  },
};

export default function GifMakerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd name="GIF Maker" description="Create animated GIFs from images. Upload multiple images, set frame delay, adjust quality. Free, instant, runs in your browser." slug="gif-maker" />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          GIF Maker
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Create animated GIFs from images. Upload photos, set frame delay and
          quality, then download your GIF. Free, instant, in-browser.
        </p>
      </div>
      <GifMakerClient />
      <section className="mt-20 max-w-3xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold text-center">FAQ</h2>
        {[
          {
            q: "How do I create a GIF?",
            a: "Upload 2 or more images, arrange them in order, set the delay between frames, and click Generate GIF. The frames will play in sequence to create your animation.",
          },
          {
            q: "What image formats can I use?",
            a: "You can use JPG, PNG, WebP, and BMP images as frames. All images will be resized to match the dimensions you choose.",
          },
          {
            q: "Is there a frame limit?",
            a: "No fixed limit. However, more frames and higher resolution will take longer to process and produce larger files. For smooth animations, 10-30 frames work well.",
          },
          {
            q: "Can I control the animation speed?",
            a: "Yes! Adjust the frame delay in milliseconds. 100ms = 10 fps (fast), 200ms = 5 fps (medium), 500ms = 2 fps (slow slideshow). You can also set it to loop once or infinitely.",
          },
        ].map(({ q, a }) => (
          <div key={q}>
            <h3 className="font-semibold mb-1">{q}</h3>
            <p className="text-gray-600 text-sm">{a}</p>
          </div>
        ))}
      </section>
      <RelatedTools currentSlug="gif-maker" />
    </div>
  );
}
