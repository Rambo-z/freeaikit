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
  Wand2,
  Search,
  ArrowRight,
  Shield,
  Zap,
  DollarSign,
  Users,
  Download,
  Star,
} from "lucide-react";

const categories = [
  { id: "all", label: "All Tools", icon: Wand2 },
  { id: "image", label: "Image Tools", icon: Image },
  { id: "ai", label: "AI Tools", icon: Zap },
  { id: "pdf", label: "PDF Tools", icon: FileText },
  { id: "design", label: "Design", icon: Palette },
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
      "Upscale and enhance low-resolution images. Make blurry photos crystal clear.",
    href: "/image-upscaler",
    icon: ZoomIn,
    category: "image",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
    tag: "Coming Soon",
    tagColor: "bg-gray-400 text-white",
    ready: false,
  },
  {
    name: "AI QR Code Art",
    description:
      "Generate beautiful artistic QR codes with AI. Perfect for marketing and branding.",
    href: "/qr-art",
    icon: QrCode,
    category: "ai",
    color: "from-purple-500 to-indigo-500",
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600",
    tag: "Coming Soon",
    tagColor: "bg-gray-400 text-white",
    ready: false,
  },
  {
    name: "AI PDF Chat",
    description:
      "Chat with any PDF document using AI. Ask questions and get instant answers.",
    href: "/pdf-chat",
    icon: FileText,
    category: "pdf",
    color: "from-orange-500 to-amber-500",
    bgColor: "bg-orange-50",
    iconColor: "text-orange-600",
    tag: "Coming Soon",
    tagColor: "bg-gray-400 text-white",
    ready: false,
  },
  {
    name: "AI Color Palette",
    description:
      "Generate beautiful color palettes from images or text descriptions.",
    href: "/color-palette",
    icon: Palette,
    category: "design",
    color: "from-emerald-500 to-teal-500",
    bgColor: "bg-emerald-50",
    iconColor: "text-emerald-600",
    tag: "Coming Soon",
    tagColor: "bg-gray-400 text-white",
    ready: false,
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
      "Convert images between PNG, JPG, WebP, SVG and more formats instantly.",
    href: "/image-convert",
    icon: Image,
    category: "image",
    color: "from-teal-500 to-emerald-500",
    bgColor: "bg-teal-50",
    iconColor: "text-teal-600",
    tag: "Coming Soon",
    tagColor: "bg-gray-400 text-white",
    ready: false,
  },
];

const stats = [
  { value: "10K+", label: "Images Processed", icon: Image },
  { value: "100%", label: "Free Forever", icon: DollarSign },
  { value: "8+", label: "Online Tools", icon: Wand2 },
  { value: "0", label: "Data Uploaded", icon: Shield },
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
