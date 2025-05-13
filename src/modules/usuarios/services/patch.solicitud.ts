import { patchData } from "@core/services";

/**
 * Updates the status of a solicitud (request) by sending a PATCH request to the server.
 * 
 * This function sends a PATCH request to update the status of a solicitud. It allows changing the 
 * state of the solicitud (e.g., "A" for approved, "P" for pending, "R" for rejected) and records 
 * the ID of the user who made the update.
 * 
 * @param {number} id - The ID of the solicitud (request) to be updated.
 * @param {"A" | "P" | "R"} estado - The new status of the solicitud (approved, pending, or rejected).
 * @param {number} idOfUpdater - The ID of the user who is updating the solicitud.
 * @param {string} token - The session token used for authenticating the API request.
 * 
 * @returns {Promise<unknown>} A promise that resolves to the response from the server.
 * 
 * @example
 * ```tsx
 * const response = await patchSolicitudService(123, "A", 456, "your-session-token");
 * ```
 */
export const patchSolicitudService = async (
  id: number,
  estado: "A" | "P" | "R",
  idOfUpdater: number,
  token: string
) => {
  const response = await patchData<unknown>(
    `/solicitud/${id}`,
    {
      estado: estado,
      aprobado_by: idOfUpdater,
    },
    {
      sessiontoken: token,
    }
  );

  return response;
};
