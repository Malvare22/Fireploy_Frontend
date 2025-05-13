import { Proyecto } from "../types/proyecto.tipo";

/**
 * getProjectTypesMap – A map that associates each project type with a human-readable string.
 * 
 * The project types are:
 * - "S" -> "Dos Capas" (Two Layers)
 * - "M" -> "Monolito" (Monolithic)
 * 
 * @returns {Map<Proyecto["tipo"], string>} A Map where each key is a project type and the value is the corresponding human-readable string.
 */
export const getProjectTypesMap: Map<Proyecto["tipo"], string> = new Map([
  ["S", "Dos Capas"],
  ["M", "Monolito"],
]);

