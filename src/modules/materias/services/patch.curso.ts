import { patchData } from "@core/services";
import { CursoService } from "../types/curso.service";
import { Curso } from "../types/curso";

/**
 * Updates the details of a course, including its description, status, and assigned teacher.
 *
 * Sends a PATCH request to the `/curso/:id` endpoint with updated course data.
 *
 * @param {string} token - The session token used for authentication.
 * @param {Curso} data - The course object containing updated values.
 *   - `descripcion`: New course description.
 *   - `estado`: Course status ('A' for active, 'I' for inactive).
 *   - `docente`: Teacher object (optional); if null, removes the assigned teacher.
 *
 * @returns {Promise<CursoService>} A promise that resolves to the updated course data from the server.
 */
export const patchEditCurso = async (token: string, data: Curso) => {
  const id = data.id || "";
  type Body = {
    descripcion: string;
    estado: string;
    docente: number | null;
  };

  const body: Body = {
    descripcion: data.descripcion,
    docente: data.docente?.id || null,
    estado: data.estado,
  };

  const response = await patchData<CursoService>(`/curso/${id}`, body, {
    sessiontoken: token,
  });

  return response;
};

/**
 * Changes the status of a course to either active or inactive.
 *
 * Sends a PATCH request to the `/curso/:id` endpoint to update only the course status.
 *
 * @param {string} token - The session token used for authentication.
 * @param {string} id - The ID of the course to update.
 * @param {"A" | "I"} data - The new status value: 'A' (Active) or 'I' (Inactive).
 *
 * @returns {Promise<CursoService>} A promise that resolves to the updated course object.
 */
export const patchChangeStatusCurso = async (token: string, id: string, data: "A" | "I") => {
  type Body = {
    estado: string;
  };

  const body: Body = {
    estado: data,
  };

  const response = await patchData<CursoService>(`/curso/${id}`, body, {
    sessiontoken: token,
  });

  return response;
};
