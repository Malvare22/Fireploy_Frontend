import { postData } from "@core/services";
import { DataBaseService } from "../types/dabase.service";

/**
 * Loads project data by sending a GET request to the server.
 * 
 * This function retrieves the project data based on the given project ID. It requires the project ID
 * and an authentication token to make the request. The server responds with project data in the form of 
 * a `DataBaseService` object, or `null` if no data is found.
 * 
 * @param {number} id - The ID of the project to load.
 * @param {string} token - The session token used for authentication in the request header.
 * 
 * @returns {Promise<DataBaseService | null>} A promise that resolves to the project data if found, or `null` if no project data is available.
 * 
 * @example
 * ```ts
 * const projectData = await postLoadProject(123, token);
 * if (projectData) {
 *   console.log(projectData); // Access project data
 * } else {
 *   console.log("Project not found");
 * }
 * ```
 */
export const postLoadProject = async (id: number, token: string) => {
  const response = await postData<DataBaseService | null>(
    `/proyecto/${id}`,
    {},
    {
      sessiontoken: token,
    }
  );

  return response;
};
