import { postData } from "@core/services";
import { Curso } from "../types/curso";
import { CursoService } from "../types/curso.service";

/**
 * Creates a new course (curso) associated with a specific subject (materia).
 *
 * Sends a POST request to the `/curso` endpoint with the provided course data.
 * The course will be linked to the specified subject by its `idMateria`.
 *
 * @param {string} token - The session token used for authentication.
 * @param {number} idMateria - The ID of the subject to which the course belongs.
 * @param {Curso} data - An object containing the course information to be created.
 *
 * @returns {Promise<CursoService>} A promise that resolves with the created course data
 * as returned by the server.
 */
export const postCreateCursoService = async (
  token: string,
  idMateria: number,
  data: Curso
) => {
  type Body = {
    grupo: string;
    semestre: string;
    descripcion: string;
    estado: string;
    docenteId?: number | null | undefined;
    materiaId: number;
  };

  const body = {
    descripcion: data.descripcion,
    docenteId: data.docente?.id ? (data.docente.id) : null,
    estado: data.estado,
    grupo: data.grupo,
    materiaId: idMateria,
    semestre: data.semestre,
  } as Body;
  const response = await postData<CursoService>(`/curso`, body, {
    sessiontoken: token,
  });

  return response;
};
