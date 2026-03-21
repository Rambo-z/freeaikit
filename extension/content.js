// Keywords that match our tools, in all supported languages
const TOOL_KEYWORDS = {
  "image-compress": {
    en: ["compress image", "compress photo", "compress jpg", "compress png", "reduce image size", "image compressor", "reduce file size", "tinypng", "squoosh"],
    es: ["comprimir imagen", "comprimir foto", "comprimir jpg", "comprimir png", "reducir tamaño imagen", "compresor de imagen"],
    pt: ["comprimir imagem", "comprimir foto", "comprimir jpg", "comprimir png", "reduzir tamanho imagem", "compressor de imagem"],
  },
  "bg-remover": {
    en: ["remove background", "background remover", "remove bg", "transparent background", "cut out background", "remove background from photo"],
    es: ["quitar fondo", "eliminar fondo", "remover fondo", "fondo transparente", "borrar fondo"],
    pt: ["remover fundo", "tirar fundo", "fundo transparente", "apagar fundo", "remover fundo foto"],
  },
  "pdf-merge": {
    en: ["merge pdf", "combine pdf", "join pdf", "merge pdf files", "pdf merger"],
    es: ["unir pdf", "combinar pdf", "juntar pdf", "fusionar pdf", "unir archivos pdf"],
    pt: ["juntar pdf", "combinar pdf", "unir pdf", "mesclar pdf", "juntar arquivos pdf"],
  },
  "image-to-text": {
    en: ["image to text", "ocr online", "extract text from image", "photo to text", "text recognition", "ocr free"],
    es: ["imagen a texto", "ocr online", "extraer texto de imagen", "foto a texto"],
    pt: ["imagem para texto", "ocr online", "extrair texto de imagem", "foto para texto"],
  },
  "pdf-compress": {
    en: ["compress pdf", "reduce pdf size", "pdf compressor", "make pdf smaller", "shrink pdf"],
    es: ["comprimir pdf", "reducir tamaño pdf", "compresor pdf"],
    pt: ["comprimir pdf", "reduzir tamanho pdf", "compressor pdf"],
  },
  "image-resize": {
    en: ["resize image", "resize photo", "image resizer", "change image size", "resize picture"],
    es: ["redimensionar imagen", "cambiar tamaño imagen", "resize imagen"],
    pt: ["redimensionar imagem", "mudar tamanho imagem", "resize imagem"],
  },
  "image-convert": {
    en: ["convert image", "jpg to png", "png to jpg", "webp to jpg", "image converter", "convert photo format"],
    es: ["convertir imagen", "jpg a png", "png a jpg", "conversor de imagen"],
    pt: ["converter imagem", "jpg para png", "png para jpg", "conversor de imagem"],
  },
  "image-crop": {
    en: ["crop image", "crop photo", "image cropper", "cut image"],
    es: ["recortar imagen", "cortar imagen", "recortar foto"],
    pt: ["cortar imagem", "recortar foto", "cortar foto"],
  },
  "pdf-to-images": {
    en: ["pdf to image", "pdf to jpg", "pdf to png", "convert pdf to image", "pdf to picture"],
    es: ["pdf a imagen", "pdf a jpg", "pdf a png", "convertir pdf a imagen"],
    pt: ["pdf para imagem", "pdf para jpg", "pdf para png", "converter pdf para imagem"],
  },
  "image-to-pdf": {
    en: ["image to pdf", "jpg to pdf", "photo to pdf", "convert image to pdf", "picture to pdf"],
    es: ["imagen a pdf", "jpg a pdf", "foto a pdf", "convertir imagen a pdf"],
    pt: ["imagem para pdf", "jpg para pdf", "foto para pdf", "converter imagem para pdf"],
  },
};

