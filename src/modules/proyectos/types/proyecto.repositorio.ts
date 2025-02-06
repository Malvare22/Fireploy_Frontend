import { TecnologiaRepositorio } from "./repositorio.tecnologia";
import { TipoRepositorio } from "./repositorio.tipo";

export type RepositorioProyecto = {
    id: number,
    url: string,
    tipo: TipoRepositorio,
    versionDeTecnologia: string,
    variablesDeEntorno: string,
    tecnologia: TecnologiaRepositorio
};