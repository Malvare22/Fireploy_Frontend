import { TipoBaseDeDatos } from "../types/baseDeDatos.tipo";

interface Output {
  nombre: string;
}

export const obtenerInformacionTipoBaseDeDatos: Record<
  TipoBaseDeDatos,
  Output
> = {
  N: {
    nombre: "MongoBD",
  },
  S: {
    nombre: "MySQL",
  },
};
