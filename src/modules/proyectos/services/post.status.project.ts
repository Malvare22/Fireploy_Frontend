import axios from "axios";

/**
 * postDeployProject function – triggers the deployment process of a project.
 * 
 * This function sends a POST request to the backend to initiate deployment for a specific project.
 * The request is authenticated using the provided session token.
 * 
 * @function
 * 
 * @param id A number representing the unique ID of the project to deploy.
 * @param token A string representing the session authentication token.
 * 
 * @returns A promise that resolves to the server response from the deployment request.
 * 
 * @example
 * await postDeployProject(12, token);
 */
export const postDeployProject = async (id: number, token: string) => {
  const response = await axios({
    method: "post",
    url: `${import.meta.env.VITE_URL_BACKEND}/proyecto/${id}`,

    headers: {
      "Content-Type": "application/json",
      sessiontoken: token,
    },
    data: {},
  }).then((response: unknown) => response);

  return response;
};

/**
 * postStartProject function – starts a deployed project.
 * 
 * This function sends a POST request to the backend to start the execution of a deployed project.
 * The request is authenticated using the provided session token.
 * 
 * @function
 * 
 * @param id A number representing the unique ID of the project to start.
 * @param token A string representing the session authentication token.
 * 
 * @returns A promise that resolves to the server response from the start request.
 * 
 * @example
 * await postStartProject(12, token);
 */
export const postStartProject = async (id: number, token: string) => {
  const response = await axios({
    method: "post",
    url: `${import.meta.env.VITE_URL_BACKEND}/proyecto/start/${id}`,

    headers: {
      "Content-Type": "application/json",
      sessiontoken: token,
    },
    data: {},
  }).then((response: unknown) => response);

  return response;
};

/**
 * postStopProject function – stops a running project.
 * 
 * This function sends a POST request to the backend to stop the execution of a running project.
 * The request is authenticated using the provided session token.
 * 
 * @function
 * 
 * @param id A number representing the unique ID of the project to stop.
 * @param token A string representing the session authentication token.
 * 
 * @returns A promise that resolves to the server response from the stop request.
 * 
 * @example
 * await postStopProject(12, token);
 */
export const postStopProject = async (id: number, token: string) => {
  const response = await axios({
    method: "post",
    url: `${import.meta.env.VITE_URL_BACKEND}/proyecto/stop/${id}`,

    headers: {
      "Content-Type": "application/json",
      sessiontoken: token,
    },
    data: {},
  }).then((response: unknown) => response);

  return response;
};
