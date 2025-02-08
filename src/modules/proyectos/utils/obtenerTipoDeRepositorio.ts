import { TipoRepositorio } from "../types/repositorio.tipo";

export const obtenerTipoDeRepositorio: Record<TipoRepositorio, string> = {
  B: "Backend",
  F: "Frontend",
  I: "Monolito",
};
