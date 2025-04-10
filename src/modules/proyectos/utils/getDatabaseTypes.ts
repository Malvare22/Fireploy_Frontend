import { BaseDeDatos } from "../types/baseDeDatos";

const databaseTypes: Record<BaseDeDatos["tipo"], string> = {
  N: "NoSQL",
  S: "SQL",
  E: "No asignada"
} as const;

export const getDatabaseTypesArray = Object.entries(databaseTypes) as [
  BaseDeDatos["tipo"],
  string
][];

export const getDatabaseTypesMap = new Map(
  Object.entries(databaseTypes) as [BaseDeDatos["tipo"], string][]
);
