import type { Metadata } from "next";
import BgRemoverClient from "./BgRemoverClient";

export const metadata: Metadata = {
  title: "AI Background Remover - Remove Image Background Free | FreeAIKit",
  description:
    "Remove image backgrounds instantly with AI. 100% free, no signup, no watermark. Works offline in your browser. Supports PNG, JPG, WebP.",
  keywords: [
    "remove background",
    "background remover",
    "remove bg",
    "transparent background",
    "free background remover",
    "ai background remover",
    "remove image background",
    "png background remover",
  ],
  openGraph: {
    title: "AI Background Remover - Free Online Tool",
    description:
      "Remove image backgrounds instantly with AI. 100% free, no signup required.",
    url: "https://freeaikit.app/bg-remover",
  },
};

export default function BgRemoverPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          AI Background Remover
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Remove backgrounds from any image in seconds. 100% free, runs entirely in your browser.
        </p>
      </div>

      {/* Tool Component */}
      <BgRemoverClient />

      {/* SEO Content */}
      <section className="mt-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          How Does AI Background Removal Work?
        </h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-600 leading-relaxed mb-4">
            Our AI background remover uses advanced machine learning models that run directly
            in your web browser. The AI analyzes your image, identifies the foreground subject,
            and precisely separates it from the background — all without uploading your image
            to any server.
          </p>
          <h3 className="text-lg font-semibold mt-6 mb-3">Features</h3>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              <span><strong>100% Free</strong> — No hidden costs, no watermarks, no limits</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              <span><strong>Privacy First</strong> — Images never leave your device</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              <span><strong>High Quality</strong> — AI-powered edge detection for clean results</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              <span><strong>No Signup</strong> — Start using immediately, no account needed</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              <span><strong>Multiple Formats</strong> — Supports PNG, JPG, WebP input and PNG output</span>
            </li>
          </ul>
        </div>
      </section>

      {/* FAQ for SEO */}
      <section className="mt-16 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-1">Is this really free?</h3>
            <p className="text-gray-600 text-sm">
              Yes, completely free with no limits. We don&apos;t charge for background removal.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-1">Are my images uploaded to a server?</h3>
            <p className="text-gray-600 text-sm">
              No. All processing happens locally in your browser using AI models.
              Your images never leave your device.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-1">What image formats are supported?</h3>
            <p className="text-gray-600 text-sm">
              We support PNG, JPG, JPEG, and WebP as input. Output is always PNG with
              a transparent background.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-1">How large can the images be?</h3>
            <p className="text-gray-600 text-sm">
              We recommend images up to 4096x4096 pixels for the best performance.
              Larger images may take longer to process.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
