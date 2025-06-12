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
 * getProjectByUserId – Obtiene todos los proyectos asociados a un usuario por su ID.
 *
 * Esta función puede ejecutarse con o sin token, dependiendo si la solicitud requiere autenticación.
 *
 * @param {number} id - ID del usuario.
 * @param {string} [token] - Token de sesión opcional para solicitudes autenticadas.
 * @returns {Promise<ProyectoService[]>} Promesa que se resuelve con un arreglo de proyectos del usuario.
 */
export async function getProjectByUserId(id: number, token?: string) {

  const response = await getData<ProyectoService[]>(
    `/proyecto/usuario/${id}`,
    {},
    !token ? {} : {
      sessiontoken: token,
    }
  );

  return response;
}

/**
 * getPublicProjectById – Obtiene un proyecto público por su ID.
 *
 * Realiza una solicitud sin autenticación para obtener la información pública de un proyecto.
 *
 * @param {number} id - ID del proyecto público.
 * @returns {Promise<ProyectoService>} Promesa que se resuelve con los datos públicos del proyecto.
 */
export async function getPublicProjectById(id: number) {
  const response = await getData<ProyectoService>(`/proyecto/public/${id}`, {}, {});

  return response;
}

/**
 * getAllPublicProjects – Obtiene todos los proyectos públicos disponibles.
 *
 * Solicita una lista de todos los proyectos marcados como públicos en el sistema.
 *
 * @returns {Promise<ProyectoService[]>} Promesa que se resuelve con un arreglo de proyectos públicos.
 */
export async function getAllPublicProjects() {
  const response = await getData<ProyectoService[]>(`/proyecto`, {}, {});

  return response;
}

/**
 * getProjectByIdSection – Obtiene todos los proyectos de una sección específica.
 *
 * Realiza una solicitud autenticada para obtener todos los proyectos asignados a una sección por su ID.
 *
 * @param {string} token - Token de sesión para autenticar la solicitud.
 * @param {number} id - ID de la sección.
 * @returns {Promise<ProyectoService[]>} Promesa que se resuelve con un arreglo de proyectos de la sección especificada.
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
