import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ToolJsonLd from "../components/ToolJsonLd";

export const metadata: Metadata = {
  title: "Free Online Developer Tools - JSON, CSS, Regex, Hash | FreeAIKit",
  description:
    "Free developer tools online: JSON formatter, CSS minifier, regex tester, hash generator, UUID generator, Base converter, and more. All tools run in your browser — no data uploaded.",
  keywords: [
    "free developer tools online",
    "json formatter",
    "css minifier",
    "regex tester",
    "hash generator",
    "uuid generator",
    "developer utilities",
    "online dev tools",
  ],
  openGraph: {
    title: "Free Online Developer Tools - JSON, CSS, Regex, Hash | FreeAIKit",
    description:
      "17 free browser-based developer tools. Format JSON, minify CSS, test regex, generate hashes, and more.",
    url: "https://freeaikit.app/dev-tools",
  },
};

const tools = [
  {
    slug: "json-formatter",
    name: "JSON Formatter",
    description: "Format, beautify, minify and validate JSON with syntax highlighting.",
  },
  {
    slug: "css-minifier",
    name: "CSS Minifier",
    description: "Minify and compress CSS code to reduce file size instantly.",
  },
  {
    slug: "text-case",
    name: "Text Case Converter",
    description: "Convert text between camelCase, snake_case, UPPER, lower, and more.",
  },
  {
    slug: "password-generator",
    name: "Password Generator",
    description: "Generate strong, secure random passwords with custom rules.",
  },
  {
    slug: "word-counter",
    name: "Word Counter",
    description: "Count words, characters, sentences and paragraphs in any text.",
  },
  {
    slug: "url-encoder",
    name: "URL Encoder/Decoder",
    description: "Encode or decode URLs and query string parameters.",
  },
  {
    slug: "regex-tester",
    name: "Regex Tester",
    description: "Test and debug regular expressions with real-time matching and highlights.",
  },
  {
    slug: "markdown-editor",
    name: "Markdown Editor",
    description: "Write and preview Markdown with live rendering side by side.",
  },
  {
    slug: "timestamp-converter",
    name: "Timestamp Converter",
    description: "Convert between Unix timestamps and human-readable dates.",
  },
  {
    slug: "hash-generator",
    name: "Hash Generator",
    description: "Generate MD5, SHA-1, SHA-256 and SHA-512 hashes from any text.",
  },
  {
    slug: "uuid-generator",
    name: "UUID Generator",
    description: "Generate RFC-compliant UUIDs (v4) with one click.",
  },
  {
    slug: "yaml-formatter",
    name: "YAML Formatter",
    description: "Format, validate and beautify YAML documents instantly.",
  },
  {
    slug: "csv-to-json",
    name: "CSV to JSON",
    description: "Convert CSV data to JSON format with automatic header detection.",
  },
  {
    slug: "html-encoder",
    name: "HTML Entity Encoder",
    description: "Encode and decode HTML entities to prevent XSS and display issues.",
  },
  {
    slug: "jwt-decoder",
    name: "JWT Decoder",
    description: "Decode and inspect JSON Web Tokens — header, payload and signature.",
  },
  {
    slug: "base-converter",
    name: "Base Converter",
    description: "Convert numbers between binary, octal, decimal and hexadecimal.",
  },
  {
    slug: "xml-formatter",
    name: "XML Formatter",
    description: "Format and beautify XML documents with proper indentation.",
  },
];

const faqItems = [
  {
    question: "Are these developer tools really free?",
    answer:
      "Yes, every developer tool on FreeAIKit is 100% free with no usage limits, no signup required, and no watermarks. All tools run entirely in your browser so your data never leaves your device.",
  },
  {
    question: "Do you upload my code or data to a server?",
    answer:
      "No. All processing happens locally in your browser using JavaScript. Your code, JSON, CSS, passwords, and any other input never leave your machine. There is no server-side processing involved.",
  },
  {
    question: "Can I use these tools on mobile devices?",
    answer:
      "Yes. All developer tools are fully responsive and work on phones, tablets, and desktops. The interfaces adapt to smaller screens so you can format JSON, test regex, or generate passwords on the go.",
  },
  {
    question: "What browsers are supported?",
    answer:
      "These tools work in all modern browsers including Chrome, Firefox, Safari, Edge, and Brave. They require JavaScript enabled and support HTML5 standards. No browser extensions or plugins are needed.",
  },
];

export default function DevToolsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ToolJsonLd
        name="Free Online Developer Tools"
        description="17 free browser-based developer tools including JSON formatter, CSS minifier, regex tester, hash generator, and more. No signup, no uploads."
        slug="dev-tools"
        faqItems={faqItems}
      />

      {/* Hero */}
      <div className="text-center mb-14">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-5">
          Free Online Developer Tools
        </h1>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
          Speed up your daily development workflow with our collection of 17
          browser-based utilities built for developers, DevOps engineers, and
          technical writers. Format and validate JSON or XML in one click, minify
          CSS for production builds, test regular expressions with real-time
          match highlighting, and generate secure hashes or UUIDs without
          installing anything. Need to decode a JWT during debugging, convert a
          Unix timestamp from a log file, or switch variable names between
          camelCase and snake_case? Every tool is right here. All processing
          runs entirely inside your browser — your code, tokens, and data never
          leave your device. No accounts, no rate limits, no watermarks. Just
          open a tool and start working. Whether you are building APIs,
          reviewing pull requests, or writing documentation, these free
          developer tools eliminate context-switching and save you time every
          single day.
        </p>
      </div>

      {/* Tool Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
        {tools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/${tool.slug}`}
            className="group block bg-white border border-gray-200 rounded-2xl p-6 hover:border-blue-400 hover:shadow-lg transition-all duration-200"
          >
            <h2 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-1.5">
              {tool.name}
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-3">
              {tool.description}
            </p>
            <span className="inline-flex items-center gap-1 text-blue-600 text-sm font-medium group-hover:gap-2 transition-all">
              Try it free <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        ))}
      </div>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-5">
          {faqItems.map((item, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-2xl p-6"
            >
              <h3 className="font-semibold text-gray-900 mb-2">
                {item.question}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
