import type { Metadata } from "next";
import MemeGeneratorClient from "./MemeGeneratorClient";
import ToolJsonLd from "../components/ToolJsonLd";
import RelatedTools from "../components/RelatedTools";

export const metadata: Metadata = {
  title: "Meme Generator - Free Online | FreeAIKit",
  description:
    "Create memes with custom text. Upload any image, add top and bottom text, customize font and colors. Free, instant, runs in your browser.",
  keywords: ["meme generator", "meme maker", "create meme", "meme creator", "make meme online", "meme template", "custom meme", "meme text"],
  openGraph: {
    title: "Meme Generator - Free Online",
    description: "Create memes with custom text. Free and private — runs in your browser.",
    url: "https://freeaikit.app/meme-generator",
  },
};

export default function MemeGeneratorPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd name="Meme Generator" description="Create memes with custom text. Upload any image, add top and bottom text, customize font and colors. Free, instant, runs in your browser." slug="meme-generator" />
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          Meme Generator
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Create memes with custom top and bottom text. Upload any image,
          customize fonts and colors. Free, instant, in-browser.
        </p>
      </div>
      <MemeGeneratorClient />
      <section className="mt-20 max-w-3xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold text-center">FAQ</h2>
        {[
          {
            q: "How do I create a meme?",
            a: "Upload an image or pick a blank canvas, add your text to the top and/or bottom, customize the font size and colors, then download your meme.",
          },
          {
            q: "What image formats are supported?",
            a: "You can upload JPG, PNG, WebP, and GIF images. The output is always PNG for best quality. Any image size works.",
          },
          {
            q: "Is there a watermark?",
            a: "No watermarks, no signup. Your meme is 100% clean and free. We never add branding to your images.",
          },
          {
            q: "Can I use custom fonts?",
            a: "The tool uses Impact (classic meme font) by default, plus Arial and Comic Sans alternatives. The text is rendered with a black outline for readability on any background.",
          },
        ].map(({ q, a }) => (
          <div key={q}>
            <h3 className="font-semibold mb-1">{q}</h3>
            <p className="text-gray-600 text-sm">{a}</p>
          </div>
        ))}
      </section>
      <RelatedTools currentSlug="meme-generator" />
    </div>
  );
}
