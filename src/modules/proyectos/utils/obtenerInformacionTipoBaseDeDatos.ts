import { imagenes } from "@modules/general/enums/imagenes";
import { TipoBaseDeDatos } from "../types/baseDeDatos.tipo";

interface Output {
  nombre: string;
  imagen: string;
}

export const obtenerInformacionTipoBaseDeDatos: Record<
  TipoBaseDeDatos,
  Output
> = {
  N: {
    nombre: "MongoBD",
    imagen: imagenes["tecnologias"]["baseDeDatos"]["mongoDB"],
  },
  S: {
    nombre: "MySQL",
    imagen: imagenes["tecnologias"]["baseDeDatos"]["mySQL"],
  },
};
