import { TipoBaseDeDatos } from "../types/baseDeDatos.tipo";

const baseDatosTipoMapData: Record<TipoBaseDeDatos, string> = {
  N: 'NoSQL',
  S: 'SQL'
} as const;

export const obtenerTipoBaseDatos = new Map(
  Object.entries(baseDatosTipoMapData) as [TipoBaseDeDatos, string][]
);