"use client";

import { useState, useCallback } from "react";
import { Copy, Check, Code2 } from "lucide-react";
import { trackToolEvent } from "@/lib/analytics";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = useCallback(() => {
    trackToolEvent('og-preview', 'process');
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }, [text]);
  return (
    <button onClick={handleCopy} disabled={!text}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 hover:border-blue-400 hover:bg-blue-50 disabled:opacity-40 transition-all">
      {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

type InputMode = "fields" | "html";
type PreviewPlatform = "facebook" | "twitter" | "linkedin" | "discord";

function extractOgFromHtml(html: string): { title: string; description: string; image: string; url: string; siteName: string } {
  const getContent = (pattern: RegExp): string => {
    const match = html.match(pattern);
    return match ? match[1] : "";
  };

  return {
    title: getContent(/property="og:title"\s+content="([^"]*)"/) ||
           getContent(/name="twitter:title"\s+content="([^"]*)"/) ||
           getContent(/<title>([^<]*)<\/title>/),
    description: getContent(/property="og:description"\s+content="([^"]*)"/) ||
                 getContent(/name="twitter:description"\s+content="([^"]*)"/) ||
                 getContent(/name="description"\s+content="([^"]*)"/),
    image: getContent(/property="og:image"\s+content="([^"]*)"/) ||
           getContent(/name="twitter:image"\s+content="([^"]*)"/),
    url: getContent(/property="og:url"\s+content="([^"]*)"/),
    siteName: getContent(/property="og:site_name"\s+content="([^"]*)"/),
  };
}

const PLATFORMS: { key: PreviewPlatform; label: string }[] = [
  { key: "facebook", label: "Facebook" },
  { key: "twitter", label: "Twitter / X" },
  { key: "linkedin", label: "LinkedIn" },
  { key: "discord", label: "Discord" },
];

