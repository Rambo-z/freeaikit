import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Header from "./components/Header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Free AI Kit - Free Online AI Tools",
  description:
    "100% free AI tools: background remover, image upscaler, PDF chat, QR code art generator and more. No signup required.",
  keywords: [
    "free ai tools",
    "ai background remover",
    "free online tools",
    "ai image tools",
    "remove background free",
  ],
  openGraph: {
    title: "Free AI Kit - Free Online AI Tools",
    description:
      "100% free AI tools: background remover, image upscaler, PDF chat, QR code art generator and more.",
    url: "https://freeaikit.app",
    siteName: "Free AI Kit",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Kit - Free Online AI Tools",
    description:
      "100% free AI tools: background remover, image upscaler, PDF chat and more.",
  },
  metadataBase: new URL("https://freeaikit.app"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-ZD9YFMFMN9" />
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-ZD9YFMFMN9');
        `}} />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased bg-gray-50 text-gray-900`}
      >
        <Header />

        {/* Main */}
        <main className="min-h-screen">{children}</main>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-400 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
              {/* Brand */}
              <div className="col-span-2 md:col-span-1">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-[10px]">FK</span>
                  </div>
                  <span className="text-base font-bold text-white">
                    FreeAIKit
                  </span>
                </div>
                <p className="text-sm leading-relaxed">
                  Free tools that run in your browser. No signup, no watermark.
                  Your files never leave your device.
                </p>
                <div className="mt-4 space-y-1">
                  <Link href="/" className="block text-sm hover:text-white transition-colors">Home</Link>
                  <Link href="/privacy-policy" className="block text-sm hover:text-white transition-colors">Privacy</Link>
                  <Link href="/terms" className="block text-sm hover:text-white transition-colors">Terms</Link>
                  <a href="mailto:hello@freeaikit.app" className="block text-sm hover:text-white transition-colors">Contact</a>
                </div>
              </div>

              {/* Image Tools */}
              <div>
                <h4 className="text-sm font-semibold text-white mb-3">Image</h4>
                <ul className="space-y-2">
                  {[
                    ["/bg-remover",      "BG Remover"],
                    ["/image-compress",  "Compressor"],
                    ["/image-convert",   "Converter"],
                    ["/image-resize",    "Resizer"],
                    ["/image-crop",      "Crop & Rotate"],
                    ["/image-filters",   "Filters"],
                    ["/image-watermark", "Watermark"],
                    ["/image-to-svg",    "Image to SVG"],
                    ["/base64-image",    "Base64"],
                    ["/image-to-text",  "Image to Text"],
                    ["/gif-maker",      "GIF Maker"],
                    ["/image-blur",     "Blur Image"],
                    ["/meme-generator", "Meme Generator"],
                  ].map(([href, label]) => (
                    <li key={href}><Link href={href} className="text-sm hover:text-white transition-colors">{label}</Link></li>
                  ))}
                </ul>
              </div>

              {/* PDF & Design */}
              <div>
                <h4 className="text-sm font-semibold text-white mb-3">PDF</h4>
                <ul className="space-y-2">
                  {[
                    ["/pdf-compress",  "PDF Compressor"],
                    ["/pdf-merge",     "Merge & Split"],
                    ["/pdf-rotate",    "PDF Rotate"],
                    ["/pdf-unlock",    "PDF Unlock"],
                    ["/pdf-protect",   "PDF Protect"],
                    ["/pdf-extract",   "Extract Pages"],
                    ["/image-to-pdf",  "Image to PDF"],
                    ["/pdf-to-images", "PDF to Images"],
                  ].map(([href, label]) => (
                    <li key={href}><Link href={href} className="text-sm hover:text-white transition-colors">{label}</Link></li>
                  ))}
                </ul>
                <h4 className="text-sm font-semibold text-white mt-6 mb-3">Design</h4>
                <ul className="space-y-2">
                  {[
                    ["/qr-code",           "QR Code"],
                    ["/color-palette",     "Color Palette"],
                    ["/color-converter",   "Color Converter"],
                    ["/favicon-generator", "Favicon Generator"],
                  ].map(([href, label]) => (
                    <li key={href}><Link href={href} className="text-sm hover:text-white transition-colors">{label}</Link></li>
                  ))}
                </ul>
              </div>

              {/* Dev Tools */}
              <div>
                <h4 className="text-sm font-semibold text-white mb-3">Dev Tools</h4>
                <ul className="space-y-2">
                  {[
                    ["/json-formatter",      "JSON Formatter"],
                    ["/css-minifier",        "CSS Minifier"],
                    ["/text-case",           "Text Case"],
                    ["/markdown-editor",     "Markdown Editor"],
                    ["/regex-tester",        "Regex Tester"],
                    ["/hash-generator",      "Hash Generator"],
                    ["/timestamp-converter", "Timestamp Converter"],
                    ["/uuid-generator",      "UUID Generator"],
                    ["/password-generator",  "Password Generator"],
                    ["/word-counter",        "Word Counter"],
                    ["/url-encoder",         "URL Encoder"],
                    ["/yaml-formatter",     "YAML Formatter"],
                    ["/csv-to-json",        "CSV to JSON"],
                    ["/html-encoder",       "HTML Encoder"],
                    ["/jwt-decoder",        "JWT Decoder"],
                    ["/base-converter",     "Base Converter"],
                    ["/xml-formatter",      "XML Formatter"],
                  ].map(([href, label]) => (
                    <li key={href}><Link href={href} className="text-sm hover:text-white transition-colors">{label}</Link></li>
                  ))}
                </ul>
              </div>

              {/* SEO Tools */}
              <div>
                <h4 className="text-sm font-semibold text-white mb-3">SEO</h4>
                <ul className="space-y-2">
                  {[
                    ["/meta-tag-generator", "Meta Tags"],
                    ["/schema-generator",   "Schema Markup"],
                    ["/robots-generator",   "Robots.txt"],
                    ["/keyword-density",    "Keyword Density"],
                    ["/og-preview",         "OG Preview"],
                  ].map(([href, label]) => (
                    <li key={href}><Link href={href} className="text-sm hover:text-white transition-colors">{label}</Link></li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-xs text-gray-500">
                &copy; {new Date().getFullYear()} FreeAIKit. All rights
                reserved. All tools are 100% free.
              </p>
              <p className="text-xs text-gray-600">
                Powered by your browser. Your files never leave your device.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
