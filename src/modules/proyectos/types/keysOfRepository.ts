import { Repositorio } from "./repositorio";

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

/**
 * getKeyOfRepository function – Maps a repository type code to its corresponding key.
 * 
 * This function receives a repository type code (usually a single character such as 'B', 'F', or 'I')
 * and returns a descriptive string key used within the application to categorize repositories.
 * 
 * Valid codes and their corresponding keys:
 * - 'B' → 'backend'
 * - 'F' → 'frontend'
 * - 'I' → 'integrado'
 * 
 * This function helps normalize repository type values for consistent use throughout the system.
 * 
 * @param k - A single-character code representing the repository type.
 * 
 * @returns A string key identifying the repository category: "backend", "frontend", or "integrado".
 * 
 * @example
 * const key = getKeyOfRepository('F');
 * console.log(key); // Outputs: "frontend"
 */
export function getKeyOfRepository(k: Repositorio['tipo']): KeysOfRepository {
    switch (k) {
        case 'B':

            return 'backend';

        case 'F':

            return 'frontend';
        case 'I':

            return 'integrado';
    }
}
