import { TecnologiasPrueba } from "../test/datos/tecnologias.prueba";
import { TecnologiaRepositorio } from "../types/repositorio.tecnologia";
import { TipoTecnologia } from "../types/tecnologia.tipo";

export const obtenerIndiceTipoTecnologia: Record<TipoTecnologia, number> = {
  I: 0,
  B: 1,
  F: 2,
};

export const separarTecnologias = () => {

  const matrix: TecnologiaRepositorio[][] = [[], [], []];

  TecnologiasPrueba.forEach((tec) => {
    matrix[obtenerIndiceTipoTecnologia[tec.tipo]].push(tec);
  });

  return matrix;
};

export const obtenerOpcionesSelectTecnologia = () => {
  const conjuntos: Map<TipoTecnologia, {texto: string, value: string}[]> = new Map();

  TecnologiasPrueba.forEach((tec) => {
    conjuntos.set(
      tec.tipo,
      tec.versiones.map((version) => {
        return {texto: `${tec.nombre} ${version}`, value: `${tec.nombre} ${version}`};
      })
    );
  });

  return conjuntos;
};
