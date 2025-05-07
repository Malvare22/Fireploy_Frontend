import { postData } from "@core/services";
import { Materia } from "../types/materia";
import { MateriaService } from "../types/materia.service";

/**
 * Creates a new subject (materia).
 *
 * Sends a POST request to the `/materia` endpoint with the provided subject data.
 * The new subject will be created with the given `nombre`, `semestre`, and `estado`.
 *
 * @param {string} token - The session token used for authentication.
 * @param {Materia} data - An object containing the subject information to be created.
 *
 * @returns {Promise<MateriaService>} A promise that resolves with the created subject data
 * as returned by the server.
 */
export const postCreateMateriaService = async (token: string, data: Materia) => {
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

  const response = await postData<MateriaService>(`/materia`, body, {
    sessiontoken: token,
  });

  return response;
};
