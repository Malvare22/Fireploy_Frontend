import { postData } from "@core/services";

/**
 * Creates a new "Rol Docente" request for a user by sending a POST request to the server.
 * 
 * This function sends a POST request to create a new "Rol Docente" (teacher role) request for a specified user.
 * It accepts the user ID and session token as parameters, and assigns a request type of 1, which corresponds
 * to a "Rol Docente" request.
 * 
 * @param {number} usuarioId - The ID of the user who is requesting the teacher role.
 * @param {string} token - The session token used for authenticating the API request.
 * 
 * @returns {Promise<unknown>} The response from the server after attempting to create the request.
 * 
 * @example
 * ```tsx
 * const response = await postCreateSolicitudRolDocenteService(123, "your-session-token");
 * ```
 */
export const postCreateSolicitudRolDocenteService = async (usuarioId: number, token: string) => {
  const response = await postData<unknown>(
    `/solicitud`,
    {
      usuario: usuarioId,
      tipo_solicitud: 1
    },
    {
      sessiontoken: token,
    }
  );

  return response;
};
