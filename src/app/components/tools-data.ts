export interface ToolInfo {
  name: string;
  slug: string;
  description: string;
  category: "image" | "pdf" | "dev" | "seo" | "design";
}

export const ALL_TOOLS: ToolInfo[] = [
  // Image Tools
  { name: "AI Background Remover", slug: "bg-remover", description: "Remove image backgrounds instantly with AI. No signup, no watermark.", category: "image" },
  { name: "Image Compressor", slug: "image-compress", description: "Compress JPG, PNG, WebP images while maintaining quality. Batch support.", category: "image" },
  { name: "Image Format Converter", slug: "image-convert", description: "Convert images between PNG, JPG, WebP and more formats instantly.", category: "image" },
  { name: "Image to SVG", slug: "image-to-svg", description: "Convert raster images to scalable SVG vector format.", category: "image" },
  { name: "Image Resizer", slug: "image-resize", description: "Resize images by exact pixels or percentage. Batch support.", category: "image" },
  { name: "Image Watermark", slug: "image-watermark", description: "Add text watermarks to photos. Customize position, opacity, color.", category: "image" },
  { name: "Image Crop & Rotate", slug: "image-crop", description: "Crop images to any aspect ratio. Rotate and flip.", category: "image" },
  { name: "Image Filters", slug: "image-filters", description: "Apply filters: brightness, contrast, saturation, blur, grayscale, sepia.", category: "image" },
  { name: "Base64 Image", slug: "base64-image", description: "Convert images to Base64 data URLs and decode Base64 back to images.", category: "image" },
  { name: "Image to Text (OCR)", slug: "image-to-text", description: "Extract text from images using OCR. Supports 100+ languages.", category: "image" },
  { name: "GIF Maker", slug: "gif-maker", description: "Create animated GIFs from images. Set frame delay, quality, and loop.", category: "image" },
  { name: "Blur Image / Face Blur", slug: "image-blur", description: "Blur faces, regions, or sensitive areas in images.", category: "image" },
  { name: "Meme Generator", slug: "meme-generator", description: "Create memes with custom top and bottom text.", category: "image" },
  // PDF Tools
  { name: "PDF Compressor", slug: "pdf-compress", description: "Compress PDF files up to 80% smaller in your browser.", category: "pdf" },
  { name: "PDF Merge & Split", slug: "pdf-merge", description: "Merge multiple PDFs into one or split by page range.", category: "pdf" },
  { name: "PDF to Images", slug: "pdf-to-images", description: "Convert PDF pages to JPG or PNG. Up to 300 DPI.", category: "pdf" },
  { name: "Image to PDF", slug: "image-to-pdf", description: "Convert images to PDF. Combine multiple images into one document.", category: "pdf" },
  { name: "PDF Unlock", slug: "pdf-unlock", description: "Remove password protection from PDF files instantly.", category: "pdf" },
  { name: "PDF Rotate", slug: "pdf-rotate", description: "Rotate PDF pages by 90, 180, or 270 degrees.", category: "pdf" },
  { name: "PDF Protect", slug: "pdf-protect", description: "Add watermark and protection metadata to PDF documents.", category: "pdf" },
  { name: "PDF Extract Pages", slug: "pdf-extract", description: "Extract specific pages from a PDF by page range.", category: "pdf" },
  // Dev Tools
  { name: "JSON Formatter", slug: "json-formatter", description: "Format, beautify, minify and validate JSON with syntax highlighting.", category: "dev" },
  { name: "CSS Minifier", slug: "css-minifier", description: "Minify CSS to reduce file size or beautify minified CSS.", category: "dev" },
  { name: "Text Case Converter", slug: "text-case", description: "Convert text between camelCase, snake_case, kebab-case, and more.", category: "dev" },
  { name: "Password Generator", slug: "password-generator", description: "Generate strong, random, cryptographically secure passwords.", category: "dev" },
  { name: "Word Counter", slug: "word-counter", description: "Count words, characters, sentences, paragraphs and reading time.", category: "dev" },
  { name: "URL Encoder / Decoder", slug: "url-encoder", description: "Encode and decode URLs with encodeURIComponent. Parse URL components.", category: "dev" },
  { name: "Regex Tester", slug: "regex-tester", description: "Test regular expressions with real-time match highlighting.", category: "dev" },
  { name: "Markdown Editor", slug: "markdown-editor", description: "Write and preview Markdown in real-time with split pane editor.", category: "dev" },
  { name: "Timestamp Converter", slug: "timestamp-converter", description: "Convert Unix timestamps to dates and vice versa.", category: "dev" },
  { name: "Hash Generator", slug: "hash-generator", description: "Generate MD5, SHA-1, SHA-256, SHA-512 hashes from text or files.", category: "dev" },
  { name: "UUID Generator", slug: "uuid-generator", description: "Generate UUID v4 in bulk. Multiple formats.", category: "dev" },
  { name: "YAML Formatter", slug: "yaml-formatter", description: "Format, validate YAML and convert between YAML and JSON.", category: "dev" },
  { name: "CSV to JSON", slug: "csv-to-json", description: "Convert CSV to JSON and JSON to CSV. Auto-detect delimiters.", category: "dev" },
  { name: "HTML Entity Encoder", slug: "html-encoder", description: "Encode special characters to HTML entities and decode back.", category: "dev" },
  { name: "JWT Decoder", slug: "jwt-decoder", description: "Decode and inspect JSON Web Tokens. View header, payload, claims.", category: "dev" },
  { name: "Number Base Converter", slug: "base-converter", description: "Convert numbers between binary, octal, decimal, and hexadecimal.", category: "dev" },
  { name: "XML Formatter", slug: "xml-formatter", description: "Format, beautify, and minify XML. Validate syntax.", category: "dev" },
  // SEO Tools
  { name: "Meta Tag Generator", slug: "meta-tag-generator", description: "Generate SEO meta tags with Google, Facebook, Twitter previews.", category: "seo" },
  { name: "Schema Markup Generator", slug: "schema-generator", description: "Generate JSON-LD structured data for Google rich results.", category: "seo" },
  { name: "Robots.txt Generator", slug: "robots-generator", description: "Generate robots.txt to control search engine crawling.", category: "seo" },
  { name: "Keyword Density Checker", slug: "keyword-density", description: "Analyze keyword density and word frequency for SEO.", category: "seo" },
  { name: "Open Graph Preview", slug: "og-preview", description: "Preview how your page looks on Facebook, Twitter, LinkedIn, Discord.", category: "seo" },
  // Utility Tools
  { name: "Lorem Ipsum Generator", slug: "lorem-ipsum", description: "Generate lorem ipsum placeholder text. Choose paragraphs, sentences, or words.", category: "dev" },
  { name: "Percentage Calculator", slug: "percentage-calculator", description: "Calculate percentages instantly. X% of Y, percentage change, increase/decrease.", category: "dev" },
  { name: "Age Calculator", slug: "age-calculator", description: "Calculate exact age in years, months, days, hours. Days until next birthday.", category: "dev" },
  { name: "Random Number Generator", slug: "random-number", description: "Generate random numbers in any range. Unique or with duplicates.", category: "dev" },
  { name: "Text Diff Checker", slug: "text-diff", description: "Compare two texts and find differences with line-by-line color highlighting.", category: "dev" },
  { name: "Text to Binary", slug: "text-to-binary", description: "Convert text to binary, hex, octal, decimal and decode back.", category: "dev" },
  { name: "Remove Duplicate Lines", slug: "remove-duplicates", description: "Remove duplicate lines from text. Case-sensitive, trim, empty line options.", category: "dev" },
  { name: "Sort Text Lines", slug: "sort-lines", description: "Sort lines alphabetically, numerically, by length, or shuffle randomly.", category: "dev" },
  { name: "Unit Converter", slug: "unit-converter", description: "Convert units: length, weight, temperature, volume, area, speed, data.", category: "dev" },
  // Design Tools
  { name: "QR Code Generator", slug: "qr-code", description: "Generate QR codes for URLs, WiFi, email. Customize colors.", category: "design" },
  { name: "Color Palette Extractor", slug: "color-palette", description: "Extract dominant color palettes from any image.", category: "design" },
  { name: "Color Converter", slug: "color-converter", description: "Convert colors between HEX, RGB, HSL, and CMYK.", category: "design" },
  { name: "Favicon Generator", slug: "favicon-generator", description: "Generate favicons for all platforms from any image.", category: "design" },
  { name: "Color Picker", slug: "color-picker", description: "Pick colors and get HEX, RGB, HSL, CMYK values instantly.", category: "design" },
];

export const CATEGORY_LABELS: Record<string, string> = {
  image: "Image Tools",
  pdf: "PDF Tools",
  dev: "Developer Tools",
  seo: "SEO Tools",
  design: "Design Tools",
};

export function getRelatedTools(currentSlug: string, count = 4): ToolInfo[] {
  const current = ALL_TOOLS.find((t) => t.slug === currentSlug);
  if (!current) return [];
  // Same category, exclude self
  const sameCategory = ALL_TOOLS.filter(
    (t) => t.category === current.category && t.slug !== currentSlug
  );
  // Shuffle and take `count`
  const shuffled = sameCategory.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
