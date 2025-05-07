import { getData } from "@core/services";
import { ProyectoService } from "../types/proyecto.service";

/**
 * getProyectosService function – Fetches a single project or all projects.
 * 
 * This function sends a request to retrieve projects from the system. The request 
 * does not require any specific project ID, so it can return either a specific 
 * project or a list of all projects depending on the server-side implementation.
 * 
 * @returns {Promise<ProyectoService>} A promise that resolves to a project or an array of projects.
 */
export async function getProyectosService() {
  const response = await getData<ProyectoService>(
    `/proyecto`,
  );

  return response;
}
