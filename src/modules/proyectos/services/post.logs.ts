import axios from "axios";

/**
 * postGenerateLog – Sends a request to generate logs for a specific project by ID.
 * 
 * This function makes an authenticated POST request to the backend service to initiate
 * the log generation process associated with the given project identifier.
 * 
 * @function
 * 
 * @param token A string representing the session token used for authentication.
 * @param id A number representing the unique identifier of the project for which logs will be generated.
 * 
 * @returns A promise that resolves with the response from the log generation request.
 * The response type is unknown and should be handled accordingly by the caller.
 */
export async function postGenerateLog(token: string, id: number) {

  const response = await axios({
    method: "post",
    url: `${import.meta.env.VITE_URL_BACKEND}/proyecto/generar_Logs/${id}`,
    headers: {
      sessiontoken: token,
    },
  }).then((response: unknown) => response);

  return response;
}