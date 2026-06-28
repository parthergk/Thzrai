// global.d.ts
interface EyeDropperResult {
  sRGBHex: string;
}

declare class EyeDropper {
  open(): Promise<EyeDropperResult>;
}

interface Window {
  EyeDropper: typeof EyeDropper;
}
