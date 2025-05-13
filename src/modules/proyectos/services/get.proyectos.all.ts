import { getData } from "@core/services";
import { ProyectoService } from "../types/proyecto.service";

/**
 * getProyectosAllService function – Fetches all projects.
 * 
 * This function sends a request to retrieve all projects in the system. The request 
 * does not require authentication since it fetches all available projects.
 * 
 * @returns {Promise<ProyectoService[]>} A promise that resolves to an array of all projects.
 */
export async function getProyectosAllService() {
  const response = await getData<ProyectoService[]>(
    `/proyecto`,
  );

  return response;
}