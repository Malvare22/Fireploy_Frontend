import { Proyecto } from "../types/proyecto.tipo";

export const getProjectTypesMap: Map<Proyecto["tipo"], string> = new Map([
  ["D", "Dos Capas"],
  ["M", "Monolito"],
]);

