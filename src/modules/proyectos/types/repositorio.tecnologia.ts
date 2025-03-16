import { Imagenes } from "@modules/general/components/RoundedIcon/utils";
import { TipoTecnologia } from "./tecnologia.tipo";

export type TecnologiaRepositorio= {
    id: number,
    nombre: string,
    versiones: string[],
    logo: keyof typeof Imagenes,
    tipo: TipoTecnologia
};