export default function OgPreviewClient() {
  const [mode, setMode] = useState<InputMode>("fields");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [siteName, setSiteName] = useState("");
  const [htmlInput, setHtmlInput] = useState("");
  const [platform, setPlatform] = useState<PreviewPlatform>("facebook");

  const handleParseHtml = useCallback(() => {
    const og = extractOgFromHtml(htmlInput);
    setTitle(og.title);
    setDescription(og.description);
    setImage(og.image);
    setUrl(og.url);
    setSiteName(og.siteName);
    setMode("fields");
  }, [htmlInput]);

  const displayTitle = title || "Page Title";
  const displayDesc = description || "Page description will appear here when shared on social media...";
  const displayDomain = url ? url.replace(/https?:\/\//, "").split("/")[0] : "example.com";
  const displaySiteName = siteName || displayDomain;

  const ogHtml = [
    title && `<meta property="og:title" content="${title}">`,
    description && `<meta property="og:description" content="${description}">`,
    image && `<meta property="og:image" content="${image}">`,
    url && `<meta property="og:url" content="${url}">`,
    siteName && `<meta property="og:site_name" content="${siteName}">`,
    `<meta property="og:type" content="website">`,
    "",
    `<meta name="twitter:card" content="summary_large_image">`,
    title && `<meta name="twitter:title" content="${title}">`,
    description && `<meta name="twitter:description" content="${description}">`,
    image && `<meta name="twitter:image" content="${image}">`,
  ].filter(Boolean).join("\n");

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Left: Input */}
        <div className="space-y-4">
          {/* Mode toggle */}
          <div className="flex gap-2">
            <button onClick={() => setMode("fields")}
              className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${mode === "fields" ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 text-gray-500"}`}>
              Enter Fields
            </button>
            <button onClick={() => setMode("html")}
              className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${mode === "html" ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 text-gray-500"}`}>
              Paste HTML
            </button>
          </div>

          {mode === "html" ? (
            <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-3">
              <label className="text-sm font-semibold text-gray-700 block">Paste HTML &lt;head&gt; Content</label>
              <textarea value={htmlInput} onChange={(e) => setHtmlInput(e.target.value)}
                placeholder={'<meta property="og:title" content="My Page">\n<meta property="og:description" content="Description...">\n<meta property="og:image" content="https://...">\n<meta property="og:url" content="https://...">'}
                rows={10} spellCheck={false}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
              <button onClick={handleParseHtml} disabled={!htmlInput.trim()}
                className="w-full py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 disabled:opacity-40 transition-colors">
                Parse & Preview
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-3">
              <h2 className="text-sm font-semibold text-gray-700">OG Tag Values</h2>
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1">og:title</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
                  placeholder="My Awesome Page"
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1">og:description</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)}
                  placeholder="A short description of your page..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1">og:image</label>
                <input type="url" value={image} onChange={(e) => setImage(e.target.value)}
                  placeholder="https://example.com/image.jpg (1200×630 recommended)"
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1">og:url</label>
                <input type="url" value={url} onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com/page"
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1">og:site_name</label>
                <input type="text" value={siteName} onChange={(e) => setSiteName(e.target.value)}
                  placeholder="My Website"
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
          )}

          {/* Generated code */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
                <Code2 className="w-4 h-4" /> Generated Tags
              </h2>
              <CopyButton text={ogHtml} />
            </div>
            <pre className="px-4 py-3 bg-gray-50 rounded-xl font-mono text-xs text-gray-600 overflow-auto max-h-[200px] whitespace-pre">{ogHtml}</pre>
          </div>
        </div>

        {/* Right: Previews */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4">
            <h2 className="text-sm font-semibold text-gray-700">Social Media Preview</h2>

            <div className="flex flex-wrap gap-2">
              {PLATFORMS.map(({ key, label }) => (
                <button key={key} onClick={() => setPlatform(key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${platform === key ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 text-gray-500 hover:border-gray-300"}`}>
                  {label}
                </button>
              ))}
            </div>

            {/* Facebook */}
            {platform === "facebook" && (
              <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                <div className="h-[260px] bg-gray-100 flex items-center justify-center">
                  {image ? (
                    <img src={image} alt="" className="w-full h-full object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  ) : <span className="text-gray-400 text-sm">1200 × 630 image</span>}
                </div>
                <div className="p-3 bg-[#f2f3f5] border-t border-gray-200">
                  <div className="text-[11px] text-gray-500 uppercase tracking-wide">{displayDomain}</div>
                  <div className="text-[15px] font-semibold text-[#1d2129] leading-tight mt-0.5 line-clamp-2">{displayTitle}</div>
                  <div className="text-[13px] text-gray-500 mt-0.5 line-clamp-1">{displayDesc}</div>
                </div>
              </div>
            )}

            {/* Twitter */}
            {platform === "twitter" && (
              <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="h-[250px] bg-gray-100 flex items-center justify-center">
                  {image ? (
                    <img src={image} alt="" className="w-full h-full object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  ) : <span className="text-gray-400 text-sm">Image preview</span>}
                </div>
                <div className="p-3 border-t border-gray-200">
                  <div className="text-[15px] font-bold text-gray-900 leading-tight line-clamp-2">{displayTitle}</div>
                  <div className="text-[13px] text-gray-500 mt-0.5 line-clamp-2">{displayDesc}</div>
                  <div className="text-[13px] text-gray-400 mt-1 flex items-center gap-1">
                    <span>🔗</span> {displayDomain}
                  </div>
                </div>
              </div>
            )}

            {/* LinkedIn */}
            {platform === "linkedin" && (
              <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm bg-white">
                <div className="h-[240px] bg-gray-100 flex items-center justify-center">
                  {image ? (
                    <img src={image} alt="" className="w-full h-full object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  ) : <span className="text-gray-400 text-sm">1200 × 627 image</span>}
                </div>
                <div className="p-3 border-t border-gray-100">
                  <div className="text-[14px] font-semibold text-gray-900 leading-tight line-clamp-2">{displayTitle}</div>
                  <div className="text-[12px] text-gray-500 mt-0.5">{displayDomain}</div>
                </div>
              </div>
            )}

            {/* Discord */}
            {platform === "discord" && (
              <div className="bg-[#2f3136] rounded-lg overflow-hidden border-l-4 border-l-blue-500 p-4">
                <div className="text-[12px] text-gray-400 font-semibold mb-1">{displaySiteName}</div>
                <div className="text-[16px] text-blue-400 font-semibold leading-tight mb-1 hover:underline cursor-pointer">{displayTitle}</div>
                <div className="text-[14px] text-gray-300 mb-3 line-clamp-3">{displayDesc}</div>
                {image && (
                  <div className="rounded-lg overflow-hidden max-w-[400px]">
                    <img src={image} alt="" className="w-full object-cover max-h-[200px]"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Tips */}
          <div className="bg-blue-50 rounded-2xl border border-blue-100 p-5 space-y-2">
            <h3 className="text-sm font-semibold text-blue-800">OG Image Tips</h3>
            <ul className="text-xs text-blue-700 space-y-1">
              <li>• Recommended size: <strong>1200 × 630</strong> pixels (1.91:1 ratio)</li>
              <li>• Use absolute URLs starting with <code className="bg-blue-100 px-1 rounded">https://</code></li>
              <li>• Keep important content in the center — platforms may crop edges</li>
              <li>• File size: under 5MB for best performance</li>
              <li>• Formats: JPG or PNG (avoid SVG and WebP for OG images)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
