import { getData } from "@core/services";
import { MateriaService } from "../types/materia.service";
import { getCursos } from "./get.curso";
import { AccountInformation } from "@modules/general/context/accountContext";
import { CursoService } from "../types/curso.service";

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

export const getAllAcademicInformation = async (
  token: string,
  userType: AccountInformation["tipo"],
  id: AccountInformation["id"]
) => {
  let cursos: CursoService[] = [];
  switch (userType) {
    case "A":
      cursos = await getCursos(token, {});
      break;

    case "D":
      cursos = await getCursos(token, { docente: id });

      break;

    case "E":
      cursos = await getCursos(token, { estudiantes: id });
      break;
  }

  //string, string
  const selectMaterias = new Map<number, string>();
  const getCursosByMateria = new Map<number, string[]>();
  const selectCurso = new Map<string, string>();
  const getSeccionByCurso = new Map<string, number[]>();
  const selectSeccion = new Map<number, string>();

  for (const curso of cursos) {
    let currentCursos = getCursosByMateria.get(curso.materia.id) ?? [];

    if (!getCursosByMateria.has(curso.materia.id)) {
      selectMaterias.set(curso.materia.id, curso.materia.nombre);
    }

    getCursosByMateria.set(curso.materia.id, [...currentCursos, curso.id]);

    selectCurso.set(curso.id, curso.grupo);

    getSeccionByCurso.set(
      curso.id,
      curso.secciones.map((seccion) => seccion.id)
    );

    curso.secciones.forEach((seccion) => {
      selectSeccion.set(seccion.id, seccion.titulo);
    });
    
  }

  return {
    selectMaterias,
    selectCurso,
    selectSeccion,
    getSeccionByCurso,
    getCursosByMateria,
  };
};
