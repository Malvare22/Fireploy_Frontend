import { postData } from "@core/services";

/**
 * Uploads a file for bulk user creation by sending a POST request to the server.
 * 
 * This function sends a POST request to the server to upload a file containing bulk user data 
 * for creation. The file is sent as a FormData object, and the request is authenticated using 
 * the session token.
 * 
 * @param {string} token - The session token used for authenticating the API request.
 * @param {File} file - The file containing the bulk user data to be uploaded.
 * 
 * @returns {Promise<unknown>} A promise that resolves to the response from the server.
 * 
 * @example
 * ```tsx
 * const response = await postCargaMasivaUsuarios("your-session-token", file);
 * ```
 */
export const postCargaMasivaUsuarios = async (token: string, file: File) => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await postData<unknown>(
    `/usuario/carga_masiva`,
    formData,
    {
      sessiontoken: token,
    }
  );

  return response;
};
