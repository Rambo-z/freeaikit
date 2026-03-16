import type { Metadata } from "next";
import FaviconGeneratorClient from "./FaviconGeneratorClient";

export const metadata: Metadata = {
  title: "Favicon Generator - Free Online | FreeAIKit",
  description:
    "Generate favicons in all sizes from any image: 16x16, 32x32, 48x48, 64x64, 128x128, 180x180 (Apple touch icon), 192x192 (Android). Download PNG files instantly.",
  keywords: ["favicon generator", "favicon maker", "create favicon", "favicon from image", "ico generator", "apple touch icon", "android icon generator"],
  openGraph: {
    title: "Favicon Generator - Free Online",
    description: "Create favicons in all sizes from any image. Free, instant, no upload needed.",
    url: "https://freeaikit.app/favicon-generator",
  },
};

export default function FaviconGeneratorPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          Favicon Generator
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Upload any image and generate favicons for every platform: browser
          tabs, iOS home screen, Android, and PWA. Download all sizes as PNG.
        </p>
      </div>
      <FaviconGeneratorClient />
      <section className="mt-20 max-w-3xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold text-center">FAQ</h2>
        {[
          {
            q: "What favicon sizes do I need?",
            a: "For full browser + PWA coverage: 16x16 (browser tab), 32x32 (standard favicon), 48x48 (Windows), 64x64 (retina), 180x180 (Apple touch icon), 192x192 (Android/Chrome), and 512x512 (PWA splash). This tool generates all of them.",
          },
          {
            q: "How do I add a favicon to my website?",
            a: `Place the PNG files in your project root and add these tags in <head>: <link rel="icon" href="/favicon-32x32.png"> and <link rel="apple-touch-icon" href="/apple-touch-icon.png">. For modern browsers, PNG is fully supported.`,
          },
          {
            q: "Do I need an .ico file?",
            a: "For legacy browser support (IE 11), you need a favicon.ico. Modern browsers (Chrome, Firefox, Safari, Edge) all support PNG favicons natively. You can convert a PNG to ICO using free tools like favicon.io if needed.",
          },
          {
            q: "What image works best for a favicon?",
            a: "Simple shapes and logos work best — a favicon is tiny (16x16 on a browser tab), so complex photos lose all detail. Use a square image with a transparent background for best results.",
          },
        ].map(({ q, a }) => (
          <div key={q}>
            <h3 className="font-semibold mb-1">{q}</h3>
            <p className="text-gray-600 text-sm">{a}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
