/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_GA4_ID?: string;
  readonly PUBLIC_META_PIXEL_ID?: string;
  readonly PUBLIC_INTAKE_PHONE?: string;
  readonly PUBLIC_CONSULT_URL?: string;
  readonly PUBLIC_SHOW_PARENT?: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  fbq?: (...args: any[]) => void;
  gtag?: (...args: any[]) => void;
  dataLayer?: any[];
}
