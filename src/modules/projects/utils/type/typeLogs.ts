export interface TypeLogs {
  mensaje: string;
  instancia: "frontend" | "backend";
  fecha: string; // ISO 8601 format
  detalles: string;
}
