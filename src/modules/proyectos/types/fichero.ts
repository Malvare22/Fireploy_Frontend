/**
 * Fichero type – represents a file to be uploaded.
 * 
 * This type is used to handle files on the client side before they are uploaded
 * to a server or API. It includes an optional identifier, a file name, and the actual file content.
 * 
 * @typedef
 * 
 * @property {number} [id] - Optional unique identifier of the file.
 * @property {string} nombre - Name of the file.
 * @property {File | null} contenido - File content represented as a JavaScript File object or null.
 * 
 * @example
 * const file: Fichero = {
 *   nombre: "report.pdf",
 *   contenido: selectedFile
 * };
 */
export type Fichero = {
  id?: number
  nombre: string
  contenido: File | null
}

/**
 * FicheroService type – represents a file stored or processed by the backend service.
 * 
 * This type is used to describe the file once it has been uploaded and handled by the backend,
 * where the content is typically stored as a string (e.g., base64 or raw text).
 * 
 * @typedef
 * 
 * @property {number} [id] - Optional unique identifier of the file.
 * @property {string} nombre - Name of the file.
 * @property {string} contenido - File content represented as a string.
 * 
 * @example
 * const serviceFile: FicheroService = {
 *   id: 1,
 *   nombre: "report.pdf",
 *   contenido: "UEsDBBQACAgI..."
 * };
 */
export type FicheroService = {
  id?: number
  nombre: string
  contenido: string
}