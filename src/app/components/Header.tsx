"use client";

import Link from "next/link";
import { useState, useRef, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Globe } from "lucide-react";

type NavItem = { href: string; label: string };
type NavGroup = { label: string; items: NavItem[] };

// Mapping from English slug to localized slugs
const I18N_SLUG_MAP: Record<string, { es?: string; pt?: string; id?: string }> = {
  // Original 10 tools (ES + PT + ID)
  "image-compress":  { es: "comprimir-imagen",      pt: "comprimir-imagem",      id: "kompres-gambar" },
  "bg-remover":      { es: "quitar-fondo",           pt: "remover-fundo",          id: "hapus-latar-belakang" },
  "pdf-merge":       { es: "unir-pdf",               pt: "juntar-pdf",             id: "gabung-pdf" },
  "image-to-text":   { es: "imagen-a-texto",         pt: "imagem-para-texto",      id: "gambar-ke-teks" },
  "image-resize":    { es: "redimensionar-imagen",   pt: "redimensionar-imagem",   id: "ubah-ukuran-gambar" },
  "image-convert":   { es: "convertir-imagen",       pt: "converter-imagem",       id: "konversi-gambar" },
  "pdf-compress":    { es: "comprimir-pdf",           pt: "comprimir-pdf",          id: "kompres-pdf" },
  "image-crop":      { es: "recortar-imagen",         pt: "cortar-imagem" },
  "pdf-to-images":   { es: "pdf-a-imagen",            pt: "pdf-para-imagem",        id: "pdf-ke-gambar" },
  "image-to-pdf":    { es: "imagen-a-pdf",            pt: "imagem-para-pdf",        id: "gambar-ke-pdf" },
  // New 10 tools (ES + PT, some with ID)
  "json-formatter":       { es: "formato-json",           pt: "formatador-json",        id: "format-json" },
  "pdf-extract":          { es: "extraer-pdf",             pt: "extrair-pdf" },
  "image-to-svg":         { es: "imagen-a-svg",            pt: "imagem-para-svg" },
  "gif-maker":            { es: "crear-gif",               pt: "criar-gif" },
  "password-generator":   { es: "generar-contrasena",      pt: "gerador-senha" },
  "qr-code":              { es: "codigo-qr",               pt: "codigo-qr" },
  "word-counter":         { es: "contador-palabras",        pt: "contador-palavras" },
  "image-watermark":      { es: "marca-de-agua",           pt: "marca-dagua" },
  "csv-to-json":          { es: "csv-a-json",              pt: "csv-para-json" },
  "pdf-unlock":           { es: "desbloquear-pdf",         pt: "desbloquear-pdf" },
};

const NAV_GROUPS: NavGroup[] = [
  {
    label: "Image",
    items: [
      { href: "/bg-remover",     label: "Background Remover" },
      { href: "/image-compress", label: "Image Compressor" },
      { href: "/image-convert",  label: "Format Converter" },
      { href: "/image-resize",   label: "Image Resizer" },
      { href: "/image-crop",     label: "Crop & Rotate" },
      { href: "/image-filters",  label: "Image Filters" },
      { href: "/image-watermark",label: "Watermark" },
      { href: "/image-to-svg",   label: "Image to SVG" },
      { href: "/base64-image",   label: "Base64 Image" },
      { href: "/image-to-text",  label: "Image to Text (OCR)" },
      { href: "/gif-maker",      label: "GIF Maker" },
      { href: "/image-blur",     label: "Blur Image" },
      { href: "/meme-generator", label: "Meme Generator" },
    ],
  },
  {
    label: "PDF",
    items: [
      { href: "/pdf-compress",  label: "PDF Compressor" },
      { href: "/pdf-merge",     label: "Merge & Split" },
      { href: "/pdf-rotate",    label: "PDF Rotate" },
      { href: "/pdf-unlock",    label: "PDF Unlock" },
      { href: "/pdf-protect",   label: "PDF Protect" },
      { href: "/pdf-extract",   label: "Extract Pages" },
      { href: "/image-to-pdf",  label: "Image to PDF" },
      { href: "/pdf-to-images", label: "PDF to Images" },
    ],
  },
  {
    label: "Dev Tools",
    items: [
      { href: "/json-formatter",      label: "JSON Formatter" },
      { href: "/css-minifier",        label: "CSS Minifier" },
      { href: "/text-case",           label: "Text Case Converter" },
      { href: "/markdown-editor",     label: "Markdown Editor" },
      { href: "/regex-tester",        label: "Regex Tester" },
      { href: "/hash-generator",      label: "Hash Generator" },
      { href: "/timestamp-converter", label: "Timestamp Converter" },
      { href: "/uuid-generator",      label: "UUID Generator" },
      { href: "/password-generator",  label: "Password Generator" },
      { href: "/word-counter",        label: "Word Counter" },
      { href: "/url-encoder",         label: "URL Encoder / Decoder" },
      { href: "/yaml-formatter",     label: "YAML Formatter" },
      { href: "/csv-to-json",        label: "CSV to JSON" },
      { href: "/html-encoder",       label: "HTML Entity Encoder" },
      { href: "/jwt-decoder",        label: "JWT Decoder" },
      { href: "/base-converter",     label: "Base Converter" },
      { href: "/xml-formatter",      label: "XML Formatter" },
      { href: "/lorem-ipsum",        label: "Lorem Ipsum Generator" },
      { href: "/text-diff",          label: "Text Diff Checker" },
      { href: "/text-to-binary",     label: "Text to Binary" },
      { href: "/sort-lines",         label: "Sort Lines" },
      { href: "/remove-duplicates",  label: "Remove Duplicates" },
    ],
  },
  {
    label: "Calculators",
    items: [
      { href: "/percentage-calculator", label: "Percentage Calculator" },
      { href: "/age-calculator",        label: "Age Calculator" },
      { href: "/random-number",         label: "Random Number" },
      { href: "/unit-converter",        label: "Unit Converter" },
    ],
  },
  {
    label: "SEO",
    items: [
      { href: "/meta-tag-generator", label: "Meta Tag Generator" },
      { href: "/schema-generator",   label: "Schema Markup" },
      { href: "/robots-generator",   label: "Robots.txt Generator" },
      { href: "/keyword-density",    label: "Keyword Density" },
      { href: "/og-preview",         label: "OG Preview" },
    ],
  },
  {
    label: "Design",
    items: [
      { href: "/qr-code",          label: "QR Code Generator" },
      { href: "/color-palette",    label: "Color Palette" },
      { href: "/color-converter",  label: "Color Converter" },
      { href: "/favicon-generator",label: "Favicon Generator" },
      { href: "/color-picker",    label: "Color Picker" },
    ],
  },
];

