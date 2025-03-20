import { BaseDeDatosProyecto } from "../types/proyecto.tipo";

const databaseTypes: Record<BaseDeDatosProyecto['tipo'], string> = {
  N: 'NoSQL',
  S: 'SQL'
} as const;

export const getDatabaseTypesArray = Object.entries(databaseTypes) as [
  BaseDeDatosProyecto['tipo'],
  string
][];