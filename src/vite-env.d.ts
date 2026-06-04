/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_INSTAGRAM_ACCESS_TOKEN?: string;
  readonly VITE_INSTAGRAM_USERNAME?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
