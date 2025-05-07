import { ProyectoService } from "./proyecto.service";

/**
 * Represents a database associated with a project.
 * 
 * This type defines the structure of a database entry, including optional project information,
 * the database's name, password, URL, and its type. It also contains an identifier and a project ID
 * for associating it with a specific project.
 * 
 * @typedef {Object} BaseDeDatos
 * 
 * @property {Object | null} [proyecto] - Optional project details, including the title (`titulo`) and project state (`estado_proyecto`).
 * @property {number} [id] - The unique identifier of the database (optional).
 * @property {number} [proyectoId] - The identifier of the associated project (optional).
 * @property {string} nombre - The name of the database.
 * @property {string} contrasenia - The password for the database.
 * @property {string} [url] - The URL associated with the database (optional).
 * @property {"S" | "N" | "E"} tipo - The type of database, where:
 *   - "S" stands for SQL,
 *   - "N" stands for NoSQL,
 *   - "E" stands for another type (e.g., an embedded database).
 * 
 * @example
 * ```ts
 * const database: BaseDeDatos = {
 *   nombre: "MyDatabase",
 *   contrasenia: "securePassword123",
 *   tipo: "S",
 *   proyecto: { titulo: "Project X", estado_proyecto: "active" },
 *   proyectoId: 101,
 * };
 * ```
 */
export type BaseDeDatos = {
  proyecto?: Pick<ProyectoService, 'titulo' | 'estado_proyecto'> | null;
  id?: number | undefined;
  proyectoId?: number | undefined;
  nombre: string;
  contrasenia: string;
  url?: string,
  tipo: "S" | "N" | "E";
};
