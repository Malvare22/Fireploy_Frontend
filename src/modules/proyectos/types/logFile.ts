import { KeysOfRepository } from "./keysOfRepository";

/**
 * LogFile type – Represents the structure of a log file with contextual repository type.
 * 
 * This type includes metadata and content for a specific log entry, along with the type of repository it belongs to.
 * 
 * - `id`: A numeric identifier for the log entry.
 * - `fecha`: A string indicating the timestamp when the log was created.
 * - `log`: A string containing the log content or message.
 * - `instancia`: A string representing the repository type context, restricted to one of the following:
 *   - `"backend"` – Indicates the log is related to the backend repository.
 *   - `"frontend"` – Indicates the log is related to the frontend repository.
 *   - `"integrado"` – Indicates the log is related to the integrated repository.
 * 
 * Used to display logs filtered or grouped by their associated repository type.
 */
export type LogFile = {
    id: number,
    fecha: string,
    log: string;
    instancia: KeysOfRepository;
} 