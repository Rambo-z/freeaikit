declare module "@jspawn/ghostscript-wasm/gs.mjs" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const createModule: (options?: Record<string, unknown>) => Promise<any>;
  export default createModule;
}
