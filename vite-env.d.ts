/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BCRYPT_SALT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
