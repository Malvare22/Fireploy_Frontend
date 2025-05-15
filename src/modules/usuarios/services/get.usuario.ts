import { getData } from "@core/services";
import { UsuarioService } from "../types/services.usuario";

/**
 * Fetches user data from the server based on the user's ID and session token.
 *
 * This function makes an API call to retrieve detailed information about a specific user.
 * The user ID and session token are passed in the request headers to authenticate the request.
 * It uses the `getData` utility function to fetch the data and returns the response.
 *
 * @param {number} id - The unique identifier of the user whose data is to be fetched.
 * @param {string} token - The session token used for authentication in the API request.
 *
 * @returns {Promise<UsuarioService>} A promise that resolves to the user data fetched from the server.
 *
 * @example
 * ```tsx
 * const userData = await getUsuarioService(1, 'your-session-token');
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

export const getAllUsuarioPublic = async () => {
  const response = await getData<UsuarioService[]>(`/usuario/public`, {}, {});

  return response;
};

export const getUsuarioPublicById = async (id: number) => {
  const response = await getData<UsuarioService>(`/usuario/public/${id}`, {});

  return response;
};
