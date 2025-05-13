import { patchData } from "@core/services";
import { MateriaService } from "../types/materia.service";

/**
 * Updates the status or other fields of a specific subject ("materia") by its ID.
 * 
 * This function sends a PATCH request to the `/materia/:idMateria` endpoint with
 * the provided data and authentication token. It's commonly used to change the
 * active/inactive status or update partial data of a subject.
 * 
 * @function patchChangeStatusMateria
 * 
 * @param {string} token - The session token used for authentication.
 * @param {any} data - An object containing the fields to be updated (e.g., status).
 * @param {number} idMateria - The ID of the subject to be updated.
 * 
 * @returns {Promise<MateriaService>} A promise that resolves to the updated subject data.
 */
export const patchChangeStatusMateria = async (
  token: string,
  data: any,
  idMateria: number
) => {
  const response = await patchData<MateriaService>(
    `/materia/${idMateria}`,
    data,
    {
      sessiontoken: token,
    }
  );

  return response;
};
