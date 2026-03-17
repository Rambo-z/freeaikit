"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Eraser,
  ZoomIn,
  QrCode,
  FileText,
  Palette,
  PenTool,
  Image,
  FileImage,
  Spline,
  Maximize,
  FilePlus2,
  Wand2,
  Search,
  ArrowRight,
  Shield,
  Zap,
  DollarSign,
  Users,
  Download,
  Star,
  Braces,
  Code2,
  Type,
  Crop,
  SlidersHorizontal,
  Globe,
  Lock,
  BookOpen,
  Link2,
  FileCode,
  Droplets,
  Regex,
  Clock,
  Hash,
  Fingerprint,
  Unlock,
  RotateCw,
  Scissors,
  FileJson,
  Table,
  Code,
  Key,
  Binary,
  FileType,
  Tags,
  FileCheck,
  Bot,
  BarChart3,
  Eye,
  ScanText,
  Film,
  Blend,
  Laugh,
} from "lucide-react";

const categories = [
  { id: "all", label: "All Tools", icon: Wand2 },
  { id: "image", label: "Image Tools", icon: Image },
  { id: "ai", label: "AI Tools", icon: Zap },
  { id: "pdf", label: "PDF Tools", icon: FileText },
  { id: "design", label: "Design", icon: Palette },
  { id: "dev", label: "Dev Tools", icon: Code2 },
  { id: "seo", label: "SEO Tools", icon: Search },
];

