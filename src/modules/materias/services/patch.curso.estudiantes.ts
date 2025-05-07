import { patchData } from "@core/services";
import { CursoService } from "../types/curso.service";

/**
 * Updates the list of students in a course by either adding or removing them.
 * 
 * This function sends a PATCH request to the `/curso/alumnos/:idCurso` endpoint,
 * allowing batch assignment or removal of student IDs from a specific course.
 * 
 * @function patchEstudiantesCurso
 * 
 * @param {string} token - The session token used for authentication.
 * @param {number[]} data - An array of student IDs to be added or removed.
 * @param {'A' | 'D'} operacion - The operation to perform: 'A' to add students, 'D' to delete them.
 * @param {string} idCurso - The ID of the course to be modified.
 * 
 * @returns {Promise<CursoService>} A promise that resolves to the updated course data.
 */
export const patchEstudiantesCurso = async (
  token: string,
  data: number[],
  operacion: 'A' | 'D',
  idCurso: string
) => {
  const response = await patchData<CursoService>(
    `/curso/alumnos/${idCurso}`,
    {
      "estudiantes": data,
      "operacion": operacion
    },
    {
      sessiontoken: token,
    }
  );

  return response;
};