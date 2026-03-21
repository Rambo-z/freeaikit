"""
FreeAIKit Growth Engine — Keyword Monitor Configuration

Strategy: Demand-first exploration
- Start from tool actions × file types we DON'T have yet
- Find long-tail variations via Google Suggest
- Every result should be a potential new tool we could build
"""

import os
import math

# ============================================================
# EXPLORE QUERIES — precise tool phrases we DON'T have yet
# Each is a real user search intent for an online tool
# ============================================================

KEYWORD_ROOTS = [
    # === VIDEO (we have ZERO video tools) ===
    "compress video online",
    "video compressor free",
    "trim video online",
    "cut video online free",
    "video to gif",
    "convert video to gif online",
    "video converter online free",
    "mp4 to mp3 online",
    "mp4 to webm",
    "screen recorder online",
    "video to audio",
    "rotate video online",
    "resize video online",
    "video speed changer",
    "video merger online",
    "add music to video online",
    "video to boomerang",
    "reverse video online",

    # === AUDIO (we have ZERO audio tools) ===
    "mp3 cutter online",
    "audio trimmer online free",
    "audio converter online",
    "wav to mp3 online",
    "mp3 to wav",
    "audio compressor online",
    "voice recorder online",
    "audio joiner online",
    "remove vocal from song",
    "audio speed changer",
    "noise remover online",

    # === TEXT TO SPEECH / SPEECH TO TEXT ===
    "text to speech online free",
    "tts online",
    "speech to text online free",
    "voice to text online",
    "audio to text free",

    # === IMAGE FORMAT GAPS ===
    "heic to jpg online",
    "heic to png",
    "heic converter online free",
    "webp to gif",
    "gif to webp",
    "avif to jpg",
    "avif to png",
    "tiff to jpg online",
    "bmp to png online",
    "raw to jpg online",
    "image to ico",
    "remove watermark from image free",
    "image upscaler online free",
    "ai image enhancer free",

    # === DOCUMENT CONVERSION GAPS ===
    "word to pdf online free",
    "docx to pdf online",
    "excel to pdf online free",
    "ppt to pdf online",
    "pdf to word online free",
    "pdf to excel online",
    "pdf to ppt online",
    "epub to pdf",
    "html to pdf online",
    "markdown to pdf",

    # === DOCUMENT CREATION ===
    "invoice generator free",
    "invoice maker online",
    "resume builder free online",
    "cv maker online free",
    "letter generator free",
    "certificate maker online free",
    "receipt generator free",
    "contract template free",

    # === DEVELOPER TOOL GAPS ===
    "cron expression generator",
    "crontab generator online",
    "css gradient generator",
    "box shadow generator css",
    "flexbox generator",
    "grid generator css",
    "json to csv online",
    "csv to excel online",
    "sql formatter online",
    "code formatter online",
    "code beautifier free",
    "diff checker online",
    "ip lookup tool",
    "whois lookup free",
    "dns lookup online",
    "http status checker",
    "json to yaml online",
    "yaml to json online",
    "html to markdown",
    "markdown to html",
    "minify javascript online",
    "minify html online",
    "base64 encode decode online",
    "jwt generator online",
    "api tester online free",
    "webhook tester",
    "epoch converter online",

    # === DESIGN TOOL GAPS ===
    "gradient generator online",
    "color gradient maker",
    "font pairing tool",
    "font preview online",
    "svg editor online free",
    "icon maker online free",
    "logo maker free online",
    "mockup generator free",
    "wireframe tool online",
    "pattern generator online",
    "border radius generator",
    "glassmorphism generator",
    "neumorphism generator",
    "text shadow generator css",

    # === SOCIAL MEDIA TOOLS ===
    "instagram post size",
    "social media image resizer",
    "youtube thumbnail maker free",
    "twitter banner maker",
    "linkedin banner size",
    "og image generator",

    # === CALCULATOR / UTILITY GAPS ===
    "bmi calculator online",
    "loan calculator online",
    "tip calculator",
    "discount calculator",
    "gpa calculator online",
    "time zone converter online",
    "date calculator online",
    "character counter online",
    "byte counter online",
    "aspect ratio calculator",
    "px to rem converter",
    "color to hex converter",
    "binary to decimal",
    "hex to rgb",
    "temperature converter",

    # === FILE UTILITY ===
    "file converter online free",
    "file compressor online",
    "zip file online",
    "unzip file online",
    "rar to zip online",
]

