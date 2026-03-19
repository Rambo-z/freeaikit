"""
FreeAIKit Growth Engine — Keyword Monitor Configuration
"""

# 78 keyword roots — refined for freeaikit.app (online tool focus)
# Removed 44 noise-producing roots, added 25 high-value tool roots
KEYWORD_ROOTS = [
    # File processing (our strength)
    "compressor", "converter", "convert", "editor", "extractor", "filter",
    "format", "image", "photo", "picture", "portrait", "product photo",
    "processor", "merger", "splitter", "cropper", "resizer", "watermark",
    # Generators & builders
    "builder", "calculator", "creator", "generator", "maker",
    # Check & validate
    "analyzer", "checker", "comparator", "detector", "tester", "validator",
    "scanner", "diff",
    # Text & code tools
    "code", "compiler", "humanizer", "paraphraser", "solver", "summarizer",
    "text", "formatter", "minifier", "beautifier", "obfuscator",
    # Encode & decode
    "encoder", "decoder", "hash", "translator",
    # Design tools
    "chart", "diagram", "graph", "coloring page", "designer", "emoji",
    "font", "icon", "illustration", "logo", "meme", "pattern", "style",
    "tattoo", "template", "gradient", "palette", "picker",
    # Media tools
    "audio", "avatar", "face", "cartoon", "music", "recorder",
    "sound", "speech", "song", "enhancer", "upscaler", "colorizer",
    "restorer",
    # Utility tools
    "counter", "downloader", "finder", "modifier", "optimizer",
    "planner", "scheduler", "simulator",
    # SEO & web tools
    "sitemap", "qr", "barcode", "remover",
]

# Prefixes to combine with roots for Google Trends
TREND_PREFIXES = ["ai", "free", "online"]

# Query patterns for Google Suggest
SUGGEST_PATTERNS = [
    "free {root} tool",
    "ai {root} online",
    "{root} converter free",
    "best {root} generator",
]

# Existing tools on FreeAIKit (slug list) — auto-exclude from opportunities
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
]

# Keywords that map to existing tools (for dedup)
EXISTING_KEYWORDS = [
    "background remover", "image compress", "image convert", "image resize",
    "image watermark", "image crop", "image filter", "base64 image",
    "ocr", "image to text", "gif maker", "blur image", "meme generator",
    "pdf compress", "pdf merge", "pdf split", "pdf to image", "image to pdf",
    "pdf unlock", "pdf rotate", "pdf protect", "pdf extract",
    "json formatter", "css minifier", "text case", "password generator",
    "word counter", "url encoder", "regex tester", "markdown editor",
    "timestamp converter", "hash generator", "uuid generator",
    "yaml formatter", "csv to json", "html encoder", "jwt decoder",
    "base converter", "xml formatter", "meta tag generator",
    "schema generator", "robots txt", "keyword density", "og preview",
    "qr code", "color palette", "color converter", "favicon generator",
]

# Feishu webhook URL — set via environment variable
# FEISHU_WEBHOOK_URL = os.environ.get("FEISHU_WEBHOOK_URL", "")

# Batch settings: 78 roots ÷ 12 batches ≈ 7 roots per run
BATCH_COUNT = 12

# Noise filter: skip suggestions containing these (not tool-related)
NOISE_WORDS = [
    # Informational intent (not tool users)
    "what is", "how to use", "how does", "meaning of", "definition",
    "explain", "example of", "tutorial", "course", "learn",
    # Social / entertainment
    "reddit", "quora", "youtube", "tiktok", "instagram", "twitter",
    "movie", "movies", "anime", "manga", "game", "games", "gaming",
    "dnd", "d&d", "5e", "pf2e", "wow", "minecraft",
    # Downloads / piracy
    "download apk", "mod apk", "crack", "torrent", "pirated",
    # Politics / news / events
    "palestine", "ukraine", "politics", "news", "summit", "white house",
    "election", "government", "congress", "olympics", "skating",
    "new york times",
    # Services (not online tools)
    "near me", "for seniors", "for low income", "in my area",
    "jobs", "salary", "career", "hiring", "interview",
    "login", "sign up", "pricing", "subscription",
    # Comparison / reviews
    "vs ", "versus", "alternative to", "review", "reviews", "best app",
    # Physical products
    "buy", "purchase", "order", "shipping", "delivery",
    "figure", "figures", "toy", "toys", "potion",
    "catalytic", "air compressor",
    # AI brands & competitor tools (not actionable for us)
    "chatgpt", "grok", "perplexity", "claude ai", "openai", "sora",
    "google ai studio", "google ai mode", "ai mode", "copilot", "gemini",
    "tinkercad", "ilovepdf", "pdf24", "smallpdf", "pdfgear",
    "tinypng", "wetransfer", "izotope", "meshy", "hedra", "vomo",
    "walter writes", "canva", "figma", "midjourney", "runway",
    "pika", "kling", "luma", "ideogram", "leonardo ai",
    "convertio", "cloud convert", "freeconvert", "remaker ai", "aiarty",
    "fotor", "pixlr", "remove.bg", "unscreen", "kapwing", "veed",
    # Entertainment / non-tool
    "kpop", "demon hunter", "audiobook", "podcast", "lyrics",
    "free trial", "free song", "free music",
]

