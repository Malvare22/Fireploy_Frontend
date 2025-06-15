import { KeysOfRepository } from "../types/keysOfRepository";
import { LogFile } from "../types/logFile";
import { LogFileService } from "../types/logFile.service";

/**
 * Transforms a `LogFileService` object (from backend or API) into a structured `LogFile` object.
 *
 * Assigns the repository layer (`frontend`, `backend`, or `integrado`) to the log and maps
 * the backend fields to the frontend structure.
 *
 * @param {LogFileService} x - The raw log file data received from the backend.
 * @param {KeysOfRepository} layer - The repository layer (e.g., "frontend", "backend", "integrado") where the log belongs.
 * @returns {LogFile} A structured log object ready for use in the UI or logging systems.
 */
export function adaptLog(x: LogFileService, layer: KeysOfRepository): LogFile {
  return {
    fecha: x.fecha_registro,
    id: x.id,
    instancia: layer,
    log: x.log,
  };
}
