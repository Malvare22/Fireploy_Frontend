import { EstadoMateria } from "../types/materia.estado";

const estadoMateriaMapData: Record<EstadoMateria, string> = {
  A: 'Activo',
  I: 'Inactivo'
} as const;

export const obtenerEstadoMateria = new Map(
  Object.entries(estadoMateriaMapData) as [EstadoMateria, string][]
);

export const listaSemestresMaterias = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"] as const;
