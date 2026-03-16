# FreeAIKit

**Free AI-powered tools that run entirely in your browser.**

Live: [https://freeaikit.app](https://freeaikit.app)

No signup, no upload to server, no watermark. All processing happens locally on your device.

---

## Tools

### 1. AI Background Remover (`/bg-remover`)
Remove image backgrounds with one click using AI.
- **Engine**: [@imgly/background-removal](https://github.com/nicolo-ribaudo/background-removal) (ONNX Runtime, runs in browser)
- Supports JPG, PNG, WebP
- Download as transparent PNG

### 2. Image Compressor (`/image-compress`)
Compress images up to 80% smaller while keeping visual quality. TinyPNG-level PNG compression.
- **Engines** (all WASM, all in-browser):
  - **JPG**: [MozJPEG](https://github.com/nicolo-ribaudo/jSquash) via `@jsquash/jpeg` — industry-standard JPEG encoder
  - **WebP**: [libwebp](https://github.com/nicolo-ribaudo/jSquash) via `@jsquash/webp` — Google's WebP encoder
  - **PNG**: [libimagequant](https://pngquant.org/) via `@panda-ai/imagequant` + [UPNG](https://github.com/nicolo-ribaudo/UPNG.js) — pngquant-level lossy compression (24-bit to 8-bit palette, 256 colors), **60-80% size reduction**
- Batch processing (multiple files at once)
- Quality slider (1-100)
- Format conversion (JPG / PNG / WebP)
- Smart protection: if compressed file is larger than original, keeps the original

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Framework | [Next.js 16](https://nextjs.org/) (Static Export) |
| UI | [React 19](https://react.dev/) + [Tailwind CSS 4](https://tailwindcss.com/) |
| Icons | [Lucide React](https://lucide.dev/) |
| Image Compression | WASM engines (MozJPEG, libwebp, libimagequant, UPNG) |
| Background Removal | @imgly/background-removal (ONNX Runtime WASM) |
| Hosting | [Cloudflare Pages](https://pages.cloudflare.com/) |
| Domain | freeaikit.app (Cloudflare DNS) |

---

## Project Structure

```
src/
  app/
    layout.tsx                  # Root layout (Header + Footer)
    page.tsx                    # Homepage (Hero, tool cards, FAQ)
    globals.css                 # Tailwind imports
    bg-remover/
      page.tsx                  # SEO metadata
      BgRemoverClient.tsx       # AI background removal UI
    image-compress/
      page.tsx                  # SEO metadata
      ImageCompressClient.tsx   # WASM compression engine + UI
    components/
      EmailCapture.tsx          # Email capture component
public/
  robots.txt
  sitemap.xml
next.config.ts                  # Static export + webpack WASM config
package.json
```

---

## Development

### Prerequisites
- Node.js 18+
- npm

### Setup
```bash
git clone https://github.com/youmedear/freeaikit.git
cd freeaikit
npm install
```

### Dev Server
```bash
npx next dev --port 3099 --webpack
```
> **Important**: The `--webpack` flag is required. Next.js 16 defaults to Turbopack which does not support WASM.

### Build
```bash
npx next build --webpack
```
Output goes to `out/` directory (static HTML/CSS/JS + WASM files).

### Deploy to Cloudflare Pages
```bash
npx wrangler pages deploy out --project-name=freeaikit --commit-dirty=true --branch=main
```
> **Critical**: `--branch=main` is required! Without it, deploys go to Preview (not Production), and the custom domain won't update.

---

## Key Configuration

### next.config.ts
```typescript
const nextConfig: NextConfig = {
  output: "export",              // Static export for Cloudflare Pages
  images: { unoptimized: true }, // Required for static export
  turbopack: {},                 // Must be present even if unused
  webpack: (config) => {
    config.experiments = { ...config.experiments, asyncWebAssembly: true };
    return config;
  },
};
```

---

## Pitfalls and Lessons

Real issues encountered during development, documented here to prevent recurrence.

### Cloudflare Pages: Preview vs Production
- Cloudflare Pages ties the **Production** environment to a specific branch (default: `main`).
- If your local branch is `master`, `wrangler pages deploy` creates a **Preview** deployment instead of Production.
- Preview deployments get their own URL (`xxxxx.freeaikit.pages.dev`) but the custom domain (`freeaikit.app`) only serves Production.
- **Always use `--branch=main`** when deploying.
- Debug with: `npx wrangler pages deployment list --project-name=freeaikit` — check the Environment column.

### Next.js 16 + WASM
- Turbopack (default in Next.js 16) does not support `asyncWebAssembly`. Must use `--webpack` flag for `next dev` and `next build`.
- Even when using webpack, the `turbopack: {}` key must exist in `next.config.ts` or Next.js throws an error.

### PNG Compression: Canvas API Does Not Work
- `canvas.toBlob('image/png', quality)` — the `quality` parameter is **ignored** for PNG. PNG is a lossless format, and the Canvas API cannot do lossy PNG compression. Files actually get **larger**.
- The correct approach is **color quantization** via libimagequant (the engine behind pngquant / TinyPNG): reduces 24-bit images to 8-bit palette (256 colors), achieving 60-80% compression with near-identical visual quality.

### NPM Package READMEs Can Be Wrong
- `@panda-ai/imagequant` documents APIs (`WasmImageQuant.create()`, `PNGEncoder`) that don't exist in the published package. Always verify against `.d.ts` type definition files or source code when the documented API fails.

---

## Roadmap

- [ ] PDF Compressor
- [ ] Image to SVG vectorization
- [ ] AI Image Upscaler
- [ ] AI QR Code Art
- [ ] More tools...

---

## License

MIT
