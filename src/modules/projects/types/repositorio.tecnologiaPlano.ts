import { TipoTecnologia } from "./tecnologia.tipo";

export type TecnologiaRepositorioPlano = {
    nombre: string,
    versiones: string,
    logo: string,
    tipo: TipoTecnologia
};