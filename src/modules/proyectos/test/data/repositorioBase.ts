import { TecnologiaRepositorio } from "@modules/proyectos/types/repositorio.tecnologia";
import {
  obtenerIndiceTipoTecnologia,
  separarTecnologias,
} from "@modules/proyectos/utils/separarTecnologias";

export const repositorioBase = (tipo: TecnologiaRepositorio["tipo"]) => {
  const tecnologia = separarTecnologias()
    .at(obtenerIndiceTipoTecnologia[tipo])
    ?.at(0);

  return {
    id: 0,
    url: "",
    tipo: tipo,
    versionDeTecnologia: tecnologia?.versiones.at(0) as string,
    variablesDeEntorno: "",
    tecnologia: tecnologia?.id,
  };
};