# Suggest patterns — use the query directly + variations
SUGGEST_PATTERNS = [
    "{root}",
    "{root} free",
    "{root} no signup",
    "best {root}",
]

# Prefixes for Google Trends
TREND_PREFIXES = ["", "free", "online"]

# Existing tools (57) — auto-exclude from opportunities
EXISTING_SLUGS = [
    "bg-remover", "image-compress", "image-convert", "image-to-svg",
    "image-resize", "image-watermark", "image-crop", "image-filters",
    "base64-image", "image-to-text", "gif-maker", "image-blur",
    "meme-generator", "pdf-compress", "pdf-merge", "pdf-to-images",
    "image-to-pdf", "pdf-unlock", "pdf-rotate", "pdf-protect",
    "pdf-extract", "json-formatter", "css-minifier", "text-case",
    "password-generator", "word-counter", "url-encoder", "regex-tester",
    "markdown-editor", "timestamp-converter", "hash-generator",
    "uuid-generator", "yaml-formatter", "csv-to-json", "html-encoder",
    "jwt-decoder", "base-converter", "xml-formatter", "meta-tag-generator",
    "schema-generator", "robots-generator", "keyword-density", "og-preview",
    "qr-code", "color-palette", "color-converter", "favicon-generator",
    "color-picker", "age-calculator", "percentage-calculator", "random-number",
    "unit-converter", "lorem-ipsum", "text-diff", "text-to-binary",
    "sort-lines", "remove-duplicates",
]

# Keywords matching existing tools (broader matching)
EXISTING_KEYWORDS = [
    "background remover", "image compress", "compress image", "image convert",
    "image resize", "resize image", "image watermark", "image crop",
    "crop image", "image filter", "base64 image", "image to text", "ocr",
    "gif maker", "blur image", "meme generator", "meme maker",
    "pdf compress", "compress pdf", "pdf merge", "merge pdf", "combine pdf",
    "pdf to image", "pdf to jpg", "pdf to png", "image to pdf", "jpg to pdf",
    "pdf unlock", "pdf rotate", "pdf protect", "pdf extract",
    "json formatter", "format json", "css minifier", "minify css",
    "text case", "case converter", "password generator", "word counter",
    "url encoder", "url decoder", "regex tester", "markdown editor",
    "timestamp converter", "epoch converter", "hash generator",
    "uuid generator", "yaml formatter", "csv to json", "html encoder",
    "jwt decoder", "base converter", "xml formatter",
    "meta tag generator", "schema generator", "robots txt generator",
    "keyword density", "og preview", "qr code generator",
    "color palette", "color converter", "favicon generator", "color picker",
    "age calculator", "percentage calculator", "random number",
    "unit converter", "lorem ipsum", "text diff", "text compare",
    "text to binary", "sort lines", "remove duplicates",
    "compress jpg", "compress png", "compress jpeg", "png to jpg",
    "jpg to png", "webp to jpg", "webp to png", "svg to png", "svg to jpg",
    "png to svg", "image to png",
]

# Batch settings: ~130 queries ÷ 6 batches ≈ 22 queries per run
BATCH_COUNT = 6

