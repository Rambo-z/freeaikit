import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

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
      <body
        className={`${inter.variable} font-sans antialiased bg-gray-50 text-gray-900`}
      >
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-14">
              <Link href="/" className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm">
                  <span className="text-white font-bold text-xs">FK</span>
                </div>
                <span className="text-lg font-bold text-gray-900">
                  FreeAIKit
                </span>
              </Link>
              <nav className="hidden md:flex items-center gap-1">
                <Link
                  href="/"
                  className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  All Tools
                </Link>
                <Link
                  href="/bg-remover"
                  className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  BG Remover
                </Link>
                <Link
                  href="/image-compress"
                  className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Compressor
                </Link>
              </nav>
              <div className="flex items-center gap-3">
                <Link
                  href="/bg-remover"
                  className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
                >
                  Try Free
                </Link>
              </div>
            </div>
          </div>
        </header>

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
                    <span className="text-sm text-gray-500">
                      QR Code Art (soon)
                    </span>
                  </li>
                  <li>
                    <span className="text-sm text-gray-500">
                      PDF Chat (soon)
                    </span>
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
