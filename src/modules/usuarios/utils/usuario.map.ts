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

export const obtenerEstado = new Map(
  Object.entries(estadoUsuarioMapData) as [EstadoUsuario, string][]
);

export type TiposUsuarioStringCompleto = 'Administrador' | 'Docente' | 'Estudiante';

const tiposUsuarioMapData: Record<TiposUsuario, TiposUsuarioStringCompleto> = {
  E: "Estudiante",
  A: "Administrador",
  D: "Docente",
} as const;

const tiposLetraUsuarioMapData: Record<TiposUsuarioStringCompleto, TiposUsuario> = {
  Administrador: 'A',
  Docente: 'D',
  Estudiante: 'E',
} as const;


export const obtenerTiposUsuario = new Map(
  Object.entries(tiposUsuarioMapData) as [TiposUsuario, string][]
);

export const obtenerLetraTiposUsuario = new Map(
  Object.entries(tiposLetraUsuarioMapData) as [TiposUsuarioStringCompleto, TiposUsuario][]
);
