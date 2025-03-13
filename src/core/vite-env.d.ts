/// <reference types="vite/client" />

/**
 * Interfaz que define las variables de entorno utilizadas en el proyecto.
 * Estas variables son inyectadas en tiempo de compilación por Vite.
 */
interface ImportMetaEnv {
  /**
   * URL del backend utilizada en la aplicación.
   * Esta variable se define en el archivo `.env` y es accesible en el código cliente.
   */
  readonly VITE_URL_BACKEND: string;
}

/**
 * Interfaz que extiende `ImportMeta` para incluir las variables de entorno personalizadas.
 */
interface ImportMeta {
  /**
   * Objeto que contiene las variables de entorno definidas en `ImportMetaEnv`.
   */
  readonly env: ImportMetaEnv;
}
