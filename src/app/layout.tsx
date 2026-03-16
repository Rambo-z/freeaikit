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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Brand */}
              <div className="md:col-span-2">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-[10px]">FK</span>
                  </div>
                  <span className="text-base font-bold text-white">
                    FreeAIKit
                  </span>
                </div>
                <p className="text-sm leading-relaxed max-w-sm">
                  Free AI-powered tools that run in your browser. No signup, no
                  watermark, no limits. Your files never leave your device.
                </p>
              </div>

              {/* Tools */}
              <div>
                <h4 className="text-sm font-semibold text-white mb-3">
                  Tools
                </h4>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/bg-remover"
                      className="text-sm hover:text-white transition-colors"
                    >
                      Background Remover
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/image-compress"
                      className="text-sm hover:text-white transition-colors"
                    >
                      Image Compressor
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/image-convert"
                      className="text-sm hover:text-white transition-colors"
                    >
                      Image Converter
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/image-to-svg"
                      className="text-sm hover:text-white transition-colors"
                    >
                      Image to SVG
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/image-resize"
                      className="text-sm hover:text-white transition-colors"
                    >
                      Image Resizer
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/pdf-compress"
                      className="text-sm hover:text-white transition-colors"
                    >
                      PDF Compressor
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/pdf-merge"
                      className="text-sm hover:text-white transition-colors"
                    >
                      PDF Merge & Split
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Links */}
              <div>
                <h4 className="text-sm font-semibold text-white mb-3">
                  Links
                </h4>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/"
                      className="text-sm hover:text-white transition-colors"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <a
                      href="mailto:hello@freeaikit.app"
                      className="text-sm hover:text-white transition-colors"
                    >
                      Contact
                    </a>
                  </li>
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
