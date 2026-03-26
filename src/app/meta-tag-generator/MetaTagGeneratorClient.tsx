"use client";

import { useState, useCallback, useMemo } from "react";
import { Copy, Check, Eye, Code2, Search, Share2 } from "lucide-react";
import { trackToolEvent } from "@/lib/analytics";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = useCallback(() => {
    trackToolEvent('meta-tag-generator', 'process');
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }, [text]);
  return (
    <button onClick={handleCopy} disabled={!text}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 hover:border-blue-400 hover:bg-blue-50 disabled:opacity-40 transition-all">
      {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
      {copied ? "Copied!" : "Copy HTML"}
    </button>
  );
}

type PreviewTab = "google" | "facebook" | "twitter";

export default function MetaTagGeneratorClient() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [ogImage, setOgImage] = useState("");
  const [canonical, setCanonical] = useState("");
  const [robots, setRobots] = useState("index, follow");
  const [author, setAuthor] = useState("");
  const [viewport, setViewport] = useState("width=device-width, initial-scale=1");
  const [charset, setCharset] = useState("UTF-8");
  const [twitterCard, setTwitterCard] = useState("summary_large_image");
  const [twitterSite, setTwitterSite] = useState("");
  const [previewTab, setPreviewTab] = useState<PreviewTab>("google");

  const generatedHtml = useMemo(() => {
    const lines: string[] = [];
    if (charset) lines.push(`<meta charset="${charset}">`);
    if (viewport) lines.push(`<meta name="viewport" content="${viewport}">`);
    if (title) lines.push(`<title>${title}</title>`);
    if (description) lines.push(`<meta name="description" content="${description}">`);
    if (author) lines.push(`<meta name="author" content="${author}">`);
    if (robots) lines.push(`<meta name="robots" content="${robots}">`);
    if (canonical) lines.push(`<link rel="canonical" href="${canonical}">`);

    // Open Graph
    if (title || description || url || ogImage) {
      lines.push("");
      lines.push("<!-- Open Graph / Facebook -->");
      lines.push(`<meta property="og:type" content="website">`);
      if (title) lines.push(`<meta property="og:title" content="${title}">`);
      if (description) lines.push(`<meta property="og:description" content="${description}">`);
      if (url) lines.push(`<meta property="og:url" content="${url}">`);
      if (ogImage) lines.push(`<meta property="og:image" content="${ogImage}">`);
    }

    // Twitter
    if (title || description || ogImage) {
      lines.push("");
      lines.push("<!-- Twitter -->");
      lines.push(`<meta name="twitter:card" content="${twitterCard}">`);
      if (twitterSite) lines.push(`<meta name="twitter:site" content="${twitterSite}">`);
      if (title) lines.push(`<meta name="twitter:title" content="${title}">`);
      if (description) lines.push(`<meta name="twitter:description" content="${description}">`);
      if (ogImage) lines.push(`<meta name="twitter:image" content="${ogImage}">`);
    }

    return lines.join("\n");
  }, [title, description, url, ogImage, canonical, robots, author, viewport, charset, twitterCard, twitterSite]);

  const titleLen = title.length;
  const descLen = description.length;

  const PREVIEW_TABS: { key: PreviewTab; label: string; icon: typeof Search }[] = [
    { key: "google", label: "Google", icon: Search },
    { key: "facebook", label: "Facebook", icon: Share2 },
    { key: "twitter", label: "Twitter", icon: Share2 },
  ];

  const displayUrl = url || "https://example.com";
  const displayTitle = title || "Page Title";
  const displayDesc = description || "Page description will appear here...";

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4">
            <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Code2 className="w-4 h-4" /> Basic SEO
            </h2>

            {/* Title */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-gray-600">Page Title</label>
                <span className={`text-xs ${titleLen > 60 ? "text-red-500" : titleLen > 50 ? "text-amber-500" : "text-gray-400"}`}>
                  {titleLen}/60
                </span>
              </div>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
                placeholder="My Awesome Page - Brand Name"
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              {titleLen > 60 && <p className="text-xs text-red-500 mt-1">Title may be truncated in search results</p>}
            </div>

            {/* Description */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-gray-600">Meta Description</label>
                <span className={`text-xs ${descLen > 160 ? "text-red-500" : descLen > 150 ? "text-amber-500" : "text-gray-400"}`}>
                  {descLen}/160
                </span>
              </div>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)}
                placeholder="A compelling description of your page that will appear in search results..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
            </div>

            {/* URL */}
            <div>
              <label className="text-xs font-semibold text-gray-600 block mb-1">Page URL</label>
              <input type="url" value={url} onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/page"
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            {/* Canonical */}
            <div>
              <label className="text-xs font-semibold text-gray-600 block mb-1">Canonical URL</label>
              <input type="url" value={canonical} onChange={(e) => setCanonical(e.target.value)}
                placeholder="https://example.com/page (leave empty if same as URL)"
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1">Robots</label>
                <select value={robots} onChange={(e) => setRobots(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="index, follow">index, follow</option>
                  <option value="noindex, follow">noindex, follow</option>
                  <option value="index, nofollow">index, nofollow</option>
                  <option value="noindex, nofollow">noindex, nofollow</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1">Author</label>
                <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Author name"
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
          </div>

          {/* Social / OG */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4">
            <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Share2 className="w-4 h-4" /> Social Media / Open Graph
            </h2>

            <div>
              <label className="text-xs font-semibold text-gray-600 block mb-1">OG Image URL</label>
              <input type="url" value={ogImage} onChange={(e) => setOgImage(e.target.value)}
                placeholder="https://example.com/image.jpg (1200×630 recommended)"
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1">Twitter Card</label>
                <select value={twitterCard} onChange={(e) => setTwitterCard(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="summary_large_image">Summary Large Image</option>
                  <option value="summary">Summary</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1">Twitter @site</label>
                <input type="text" value={twitterSite} onChange={(e) => setTwitterSite(e.target.value)}
                  placeholder="@yourhandle"
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Preview + Output */}
        <div className="space-y-4">
          {/* Preview */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4">
            <div className="flex items-center gap-2 mb-1">
              <Eye className="w-4 h-4 text-gray-500" />
              <h2 className="text-sm font-semibold text-gray-700">Live Preview</h2>
            </div>

            <div className="flex gap-2">
              {PREVIEW_TABS.map(({ key, label, icon: Icon }) => (
                <button key={key} onClick={() => setPreviewTab(key)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${previewTab === key ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 text-gray-500 hover:border-gray-300"}`}>
                  <Icon className="w-3 h-3" />
                  {label}
                </button>
              ))}
            </div>

            {/* Google Preview */}
            {previewTab === "google" && (
              <div className="p-4 bg-white border border-gray-200 rounded-xl space-y-1">
                <div className="text-xs text-green-700 truncate">{displayUrl}</div>
                <div className="text-lg text-blue-700 hover:underline cursor-pointer leading-snug truncate">{displayTitle}</div>
                <div className="text-sm text-gray-600 leading-relaxed line-clamp-2">{displayDesc}</div>
              </div>
            )}

            {/* Facebook Preview */}
            {previewTab === "facebook" && (
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="h-40 bg-gray-100 flex items-center justify-center text-gray-400 text-xs">
                  {ogImage ? (
                    <img src={ogImage} alt="OG Preview" className="w-full h-full object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  ) : "1200 × 630 image preview"}
                </div>
                <div className="p-3 bg-gray-50 space-y-0.5">
                  <div className="text-[10px] text-gray-500 uppercase tracking-wide">{displayUrl.replace(/https?:\/\//, "").split("/")[0]}</div>
                  <div className="text-sm font-semibold text-gray-900 truncate">{displayTitle}</div>
                  <div className="text-xs text-gray-500 line-clamp-2">{displayDesc}</div>
                </div>
              </div>
            )}

            {/* Twitter Preview */}
            {previewTab === "twitter" && (
              <div className="border border-gray-200 rounded-2xl overflow-hidden">
                <div className="h-40 bg-gray-100 flex items-center justify-center text-gray-400 text-xs">
                  {ogImage ? (
                    <img src={ogImage} alt="Twitter Preview" className="w-full h-full object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  ) : "Image preview"}
                </div>
                <div className="p-3 space-y-0.5">
                  <div className="text-sm font-bold text-gray-900 truncate">{displayTitle}</div>
                  <div className="text-xs text-gray-500 line-clamp-2">{displayDesc}</div>
                  <div className="text-xs text-gray-400">{displayUrl.replace(/https?:\/\//, "").split("/")[0]}</div>
                </div>
              </div>
            )}
          </div>

          {/* Generated HTML */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-700">Generated HTML</h2>
              <CopyButton text={generatedHtml} />
            </div>
            <pre className="px-4 py-3 bg-gray-50 rounded-xl font-mono text-xs text-gray-700 overflow-auto max-h-[300px] whitespace-pre">{generatedHtml || "Fill in the fields to generate meta tags..."}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}
