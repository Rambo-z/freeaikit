import type { Metadata } from "next";
import OgPreviewClient from "./OgPreviewClient";

export const metadata: Metadata = {
  title: "Open Graph Preview - Free Online SEO Tool | FreeAIKit",
  description:
    "Preview how your page will look when shared on Facebook, Twitter, LinkedIn, and Discord. Test Open Graph and Twitter Card meta tags. Free, instant.",
  keywords: ["open graph preview", "og preview", "social media preview", "twitter card preview", "facebook share preview", "og tags tester", "open graph debugger"],
  openGraph: {
    title: "Open Graph Preview - Free Online",
    description: "Preview how your URL looks when shared on social media. Free and instant.",
    url: "https://freeaikit.app/og-preview",
  },
};

export default function OgPreviewPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          Open Graph Preview
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Preview how your page will look when shared on Facebook, Twitter/X,
          LinkedIn, and Discord. Enter your OG tags manually or paste HTML.
        </p>
      </div>
      <OgPreviewClient />
      <section className="mt-20 max-w-3xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold text-center">FAQ</h2>
        {[
          {
            q: "What is Open Graph?",
            a: "Open Graph is a protocol created by Facebook that allows web pages to control how they appear when shared on social media. OG tags define the title, description, image, and URL shown in share preview cards.",
          },
          {
            q: "What image size should I use for OG?",
            a: "The recommended size is 1200×630 pixels for Facebook and LinkedIn. Twitter recommends 1200×628 for summary_large_image cards. Using these dimensions ensures your image is displayed without cropping.",
          },
          {
            q: "Why does my link preview look wrong on Facebook?",
            a: "Facebook caches OG data. After updating your meta tags, use Facebook's Sharing Debugger to clear the cache. Also ensure your og:image URL is absolute (starts with https://) and the image is publicly accessible.",
          },
          {
            q: "Does this tool fetch the actual URL?",
            a: "No — this tool lets you enter OG tag values manually to preview the result without needing to deploy changes first. This way you can perfect your meta tags before going live.",
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