function DropdownMenu({ group, onClose }: { group: NavGroup; onClose: () => void }) {
  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-white border border-gray-200 rounded-2xl shadow-xl shadow-gray-200/60 py-2 min-w-[200px] z-50">
      {group.items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={onClose}
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  // Determine current locale
  const currentLang = pathname.startsWith("/es/") ? "es"
    : pathname.startsWith("/pt/") ? "pt"
    : pathname.startsWith("/id/") ? "id"
    : "en";

  // Build available language switch URLs
  const langLinks: { code: string; label: string; url: string }[] = [];

  if (currentLang === "en") {
    const slug = pathname.replace(/^\//, "");
    const map = I18N_SLUG_MAP[slug];
    if (map) {
      if (map.es) langLinks.push({ code: "es", label: "ES", url: `/es/${map.es}` });
      if (map.pt) langLinks.push({ code: "pt", label: "PT", url: `/pt/${map.pt}` });
      if (map.id) langLinks.push({ code: "id", label: "ID", url: `/id/${map.id}` });
    }
  } else {
    // Find English slug from current localized slug
    const localSlug = pathname.replace(/^\/(es|pt|id)\//, "");
    const enSlug = Object.entries(I18N_SLUG_MAP).find(([, v]) => v[currentLang as "es" | "pt" | "id"] === localSlug)?.[0];
    if (enSlug) {
      const map = I18N_SLUG_MAP[enSlug];
      langLinks.push({ code: "en", label: "EN", url: `/${enSlug}` });
      if (currentLang !== "es" && map.es) langLinks.push({ code: "es", label: "ES", url: `/es/${map.es}` });
      if (currentLang !== "pt" && map.pt) langLinks.push({ code: "pt", label: "PT", url: `/pt/${map.pt}` });
      if (currentLang !== "id" && map.id) langLinks.push({ code: "id", label: "ID", url: `/id/${map.id}` });
    }
  }

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpenGroup(null);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const toggleGroup = useCallback((label: string) => {
    setOpenGroup((prev) => (prev === label ? null : label));
  }, []);

  return (
    <header ref={headerRef} className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-xs">FK</span>
            </div>
            <span className="text-lg font-bold text-gray-900">FreeAIKit</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            <Link href="/"
              className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
              All Tools
            </Link>

            {NAV_GROUPS.map((group) => (
              <div key={group.label} className="relative">
                <button
                  onClick={() => toggleGroup(group.label)}
                  className={`inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                    openGroup === group.label
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  {group.label}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openGroup === group.label ? "rotate-180" : ""}`} />
                </button>
                {openGroup === group.label && (
                  <DropdownMenu group={group} onClose={() => setOpenGroup(null)} />
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* Language switcher — show available translations */}
            {langLinks.length > 0 && (
              <div className="inline-flex items-center gap-0.5">
                <Globe className="w-4 h-4 text-gray-400 mr-1" />
                {langLinks.map((lang) => (
                  <Link
                    key={lang.code}
                    href={lang.url}
                    className="px-1.5 py-1 text-xs font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
                    title={`Switch to ${lang.label}`}
                  >
                    {lang.label}
                  </Link>
                ))}
              </div>
            )}
            <Link href="/bg-remover"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm">
              Try Free
            </Link>
            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              onClick={() => { setMobileOpen((v) => !v); setExpandedMobile(null); }}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-1 max-h-[80vh] overflow-y-auto">
          <Link href="/" onClick={() => setMobileOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg">
            All Tools
          </Link>

          {NAV_GROUPS.map((group) => (
            <div key={group.label}>
              <button
                onClick={() => setExpandedMobile((v) => (v === group.label ? null : group.label))}
                className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                {group.label}
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${expandedMobile === group.label ? "rotate-180" : ""}`} />
              </button>
              {expandedMobile === group.label && (
                <div className="pl-4 space-y-0.5">
                  {group.items.map((item) => (
                    <Link key={item.href} href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-2 text-sm text-gray-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg transition-colors">
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="pt-2">
            <Link href="/bg-remover" onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg text-center transition-colors">
              Try Free
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
