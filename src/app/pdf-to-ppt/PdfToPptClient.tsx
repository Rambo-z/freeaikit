"use client";

import { useState, useCallback, useRef } from "react";
import { Upload, Download, Loader2, FileText, Settings } from "lucide-react";

interface SlideInfo {
  pageNum: number;
  imageDataUrl: string;
  width: number;
  height: number;
  textBlocks: TextBlock[];
  status: "pending" | "ocr" | "done";
}

interface TextBlock {
  text: string;
  x: number; // percentage of slide width (0-100)
  y: number; // percentage of slide height (0-100)
  w: number; // percentage
  h: number; // percentage
  fontSize: number; // in points
  confidence: number;
}

export default function PdfToPptClient() {
  const [slides, setSlides] = useState<SlideInfo[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "ocr" | "generating" | "done" | "error">("idle");
  const [progress, setProgress] = useState(0);
  const [progressMsg, setProgressMsg] = useState("");
  const [pptUrl, setPptUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [language, setLanguage] = useState("eng");
  const [includeBackground, setIncludeBackground] = useState(true);
  const [dpi, setDpi] = useState(2); // scale factor
  const fileRef = useRef<HTMLInputElement>(null);

  const LANGUAGES = [
    { code: "eng", label: "English" },
    { code: "chi_sim", label: "Chinese (Simplified)" },
    { code: "chi_tra", label: "Chinese (Traditional)" },
    { code: "jpn", label: "Japanese" },
    { code: "kor", label: "Korean" },
    { code: "spa", label: "Spanish" },
    { code: "fra", label: "French" },
    { code: "deu", label: "German" },
  ];

  const handleFile = useCallback(async (file: File) => {
    if (file.type !== "application/pdf") return;
    setFileName(file.name);
    setStatus("loading");
    setProgress(0);
    setProgressMsg("Loading PDF...");
    setErrorMsg("");
    setPptUrl(null);
    setSlides([]);

    try {
      const pdfjsLib = await import("pdfjs-dist");
      pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const totalPages = pdf.numPages;

      const slideInfos: SlideInfo[] = [];

      for (let i = 1; i <= totalPages; i++) {
        setProgressMsg(`Rendering page ${i}/${totalPages}...`);
        setProgress(Math.round((i / totalPages) * 30));

        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: dpi });

        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext("2d")!;

        await page.render({ canvasContext: ctx, viewport }).promise;

        const imageDataUrl = canvas.toDataURL("image/jpeg", 0.85);

        slideInfos.push({
          pageNum: i,
          imageDataUrl,
          width: viewport.width,
          height: viewport.height,
          textBlocks: [],
          status: "pending",
        });
      }

      setSlides(slideInfos);

      // OCR each slide
      setStatus("ocr");
      const Tesseract = await import("tesseract.js");
      const worker = await Tesseract.createWorker(language, undefined, {
        logger: (m: { status: string; progress: number }) => {
          // Only update for recognize progress
          if (m.status === "recognizing text") {
            // This fires per page being recognized
          }
        },
      });

      for (let i = 0; i < slideInfos.length; i++) {
        setProgressMsg(`OCR: Recognizing text on slide ${i + 1}/${slideInfos.length}...`);
        setProgress(30 + Math.round(((i + 1) / slideInfos.length) * 50));

        const slide = slideInfos[i];
        const { data } = await worker.recognize(slide.imageDataUrl);

        // Extract text blocks with positions
        const blocks: TextBlock[] = [];
        if (data.blocks) {
          for (const block of data.blocks) {
            if (!block.text?.trim()) continue;

            const bbox = block.bbox;
            const x = (bbox.x0 / slide.width) * 100;
            const y = (bbox.y0 / slide.height) * 100;
            const w = ((bbox.x1 - bbox.x0) / slide.width) * 100;
            const h = ((bbox.y1 - bbox.y0) / slide.height) * 100;

            // Estimate font size based on block height and line count
            const lineCount = (block as unknown as { lines?: unknown[] }).lines?.length || 1;
            const blockHeightPx = bbox.y1 - bbox.y0;
            const avgLineHeightPx = blockHeightPx / lineCount;
            // Convert pixel height to points (rough: 1px at 2x scale ≈ 0.5pt at 72dpi)
            const fontSize = Math.max(8, Math.min(48, Math.round(avgLineHeightPx / dpi * 0.75)));

            blocks.push({
              text: block.text.trim(),
              x, y, w, h,
              fontSize,
              confidence: block.confidence || 0,
            });
          }
        }

        slideInfos[i] = { ...slide, textBlocks: blocks, status: "done" };
        setSlides([...slideInfos]);
      }

      await worker.terminate();

      // Generate PPT
      setStatus("generating");
      setProgressMsg("Generating PowerPoint...");
      setProgress(85);

      // Load pptxgenjs from browser bundle (avoids node:fs webpack issue)
      await new Promise<void>((resolve, reject) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((window as any).PptxGenJS) { resolve(); return; }
        const script = document.createElement("script");
        script.src = "/pptxgen.bundle.js";
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("Failed to load PptxGenJS"));
        document.head.appendChild(script);
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const PptxGenJS = (window as any).PptxGenJS;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const pptx = new PptxGenJS() as any;

      // Standard 16:9 slide dimensions (inches)
      pptx.defineLayout({ name: "CUSTOM", width: 10, height: 5.625 });
      pptx.layout = "CUSTOM";

      for (const slide of slideInfos) {
        const pptSlide = pptx.addSlide();

        // Add background image
        if (includeBackground) {
          pptSlide.addImage({
            data: slide.imageDataUrl,
            x: 0,
            y: 0,
            w: "100%",
            h: "100%",
          });
        }

        // Add text blocks as editable text boxes
        for (const block of slide.textBlocks) {
          if (block.confidence < 30) continue; // Skip low-confidence blocks

          pptSlide.addText(block.text, {
            x: `${block.x}%`,
            y: `${block.y}%`,
            w: `${block.w}%`,
            h: `${block.h}%`,
            fontSize: block.fontSize,
            color: includeBackground ? "FFFFFF" : "333333",
            fontFace: "Arial",
            valign: "top",
            wrap: true,
            // If background is included, add slight transparency so text overlays background
            ...(includeBackground ? { shadow: { type: "outer", blur: 2, offset: 1, color: "000000", opacity: 0.5 } } : {}),
          });
        }
      }

      setProgress(95);
      const blob = await pptx.write({ outputType: "blob" }) as Blob;
      const url = URL.createObjectURL(blob);
      setPptUrl(url);
      setStatus("done");
      setProgress(100);
      setProgressMsg("Done!");
    } catch (e: unknown) {
      setErrorMsg(e instanceof Error ? e.message : "Conversion failed");
      setStatus("error");
    }
  }, [language, dpi, includeBackground]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleDownload = useCallback(() => {
    if (!pptUrl) return;
    const a = document.createElement("a");
    a.href = pptUrl;
    a.download = fileName.replace(/\.pdf$/i, "") + "_editable.pptx";
    a.click();
  }, [pptUrl, fileName]);

  const handleReset = () => {
    setSlides([]);
    setStatus("idle");
    setPptUrl(null);
    setProgress(0);
    setErrorMsg("");
  };

  return (
    <div className="space-y-5">
      {/* Upload area */}
      {status === "idle" && (
        <>
          {/* Settings */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4">
            <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Settings className="w-4 h-4" /> Settings
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1">OCR Language</label>
                <select value={language} onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {LANGUAGES.map((l) => (
                    <option key={l.code} value={l.code}>{l.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1">Quality</label>
                <select value={dpi} onChange={(e) => setDpi(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value={1.5}>Standard (faster)</option>
                  <option value={2}>High (recommended)</option>
                  <option value={3}>Ultra (slower, best OCR)</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1">Background</label>
                <select value={includeBackground ? "yes" : "no"} onChange={(e) => setIncludeBackground(e.target.value === "yes")}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="yes">Include slide background</option>
                  <option value="no">Text only (no background)</option>
                </select>
              </div>
            </div>
          </div>

          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileRef.current?.click()}
            className="bg-white rounded-2xl border-2 border-dashed border-gray-200 hover:border-blue-400 p-12 text-center cursor-pointer transition-colors"
          >
            <Upload className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-600 font-medium">Drop a PDF here or click to upload</p>
            <p className="text-gray-400 text-sm mt-1">Works great with NotebookLM exported slides</p>
            <p className="text-gray-400 text-xs mt-2">PDF files only</p>
            <input ref={fileRef} type="file" accept=".pdf,application/pdf" className="hidden"
              onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
          </div>
        </>
      )}

      {/* Processing */}
      {(status === "loading" || status === "ocr" || status === "generating") && (
        <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center space-y-4">
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin mx-auto" />
          <div>
            <p className="text-gray-700 font-medium">{progressMsg}</p>
            <p className="text-gray-400 text-sm mt-1">{progress}% complete</p>
          </div>
          <div className="w-full max-w-md mx-auto bg-gray-100 rounded-full h-2">
            <div className="bg-blue-500 h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
          </div>

          {/* Slide previews during OCR */}
          {slides.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center mt-4">
              {slides.map((slide) => (
                <div key={slide.pageNum} className="relative w-20 h-12 rounded-lg overflow-hidden border border-gray-200">
                  <img src={slide.imageDataUrl} alt={`Slide ${slide.pageNum}`} className="w-full h-full object-cover" />
                  {slide.status === "done" && (
                    <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
                      <span className="text-[8px] text-green-700 font-bold">{slide.textBlocks.length} blocks</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Error */}
      {status === "error" && (
        <div className="bg-white rounded-2xl border border-red-200 p-8 text-center space-y-4">
          <p className="text-red-600 font-medium">{errorMsg}</p>
          <button onClick={handleReset}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors">
            Try Again
          </button>
        </div>
      )}

      {/* Done */}
      {status === "done" && pptUrl && (
        <div className="space-y-5">
          {/* Result summary */}
          <div className="bg-white rounded-2xl border border-green-200 p-6 text-center space-y-4">
            <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mx-auto">
              <FileText className="w-7 h-7 text-green-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">PowerPoint Ready!</h2>
              <p className="text-gray-500 text-sm mt-1">
                {slides.length} slide{slides.length !== 1 ? "s" : ""} converted with{" "}
                {slides.reduce((sum, s) => sum + s.textBlocks.length, 0)} editable text blocks
              </p>
            </div>

            <div className="flex items-center justify-center gap-3">
              <button onClick={handleDownload}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors">
                <Download className="w-4 h-4" /> Download .pptx
              </button>
              <button onClick={handleReset}
                className="px-4 py-2.5 text-sm text-gray-500 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors">
                Convert Another
              </button>
            </div>
          </div>

          {/* Slide previews */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-3">
            <h2 className="text-sm font-semibold text-gray-700">Slide Preview</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {slides.map((slide) => (
                <div key={slide.pageNum} className="relative group">
                  <img src={slide.imageDataUrl} alt={`Slide ${slide.pageNum}`}
                    className="w-full rounded-xl border border-gray-200" />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[10px] px-2 py-1 rounded-b-xl">
                    Slide {slide.pageNum} · {slide.textBlocks.length} text blocks
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="bg-blue-50 rounded-2xl border border-blue-100 p-5 space-y-2">
            <h3 className="text-sm font-semibold text-blue-800">Tips for Best Results</h3>
            <ul className="text-xs text-blue-700 space-y-1">
              <li>• Open the .pptx in PowerPoint, Keynote, or Google Slides to edit text</li>
              <li>• Text boxes are positioned where OCR detected text on each slide</li>
              <li>• If background is included, you can delete the background image to keep only text</li>
              <li>• For better OCR accuracy, use &quot;Ultra&quot; quality setting (slower but more precise)</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
