"use client";

import { useState, useCallback, useRef } from "react";
import { Upload, Download, Trash2, Loader2, GripVertical, Plus } from "lucide-react";
import { trackToolEvent } from "@/lib/analytics";

interface FrameItem {
  id: string;
  file: File;
  url: string;
}

export default function GifMakerClient() {
  const [frames, setFrames] = useState<FrameItem[]>([]);
  const [delay, setDelay] = useState(200);
  const [quality, setQuality] = useState(10);
  const [width, setWidth] = useState(480);
  const [loop, setLoop] = useState(0); // 0 = infinite
  const [status, setStatus] = useState<"idle" | "generating" | "done" | "error">("idle");
  const [progress, setProgress] = useState(0);
  const [gifUrl, setGifUrl] = useState<string | null>(null);
  const [gifSize, setGifSize] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const addFiles = useCallback((files: FileList | File[]) => {
    const newFrames: FrameItem[] = [];
    for (const file of files) {
      if (!file.type.startsWith("image/")) continue;
      newFrames.push({
        id: Math.random().toString(36).slice(2),
        file,
        url: URL.createObjectURL(file),
      });
    }
    setFrames((prev) => [...prev, ...newFrames]);
    setGifUrl(null);
    setStatus("idle");
  }, []);

  const removeFrame = (id: string) => {
    setFrames((prev) => prev.filter((f) => f.id !== id));
    setGifUrl(null);
  };

  const moveFrame = (from: number, to: number) => {
    setFrames((prev) => {
      const arr = [...prev];
      const [item] = arr.splice(from, 1);
      arr.splice(to, 0, item);
      return arr;
    });
    setGifUrl(null);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    addFiles(e.dataTransfer.files);
  }, [addFiles]);

  const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  };

  const handleGenerate = useCallback(async () => {
    trackToolEvent('gif-maker', 'process');
    if (frames.length < 2) return;
    setStatus("generating");
    setProgress(0);
    setGifUrl(null);
    setErrorMsg("");

    try {
      // Dynamic import gif.js (it's a browser-only library)
      const GIF = (await import("gif.js")).default;

      // Calculate height proportionally from first image
      const firstImg = await loadImage(frames[0].url);
      const aspectRatio = firstImg.height / firstImg.width;
      const h = Math.round(width * aspectRatio);

      const gif = new GIF({
        workers: 2,
        quality,
        width,
        height: h,
        workerScript: "/gif.worker.js",
        repeat: loop,
      });

      // Draw each frame to canvas
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = h;
      const ctx = canvas.getContext("2d")!;

      for (const frame of frames) {
        const img = await loadImage(frame.url);
        ctx.clearRect(0, 0, width, h);
        ctx.drawImage(img, 0, 0, width, h);
        gif.addFrame(ctx, { copy: true, delay });
      }

      gif.on("progress", (p: number) => {
        setProgress(Math.round(p * 100));
      });

      gif.on("finished", (blob: Blob) => {
        const url = URL.createObjectURL(blob);
        setGifUrl(url);
        setGifSize(blob.size);
        setStatus("done");
      });

      gif.render();
    } catch (e: unknown) {
      setErrorMsg(e instanceof Error ? e.message : "GIF generation failed");
      setStatus("error");
    }
  }, [frames, delay, quality, width, loop]);

  const handleDownload = useCallback(() => {
    trackToolEvent('gif-maker', 'download');
    if (!gifUrl) return;
    const a = document.createElement("a");
    a.href = gifUrl;
    a.download = "animation.gif";
    a.click();
  }, [gifUrl]);

  return (
    <div className="space-y-5">
      {/* Upload area */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => fileRef.current?.click()}
        className="bg-white rounded-2xl border-2 border-dashed border-gray-200 hover:border-blue-400 p-8 text-center cursor-pointer transition-colors"
      >
        <Upload className="w-8 h-8 text-gray-300 mx-auto mb-2" />
        <p className="text-gray-600 font-medium">Drop images here or click to upload</p>
        <p className="text-gray-400 text-xs mt-1">Upload 2+ images to create an animated GIF</p>
        <input ref={fileRef} type="file" accept="image/*" multiple className="hidden"
          onChange={(e) => { if (e.target.files) addFiles(e.target.files); e.target.value = ""; }} />
      </div>

      {/* Frames */}
      {frames.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-700">Frames ({frames.length})</h2>
            <button onClick={() => fileRef.current?.click()}
              className="inline-flex items-center gap-1 text-xs text-blue-600 font-semibold hover:bg-blue-50 px-2 py-1 rounded-lg">
              <Plus className="w-3 h-3" /> Add More
            </button>
          </div>

          <div className="flex flex-wrap gap-3">
            {frames.map((frame, i) => (
              <div key={frame.id} className="relative group w-24">
                <img src={frame.url} alt={`Frame ${i + 1}`}
                  className="w-24 h-24 object-cover rounded-xl border border-gray-200" />
                <div className="absolute top-0 left-0 bg-black/50 text-white text-[10px] px-1.5 py-0.5 rounded-tl-xl rounded-br-lg">
                  {i + 1}
                </div>
                <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity flex gap-0.5">
                  {i > 0 && (
                    <button onClick={() => moveFrame(i, i - 1)}
                      className="bg-black/50 text-white p-1 rounded-bl-lg rounded-tr-xl text-[10px]">
                      <GripVertical className="w-3 h-3" />
                    </button>
                  )}
                  <button onClick={() => removeFrame(frame.id)}
                    className="bg-red-500/80 text-white p-1 rounded-bl-lg rounded-tr-xl">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Settings */}
      {frames.length >= 2 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4">
          <h2 className="text-sm font-semibold text-gray-700">Settings</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-600 block mb-1">Frame Delay (ms)</label>
              <input type="number" value={delay} onChange={(e) => setDelay(Number(e.target.value))}
                min={50} max={5000} step={50}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <p className="text-[10px] text-gray-400 mt-0.5">{Math.round(1000 / delay)} fps</p>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600 block mb-1">Width (px)</label>
              <input type="number" value={width} onChange={(e) => setWidth(Number(e.target.value))}
                min={100} max={1200} step={10}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600 block mb-1">Quality (1-30)</label>
              <input type="number" value={quality} onChange={(e) => setQuality(Number(e.target.value))}
                min={1} max={30}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <p className="text-[10px] text-gray-400 mt-0.5">Lower = better quality</p>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600 block mb-1">Loop</label>
              <select value={loop} onChange={(e) => setLoop(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value={0}>Infinite</option>
                <option value={1}>Once</option>
                <option value={3}>3 times</option>
              </select>
            </div>
          </div>

          <button onClick={handleGenerate} disabled={status === "generating"}
            className="w-full py-3 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 disabled:opacity-60 transition-colors flex items-center justify-center gap-2">
            {status === "generating" ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating... {progress}%
              </>
            ) : "Generate GIF"}
          </button>

          {status === "generating" && (
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
            </div>
          )}

          {status === "error" && (
            <p className="text-sm text-red-500 text-center">{errorMsg}</p>
          )}
        </div>
      )}

      {/* Result */}
      {gifUrl && (
        <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4 text-center">
          <h2 className="text-sm font-semibold text-gray-700">Generated GIF</h2>
          <img src={gifUrl} alt="Generated GIF" className="max-w-full max-h-[400px] mx-auto rounded-xl border border-gray-200" />
          <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
            <span>{(gifSize / 1024).toFixed(1)} KB</span>
            <span>{frames.length} frames</span>
            <span>{delay}ms delay</span>
          </div>
          <button onClick={handleDownload}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4" /> Download GIF
          </button>
        </div>
      )}
    </div>
  );
}
