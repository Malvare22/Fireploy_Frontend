/**
 * KeysOfRepository – Defines the valid string keys that identify types of repositories.
 * 
 * This type is used to restrict values to one of the following options:
 * 
 * - `"backend"`: Refers to a backend repository.
 * - `"frontend"`: Refers to a frontend repository.
 * - `"integrado"`: Refers to an integrated (full-stack or combined) repository.
 * 
 * Useful for enforcing consistency when referencing repository categories across the application.
 */
export type KeysOfRepository = "backend" | "frontend" | "integrado";
