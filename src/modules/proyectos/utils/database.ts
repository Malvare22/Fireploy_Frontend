import { BaseDeDatos } from "../types/baseDeDatos";

/**
 * getDataBaseTypesMap – A Map that associates each database type with a human-readable string.
 * 
 * Types:
 * - "S" -> "SQL"
 * - "N" -> "MongoDB"
 * - "E" -> "No Seleccionado"
 */
export const getDataBaseTypesMap: Map<BaseDeDatos["tipo"], string> = new Map([
  ["S", "SQL"],
  ["N", "MongoDB"],
  ["E", "Sin base de datos"],
  ['P', 'PostgreSQL'],
  ['M', 'MariaDB']
]);

/**
 * getDataBaseTypesArray – An array of tuples where each tuple associates a database type with its human-readable string.
 * 
 * Types:
 * - "S" -> "SQL"
 * - "N" -> "MongoDB"
 * - "E" -> "No Seleccionado"
 */
export const getDataBaseTypesArray: [BaseDeDatos["tipo"], string][] = [
  ["S", "SQL"],
  ["N", "MongoDB"],
  ["E", "Sin base de datos"],
  ['P', 'PostgreSQL'],
  ['M', 'MariaDB']
];

