import { postData } from "@core/services";

/**
 * Performs a bulk upload of courses by sending a file to the server.
 *
 * Sends a POST request to the `/curso/carga_masiva` endpoint with a FormData
 * object containing the uploaded file. This is typically used for importing
 * multiple courses at once from an Excel or CSV file.
 *
 * @param {string} token - The session token used for authentication.
 * @param {File} file - The file containing the course data to be uploaded.
 *
 * @returns {Promise<unknown>} A promise that resolves with the server response, which may vary depending on implementation.
 */
export const postCargaMasivaCursos = async (token: string, file: File) => {

  const formData = new FormData;

  formData.append('file', file);

  const response = await postData<unknown>(
    `/curso/carga_masiva`,
    
      formData
    ,
    {
      sessiontoken: token,
    }
  );

  return response;
};