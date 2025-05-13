import { getData } from "@core/services";
import { CursoService } from "../types/curso.service";

/**
 * Service functions to interact with the "Curso" (course) API.
 * These functions make HTTP requests to fetch courses based on different parameters like course ID, materia (subject) ID, and student ID.
 * 
 * @module CursoService
 * 
 * @function getCursoByMateriaId
 * Fetches a list of courses associated with a specific materia (subject) ID.
 * 
 * @param {string} token - The session token for authentication.
 * @param {string} id - The ID of the materia (subject).
 * 
 * @returns {Promise<CursoService[]>} A promise that resolves to an array of courses associated with the given materia ID.
 */
export const getCursoByMateriaId = async (token: string, id: string) => {

  const response = await getData<CursoService[]>(
    `/curso`,
    {
      materia: id,
    },
    {
      sessiontoken: token,
    }
  );

  return response;
};

/* @function getCursoById
* Fetches a specific course by its ID.
* 
* @param {string} token - The session token for authentication.
* @param {string} id - The ID of the course.
* 
* @returns {Promise<CursoService>} A promise that resolves to the course with the given ID.
*/
export const getCursoById = async (token: string, id: string) => {
  const response = await getData<CursoService>(
    `/curso/${id}`,
    {},
    {
      sessiontoken: token,
    }
  );

  return response;
};

/*
 * @function getCursosByIdStudent
 * Fetches a list of courses associated with a specific student ID.
 * 
 * @param {string} token - The session token for authentication.
 * @param {number} id - The ID of the student.
 * 
 * @returns {Promise<CursoService[]>} A promise that resolves to an array of courses associated with the given student ID.
 */
export const getCursosByIdStudent = async (token: string, id: number) => {
  const response = await getData<CursoService[]>(
    `/curso`,
    {
      estudiantes: id
    },
    {
      sessiontoken: token,
    }
  );

  return response;
};

export type GetCursoParams = {
  materia?: number,
  estudiantes?: number,
  docente?: number
}

/*
* @function getCursos
* Fetches a list of courses based on the provided parameters such as materia (subject), estudiantes (students), or docente (teacher).
* 
* @param {string} token - The session token for authentication.
* @param {GetCursoParams} params - An object containing parameters to filter the courses, such as materia, estudiantes, or docente.
* 
* @returns {Promise<CursoService[]>} A promise that resolves to an array of courses matching the provided parameters.
*/
export const getCursos = async (token: string, params: GetCursoParams) => {
  const response = await getData<CursoService[]>(
    `/curso`,
    params,
    {
      sessiontoken: token,
    }
  );

  return response;
};

