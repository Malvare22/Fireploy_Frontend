import { Proyecto } from "../types/proyecto.tipo";

/**
 * getProjectTypesMap – A map that associates each project type with a human-readable string.
 * 
 * The project types are:
 * - "S" -> "Software Dos Capas" (Two Layers)
 * - "M" -> "Software completo" (Monolithic)
 * 
 * @returns {Map<Proyecto["tipo"], string>} A Map where each key is a project type and the value is the corresponding human-readable string.
 */
export const getProjectTypesMap: Map<Proyecto["tipo"], string> = new Map([
  ["S", "Software Dos Capas"],
  ["M", "Software Completo"],
]);

