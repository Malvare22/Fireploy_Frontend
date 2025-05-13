import { patchData } from "@core/services";
import { Materia } from "../types/materia";
import { MateriaService } from "../types/materia.service";

/**
 * Updates the information of a given subject (materia).
 *
 * Sends a PATCH request to the `/materia/:id` endpoint with new data for the subject.
 *
 * @param {string} token - The session token used for authentication.
 * @param {Materia} data - The subject data to update, containing:
 *   - `id`: The unique identifier of the subject.
 *   - `nombre`: The new name of the subject.
 *   - `estado`: The updated status (e.g., 'A' for active, 'I' for inactive).
 *   - `semestre`: The semester associated with the subject (converted to string).
 *
 * @returns {Promise<MateriaService>} A promise that resolves to the updated subject data from the server.
 */
export const postEditMateriaService = async (token: string, data: Materia) => {
  type Body = {
    nombre: string;
    semestre: string;
    estado: string;
  };

  const body: Body = {
    nombre: data.nombre,
    estado: data.estado as string,
    semestre: data.semestre.toString() as string,
  };
  console.log('AAA', data)
  const response = await patchData<MateriaService>(`/materia/${data.id}`, body, {
    sessiontoken: token,
  });

  return response;
};
