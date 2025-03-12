import { FilterLabels } from "@modules/general/types/filterLabels";
import { MateriaTabla } from "../types/materia.tabla";

export const filtrosMaterias = (datos: MateriaTabla[]) => {
  const setSemestres = new Set<string>();

  datos.forEach((materia) => {
    setSemestres.add(materia.semestre);
  });

  const arregloFiltros: FilterLabels<MateriaTabla>[] = [
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
  ];

  return arregloFiltros;
};
