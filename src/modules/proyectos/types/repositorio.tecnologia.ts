import { TipoTecnologia } from "./tecnologia.tipo";

export type TecnologiaRepositorio= {
    id: number,
    nombre: string,
    versiones: string[],
    logo: string,
    tipo: TipoTecnologia
};