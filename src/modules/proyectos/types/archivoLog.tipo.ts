export interface ArchivoLog {
    mensaje: string;
    instancia: "frontend" | "backend";
    fecha: string; // ISO 8601 format
    detalles: string;
  }
