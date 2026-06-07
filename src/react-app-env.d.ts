/// <reference types="react-scripts" />
declare module "*.css";
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_API_FOOTBALL_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}