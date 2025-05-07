import { getData } from "@core/services";
import { MateriaService } from "../types/materia.service";
import { getCursos } from "./get.curso";
import { AccountInformation } from "@modules/general/context/accountContext";
import { CursoService } from "../types/curso.service";

/**
 * Fetches all subjects ("materias") from the backend.
 *
 * This function makes a GET request to the `/materia` endpoint using
 * an authentication token to retrieve all available subjects.
 *
 * @function getMateriasService
 *
 * @param {string} token - The session token used for authentication.
 *
 * @returns {Promise<MateriaService[]>} A promise that resolves to a list of all subject records.
 */
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

/**
 * Retrieves and organizes all academic information (subjects, courses, and sections)
 * based on the authenticated user's role (admin, teacher, or student).
 *
 * This function fetches courses accordingly, then builds structured maps for:
 * - Subject selections
 * - Courses by subject
 * - Sections by course
 *
 * These maps are used for populating dropdowns or hierarchical selectors in the UI.
 *
 * @function getAllAcademicInformation
 *
 * @param {string} token - The session token used for authentication.
 * @param {"A" | "D" | "E"} userType - The user type: "A" for Admin, "D" for Teacher, "E" for Student.
 * @param {number} id - The ID of the user, used to filter data for teachers or students.
 *
 * @returns {Promise<{
 *   selectMaterias: Map<number, string>,
 *   selectCurso: Map<string, string>,
 *   selectSeccion: Map<number, string>,
 *   getSeccionByCurso: Map<string, number[]>,
 *   getCursosByMateria: Map<number, string[]>
 * }>} An object containing maps for UI-based academic selection.
 */
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
