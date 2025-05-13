import { getData } from "@core/services";
import { MateriaService } from "../types/materia.service";

/**
 * Fetches a specific subject ("materia") from the backend by its ID.
 * 
 * This function makes a GET request to the `/materia/:id` endpoint using
 * an authentication token for access control.
 * 
 * @function getMateriaById
 * 
 * @param {string} token - The session token used for authentication.
 * @param {number} id - The unique identifier of the subject (materia) to retrieve.
 * 
 * @returns {Promise<MateriaService>} A promise that resolves to the subject data associated with the given ID.
 */
export const getMateriaById = async (token: string, id: number) => {
  const response = await getData<MateriaService>(
    `/materia/${id}`,
    {},
    {
      sessiontoken: token,
    }
  );

  return response;
};
