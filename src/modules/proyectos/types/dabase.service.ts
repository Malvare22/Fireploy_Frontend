import { BaseDeDatos } from "./baseDeDatos";

/**
 * Represents a partial database service object.
 * 
 * This type is a partial version of the `BaseDeDatos` type, meaning it can include any subset
 * of the properties defined in `BaseDeDatos`. The `Partial` utility type makes all properties optional,
 * so any combination of `BaseDeDatos` fields can be used.
 * 
 * @typedef {Object} DataBaseService
 * 
 * @property {string} [nombre] - The name of the database (optional).
 * @property {string} [contrasenia] - The password for the database (optional).
 * @property {string} [url] - The URL associated with the database (optional).
 * @property {"S" | "N" | "E"} [tipo] - The type of database (optional), where:
 *   - "S" stands for SQL,
 *   - "N" stands for NoSQL,
 *   - "E" stands for another type.
 * @property {number} [id] - The unique identifier of the database (optional).
 * @property {number} [proyectoId] - The project ID associated with the database (optional).
 * @property {Object | null} [proyecto] - The project details, including `titulo` and `estado_proyecto` (optional).
 * 
 * @example
 * ```ts
 * const partialDatabase: DataBaseService = {
 *   nombre: "PartialDB",
 *   tipo: "S",
 * };
 * ```
 */
export type DataBaseService = Partial<BaseDeDatos>