const tools = [
  {
    name: "AI Background Remover",
    description:
      "Remove image backgrounds instantly with AI. No signup, no watermark.",
    href: "/bg-remover",
    icon: Eraser,
    category: "image",
    color: "from-pink-500 to-rose-500",
    bgColor: "bg-pink-50",
    iconColor: "text-pink-600",
    tag: "Popular",
    tagColor: "bg-green-500 text-white",
    ready: true,
  },
  {
    name: "AI Image Upscaler",
    description:
      "Upscale and enhance low-resolution images with AI. Make blurry photos crystal clear.",
    href: "/image-upscaler",
    icon: ZoomIn,
    category: "ai",
    color: "from-purple-500 to-indigo-500",
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600",
    tag: "Coming Soon",
    tagColor: "bg-gray-400 text-white",
    ready: false,
  },
  {
    name: "PDF Compressor",
    description:
      "Compress PDF files up to 80% smaller. No upload, runs entirely in your browser.",
    href: "/pdf-compress",
    icon: FileText,
    category: "pdf",
    color: "from-orange-500 to-amber-500",
    bgColor: "bg-orange-50",
    iconColor: "text-orange-600",
    tag: "New",
    tagColor: "bg-green-500 text-white",
    ready: true,
  },
  {
    name: "Color Palette Extractor",
    description:
      "Extract dominant color palettes from any image. Get hex codes and copy as CSS variables.",
    href: "/color-palette",
    icon: Palette,
    category: "design",
    color: "from-yellow-500 to-amber-500",
    bgColor: "bg-yellow-50",
    iconColor: "text-yellow-600",
    tag: "New",
    tagColor: "bg-green-500 text-white",
    ready: true,
  },
  {
    name: "AI Text Rewriter",
    description:
      "Rewrite and rephrase text in different tones and styles. Perfect for content creation.",
    href: "/text-rewriter",
    icon: PenTool,
    category: "ai",
    color: "from-violet-500 to-purple-500",
    bgColor: "bg-violet-50",
    iconColor: "text-violet-600",
    tag: "Coming Soon",
    tagColor: "bg-gray-400 text-white",
    ready: false,
  },
  {
    name: "Image Compressor",
    description:
      "Compress JPG, PNG, WebP while saving space and maintaining quality. Batch support.",
    href: "/image-compress",
    icon: FileImage,
    category: "image",
    color: "from-sky-500 to-blue-500",
    bgColor: "bg-sky-50",
    iconColor: "text-sky-600",
    tag: "New",
    tagColor: "bg-green-500 text-white",
    ready: true,
  },
  {
    name: "Image Format Converter",
    description:
      "Convert images between PNG, JPG, WebP and more formats instantly. Batch support.",
    href: "/image-convert",
    icon: Image,
    category: "image",
    color: "from-teal-500 to-emerald-500",
    bgColor: "bg-teal-50",
    iconColor: "text-teal-600",
    tag: "New",
    tagColor: "bg-green-500 text-white",
    ready: true,
  },
  {
    name: "Image to SVG",
    description:
      "Convert PNG, JPG, WebP to scalable SVG vector format. Perfect for logos and icons.",
    href: "/image-to-svg",
    icon: Spline,
    category: "image",
    color: "from-violet-500 to-purple-500",
    bgColor: "bg-violet-50",
    iconColor: "text-violet-600",
    tag: "New",
    tagColor: "bg-green-500 text-white",
    ready: true,
  },
  {
    name: "Image Resizer",
    description:
      "Resize images by exact pixels or percentage. Batch support. JPG, PNG, WebP.",
    href: "/image-resize",
    icon: Maximize,
    category: "image",
    color: "from-cyan-500 to-sky-500",
    bgColor: "bg-cyan-50",
    iconColor: "text-cyan-600",
    tag: "New",
    tagColor: "bg-green-500 text-white",
    ready: true,
  },
  {
    name: "PDF Merge & Split",
    description:
      "Merge multiple PDFs into one, or split a PDF by page range. Free, instant.",
    href: "/pdf-merge",
    icon: FilePlus2,
    category: "pdf",
    color: "from-blue-500 to-indigo-500",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
    tag: "New",
    tagColor: "bg-green-500 text-white",
    ready: true,
  },
  {
    name: "Image to PDF",
    description:
      "Convert JPG, PNG, WebP images to PDF. Combine multiple images into one document.",
    href: "/image-to-pdf",
    icon: FileText,
    category: "pdf",
    color: "from-red-500 to-rose-500",
    bgColor: "bg-red-50",
    iconColor: "text-red-600",
    tag: "New",
    tagColor: "bg-green-500 text-white",
    ready: true,
  },
  {
    name: "PDF to Images",
    description:
      "Convert every PDF page to JPG or PNG. Choose resolution up to 300 DPI. Batch download.",
    href: "/pdf-to-images",
    icon: FileImage,
    category: "pdf",
    color: "from-indigo-500 to-blue-500",
    bgColor: "bg-indigo-50",
    iconColor: "text-indigo-600",
    tag: "New",
    tagColor: "bg-green-500 text-white",
    ready: true,
  },
  {
    name: "QR Code Generator",
    description:
      "Generate QR codes for URLs, WiFi, email, and more. Customize colors, download PNG or SVG.",
    href: "/qr-code",
    icon: QrCode,
    category: "design",
    color: "from-emerald-500 to-teal-500",
    bgColor: "bg-emerald-50",
    iconColor: "text-emerald-600",
    tag: "New",
    tagColor: "bg-green-500 text-white",
    ready: true,
  },
  {
    name: "Image Watermark",
    description:
      "Add text watermarks to photos. Customize position, opacity, color and rotation. Single or tiled.",
    href: "/image-watermark",
    icon: PenTool,
    category: "image",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
    tag: "New",
    tagColor: "bg-green-500 text-white",
    ready: true,
  },
  {
    name: "Base64 Image",
    description:
      "Convert images to Base64 data URLs for HTML/CSS/JS embedding. Decode Base64 back to images.",
    href: "/base64-image",
    icon: FileText,
    category: "image",
    color: "from-indigo-500 to-violet-500",
    bgColor: "bg-indigo-50",
    iconColor: "text-indigo-600",
    tag: "New",
    tagColor: "bg-green-500 text-white",
    ready: true,
  },
  {
    name: "JSON Formatter",
    description:
      "Format, beautify, minify and validate JSON online. Syntax highlighting, instant error detection.",
    href: "/json-formatter",
    icon: Braces,
    category: "dev",
    color: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-50",
    iconColor: "text-amber-600",
    tag: "New",
    tagColor: "bg-green-500 text-white",
    ready: true,
  },
  {
    name: "CSS Minifier",
    description:
      "Minify CSS to reduce file size or beautify minified CSS to make it readable. Shows savings stats.",
    href: "/css-minifier",
    icon: Code2,
    category: "dev",
    color: "from-sky-500 to-cyan-500",
    bgColor: "bg-sky-50",
    iconColor: "text-sky-600",
    tag: "New",
    tagColor: "bg-green-500 text-white",
    ready: true,
  },
  {
    name: "Text Case Converter",
    description:
      "Convert text between camelCase, snake_case, kebab-case, UPPER CASE, Title Case and more.",
    href: "/text-case",
    icon: Type,
    category: "dev",
    color: "from-violet-500 to-purple-500",
    bgColor: "bg-violet-50",
    iconColor: "text-violet-600",
    tag: "New",
    tagColor: "bg-green-500 text-white",
    ready: true,
  },
  {
    name: "Image Crop & Rotate",
    description:
      "Crop images to any aspect ratio or custom size. Rotate 90°/180°, flip horizontally or vertically.",
    href: "/image-crop",
    icon: Crop,
    category: "image",
    color: "from-rose-500 to-pink-500",
    bgColor: "bg-rose-50",
    iconColor: "text-rose-600",
    tag: "New",
    tagColor: "bg-green-500 text-white",
    ready: true,
  },
  {
    name: "Image Filters",
    description:
      "Apply filters to images: brightness, contrast, saturation, blur, grayscale, sepia and more.",
    href: "/image-filters",
    icon: SlidersHorizontal,
    category: "image",
    color: "from-fuchsia-500 to-pink-500",
    bgColor: "bg-fuchsia-50",
    iconColor: "text-fuchsia-600",
    tag: "New",
    tagColor: "bg-green-500 text-white",
    ready: true,
  },
  {
    name: "Favicon Generator",
    description:
      "Generate favicons for all platforms from any image: 16×16, 32×32, 180×180, 192×192, 512×512.",
    href: "/favicon-generator",
    icon: Globe,
    category: "design",
    color: "from-emerald-500 to-green-500",
    bgColor: "bg-emerald-50",
    iconColor: "text-emerald-600",
    tag: "New",
    tagColor: "bg-green-500 text-white",
    ready: true,
  },
  {
    name: "Password Generator",
    description:
      "Generate strong, random passwords. Customize length and character types. Cryptographically secure.",
    href: "/password-generator",
    icon: Lock,
    category: "dev",
    color: "from-slate-500 to-gray-500",
    bgColor: "bg-slate-50",
    iconColor: "text-slate-600",
    tag: "New",
    tagColor: "bg-green-500 text-white",
    ready: true,
  },
  {
    name: "Word Counter",
    description:
      "Count words, characters, sentences, paragraphs and reading time. Find top keywords. Real-time.",
    href: "/word-counter",
    icon: BookOpen,
    category: "dev",
    color: "from-teal-500 to-cyan-500",
    bgColor: "bg-teal-50",
    iconColor: "text-teal-600",
    tag: "New",
    tagColor: "bg-green-500 text-white",
    ready: true,
  },
  {
    name: "URL Encoder / Decoder",
    description:
      "Encode and decode URLs with encodeURIComponent. Parse any URL into protocol, path, params, hash.",
    href: "/url-encoder",
    icon: Link2,
    category: "dev",
    color: "from-orange-500 to-amber-500",
    bgColor: "bg-orange-50",
    iconColor: "text-orange-600",
    tag: "New",
    tagColor: "bg-green-500 text-white",
    ready: true,
  },
  {
    name: "Markdown Editor",
    description:
      "Write and preview Markdown in real-time. Split pane editor with toolbar, word count, and HTML export.",
    href: "/markdown-editor",
    icon: FileCode,
    category: "dev",
    color: "from-gray-500 to-slate-500",
    bgColor: "bg-gray-50",
    iconColor: "text-gray-600",
    tag: "New",
    tagColor: "bg-green-500 text-white",
    ready: true,
  },
  {
    name: "Color Converter",
    description:
      "Convert colors between HEX, RGB, HSL, and CMYK. Color picker, shades generator, recent colors.",
    href: "/color-converter",
    icon: Droplets,
    category: "design",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
    tag: "New",
    tagColor: "bg-green-500 text-white",
    ready: true,
  },
  {
    name: "Regex Tester",
    description:
      "Test regular expressions in real-time. Match highlighting, captured groups, flags, and cheat sheet.",
    href: "/regex-tester",
    icon: Regex,
    category: "dev",
    color: "from-violet-500 to-purple-500",
    bgColor: "bg-violet-50",
    iconColor: "text-violet-600",
    tag: "New",
    tagColor: "bg-green-500 text-white",
    ready: true,
  },
  {
    name: "Timestamp Converter",
    description:
      "Convert Unix timestamps to dates and vice versa. Auto-detect seconds/ms, multiple formats.",
    href: "/timestamp-converter",
    icon: Clock,
    category: "dev",
    color: "from-teal-500 to-emerald-500",
    bgColor: "bg-teal-50",
    iconColor: "text-teal-600",
    tag: "New",
    tagColor: "bg-green-500 text-white",
    ready: true,
  },
  {
    name: "Hash Generator",
    description:
      "Generate MD5, SHA-1, SHA-256, SHA-512 hashes. Supports text and file input. 100% client-side.",
    href: "/hash-generator",
    icon: Hash,
    category: "dev",
    color: "from-orange-500 to-amber-500",
    bgColor: "bg-orange-50",
    iconColor: "text-orange-600",
    tag: "New",
    tagColor: "bg-green-500 text-white",
    ready: true,
  },
  {
    name: "UUID Generator",
    description:
      "Generate UUID v4 in bulk. Multiple formats: standard, uppercase, no hyphens, braces. Export as .txt.",
    href: "/uuid-generator",
    icon: Fingerprint,
    category: "dev",
    color: "from-slate-500 to-gray-500",
    bgColor: "bg-slate-50",
    iconColor: "text-slate-600",
    tag: "New",
    tagColor: "bg-green-500 text-white",
    ready: true,
  },
  {
    name: "PDF Unlock",
    description:
      "Remove password protection from PDF files. Strip encryption and owner restrictions instantly.",
    href: "/pdf-unlock",
    icon: Unlock,
    category: "pdf",
    color: "from-blue-500 to-sky-500",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
    tag: "New",
    tagColor: "bg-green-500 text-white",
    ready: true,
  },
  {
    name: "PDF Rotate",
    description:
      "Rotate PDF pages by 90, 180, or 270 degrees. Apply to all, odd, even, or custom page ranges.",
    href: "/pdf-rotate",
    icon: RotateCw,
    category: "pdf",
    color: "from-indigo-500 to-blue-500",
    bgColor: "bg-indigo-50",
    iconColor: "text-indigo-600",
    tag: "New",
    tagColor: "bg-green-500 text-white",
    ready: true,
  },
  {
    name: "PDF Protect",
    description:
      "Add a confidential watermark and protection metadata to your PDF documents.",
    href: "/pdf-protect",
    icon: Lock,
    category: "pdf",
    color: "from-gray-600 to-slate-600",
    bgColor: "bg-gray-50",
    iconColor: "text-gray-600",
    tag: "New",
    tagColor: "bg-green-500 text-white",
    ready: true,
  },
  {
    name: "PDF Extract Pages",
    description:
      "Extract specific pages from a PDF. Enter page ranges like 1-3,5,7-9 and download as a new PDF.",
    href: "/pdf-extract",
    icon: Scissors,
    category: "pdf",
    color: "from-cyan-500 to-teal-500",
    bgColor: "bg-cyan-50",
    iconColor: "text-cyan-600",
    tag: "New",
    tagColor: "bg-green-500 text-white",
    ready: true,
  },
  {
    name: "YAML Formatter",
    description:
      "Format, beautify, validate YAML and convert between YAML and JSON. Supports custom indentation.",
    href: "/yaml-formatter",
    icon: FileJson,
    category: "dev",
    color: "from-rose-500 to-pink-500",
    bgColor: "bg-rose-50",
    iconColor: "text-rose-600",
    tag: "New",
    tagColor: "bg-green-500 text-white",
    ready: true,
  },
  {
    name: "CSV to JSON",
    description:
      "Convert CSV to JSON arrays and JSON back to CSV. Auto-detect delimiters, RFC 4180 compliant.",
    href: "/csv-to-json",
    icon: Table,
    category: "dev",
    color: "from-emerald-500 to-teal-500",
    bgColor: "bg-emerald-50",
    iconColor: "text-emerald-600",
    tag: "New",
    tagColor: "bg-green-500 text-white",
    ready: true,
  },
  {
    name: "HTML Entity Encoder",
    description:
      "Encode special characters to HTML entities and decode entities back to text. Named and numeric modes.",
    href: "/html-encoder",
    icon: Code,
    category: "dev",
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-50",
    iconColor: "text-orange-600",
    tag: "New",
    tagColor: "bg-green-500 text-white",
    ready: true,
  },
  {
    name: "JWT Decoder",
    description:
      "Decode and inspect JSON Web Tokens. View header, payload, claims, and check expiration status.",
    href: "/jwt-decoder",
    icon: Key,
    category: "dev",
    color: "from-amber-500 to-yellow-500",
    bgColor: "bg-amber-50",
    iconColor: "text-amber-600",
    tag: "New",
    tagColor: "bg-green-500 text-white",
    ready: true,
  },
  {
    name: "Number Base Converter",
    description:
      "Convert numbers between binary, octal, decimal, and hexadecimal. Supports large numbers with BigInt.",
    href: "/base-converter",
    icon: Binary,
    category: "dev",
    color: "from-sky-500 to-blue-500",
    bgColor: "bg-sky-50",
    iconColor: "text-sky-600",
    tag: "New",
    tagColor: "bg-green-500 text-white",
    ready: true,
  },
  {
    name: "XML Formatter",
    description:
      "Format, beautify, and minify XML online. Validate syntax, fix indentation. Shows size stats.",
    href: "/xml-formatter",
    icon: FileType,
    category: "dev",
    color: "from-indigo-500 to-violet-500",
    bgColor: "bg-indigo-50",
    iconColor: "text-indigo-600",
    tag: "New",
    tagColor: "bg-green-500 text-white",
    ready: true,
  },
  {
    name: "Meta Tag Generator",
    description:
      "Generate SEO meta tags with live Google, Facebook, and Twitter previews. Copy HTML instantly.",
    href: "/meta-tag-generator",
    icon: Tags,
    category: "seo",
    color: "from-blue-500 to-indigo-500",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
    tag: "New",
    tagColor: "bg-green-500 text-white",
    ready: true,
  },
  {
    name: "Schema Markup Generator",
    description:
      "Generate JSON-LD structured data for Google rich results. Article, Product, FAQ, and more.",
    href: "/schema-generator",
    icon: FileCheck,
    category: "seo",
    color: "from-emerald-500 to-teal-500",
    bgColor: "bg-emerald-50",
    iconColor: "text-emerald-600",
    tag: "New",
    tagColor: "bg-green-500 text-white",
    ready: true,
  },
  {
    name: "Robots.txt Generator",
    description:
      "Generate robots.txt to control search engine crawling. Add rules, sitemaps, crawl delay.",
    href: "/robots-generator",
    icon: Bot,
    category: "seo",
    color: "from-gray-500 to-slate-500",
    bgColor: "bg-gray-100",
    iconColor: "text-gray-600",
    tag: "New",
    tagColor: "bg-green-500 text-white",
    ready: true,
  },
  {
    name: "Keyword Density Checker",
    description:
      "Analyze keyword density, word frequency, and n-gram phrases. Optimize content for SEO.",
    href: "/keyword-density",
    icon: BarChart3,
    category: "seo",
    color: "from-orange-500 to-amber-500",
    bgColor: "bg-orange-50",
    iconColor: "text-orange-600",
    tag: "New",
    tagColor: "bg-green-500 text-white",
    ready: true,
  },
  {
    name: "Open Graph Preview",
    description:
      "Preview how your page looks when shared on Facebook, Twitter, LinkedIn, and Discord.",
    href: "/og-preview",
    icon: Eye,
    category: "seo",
    color: "from-violet-500 to-purple-500",
    bgColor: "bg-violet-50",
    iconColor: "text-violet-600",
    tag: "New",
    tagColor: "bg-green-500 text-white",
    ready: true,
  },
  {
    name: "Image to Text (OCR)",
    description:
      "Extract text from images using OCR. Supports 100+ languages, screenshots, scanned documents.",
    href: "/image-to-text",
    icon: ScanText,
    category: "image",
    color: "from-blue-500 to-indigo-500",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
    tag: "New",
    tagColor: "bg-green-500 text-white",
    ready: true,
  },
  {
    name: "GIF Maker",
    description:
      "Create animated GIFs from images. Set frame delay, quality, and loop. Download as GIF.",
    href: "/gif-maker",
    icon: Film,
    category: "image",
    color: "from-pink-500 to-rose-500",
    bgColor: "bg-pink-50",
    iconColor: "text-pink-600",
    tag: "New",
    tagColor: "bg-green-500 text-white",
    ready: true,
  },
  {
    name: "Blur Image / Face Blur",
    description:
      "Blur faces, regions, or sensitive areas. Draw rectangles to blur. Gaussian or pixelation.",
    href: "/image-blur",
    icon: Blend,
    category: "image",
    color: "from-slate-500 to-gray-500",
    bgColor: "bg-slate-50",
    iconColor: "text-slate-600",
    tag: "New",
    tagColor: "bg-green-500 text-white",
    ready: true,
  },
  {
    name: "Meme Generator",
    description:
      "Create memes with custom text. Upload any image, add top/bottom text, customize fonts and colors.",
    href: "/meme-generator",
    icon: Laugh,
    category: "image",
    color: "from-yellow-500 to-orange-500",
    bgColor: "bg-yellow-50",
    iconColor: "text-yellow-600",
    tag: "New",
    tagColor: "bg-green-500 text-white",
    ready: true,
  },
];

