import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileDown, Combine, Images, FileImage, Unlock, RotateCw, Shield, Scissors } from "lucide-react";
import ToolJsonLd from "../components/ToolJsonLd";

export const metadata: Metadata = {
  title: "Free Online PDF Tools - Compress, Merge, Convert | FreeAIKit",
  description:
    "Free online PDF tools that run entirely in your browser. Compress, merge, split, convert, rotate, protect, unlock, and extract PDF pages. No file uploads, no signup required.",
  keywords: [
    "free online pdf tools",
    "pdf compressor",
    "merge pdf",
    "split pdf",
    "pdf to images",
    "image to pdf",
    "pdf unlock",
    "pdf rotate",
    "pdf protect",
    "extract pdf pages",
    "browser pdf tools",
  ],
  openGraph: {
    title: "Free Online PDF Tools - Compress, Merge, Convert | FreeAIKit",
    description:
      "Free browser-based PDF tools. Compress, merge, split, convert, rotate, protect, unlock, and extract pages. No uploads to server.",
    url: "https://freeaikit.app/pdf-tools",
  },
};

const pdfTools = [
  {
    slug: "pdf-compress",
    name: "PDF Compressor",
    description: "Reduce PDF file size by up to 80% while maintaining visual quality. Perfect for email attachments and uploads.",
    icon: FileDown,
  },
  {
    slug: "pdf-merge",
    name: "PDF Merge & Split",
    description: "Combine multiple PDFs into one document or split a large PDF into separate files by page range.",
    icon: Combine,
  },
  {
    slug: "pdf-to-images",
    name: "PDF to Images",
    description: "Convert each page of a PDF into high-quality PNG or JPEG images. Great for presentations and sharing.",
    icon: Images,
  },
  {
    slug: "image-to-pdf",
    name: "Image to PDF",
    description: "Convert JPG, PNG, and WebP images into a single PDF document. Arrange pages before creating the PDF.",
    icon: FileImage,
  },
  {
    slug: "pdf-unlock",
    name: "PDF Unlock",
    description: "Remove password protection from PDF files so you can edit, copy, and print without restrictions.",
    icon: Unlock,
  },
  {
    slug: "pdf-rotate",
    name: "PDF Rotate",
    description: "Rotate individual pages or all pages of a PDF by 90, 180, or 270 degrees. Fix scanned documents easily.",
    icon: RotateCw,
  },
  {
    slug: "pdf-protect",
    name: "PDF Protect",
    description: "Add password protection to your PDF files. Restrict printing, copying, and editing with encryption.",
    icon: Shield,
  },
  {
    slug: "pdf-extract",
    name: "Extract Pages",
    description: "Select and extract specific pages from a PDF to create a new, smaller document with only the pages you need.",
    icon: Scissors,
  },
];

const faqItems = [
  {
    question: "Are these PDF tools really free?",
    answer:
      "Yes, all PDF tools on FreeAIKit are 100% free with no hidden costs, no signup required, and no watermarks added to your files. You can use them as many times as you need.",
  },
  {
    question: "Is it safe to process my PDF files here?",
    answer:
      "Absolutely. All processing happens directly in your browser using WebAssembly and JavaScript. Your files are never uploaded to any server. Once you close the tab, all data is gone. We have zero access to your documents.",
  },
  {
    question: "What is the maximum file size I can process?",
    answer:
      "Since processing runs in your browser, the limit depends on your device's available memory. Most modern devices can handle PDFs up to 100 MB without issues. For very large files, we recommend splitting them first.",
  },
  {
    question: "Do these tools work on mobile devices?",
    answer:
      "Yes, all PDF tools work on any modern browser including Chrome, Firefox, Safari, and Edge on both desktop and mobile devices. The interface adapts to your screen size for a smooth experience.",
  },
];

export default function PdfToolsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd
        name="Free Online PDF Tools"
        description="Free online PDF tools that run entirely in your browser. Compress, merge, split, convert, rotate, protect, unlock, and extract PDF pages. No file uploads, no signup required."
        slug="pdf-tools"
        faqItems={faqItems}
      />

      {/* Hero Section */}
      <div className="text-center mb-14">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
          Free Online PDF Tools
        </h1>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
          Every PDF tool you need, running entirely in your browser. Compress oversized
          PDFs for email, merge multiple documents into one, split large files into
          smaller parts, convert between PDF and image formats, and more. Your files
          never leave your device — all processing is powered by WebAssembly and
          JavaScript running locally on your machine. No server uploads, no signup, no
          watermarks, and no file size limits beyond your browser&apos;s memory. Whether
          you need to rotate scanned pages, extract specific sections, add password
          protection, or remove restrictions from a locked PDF, these tools handle it
          all in seconds. FreeAIKit&apos;s PDF suite is designed for speed, privacy, and
          simplicity — just drag and drop your file and get results instantly.
        </p>
      </div>

      {/* Tool Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-20">
        {pdfTools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link
              key={tool.slug}
              href={`/${tool.slug}`}
              className="group block bg-white border border-gray-200 rounded-2xl p-6 hover:border-blue-600 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h2 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {tool.name}
                    </h2>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {tool.description}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* FAQ Section */}
      <section className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-8 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {faqItems.map((item, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {item.question}
              </h3>
              <p className="text-gray-600 leading-relaxed">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
