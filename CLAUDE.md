# FreeAIKit — Claude Code 项目指令

> 本文件是 Claude Code 的自动上下文。每次新开窗口会自动加载。
> 最后更新: 2026-03-16

---

## 一、项目定位

FreeAIKit (https://freeaikit.app) 是一个 **AI工具聚合站**，所有工具在浏览器端运行，不上传文件到服务器。
目标：通过SEO获取自然流量 → 广告分成 + 邮件列表 → 变现。
属于"AI编程出海"赛道B（AI工具站矩阵），详见 MEMORY.md。

---

## 二、技术栈（不可更改）

| 项 | 值 | 注意 |
|----|-----|------|
| 框架 | Next.js 16 + React 19 | `output: "export"` 纯静态 |
| 样式 | Tailwind CSS 4 | 深蓝色主题，**禁止紫色AI渐变** |
| 图标 | lucide-react | — |
| WASM | asyncWebAssembly via webpack | **必须 `--webpack` flag** |
| 托管 | Cloudflare Pages | 免费额度，自定义域名 |
| 域名 | freeaikit.app | Cloudflare DNS |
| Git | GitHub: Rambo-z/freeaikit | master 分支 |

---

## 三、已上线工具

1. **AI Background Remover** (`/bg-remover`) — @imgly/background-removal (ONNX WASM)
2. **Image Compressor** (`/image-compress`) — MozJPEG + libwebp + libimagequant/UPNG (WASM)
   - PNG压缩用 pngquant 级别色彩量化，60-80% 压缩率
   - 批量处理、质量滑块、格式转换、原始文件保护

---

## 四、开发规则（必须遵守）

### 4.1 流程
- **先讨论再编码** — 分析需求 → 讨论方案 → 确认后执行。不要直接开干
- **技术选型不能偷懒** — 必须研究竞品技术栈，选行业标准方案。不能用"能跑就行"的糊弄方案
- **每个工具必须达到竞品水平** — 对标 TinyPNG / remove.bg / iLovePDF 等行业标杆

### 4.2 新工具开发清单
每开发一个新工具，按此顺序：
1. 研究竞品（至少3个），确认技术方案能达到竞品效果
2. 创建 `src/app/<tool-name>/page.tsx`（SEO metadata）
3. 创建 `src/app/<tool-name>/<Tool>Client.tsx`（"use client" 组件）
4. 首页 `page.tsx` 添加工具卡片
5. `layout.tsx` Header nav 添加链接
6. `public/sitemap.xml` 添加 URL
7. 本地测试：用真实文件测试，确保效果达标
8. Build + Deploy + 验证生产环境

### 4.3 代码规范
- 所有工具页用 `"use client"` 组件 + 静态 `page.tsx`（SEO metadata）
- WASM 库用 dynamic import（`await import("@jsquash/jpeg")`）
- 压缩/处理后必须检查：如果结果比原始更差，保留原始文件
- UI 状态机要完整：pending → processing → done/error，重新处理时必须重置状态

---

## 五、构建与部署（关键！容易踩坑）

### Dev Server
```bash
npx next dev --port 3099 --webpack
```

### Build
```bash
npx next build --webpack
```

### Deploy
```bash
npx wrangler pages deploy out --project-name=freeaikit --commit-dirty=true --branch=main
```

### ⚠️ 三个必须
1. **必须加 `--webpack`** — Turbopack 不支持 WASM，不加会报错
2. **必须加 `--branch=main`** — 不加会部署到 Preview，自定义域名不更新！
3. **部署后必须验证** — 用 `wrangler pages deployment list` 确认 Environment = Production

### next.config.ts 关键配置
```typescript
{
  output: "export",
  images: { unoptimized: true },
  turbopack: {},  // 必须存在，即使不用
  webpack: (config) => {
    config.experiments = { ...config.experiments, asyncWebAssembly: true };
    return config;
  },
}
```

---

## 六、已踩过的坑（绝不允许重犯）

| # | 坑 | 后果 | 正确做法 |
|---|-----|------|---------|
| 1 | wrangler deploy 不加 `--branch=main` | 部署到 Preview，自定义域名不更新，6次部署才发现 | 永远加 `--branch=main` |
| 2 | Canvas API 压缩 PNG | quality 参数对 PNG 无效，文件反而变大 | 用 libimagequant + UPNG 做色彩量化 |
| 3 | 选 OxiPNG 做 PNG 压缩 | 只有无损优化 10-30%，远不及竞品 | 用 libimagequant（pngquant级，60-80%） |
| 4 | 不加 `--webpack` flag | Turbopack 报错，WASM 加载失败 | dev/build/launch.json 全加 `--webpack` |
| 5 | next.config.ts 没有 `turbopack: {}` | Next.js 报错 | 即使不用也要保留空对象 |
| 6 | 重新处理时不重置状态 | "Compress All" 按钮无反应 | processAll 开头把所有 status 重置为 pending |
| 7 | 不检查压缩后文件大小 | 显示 NaN、负数 savings | compressed >= original 时保留原始，UI 显示"already optimal" |
| 8 | 信任 NPM 包 README | API 调用失败（函数不存在） | 直接看 .d.ts 类型文件或源码 |

---

## 七、待开发路线图

### 待修复（优先）
- [ ] page.tsx "How Does Image Compression Work?" 文案仍写 Canvas API → 改为 WASM 描述
- [ ] 移动端无汉堡菜单
- [ ] Stats 硬编码假数据

### 下一批工具
1. **PDF Compressor** — 用户明确需求（PDF太大上传受限），pdf-lib.js 或 WASM 方案
2. **Image to SVG** — potrace.js / imagetracerjs
3. **Image Format Converter** — 利用已有 WASM 引擎

### 长期
- AI Image Upscaler / QR Code Art / PDF Chat / Color Palette / Text Rewriter

---

## 八、文件索引

| 文件 | 作用 |
|------|------|
| `src/app/layout.tsx` | 全局 Layout（Header/Footer） |
| `src/app/page.tsx` | 首页（工具卡片列表） |
| `src/app/image-compress/ImageCompressClient.tsx` | 图片压缩核心（WASM引擎） |
| `src/app/bg-remover/BgRemoverClient.tsx` | 背景移除核心 |
| `next.config.ts` | 构建配置（WASM/静态导出） |
| `.claude/launch.json` | Dev Server 配置 |
| `public/robots.txt` | SEO |
| `public/sitemap.xml` | SEO |

---

## 九、相关记忆文件

- `memory/freeaikit-status.md` — 部署状态/基础设施/已完成/待做
- `memory/freeaikit-tool-roadmap.md` — 工具路线图+技术方案
- `memory/dev-lessons.md` — 所有踩坑记录
- `memory/MEMORY.md` — 全局记忆索引
