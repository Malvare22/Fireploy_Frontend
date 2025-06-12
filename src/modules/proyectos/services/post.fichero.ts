import axios from "axios";
import { Fichero } from "../types/fichero";

/**
 * postFichero function – uploads a file to a specific repository.
 * 
 * This function sends a multipart/form-data POST request to upload a file associated
 * with a given repository. The file must contain content and a name. If the content
 * is missing, the function exits early.
 * 
 * @function
 * 
 * @param token A string representing the session authentication token.
 * @param fichero An object representing the file to upload, including its content and name.
 * @param repositoryId A number representing the ID of the repository the file belongs to.
 * 
 * @returns A promise that resolves to the server response from the file upload request.
 * 
 * @example
 * await postFichero(token, { nombre: "main.py", contenido: fileBlob }, 42);
 */
export async function postFichero(
  token: string,
  fichero: Fichero,
  repositoryId: number
): Promise<unknown | unknown[]> {
  if (!fichero.contenido) return;
  const body = new FormData();
  body.append("contenido", fichero.contenido);
  body.append("nombre", fichero.nombre);
  body.append("repositorio", repositoryId.toString());
  const response = await axios({
    method: "post",
    url: `${import.meta.env.VITE_URL_BACKEND}/ficheros`,

    headers: {
      sessiontoken: token,
    },
    data: body,
  }).then((response: unknown) => response);

  return response;
}

/**
 * deleteFichero function – deletes a file by its unique ID.
 * 
 * This function sends a DELETE request to the backend to remove a file resource
 * identified by its ID. The request is authenticated using the session token.
 * 
 * @function
 * 
 * @param token A string representing the session authentication token.
 * @param ficheroId A number representing the ID of the file to delete.
 * 
 * @returns A promise that resolves to the server response from the deletion request.
 * 
 * @example
 * await deleteFichero(token, 101);
 */
export async function deleteFichero(
  token: string,
  ficheroId: number
): Promise<unknown | unknown[]> {

  const response = await axios({
    method: "delete",
    url: `${import.meta.env.VITE_URL_BACKEND}/ficheros/${ficheroId}`,
    headers: {
      sessiontoken: token,
    },
  }).then((response: unknown) => response);

  return response;
}