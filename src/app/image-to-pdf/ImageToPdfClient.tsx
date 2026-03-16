"use client";

import { useState, useCallback, useRef } from "react";
import { Upload, Download, Trash2, RefreshCw, GripVertical, Image as ImageIcon } from "lucide-react";

interface ImgItem {
  id: string;
  file: File;
  previewUrl: string;
  width: number;
  height: number;
}

type PageSize = "auto" | "a4" | "letter";
type Orientation = "portrait" | "landscape";

function formatBytes(bytes: number) {
  if (!bytes) return "0 B";
  const k = 1024, s = ["B", "KB", "MB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + s[i];
}

export default function ImageToPdfClient() {
  const [items, setItems] = useState<ImgItem[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pageSize, setPageSize] = useState<PageSize>("auto");
  const [orientation, setOrientation] = useState<Orientation>("portrait");
  const [margin, setMargin] = useState(10);
  const [dragOver, setDragOver] = useState<string | null>(null);
  const dragItem = useRef<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addFiles = useCallback(async (files: FileList | File[]) => {
    const imgs = Array.from(files).filter((f) => f.type.startsWith("image/"));
    const newItems: ImgItem[] = await Promise.all(
      imgs.map((file) =>
        new Promise<ImgItem>((resolve) => {
          const img = new Image();
          const url = URL.createObjectURL(file);
          img.onload = () => resolve({
            id: Math.random().toString(36).slice(2),
            file, previewUrl: url,
            width: img.naturalWidth, height: img.naturalHeight,
          });
          img.src = url;
        })
      )
    );
    setItems((prev) => [...prev, ...newItems]);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); }, []);
  const handleDragLeave = useCallback((e: React.DragEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) setIsDragging(false);
  }, []);
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setIsDragging(false); addFiles(e.dataTransfer.files);
  }, [addFiles]);
  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) { addFiles(e.target.files); e.target.value = ""; }
  }, [addFiles]);

  const handleItemDragStart = (id: string) => { dragItem.current = id; };
  const handleItemDragOver = (e: React.DragEvent, id: string) => { e.preventDefault(); setDragOver(id); };
  const handleItemDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault(); setDragOver(null);
    if (!dragItem.current || dragItem.current === targetId) return;
    setItems((prev) => {
      const from = prev.findIndex((f) => f.id === dragItem.current);
      const to = prev.findIndex((f) => f.id === targetId);
      const next = [...prev];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
    dragItem.current = null;
  };

  const convert = useCallback(async () => {
    if (items.length === 0) return;
    setIsProcessing(true);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const pdf = await PDFDocument.create();

      // Page dimensions in points (1pt = 1/72 inch)
      const A4 = { w: 595, h: 842 };
      const LETTER = { w: 612, h: 792 };

      for (const item of items) {
        const arrayBuffer = await item.file.arrayBuffer();
        let img;
        if (item.file.type === "image/png") {
          img = await pdf.embedPng(arrayBuffer);
        } else {
          // For jpg/webp/gif: convert to jpeg via canvas
          const canvas = document.createElement("canvas");
          const imgEl = new Image();
          await new Promise<void>((res) => { imgEl.onload = () => res(); imgEl.src = item.previewUrl; });
          canvas.width = imgEl.naturalWidth;
          canvas.height = imgEl.naturalHeight;
          canvas.getContext("2d")!.drawImage(imgEl, 0, 0);
          const jpegBlob = await new Promise<Blob>((res) => canvas.toBlob((b) => res(b!), "image/jpeg", 0.95));
          img = await pdf.embedJpg(await jpegBlob.arrayBuffer());
        }

        const imgW = img.width, imgH = img.height;
        let pageW: number, pageH: number;

        if (pageSize === "auto") {
          pageW = imgW + margin * 2;
          pageH = imgH + margin * 2;
        } else {
          const base = pageSize === "a4" ? A4 : LETTER;
          if (orientation === "landscape") { pageW = base.h; pageH = base.w; }
          else { pageW = base.w; pageH = base.h; }
        }

        const page = pdf.addPage([pageW, pageH]);
        const availW = pageW - margin * 2;
        const availH = pageH - margin * 2;
        const scale = Math.min(availW / imgW, availH / imgH);
        const drawW = imgW * scale;
        const drawH = imgH * scale;
        const x = margin + (availW - drawW) / 2;
        const y = margin + (availH - drawH) / 2;
        page.drawImage(img, { x, y, width: drawW, height: drawH });
      }

      const bytes = await pdf.save();
      const blob = new Blob([bytes.buffer as ArrayBuffer], { type: "application/pdf" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = items.length === 1
        ? items[0].file.name.replace(/\.[^.]+$/, "") + ".pdf"
        : "images.pdf";
      a.click();
      URL.revokeObjectURL(a.href);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Conversion failed");
    }
    setIsProcessing(false);
  }, [items, pageSize, orientation, margin]);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => {
      const item = prev.find((i) => i.id === id);
      if (item) URL.revokeObjectURL(item.previewUrl);
      return prev.filter((i) => i.id !== id);
    });
  }, []);

  return (
    <div className="space-y-6">
      {/* Upload */}
      <div
        onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-200 bg-white ${
          isDragging ? "border-red-500 bg-red-50 scale-[1.02]" : "border-gray-200 hover:border-red-400 hover:bg-red-50/30"
        }`}
      >
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${isDragging ? "bg-red-100" : "bg-red-50"}`}>
          <ImageIcon className={`w-7 h-7 ${isDragging ? "text-red-600" : "text-red-500"}`} />
        </div>
        {isDragging ? (
          <p className="text-lg font-semibold text-red-600">Drop images here</p>
        ) : (
          <>
            <button className="px-6 py-3 bg-red-600 text-white rounded-xl text-sm font-semibold hover:bg-red-700 transition-colors shadow-lg shadow-red-500/25 mb-3">
              Upload Images
            </button>
            <p className="text-sm text-gray-500 mb-1">or drop files here</p>
          </>
        )}
        <p className="text-xs text-gray-400">PNG, JPG, WebP — multiple files, drag to reorder</p>
        <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handleFileSelect} className="hidden" />
      </div>

      {/* Settings + list */}
      {items.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-5">
          {/* Settings */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Page Size</label>
              <div className="flex gap-2">
                {(["auto", "a4", "letter"] as PageSize[]).map((s) => (
                  <button key={s} onClick={() => setPageSize(s)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border uppercase transition-all ${
                      pageSize === s ? "border-red-500 bg-red-50 text-red-700" : "border-gray-200 text-gray-500 hover:border-gray-300"
                    }`}
                  >{s === "auto" ? "Auto" : s.toUpperCase()}</button>
                ))}
              </div>
            </div>
            {pageSize !== "auto" && (
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">Orientation</label>
                <div className="flex gap-2">
                  {(["portrait", "landscape"] as Orientation[]).map((o) => (
                    <button key={o} onClick={() => setOrientation(o)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border capitalize transition-all ${
                        orientation === o ? "border-red-500 bg-red-50 text-red-700" : "border-gray-200 text-gray-500"
                      }`}
                    >{o}</button>
                  ))}
                </div>
              </div>
            )}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Margin — {margin}pt</label>
              <input type="range" min={0} max={50} value={margin} onChange={(e) => setMargin(Number(e.target.value))}
                className="w-full accent-red-600" />
            </div>
          </div>

          {/* Image order list */}
          <div>
            <p className="text-xs text-gray-400 mb-2">Drag to reorder — pages follow this order</p>
            <div className="space-y-2">
              {items.map((item, idx) => (
                <div
                  key={item.id}
                  draggable
                  onDragStart={() => handleItemDragStart(item.id)}
                  onDragOver={(e) => handleItemDragOver(e, item.id)}
                  onDrop={(e) => handleItemDrop(e, item.id)}
                  onDragLeave={() => setDragOver(null)}
                  className={`flex items-center gap-3 p-2.5 rounded-xl border transition-all ${
                    dragOver === item.id ? "border-red-400 bg-red-50" : "border-gray-100 bg-gray-50"
                  }`}
                >
                  <GripVertical className="w-4 h-4 text-gray-300 cursor-grab flex-shrink-0" />
                  <span className="text-xs text-gray-400 w-5 text-center">{idx + 1}</span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.previewUrl} alt="" className="w-10 h-10 object-cover rounded-lg border border-gray-100" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{item.file.name}</p>
                    <p className="text-xs text-gray-400">{item.width}×{item.height} · {formatBytes(item.file.size)}</p>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2 border-t border-gray-100">
            <button onClick={convert} disabled={isProcessing}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-red-600 text-white rounded-xl text-sm font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 shadow-sm"
            >
              {isProcessing
                ? <><RefreshCw className="w-4 h-4 animate-spin" />Converting…</>
                : <><Download className="w-4 h-4" />Convert to PDF</>}
            </button>
            <button onClick={() => { items.forEach((i) => URL.revokeObjectURL(i.previewUrl)); setItems([]); }}
              className="px-4 py-2.5 text-gray-500 hover:text-red-500 text-sm transition-colors ml-auto"
            >
              Clear All
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
