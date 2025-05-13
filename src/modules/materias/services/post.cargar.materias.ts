import { postData } from "@core/services";

/**
 * Performs a bulk upload of subjects (materias) by sending a file to the server.
 *
 * Sends a POST request to the `/materia/carga_masiva` endpoint with a FormData
 * object containing the uploaded file. This is typically used to import multiple
 * subject records at once from a supported file format (e.g., CSV or Excel).
 *
 * @param {string} token - The session token used for authentication.
 * @param {File} file - The file containing the subject data to be uploaded.
 *
 * @returns {Promise<unknown>} A promise that resolves with the server's response,
 * which may vary depending on the backend implementation.
 */
export const postCargaMasivaMaterias = async (token: string, file: File) => {

  const formData = new FormData;

  formData.append('file', file);

  const response = await postData<unknown>(
    `/materia/carga_masiva`,
    
      formData
    ,
    {
      sessiontoken: token,
    }
  );

  return response;
};