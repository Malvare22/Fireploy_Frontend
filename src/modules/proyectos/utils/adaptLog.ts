import { KeysOfRepository } from "../types/keysOfRepository";
import { LogFile } from "../types/logFile";
import { LogFileService } from "../types/logFile.service";

export function adaptLog(x: LogFileService, layer: KeysOfRepository): LogFile {
  return {
    fecha: x.fecha_registro,
    id: x.id,
    instancia: layer,
    log: x.log,
  };
}