// Tool URLs per language
const TOOL_URLS = {
  "image-compress": { en: "https://freeaikit.app/image-compress", es: "https://freeaikit.app/es/comprimir-imagen", pt: "https://freeaikit.app/pt/comprimir-imagem" },
  "bg-remover": { en: "https://freeaikit.app/bg-remover", es: "https://freeaikit.app/es/quitar-fondo", pt: "https://freeaikit.app/pt/remover-fundo" },
  "pdf-merge": { en: "https://freeaikit.app/pdf-merge", es: "https://freeaikit.app/es/unir-pdf", pt: "https://freeaikit.app/pt/juntar-pdf" },
  "image-to-text": { en: "https://freeaikit.app/image-to-text", es: "https://freeaikit.app/es/imagen-a-texto", pt: "https://freeaikit.app/pt/imagem-para-texto" },
  "pdf-compress": { en: "https://freeaikit.app/pdf-compress", es: "https://freeaikit.app/es/comprimir-pdf", pt: "https://freeaikit.app/pt/comprimir-pdf" },
  "image-resize": { en: "https://freeaikit.app/image-resize", es: "https://freeaikit.app/es/redimensionar-imagen", pt: "https://freeaikit.app/pt/redimensionar-imagem" },
  "image-convert": { en: "https://freeaikit.app/image-convert", es: "https://freeaikit.app/es/convertir-imagen", pt: "https://freeaikit.app/pt/converter-imagem" },
  "image-crop": { en: "https://freeaikit.app/image-crop", es: "https://freeaikit.app/es/recortar-imagen", pt: "https://freeaikit.app/pt/cortar-imagem" },
  "pdf-to-images": { en: "https://freeaikit.app/pdf-to-images", es: "https://freeaikit.app/es/pdf-a-imagen", pt: "https://freeaikit.app/pt/pdf-para-imagem" },
  "image-to-pdf": { en: "https://freeaikit.app/image-to-pdf", es: "https://freeaikit.app/es/imagen-a-pdf", pt: "https://freeaikit.app/pt/imagem-para-pdf" },
};

function detectLang() {
  const host = location.hostname;
  if (host.startsWith("es.")) return "es";
  if (host.startsWith("pt.")) return "pt";
  if (host.startsWith("id.")) return "id";
  return "en";
}

function scanPage() {
  const lang = detectLang();
  const results = [];

  // Grab all visible text that looks like questions
  // Quora uses obfuscated classes, so we look for links with question-like URLs
  const links = document.querySelectorAll('a[href]');
  const seenQuestions = new Set();

  for (const link of links) {
    const href = link.getAttribute("href") || "";
    const text = (link.textContent || "").trim();

    // Skip non-question links
    if (!text || text.length < 15 || text.length > 300) continue;
    if (seenQuestions.has(text)) continue;

    // Check if it looks like a question (ends with ? or is a "how to" style)
    const isQuestion = text.includes("?") ||
      /^(how|what|why|can|is|are|do|does|which|where|best|top|cómo|qué|cuál|por qué|como|qual|por que)/i.test(text);

    if (!isQuestion) continue;

    // Score against our keywords
    const textLower = text.toLowerCase();
    let bestScore = 0;
    let bestTool = "";

    for (const [toolId, keywords] of Object.entries(TOOL_KEYWORDS)) {
      const langKeywords = keywords[lang] || keywords.en;
      for (const kw of langKeywords) {
        if (textLower.includes(kw.toLowerCase())) {
          const score = Math.round((kw.length / textLower.length) * 100 + 50);
          if (score > bestScore) {
            bestScore = Math.min(score, 99);
            bestTool = toolId;
          }
        }
      }
    }

    if (bestScore > 0) {
      seenQuestions.add(text);
      const toolUrl = TOOL_URLS[bestTool]?.[lang] || TOOL_URLS[bestTool]?.en || "";
      results.push({
        question: text,
        score: bestScore,
        toolId: bestTool,
        toolUrl,
        href: href.startsWith("/") ? `${location.origin}${href}` : href,
      });
    }
  }

  // Also check the current page's main question (if we're on a question page)
  const pageTitle = document.title.replace(/ - Quora$/, "").trim();
  if (pageTitle && !seenQuestions.has(pageTitle)) {
    const textLower = pageTitle.toLowerCase();
    for (const [toolId, keywords] of Object.entries(TOOL_KEYWORDS)) {
      const langKeywords = keywords[lang] || keywords.en;
      for (const kw of langKeywords) {
        if (textLower.includes(kw.toLowerCase())) {
          const score = Math.min(Math.round((kw.length / textLower.length) * 100 + 50), 99);
          const toolUrl = TOOL_URLS[toolId]?.[lang] || TOOL_URLS[toolId]?.en || "";
          results.push({
            question: pageTitle,
            score,
            toolId,
            toolUrl,
            href: location.href,
            isCurrentPage: true,
          });
          break;
        }
      }
    }
  }

  // Sort by score descending
  results.sort((a, b) => b.score - a.score);
  return { results: results.slice(0, 10), lang };
}

// Listen for scan requests from side panel
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "SCAN") {
    const data = scanPage();
    sendResponse(data);
  }
});
