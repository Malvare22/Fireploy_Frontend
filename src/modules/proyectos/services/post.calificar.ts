import { postData } from "@core/services";

/**
 * Stars a project by sending a POST request to the server to rate the project.
 * 
 * This function allows a user to "star" a project by sending a request to the server.
 * It requires the project ID and an authentication token for the request header.
 * 
 * @param {number} idProject - The ID of the project to be starred.
 * @param {string} token - The session token used for authentication in the request header.
 * 
 * @returns {Promise<any>} A promise that resolves to the server's response.
 * 
 * @example
 * ```ts
 * const response = await postStarProject(123, token);
 * ```
 */
export const postStarProject = async (idProject: number, token: string) => {
  const response = await postData<any>(
    `/proyecto/puntuarProyecto/${idProject}`,
    {},
    {
      sessiontoken: token,
    }
  );

  return response;
};

/**
 * Unstars a project by sending a POST request to the server to remove the project rating.
 * 
 * This function allows a user to "unstar" or remove their rating from a project by sending a request
 * to the server. It requires the project ID and an authentication token for the request header.
 * 
 * @param {number} idProject - The ID of the project to be unstarred.
 * @param {string} token - The session token used for authentication in the request header.
 * 
 * @returns {Promise<any>} A promise that resolves to the server's response.
 * 
 * @example
 * ```ts
 * const response = await postUnStarProject(123, token);
 * ```
 */
export const postUnStarProject = async (idProject: number, token: string) => {
  const response = await postData<any>(
    `/proyecto/despuntuarProyecto/${idProject}`,
    {},
    {
      sessiontoken: token,
    }
  );

  return response;
};
