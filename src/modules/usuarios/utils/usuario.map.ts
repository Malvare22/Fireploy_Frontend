import { EstadoUsuario, SexoUsuario, TiposUsuario } from "../types/usuario";

/**
 * A mapping between SexoUsuario codes and their full string labels.
 */
const genderMapData: Record<SexoUsuario, string> = {
  M: "Masculino",
  F: "Femenino",
  O: "Otro",
} as const;

/**
 * A Map object for retrieving gender descriptions by SexoUsuario key.
 */
export const getGender = new Map(Object.entries(genderMapData) as [SexoUsuario, string][]);

/**
 * An array of tuples representing all possible gender options.
 */
export const getGenderArray = Object.entries(genderMapData) as [SexoUsuario, string][];

/**
 * A mapping between EstadoUsuario codes and their full status descriptions.
 */
const userStatusMapData: Record<EstadoUsuario, string> = {
  A: "Activo",
  I: "Inactivo",
} as const;

/**
 * A Map object for retrieving user status descriptions by EstadoUsuario key.
 */
export const getUserStatus = new Map(
  Object.entries(userStatusMapData) as [EstadoUsuario, string][]
);

/**
 * Defines full user type names.
 */
export type UserTypeFullString = "Administrador" | "Docente" | "Estudiante";

/**
 * A mapping between user type codes and their full descriptions.
 */
const userTypeMapData: Record<TiposUsuario, UserTypeFullString> = {
  E: "Estudiante",
  A: "Administrador",
  D: "Docente",
} as const;

/**
 * A reverse mapping from full user type descriptions to their corresponding codes.
 */
const userLetterTypeMapData: Record<UserTypeFullString, TiposUsuario> = {
  Administrador: "A",
  Docente: "D",
  Estudiante: "E",
} as const;

/**
 * A Map object to get full user type description by code.
 */
export const getUserTypes = new Map(Object.entries(userTypeMapData) as [TiposUsuario, string][]);

/**
 * A Map object to get user type code by full description.
 */
export const getUserLetterTypes = new Map(
  Object.entries(userLetterTypeMapData) as [UserTypeFullString, TiposUsuario][]
);

/**
 * An array of user type code-description pairs.
 */
export const getUserTypesArray = Object.entries(userTypeMapData) as [TiposUsuario, string][];

/**
 * An array of full user type description-code pairs.
 */
export const getUserLetterTypesArray = Object.entries(userLetterTypeMapData) as [
  UserTypeFullString,
  TiposUsuario,
][];
