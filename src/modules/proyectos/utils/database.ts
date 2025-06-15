import { BaseDeDatos } from "../types/baseDeDatos";

/**
 * `getDataBaseTypesMap` – A map that associates each database type key with its human-readable name.
 *
 * Types included:
 * - "S" → SQL
 * - "N" → MongoDB
 * - "E" → No database selected
 * - "P" → PostgreSQL
 * - "M" → MariaDB
 *
 * This map is useful for translating raw type values into labels for display purposes in UIs or reports.
 */
export const getDataBaseTypesMap: Map<BaseDeDatos["tipo"], string> = new Map([
  ["E", "Sin base de datos"],
  ["S", "MySQL"],
  ['P', 'PostgreSQL'],
  ['M', 'MariaDB'],
  ["N", "MongoDB"]
]);

/**
 * `getDataBaseTypesArray` – An array of tuples, each containing a database type key and its corresponding label.
 *
 * Useful for building select menus, dropdowns, or filter components where users choose a database type.
 *
 * Types included:
 * - "S" → SQL
 * - "N" → MongoDB
 * - "E" → No database selected
 * - "P" → PostgreSQL
 * - "M" → MariaDB
 */
export const getDataBaseTypesArray: [BaseDeDatos["tipo"], string][] = [
  ["E", "Sin base de datos"],
  ["S", "MySQL"],
  ['P', 'PostgreSQL'],
  ['M', 'MariaDB'],
  ["N", "MongoDB"]
];

