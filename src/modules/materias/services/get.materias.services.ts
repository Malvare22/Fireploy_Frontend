import { getData } from "@core/services";
import { MateriaService } from "../types/materia.service";
import { getCursoByMateriaId } from "./get.curso";

export const getMateriasService = async (token: string) => {
  const response = await getData<MateriaService[]>(
    `/materia`,
    {},
    {
      sessiontoken: token,
    }
  );

  return response;
};
export const getAllAcademicInformation = async (token: string) => {
  const materias = await getMateriasService(token);

  //string, string
  const selectMaterias = new Map<number, string>();
  const getCursosByMateria = new Map<number, string[]>();
  const selectCurso = new Map<string, string>();
  const getSeccionByCurso = new Map<string, number[]>();
  const selectSeccion = new Map<number, string>();

  for (const materia of materias) {
    const cursos = await getCursoByMateriaId(token, materia.id.toString());
    getCursosByMateria.set(
      materia.id,
      cursos.map((curso) => curso.id)
    );
    selectMaterias.set(materia.id, materia.nombre);
    cursos.forEach((curso) => {
      selectCurso.set(curso.id, curso.grupo);
      getSeccionByCurso.set(
        curso.id,
        curso.secciones.map((seccion) => seccion.id)
      );
      curso.secciones.forEach((seccion) => {
        selectSeccion.set(seccion.id, seccion.titulo);
      });
    });
  }

  return {
    selectMaterias,
    selectCurso,
    selectSeccion,
    getSeccionByCurso,
    getCursosByMateria
  };
};