# Noise filter — much smaller now since queries are precise
NOISE_WORDS = [
    # Non-tool intents
    "what is", "how to use", "how does", "meaning of", "definition",
    "tutorial", "course", "learn", "example",
    # Social / entertainment
    "reddit", "quora", "youtube", "tiktok", "instagram",
    "movie", "anime", "game", "gaming",
    # Physical / offline
    "near me", "buy", "purchase", "shipping",
    "download apk", "mod apk", "crack",
    # Competitor brands (don't need to track)
    "chatgpt", "canva", "figma", "adobe", "photoshop",
    "ilovepdf", "smallpdf", "tinypng", "convertio",
    # Jobs / non-tool
    "jobs", "salary", "career", "interview",
    "login", "sign up", "pricing",
]

# Tool signal words (boost score if present)
TOOL_SIGNAL_WORDS = [
    "tool", "generator", "converter", "maker", "creator", "editor",
    "checker", "builder", "remover", "compressor", "formatter",
    "optimizer", "analyzer", "extractor", "calculator",
    "encoder", "decoder", "cutter", "trimmer", "resizer",
    "tester", "validator", "recorder", "viewer",
]

# Content words that confirm tool relevance
TOOL_CONTENT_WORDS = [
    "convert", "compress", "edit", "generate", "make", "create",
    "check", "merge", "split", "extract", "resize", "crop",
    "format", "encode", "decode", "trim", "cut", "record",
    "remove", "optimize", "minify", "beautify",
    "pdf", "image", "photo", "video", "audio", "text",
    "json", "csv", "html", "xml", "yaml", "svg", "gif", "png",
    "jpg", "jpeg", "webp", "heic", "mp4", "mp3", "wav",
    "docx", "xlsx", "pptx", "epub", "file",
    "online", "free", "to", "from",
    "font", "color", "icon", "logo", "gradient", "css",
    "calculator", "counter", "invoice", "resume",
]

# Difficulty estimation
DIFFICULTY_RULES = [
    # Pure frontend (easy)
    (["text", "font", "color", "gradient", "css", "json", "xml", "yaml",
      "markdown", "html", "csv", "base64", "hash", "uuid", "password",
      "regex", "url", "timestamp", "calculator", "counter", "formatter",
      "encoder", "decoder", "diff", "lorem", "emoji", "cron",
      "qr code", "slug", "invoice", "receipt", "certificate",
      "box shadow", "flexbox", "grid", "border radius",
      "glassmorphism", "neumorphism", "text shadow",
      "bmi", "loan", "tip", "discount", "gpa", "aspect ratio",
      "px to rem", "binary to decimal", "hex to rgb", "temperature",
      "tts", "text to speech", "speech to text", "voice to text",
      "character counter", "byte counter"], "纯前端"),
    # Needs WASM (medium)
    (["image", "photo", "picture", "video", "audio", "pdf", "svg",
      "gif", "png", "jpg", "webp", "heic", "avif", "tiff", "bmp", "raw",
      "mp4", "mp3", "wav", "compress", "resize", "crop",
      "watermark", "blur", "filter", "background", "upscal",
      "remover", "enhancer", "trim", "cut", "merge video",
      "screen record", "voice record"], "需WASM"),
    # Needs API/Server (hard)
    (["ai ", "summarize", "paraphrase", "humanize", "translate",
      "detect", "plagiarism", "backlink", "whois", "dns lookup",
      "ip lookup", "http status", "api test", "webhook",
      "word to pdf", "docx to pdf", "excel to pdf", "ppt to pdf",
      "pdf to word", "pdf to excel", "pdf to ppt",
      "epub", "logo maker", "mockup"], "需API/服务端"),
]

# Output paths
DATA_DIR = os.path.join(os.path.dirname(__file__), "..", "..", "data", "keywords")
REPORTS_DIR = os.path.join(os.path.dirname(__file__), "..", "..", "data", "keywords")


def get_batch_roots(batch_index):
    """Get keyword roots for a specific batch."""
    batch_size = math.ceil(len(KEYWORD_ROOTS) / BATCH_COUNT)
    start = batch_index * batch_size
    end = start + batch_size
    return KEYWORD_ROOTS[start:end]