const stats = [
  { value: "No Limits", label: "Files Per Session", icon: Download },
  { value: "100%", label: "Free Forever", icon: DollarSign },
  { value: "47+", label: "Online Tools", icon: Wand2 },
  { value: "0 bytes", label: "Data Uploaded", icon: Shield },
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTools = tools.filter((tool) => {
    const matchesCategory =
      activeCategory === "all" || tool.category === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pt-16 pb-20">
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200/40 rounded-full blur-2xl" />
        <div className="absolute top-32 right-20 w-32 h-32 bg-purple-200/40 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-1/4 w-24 h-24 bg-pink-200/40 rounded-full blur-2xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200 mb-6 text-sm text-gray-600">
              <Zap className="w-4 h-4 text-yellow-500" />
              All tools run locally in your browser — your files never leave your device
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-5">
              Free Tools to Make{" "}
              <span className="relative">
                <span className="text-blue-600">
                  Everything
                </span>
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 12"
                  fill="none"
                >
                  <path
                    d="M2 8C30 3 70 2 100 5C130 8 170 4 198 2"
                    stroke="#2563eb"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>{" "}
              Simple
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Powerful AI tools for images, PDFs, design and more. No signup, no
              watermark, no limits. 100% free forever.
            </p>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search tools... (e.g. background remover, PDF, compress)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-gray-200 shadow-lg shadow-gray-200/50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-xl font-bold text-gray-900">
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-500">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Tabs + Tool Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">
            Our Most Popular Tools
          </h2>
          <p className="text-gray-500">
            All free, no catch. Pick a tool and get started instantly.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === cat.id
                  ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:shadow-sm"
              }`}
            >
              <cat.icon className="w-4 h-4" />
              {cat.label}
            </button>
          ))}
        </div>

        {/* Tool Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredTools.map((tool) => {
            const CardContent = (
              <div
                className={`relative bg-white rounded-2xl border border-gray-100 p-5 h-full transition-all duration-200 ${
                  tool.ready
                    ? "hover:shadow-xl hover:shadow-gray-200/60 hover:-translate-y-1 hover:border-gray-200 cursor-pointer"
                    : "opacity-60 cursor-not-allowed"
                }`}
              >
                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-xl ${tool.bgColor} flex items-center justify-center mb-4`}
                >
                  <tool.icon className={`w-6 h-6 ${tool.iconColor}`} />
                </div>

                {/* Tag */}
                <span
                  className={`absolute top-4 right-4 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide ${tool.tagColor}`}
                >
                  {tool.tag}
                </span>

                {/* Text */}
                <h3 className="text-base font-semibold text-gray-900 mb-1.5">
                  {tool.name}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">
                  {tool.description}
                </p>

                {/* CTA */}
                {tool.ready && (
                  <div className="flex items-center gap-1 text-sm font-semibold text-blue-600 group-hover:gap-2 transition-all">
                    Use it free
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </div>
            );

            return tool.ready ? (
              <Link href={tool.href} key={tool.name} className="group">
                {CardContent}
              </Link>
            ) : (
              <div key={tool.name}>{CardContent}</div>
            );
          })}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">
              Why FreeAIKit?
            </h2>
            <p className="text-gray-500">
              Built for people who value speed, privacy, and simplicity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Privacy First</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                All processing happens in your browser. Your files never leave
                your device. No data collection, no tracking.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-14 h-14 rounded-2xl bg-yellow-50 flex items-center justify-center mx-auto mb-4">
                <Zap className="w-7 h-7 text-yellow-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Lightning Fast</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Powered by cutting-edge AI models optimized for browser
                performance. Get results in seconds, not minutes.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">100% Free Forever</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                No hidden costs, no watermarks, no signup walls, no credit card
                required. Free today, free tomorrow, free forever.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Ready to Get Started?
          </h2>
          <p className="text-blue-100 mb-6 text-lg">
            Try our most popular tool — AI Background Remover. No signup
            required.
          </p>
          <Link
            href="/bg-remover"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-blue-600 rounded-full font-semibold text-sm hover:shadow-xl hover:shadow-black/20 transition-all hover:-translate-y-0.5"
          >
            Remove Background Free
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