# Tool-like signal words (keyword containing these gets higher score)
TOOL_SIGNAL_WORDS = [
    "tool", "generator", "converter", "maker", "creator", "editor",
    "checker", "builder", "remover", "compressor", "formatter",
    "optimizer", "analyzer", "detector", "extractor", "calculator",
    "encoder", "decoder", "translator", "enhancer", "resizer",
    "downloader", "tester", "validator", "scanner", "viewer",
]

# Broader content words that indicate the keyword is tool-relevant
# Used for Trends second-pass filtering: if a rising keyword contains
# NONE of these AND none of TOOL_SIGNAL_WORDS, it's likely noise
TOOL_CONTENT_WORDS = [
    # Actions
    "convert", "compress", "edit", "generate", "make", "create",
    "check", "merge", "split", "extract", "resize", "crop",
    "format", "encode", "decode", "translate", "download",
    "remove", "detect", "scan", "optimize", "minify", "beautify",
    "compare", "diff", "validate", "parse", "render",
    # File types / digital content
    "pdf", "image", "photo", "picture", "video", "audio", "text",
    "json", "csv", "html", "xml", "yaml", "svg", "gif", "png",
    "jpg", "jpeg", "webp", "heic", "mp4", "mp3", "wav", "file",
    # Tool-related modifiers
    "to", "from", "into", "online", "free", "ai ",
    # Design / media
    "font", "color", "icon", "logo", "chart", "diagram", "qr",
    "barcode", "watermark", "gradient", "palette", "emoji",
    "avatar", "meme", "template",
    # Specific tool types
    "calculator", "counter", "planner", "scheduler", "simulator",
    "recorder", "upscaler", "colorizer", "restorer",
]

# Auto-difficulty estimation rules
# keyword contains → difficulty level
DIFFICULTY_RULES = [
    # 纯前端: text manipulation, generators, formatters
    (["text", "font", "color", "gradient", "css", "json", "xml", "yaml",
      "markdown", "html", "csv", "base64", "hash", "uuid", "password",
      "regex", "url", "timestamp", "calculator", "counter", "formatter",
      "encoder", "decoder", "converter text", "diff", "lorem", "emoji",
      "qr code", "slug"], "纯前端"),
    # 需WASM: image/video/audio/pdf processing
    (["image", "photo", "picture", "video", "audio", "pdf", "svg",
      "gif", "png", "jpg", "webp", "compress", "resize", "crop",
      "watermark", "blur", "filter", "face", "portrait", "background",
      "remover", "enhancer", "restorer"], "需WASM"),
    # 需API: AI-powered, external data, content generation
    (["ai ", "summarize", "paraphrase", "humanize", "translate",
      "detect", "plagiarism", "seo", "backlink", "keyword",
      "content generator", "email generator", "speech", "voice",
      "chatbot", "advisor"], "需API"),
]

# Output paths
import os
import math

DATA_DIR = os.path.join(os.path.dirname(__file__), "..", "..", "data", "keywords")
REPORTS_DIR = os.path.join(os.path.dirname(__file__), "..", "..", "data", "keywords")


def get_batch_roots(batch_index):
    """Get keyword roots for a specific batch (0-11).
    122 roots split into 12 batches of ~10 each.
    """
    batch_size = math.ceil(len(KEYWORD_ROOTS) / BATCH_COUNT)
    start = batch_index * batch_size
    end = start + batch_size
    return KEYWORD_ROOTS[start:end]
