/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APITUBE_API_KEY?: string;
  readonly VITE_NEWSAPI_KEY?: string;
  readonly VITE_CURRENTAPI_KEY?: string;
  readonly VITE_POLYGON_API_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
