import { getData } from "@core/services";
import { Repositorio } from "../types/repositorio";

/**
 * getRepositoryById function – fetches the details of a repository by its unique identifier.
 * 
 * This function sends an authenticated GET request to retrieve a repository's information.
 * It uses the provided session token to authorize the request.
 * 
 * @function
 * 
 * @param token A string representing the session token used for authentication.
 * @param id A number representing the unique identifier of the repository.
 * 
 * @returns A Promise that resolves to the repository data if found.
 * 
 * @example
 * ```ts
 * const repository = await getRepositoryById("session-token", 42);
 * console.log(repository.name);
 * ```
 */
export async function getRepositoryById(token: string, id: number) {
  const response = await getData<Repositorio>(
    `/repositorio/${id}`,
    {},
    {
      sessiontoken: token,
    }
  );

  return response;
}
