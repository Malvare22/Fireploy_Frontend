import { TipoTecnologia } from "./tecnologia.tipo";

export type TecnologiaRepositorio= {
    nombre: string,
    versiones: string[],
    logo: string,
    tipo: TipoTecnologia
};