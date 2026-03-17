import type { Metadata } from "next";
import Link from "next/link";
import {
  Eraser,
  ZoomIn,
  RotateCw,
  Spline,
  Maximize,
  Droplets,
  Crop,
  SlidersHorizontal,
  Binary,
  FileText,
  Film,
  Blend,
  Type,
  ArrowRight,
} from "lucide-react";
import ToolJsonLd from "../components/ToolJsonLd";

export const metadata: Metadata = {
  title: "Free Online Image Tools - Edit, Compress, Convert | FreeAIKit",
  description:
    "Free online image tools that run entirely in your browser. Compress, convert, resize, crop, remove backgrounds, add watermarks, apply filters, and more. No upload, no signup, 100% private.",
  keywords: [
    "free online image tools",
    "image editor online",
    "image compressor",
    "image converter",
    "background remover",
    "image resizer",
    "image crop online",
    "browser image tools",
    "free image editing",
    "online image processing",
  ],
  openGraph: {
    title: "Free Online Image Tools - Edit, Compress, Convert | FreeAIKit",
    description:
      "13 free browser-based image tools: compress, convert, resize, remove backgrounds, add watermarks, and more. No upload required.",
    url: "https://freeaikit.app/image-tools",
  },
};

const tools = [
  {
    slug: "bg-remover",
    name: "AI Background Remover",
    description: "Remove image backgrounds instantly with AI-powered edge detection. Get clean transparent PNGs in seconds.",
    icon: Eraser,
  },
  {
    slug: "image-compress",
    name: "Image Compressor",
    description: "Compress JPEG, PNG, and WebP images with WASM-powered engines. Achieve 60-80% size reduction without visible quality loss.",
    icon: ZoomIn,
  },
  {
    slug: "image-convert",
    name: "Format Converter",
    description: "Convert images between JPEG, PNG, WebP, AVIF, and more. Batch convert multiple files at once.",
    icon: RotateCw,
  },
  {
    slug: "image-to-svg",
    name: "Image to SVG",
    description: "Trace raster images into scalable vector graphics. Perfect for logos, icons, and illustrations.",
    icon: Spline,
  },
  {
    slug: "image-resize",
    name: "Image Resizer",
    description: "Resize images to exact dimensions or by percentage. Maintain aspect ratio or set custom sizes.",
    icon: Maximize,
  },
  {
    slug: "image-watermark",
    name: "Image Watermark",
    description: "Add text or image watermarks to protect your photos. Customize position, opacity, and size.",
    icon: Droplets,
  },
  {
    slug: "image-crop",
    name: "Crop & Rotate",
    description: "Crop images to any aspect ratio and rotate to the perfect angle. Supports freeform and preset ratios.",
    icon: Crop,
  },
  {
    slug: "image-filters",
    name: "Image Filters",
    description: "Apply professional photo filters and adjustments. Tweak brightness, contrast, saturation, and more.",
    icon: SlidersHorizontal,
  },
  {
    slug: "base64-image",
    name: "Base64 Image",
    description: "Encode images to Base64 strings or decode Base64 back to images. Useful for embedding images in CSS and HTML.",
    icon: Binary,
  },
  {
    slug: "image-to-text",
    name: "Image to Text (OCR)",
    description: "Extract text from images using optical character recognition. Supports multiple languages.",
    icon: FileText,
  },
  {
    slug: "gif-maker",
    name: "GIF Maker",
    description: "Create animated GIFs from multiple images. Control frame rate, size, and loop settings.",
    icon: Film,
  },
  {
    slug: "image-blur",
    name: "Blur Image",
    description: "Apply blur effects to images or selectively blur sensitive areas like faces and text.",
    icon: Blend,
  },
  {
    slug: "meme-generator",
    name: "Meme Generator",
    description: "Create memes with custom text overlays. Choose fonts, colors, and positions for top and bottom text.",
    icon: Type,
  },
];

const faqItems = [
  {
    question: "Are these image tools really free?",
    answer:
      "Yes, all 13 image tools on FreeAIKit are completely free with no hidden costs, no watermarks, and no usage limits. You can process as many images as you want without creating an account.",
  },
  {
    question: "Do my images get uploaded to a server?",
    answer:
      "No. Every tool runs entirely inside your web browser using WebAssembly and JavaScript. Your images are never uploaded to any server, which means your files stay completely private and secure on your device.",
  },
  {
    question: "What image formats are supported?",
    answer:
      "Most tools support all common image formats including JPEG, PNG, WebP, GIF, and BMP. Some tools like the Format Converter also support modern formats like AVIF. Check each individual tool page for specific format details.",
  },
  {
    question: "Can I process multiple images at once?",
    answer:
      "Yes, several tools including the Image Compressor, Format Converter, and Image Resizer support batch processing. You can drag and drop multiple files and process them all simultaneously, then download the results as a ZIP file.",
  },
];

export default function ImageToolsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd
        name="Free Online Image Tools"
        description="13 free browser-based image tools: compress, convert, resize, remove backgrounds, add watermarks, and more. No upload required."
        slug="image-tools"
        faqItems={faqItems}
      />

      {/* Page Header */}
      <div className="text-center mb-14">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-6">
          Free Online Image Tools
        </h1>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
          FreeAIKit offers a complete suite of browser-based image processing tools that handle
          everything from compression and format conversion to AI-powered background removal and
          OCR text extraction. Every tool runs entirely on your device using WebAssembly technology,
          which means your images are never uploaded to any server. This gives you professional-grade
          results with complete privacy. Whether you need to shrink file sizes for faster web loading,
          convert between formats like JPEG, PNG, and WebP, resize images to exact dimensions, or
          add watermarks to protect your work, these tools deliver the same quality as paid desktop
          software without any installation. All tools are completely free with no signup, no
          watermarks, and no usage limits. Just open a tool, drop your image, and download the
          result. It works on any modern browser across desktop, tablet, and mobile devices.
          Start with any of the 13 tools below to edit, compress, convert, or enhance your images
          right now.
        </p>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link
              key={tool.slug}
              href={`/${tool.slug}`}
              className="group block bg-white border border-gray-200 rounded-2xl p-6 hover:border-blue-300 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                  <Icon className="w-5 h-5 text-blue-600" />
                </div>
                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </div>
              <h2 className="text-lg font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                {tool.name}
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                {tool.description}
              </p>
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
              <h3 className="font-semibold mb-2">{item.question}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
