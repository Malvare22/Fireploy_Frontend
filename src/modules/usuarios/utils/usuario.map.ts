import { EstadoUsuario, SexoUsuario, TiposUsuario } from "../types/usuario";

const genderMapData: Record<SexoUsuario, string> = {
  M: "Masculino",
  F: "Femenino",
  O: "Otro",
} as const;

export const getGender = new Map(
  Object.entries(genderMapData) as [SexoUsuario, string][]
);

export const getGenderArray = Object.entries(genderMapData) as [
  SexoUsuario,
  string
][];

const userStatusMapData: Record<EstadoUsuario, string> = {
  A: "Activo",
  I: "Inactivo",
} as const;

export const getUserStatus = new Map(
  Object.entries(userStatusMapData) as [EstadoUsuario, string][]
);

export type UserTypeFullString = "Administrador" | "Docente" | "Estudiante";

const userTypeMapData: Record<TiposUsuario, UserTypeFullString> = {
  E: "Estudiante",
  A: "Administrador",
  D: "Docente",
} as const;

const userLetterTypeMapData: Record<UserTypeFullString, TiposUsuario> = {
  Administrador: "A",
  Docente: "D",
  Estudiante: "E",
} as const;

export const getUserTypes = new Map(
  Object.entries(userTypeMapData) as [TiposUsuario, string][]
);

export const getUserLetterTypes = new Map(
  Object.entries(userLetterTypeMapData) as [UserTypeFullString, TiposUsuario][]
);

export const getUserTypesArray = Object.entries(userTypeMapData) as [
  TiposUsuario,
  string
][];

export const getUserLetterTypesArray = Object.entries(
  userLetterTypeMapData
) as [UserTypeFullString, TiposUsuario][];
