import { getData } from "@core/services";
import { ProyectoService } from "../types/proyecto.service";

/**
 * getProjectById function – Fetches a project by its ID.
 *
 * This function sends a request to fetch a project by its unique ID. The request is
 * authenticated using the provided session token.
 *
 * @param {string} token - The session token used for authentication.
 * @param {number} id - The ID of the project to fetch.
 *
 * @returns {Promise<ProyectoService>} A promise that resolves to the project details if found.
 */
export async function getProjectById(token: string, id: number) {
  const response = await getData<ProyectoService>(
    `/proyecto/${id}`,
    {},
    {
      sessiontoken: token,
    }
  );

  return response;
}

/**
 * getProjectByUserId function – Fetches all projects associated with a user (student).
 *
 * This function sends a request to fetch all projects associated with a specific student based on their ID.
 * The request is authenticated using the provided session token.
 *
 * @param {string} token - The session token used for authentication.
 * @param {number} id - The ID of the student whose projects are being fetched.
 *
 * @returns {Promise<ProyectoService[]>} A promise that resolves to an array of projects associated with the student.
 */
export async function getProjectByUserId(token: string, id: number) {
  const response = await getData<ProyectoService[]>(
    `/proyecto/estudiante/${id}`,
    {},
    {
      sessiontoken: token,
    }
  );

  return response;
}

export async function getPublicProjectById(id: number) {
  const response = await getData<ProyectoService>(`/proyecto/public/${id}`, {}, {});

  return response;
}

export async function getAllPublicProjects() {
  const response = await getData<ProyectoService[]>(`/proyecto`, {}, {});

  return response;
}

/**
 * getProjectByIdSection function – Fetches all projects associated with a specific section.
 *
 * This function sends a request to fetch all projects in a specific section by its ID.
 * The request is authenticated using the provided session token.
 *
 * @param {string} token - The session token used for authentication.
 * @param {number} id - The ID of the section whose projects are being fetched.
 *
 * @returns {Promise<ProyectoService[]>} A promise that resolves to an array of projects within the specified section.
 */
export async function getProjectByIdSection(token: string, id: number) {
  const response = await getData<ProyectoService[]>(
    `/proyecto/seccion/${id}`,
    {},
    {
      sessiontoken: token,
    }
  );

  return response;
}
