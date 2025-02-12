import { FilterLabels } from "@modules/general/types/filterLabels";
import { Materia } from "../types/materia";

export const filtrosMaterias = (datos: Materia[]) => {
  const setSemestres = new Set<string>();

  datos.forEach((materia) => {
    setSemestres.add(materia.semestre);
  });

  const setCursos = new Set<number>();

  datos.forEach((materia) => {
    setCursos.add(materia.cantidadDeCursos);
  });

  const arregloFiltros: FilterLabels<Materia>[] = [
    {
      key: "semestre",
      text: "Semestre",
      labels: Array.from(setSemestres).map((valor) => {
        return {
          value: valor,
          text: valor,
        };
      }),
    },
    {
      key: "cantidadDeCursos",
      text: "Cantidad de Cursos",
      labels: Array.from(setCursos).map((valor) => {
        return {
          value: valor,
          text: valor.toString(),
        };
      }),
    },
  ];

  return arregloFiltros;
};
