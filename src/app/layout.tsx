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
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1463368654313121" crossOrigin="anonymous" />
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
                <Link href="/image-tools" className="text-sm font-semibold text-white mb-3 block hover:text-blue-400 transition-colors">Image Tools</Link>
                <ul className="space-y-2">
                  {[
                    ["/bg-remover",      "BG Remover"],
                    ["/image-compress",  "Compressor"],
                    ["/image-convert",   "Converter"],
                    ["/image-resize",    "Resizer"],
                    ["/image-crop",      "Crop & Rotate"],
                    ["/image-filters",   "Filters"],
                    ["/image-to-text",   "Image to Text (OCR)"],
                    ["/gif-maker",       "GIF Maker"],
                    ["/image-to-svg",    "Image to SVG"],
                    ["/image-blur",      "Blur Image"],
                    ["/meme-generator",  "Meme Generator"],
                    ["/compress-jpg",    "Compress JPG"],
                    ["/compress-png",    "Compress PNG"],
                    ["/png-compressor",  "PNG Compressor"],
                    ["/image-compressor","Image Compressor"],
                    ["/resize-image",    "Resize Image"],
                    ["/crop-image",      "Crop Image"],
                    ["/remove-background","Remove Background"],
                  ].map(([href, label]) => (
                    <li key={href}><Link href={href} className="text-sm hover:text-white transition-colors">{label}</Link></li>
                  ))}
                </ul>
              </div>

              {/* PDF & Converters */}
              <div>
                <Link href="/pdf-tools" className="text-sm font-semibold text-white mb-3 block hover:text-blue-400 transition-colors">PDF Tools</Link>
                <ul className="space-y-2">
                  {[
                    ["/pdf-compress",    "PDF Compressor"],
                    ["/compress-pdf",    "Compress PDF"],
                    ["/pdf-merge",       "Merge & Split"],
                    ["/merge-pdf",       "Merge PDF"],
                    ["/split-pdf",       "Split PDF"],
                    ["/pdf-rotate",      "PDF Rotate"],
                    ["/pdf-unlock",      "PDF Unlock"],
                    ["/pdf-protect",     "PDF Protect"],
                    ["/pdf-extract",     "Extract Pages"],
                    ["/pdf-text-extractor","PDF Text Extractor"],
                    ["/image-to-pdf",    "Image to PDF"],
                    ["/jpg-to-pdf",      "JPG to PDF"],
                    ["/png-to-pdf",      "PNG to PDF"],
                    ["/pdf-to-images",   "PDF to Images"],
                    ["/pdf-to-jpg",      "PDF to JPG"],
                    ["/pdf-to-png",      "PDF to PNG"],
                  ].map(([href, label]) => (
                    <li key={href}><Link href={href} className="text-sm hover:text-white transition-colors">{label}</Link></li>
                  ))}
                </ul>
              </div>

              {/* Format Converters */}
              <div>
                <h4 className="text-sm font-semibold text-white mb-3">Convert</h4>
                <ul className="space-y-2">
                  {[
                    ["/jpg-to-png",      "JPG to PNG"],
                    ["/png-to-jpg",      "PNG to JPG"],
                    ["/jpg-to-webp",     "JPG to WebP"],
                    ["/png-to-webp",     "PNG to WebP"],
                    ["/webp-to-jpg",     "WebP to JPG"],
                    ["/webp-to-png",     "WebP to PNG"],
                    ["/svg-to-jpg",      "SVG to JPG"],
                    ["/svg-to-png",      "SVG to PNG"],
                    ["/gif-to-jpg",      "GIF to JPG"],
                    ["/gif-to-png",      "GIF to PNG"],
                    ["/png-to-svg",      "PNG to SVG"],
                    ["/image-to-png",    "Image to PNG"],
                    ["/photo-to-pdf",    "Photo to PDF"],
                  ].map(([href, label]) => (
                    <li key={href}><Link href={href} className="text-sm hover:text-white transition-colors">{label}</Link></li>
                  ))}
                </ul>
                <Link href="/design-tools" className="text-sm font-semibold text-white mt-6 mb-3 block hover:text-blue-400 transition-colors">Design</Link>
                <ul className="space-y-2">
                  {[
                    ["/qr-code",           "QR Code"],
                    ["/color-palette",     "Color Palette"],
                    ["/color-converter",   "Color Converter"],
                    ["/color-picker",      "Color Picker"],
                    ["/favicon-generator", "Favicon Generator"],
                    ["/base64-image",      "Base64 Image"],
                    ["/image-watermark",   "Watermark"],
                  ].map(([href, label]) => (
                    <li key={href}><Link href={href} className="text-sm hover:text-white transition-colors">{label}</Link></li>
                  ))}
                </ul>
              </div>

              {/* Dev Tools */}
              <div>
                <Link href="/dev-tools" className="text-sm font-semibold text-white mb-3 block hover:text-blue-400 transition-colors">Dev Tools</Link>
                <ul className="space-y-2">
                  {[
                    ["/json-formatter",      "JSON Formatter"],
                    ["/json-beautifier",     "JSON Beautifier"],
                    ["/json-validator",      "JSON Validator"],
                    ["/css-minifier",        "CSS Minifier"],
                    ["/case-converter",      "Case Converter"],
                    ["/text-case",           "Text Case"],
                    ["/markdown-editor",     "Markdown Editor"],
                    ["/regex-tester",        "Regex Tester"],
                    ["/hash-generator",      "Hash Generator"],
                    ["/timestamp-converter", "Timestamp Converter"],
                    ["/time-converter",      "Time Converter"],
                    ["/epoch-converter",     "Epoch Converter"],
                    ["/uuid-generator",      "UUID Generator"],
                    ["/password-generator",  "Password Generator"],
                    ["/word-counter",        "Word Counter"],
                    ["/url-encoder",         "URL Encoder"],
                    ["/html-encoder",        "HTML Encoder"],
                    ["/binary-translator",   "Binary Translator"],
                    ["/csv-to-json",         "CSV to JSON"],
                    ["/yaml-formatter",      "YAML Formatter"],
                    ["/xml-formatter",       "XML Formatter"],
                    ["/jwt-decoder",         "JWT Decoder"],
                    ["/base-converter",      "Base Converter"],
                  ].map(([href, label]) => (
                    <li key={href}><Link href={href} className="text-sm hover:text-white transition-colors">{label}</Link></li>
                  ))}
                </ul>
              </div>

              {/* SEO & Utilities */}
              <div>
                <Link href="/seo-tools" className="text-sm font-semibold text-white mb-3 block hover:text-blue-400 transition-colors">SEO Tools</Link>
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
                <h4 className="text-sm font-semibold text-white mt-6 mb-3">Utilities</h4>
                <ul className="space-y-2">
                  {[
                    ["/unit-converter",         "Unit Converter"],
                    ["/age-calculator",         "Age Calculator"],
                    ["/percentage-calculator",  "Percentage Calculator"],
                    ["/random-number",          "Random Number"],
                    ["/lorem-ipsum",            "Lorem Ipsum"],
                    ["/text-diff",              "Text Diff"],
                    ["/text-compare",           "Text Compare"],
                    ["/sort-lines",             "Sort Lines"],
                    ["/remove-duplicates",      "Remove Duplicates"],
                    ["/text-to-binary",         "Text to Binary"],
                    ["/how-old-am-i",           "How Old Am I"],
                    ["/compress-image",         "Compress Image"],
                    ["/compress-jpeg",          "Compress JPEG"],
                  ].map(([href, label]) => (
                    <li key={href}><Link href={href} className="text-sm hover:text-white transition-colors">{label}</Link></li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Multilingual Tools */}
            <div className="mt-8 pt-6 border-t border-gray-800 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="text-sm font-semibold text-white mb-3">Herramientas en Español</h4>
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  {[
                    ["/es/comprimir-imagen",      "Comprimir Imagen"],
                    ["/es/quitar-fondo",          "Quitar Fondo"],
                    ["/es/unir-pdf",              "Unir PDF"],
                    ["/es/imagen-a-texto",        "Imagen a Texto"],
                    ["/es/redimensionar-imagen",  "Redimensionar Imagen"],
                    ["/es/convertir-imagen",      "Convertir Imagen"],
                    ["/es/comprimir-pdf",         "Comprimir PDF"],
                    ["/es/recortar-imagen",       "Recortar Imagen"],
                    ["/es/pdf-a-imagen",          "PDF a Imagen"],
                    ["/es/imagen-a-pdf",          "Imagen a PDF"],
                    ["/es/formato-json",          "Formato JSON"],
                    ["/es/extraer-pdf",           "Extraer PDF"],
                    ["/es/imagen-a-svg",          "Imagen a SVG"],
                    ["/es/crear-gif",             "Crear GIF"],
                    ["/es/generar-contrasena",    "Generar Contraseña"],
                    ["/es/codigo-qr",             "Código QR"],
                    ["/es/contador-palabras",     "Contador Palabras"],
                    ["/es/marca-de-agua",         "Marca de Agua"],
                    ["/es/csv-a-json",            "CSV a JSON"],
                    ["/es/desbloquear-pdf",       "Desbloquear PDF"],
                  ].map(([href, label]) => (
                    <Link key={href} href={href} className="text-sm text-gray-400 hover:text-white transition-colors">{label}</Link>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white mb-3">Ferramentas em Português</h4>
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  {[
                    ["/pt/comprimir-imagem",      "Comprimir Imagem"],
                    ["/pt/remover-fundo",         "Remover Fundo"],
                    ["/pt/juntar-pdf",            "Juntar PDF"],
                    ["/pt/imagem-para-texto",     "Imagem para Texto"],
                    ["/pt/redimensionar-imagem",  "Redimensionar Imagem"],
                    ["/pt/converter-imagem",      "Converter Imagem"],
                    ["/pt/comprimir-pdf",         "Comprimir PDF"],
                    ["/pt/cortar-imagem",         "Cortar Imagem"],
                    ["/pt/pdf-para-imagem",       "PDF para Imagem"],
                    ["/pt/imagem-para-pdf",       "Imagem para PDF"],
                    ["/pt/formatador-json",       "Formatador JSON"],
                    ["/pt/extrair-pdf",           "Extrair PDF"],
                    ["/pt/imagem-para-svg",       "Imagem para SVG"],
                    ["/pt/criar-gif",             "Criar GIF"],
                    ["/pt/gerador-senha",         "Gerador Senha"],
                    ["/pt/codigo-qr",             "Código QR"],
                    ["/pt/contador-palavras",     "Contador Palavras"],
                    ["/pt/marca-dagua",           "Marca d'Água"],
                    ["/pt/csv-para-json",         "CSV para JSON"],
                    ["/pt/desbloquear-pdf",       "Desbloquear PDF"],
                  ].map(([href, label]) => (
                    <Link key={href} href={href} className="text-sm text-gray-400 hover:text-white transition-colors">{label}</Link>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white mb-3">Alat dalam Bahasa Indonesia</h4>
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  {[
                    ["/id/kompres-gambar",         "Kompres Gambar"],
                    ["/id/hapus-latar-belakang",   "Hapus Latar Belakang"],
                    ["/id/gabung-pdf",             "Gabung PDF"],
                    ["/id/gambar-ke-pdf",          "Gambar ke PDF"],
                    ["/id/pdf-ke-gambar",          "PDF ke Gambar"],
                    ["/id/ubah-ukuran-gambar",     "Ubah Ukuran Gambar"],
                    ["/id/kompres-pdf",            "Kompres PDF"],
                    ["/id/konversi-gambar",        "Konversi Gambar"],
                    ["/id/gambar-ke-teks",         "Gambar ke Teks"],
                    ["/id/format-json",            "Format JSON"],
                  ].map(([href, label]) => (
                    <Link key={href} href={href} className="text-sm text-gray-400 hover:text-white transition-colors">{label}</Link>
                  ))}
                </div>
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
