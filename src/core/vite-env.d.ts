/// <reference types="vite/client" />

/**
 * Interface defining the environment variables used in the project.
 * These variables are injected at build time by Vite.
 *
 * @interface ImportMetaEnv
 */
interface ImportMetaEnv {
  /**
   * Backend URL used in the application.
   * This variable is defined in the `.env` file and accessible in client-side code.
   *
   * @type {string}
   */
  readonly VITE_URL_BACKEND: string;

  /**
   * Google OAuth client ID used for authentication.
   * Also defined in the `.env` file and available at runtime.
   *
   * @type {string}
   */
  readonly VITE_ID_GOOGLE_CLIENT: string;
}

/**
 * Interface extending `ImportMeta` to include the custom environment variables.
 *
 * @interface ImportMeta
 */
interface ImportMeta {
  /**
   * Object containing environment variables defined in `ImportMetaEnv`.
   *
   * @type {ImportMetaEnv}
   */
  readonly env: ImportMetaEnv;
}
