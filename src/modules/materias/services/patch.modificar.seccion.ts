import { patchData } from "@core/services";
import { Seccion } from "../types/seccion";
import { SeccionesService } from "../types/curso.service";

/**
 * Updates the information of a section (sección).
 *
 * Sends a PATCH request to the `/seccion/:id` endpoint to modify the section's details.
 *
 * @param {string} token - The session token used for authentication.
 * @param {Seccion} seccion - The section object containing updated values:
 *   - `id`: The unique identifier of the section.
 *   - `titulo`: The new title of the section.
 *   - `descripcion`: A description of the section content.
 *   - `fechaDeInicio`: Start date of the section (ISO string).
 *   - `fechaDeCierre`: End date of the section (ISO string).
 *   - `estado`: The new status of the section ('A' for active, 'I' for inactive).
 *
 * @returns {Promise<SeccionesService>} A promise that resolves to the updated section data from the server.
 */
export const patchEditSeccion = async (token: string, seccion: Seccion) => {
  type Body = {
    titulo: string;
    descripcion: string;
    fecha_inicio: string;
    fecha_fin: string;
    estado: "A" | "I";
  };

  const body: Body = {
    titulo: seccion.titulo,
    descripcion: seccion.descripcion,
    fecha_inicio: seccion.fechaDeInicio,
    fecha_fin: seccion.fechaDeCierre,
    estado: seccion.estado,
  };

  const response = await patchData<SeccionesService>(`/seccion/${seccion.id}`, body, {
    sessiontoken: token,
  });

  return response;
};
