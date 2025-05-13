import { postData } from "@core/services";
import { Seccion } from "../types/seccion";
import { SeccionesService } from "../types/curso.service";

/**
 * Creates a new section for a course.
 *
 * Sends a POST request to the `/seccion` endpoint with the provided section data.
 * The new section will be created with the given `titulo`, `descripcion`, 
 * `fecha_inicio`, `fecha_fin`, `estado`, and associated `cursoId`.
 *
 * @param {string} token - The session token used for authentication.
 * @param {Seccion} seccion - An object containing the section information to be created.
 *
 * @returns {Promise<SeccionesService>} A promise that resolves with the created section data
 * as returned by the server.
 */
export const postCreateSeccion = async (token: string, seccion: Seccion) => {
  type Body = {
    titulo: string;
    descripcion: string;
    fecha_inicio: string;
    fecha_fin: string;
    estado: "A" | "I";
    cursoId: string;
  };

  const body: Body = {
    titulo: seccion.titulo,
    descripcion: seccion.descripcion,
    fecha_inicio: seccion.fechaDeInicio,
    fecha_fin: seccion.fechaDeCierre,
    estado: seccion.estado,
    cursoId: seccion.cursoId ?? "", // Asegura que tenga un valor
  };

  const response = await postData<SeccionesService>(`/seccion`, body, {
    sessiontoken: token,
  });

  return response;
};
