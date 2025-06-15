import { getData } from "@core/services";
import { UsuarioService } from "../types/services.usuario";

/**
 * `getUsuarioService` – Fetches detailed user data from the server.
 *
 * This function makes an authenticated API request to retrieve information for a specific user
 * by their unique ID. It requires a valid session token for authorization.
 *
 * @async
 * @function
 *
 * @param {number} id - The unique identifier of the user to fetch.
 * @param {string} token - The session token used for authenticating the request.
 *
 * @returns {Promise<UsuarioService>} A promise that resolves to the user data.
 *
 * @example
 * ```tsx
 * const userData = await getUsuarioService(1, "your-session-token");
 * ```
 */
export const getUsuarioService = async (id: number, token: string) => {
  const response = await getData<UsuarioService>(
    `/usuario/${id}`,
    {},
    {
      sessiontoken: token,
    }
  );

  return response;
};

/**
 * `getAllUserPublic` – Fetches a list of publicly available user profiles.
 *
 * This function makes an unauthenticated API request to retrieve basic information
 * about all public users.
 *
 * @async
 * @function
 *
 * @returns {Promise<UsuarioService[]>} A promise that resolves to an array of public user data.
 *
 * @example
 * ```tsx
 * const users = await getAllUserPublic();
 * ```
 */
export const getAllUserPublic = async () => {
  const response = await getData<UsuarioService[]>(`/usuario/public`, {}, {});

  return response;
};

/**
 * `getUserPublicById` – Fetches a single public user profile by ID.
 *
 * This function sends an unauthenticated request to get publicly available
 * user data associated with a specific ID.
 *
 * @async
 * @function
 *
 * @param {number} id - The unique identifier of the public user to fetch.
 *
 * @returns {Promise<UsuarioService>} A promise that resolves to the public user data.
 *
 * @example
 * ```tsx
 * const user = await getUserPublicById(42);
 * ```
 */
export const getUserPublicById = async (id: number) => {
  const response = await getData<UsuarioService>(`/usuario/public/${id}`, {});

  return response;
};
