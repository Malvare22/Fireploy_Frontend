import { EstadoUsuario, SexoUsuario, TiposUsuario } from "../types/usuario";


const genderMapData: Record<SexoUsuario, string> = {
  M: "Masculino",
  F: "Femenino",
  O: "Otro",
} as const;

export const getGender = new Map(
  Object.entries(genderMapData) as [SexoUsuario, string][]
);

const userStatusMapData: Record<EstadoUsuario, string> = {
  A: "Activo",
  I: "Inactivo",
} as const;

export const getUserStatus = new Map(
  Object.entries(userStatusMapData) as [EstadoUsuario, string][]
);

export type UserTypeFullString = 'Administrator' | 'Teacher' | 'Student';

const userTypeMapData: Record<TiposUsuario, UserTypeFullString> = {
  E: "Student",
  A: "Administrator",
  D: "Teacher",
} as const;

const userLetterTypeMapData: Record<UserTypeFullString, TiposUsuario> = {
  Administrator: 'A',
  Teacher: 'D',
  Student: 'E',
} as const;

export const getUserTypes = new Map(
  Object.entries(userTypeMapData) as [TiposUsuario, string][]
);

export const getUserLetterTypes = new Map(
  Object.entries(userLetterTypeMapData) as [UserTypeFullString, TiposUsuario][]
);
