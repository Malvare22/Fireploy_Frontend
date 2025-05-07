import { postData } from "@core/services";

/**
 * Creates a new course request (solicitud).
 *
 * Sends a POST request to the `/solicitud` endpoint with the provided user ID, 
 * course ID, and request type (set to 2 for course-related requests).
 * This request allows the user to apply for a course.
 *
 * @param {string} token - The session token used for authentication.
 * @param {number} usuarioId - The ID of the user making the request.
 * @param {string} cursoId - The ID of the course for which the request is being made.
 *
 * @returns {Promise<unknown>} A promise that resolves with the response from the server,
 * which may include information about the created request or any error that occurred.
 */
export const postCreateSolicitudCurso = async (token: string, usuarioId: number, cursoId: string) => {
  const response = await postData<unknown>(
    `/solicitud`,
    {
      usuario: usuarioId,
      tipo_solicitud: 2,
      cursoId: cursoId
    },
    {
      sessiontoken: token,
    }
  );

  return response;
};
