declare module "gif.js" {
  interface GIFOptions {
    workers?: number;
    quality?: number;
    width?: number | null;
    height?: number | null;
    workerScript?: string;
    repeat?: number;
    transparent?: string | null;
    background?: string;
    debug?: boolean;
    dither?: boolean;
  }

  interface FrameOptions {
    delay?: number;
    copy?: boolean;
    transparent?: string | null;
  }

  class GIF {
    constructor(options?: GIFOptions);
    addFrame(
      image: CanvasRenderingContext2D | ImageData | HTMLCanvasElement | HTMLImageElement,
      options?: FrameOptions
    ): void;
    on(event: "start", callback: () => void): void;
    on(event: "progress", callback: (progress: number) => void): void;
    on(event: "finished", callback: (blob: Blob, data: Uint8Array) => void): void;
    on(event: "abort", callback: () => void): void;
    render(): void;
    abort(): void;
    running: boolean;
  }

  export default GIF;
}
