import { TipoBaseDeDatos } from "./baseDeDatos.tipo";

export type BaseDeDatosProyecto = {
    id: number,
    usuario: string,
    url: string,
    contrasenia: string,
    tipo: TipoBaseDeDatos
};