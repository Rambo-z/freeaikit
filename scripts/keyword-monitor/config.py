"""
FreeAIKit Growth Engine — Keyword Monitor Configuration
"""

# 122 keyword roots from the AI出海手册
KEYWORD_ROOTS = [
    "action", "advisor", "agent", "ai", "analyzer", "anime", "answer", "art",
    "assistant", "audio", "avatar", "best", "builder", "calculator", "cartoon",
    "cataloger", "character", "chart", "chat", "cheat", "checker", "clue",
    "code", "coloring page", "comparator", "compiler", "composer", "connector",
    "constructor", "convert", "converter", "crawler", "creator", "dashboard",
    "designer", "detector", "diagram", "directory", "downloader", "editor",
    "emoji", "enhancer", "evaluator", "example", "explorer", "extractor",
    "face", "faq", "figure", "filter", "finder", "font", "format", "generator",
    "graph", "guide", "helper", "hint", "how to", "humanizer", "icon", "ideas",
    "illustration", "image", "interior design", "interpreter", "layout", "list",
    "logo", "maker", "manager", "meme", "model", "modifier", "monitor", "music",
    "navigator", "notifier", "online", "optimizer", "paraphraser", "pattern",
    "photo", "picture", "planner", "portal", "portrait", "processor",
    "product photo", "receiver", "recommend", "recorder", "resources",
    "responder", "restorer", "review", "sample", "scheduler", "scraper",
    "sender", "simulator", "solver", "song", "sound", "speech", "starter",
    "studio", "style", "summarizer", "summary", "syncer", "tattoo", "template",
    "tester", "text",
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

# Batch settings: 122 roots ÷ 12 batches ≈ 10-11 roots per run
BATCH_COUNT = 12

# Noise filter: skip suggestions containing these (not tool-related)
NOISE_WORDS = [
    "what is", "how to use", "meaning of", "definition",
    "reddit", "quora", "youtube", "tiktok", "instagram",
    "download apk", "mod apk", "crack", "torrent",
    "palestine", "ukraine", "politics", "news",
    "login", "sign up", "pricing", "review",
    "jobs", "salary", "career", "course", "tutorial",
    "vs ", "versus", "alternative to",
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
