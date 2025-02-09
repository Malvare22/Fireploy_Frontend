import { EstadoUsuario } from "../types/usuario.estado";
import { SexoUsuario } from "../types/usuario.sexo";
import { TiposUsuario } from "../types/usuario.tipos";

const sexoMapData: Record<SexoUsuario, string> = {
  M: "Masculino",
  F: "Femenino",
  O: "Otro",
} as const;

export const obtenerSexo = new Map(
  Object.entries(sexoMapData) as [SexoUsuario, string][]
);

const estadoUsuarioMapData: Record<EstadoUsuario, string> = {
  A: "Activo",
  I: "Inactivo",
} as const;

export const obtenerEstadoUsuario = new Map(
  Object.entries(estadoUsuarioMapData) as [EstadoUsuario, string][]
);

const tiposUsuarioMapData: Record<TiposUsuario, string> = {
  A: "Administrador",
  D: "Docente",
  E: "Estudiante",
} as const;

export const obtenerTiposUsuario = new Map(
  Object.entries(tiposUsuarioMapData) as [TiposUsuario, string][]
);
