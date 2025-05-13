import { getData } from "@core/services";
import { UsuarioService } from "../types/services.usuario";
import { UserTypeFullString } from "../utils/usuario.map";

/**
 * Fetches a list of users based on the specified user type or retrieves all users.
 * 
 * This function makes an API request to fetch users. It accepts a user type and a session token.
 * If the type is 'todos', it fetches all users, otherwise, it filters users by the provided type.
 * The session token is included in the request headers for authentication.
 * 
 * @param {UserTypeFullString | 'todos'} tipo - The type of users to fetch, or 'todos' to fetch all users.
 * @param {string} token - The session token used for authenticating the API request.
 * 
 * @returns {Promise<UsuarioService[]>} A promise that resolves to an array of user data fetched from the server.
 * 
 * @example
 * ```tsx
 * const users = await getUsuariosByTypeService('admin', 'your-session-token');
 * ```
 */
export const getUsuariosByTypeService = async (tipo: UserTypeFullString | 'todos', token: string) => {
  const params = tipo == "todos" ? {} : {tipo: tipo};
  const response = await getData<UsuarioService[]>(
    `/usuario`,
    params,
    {
      sessiontoken: token,
    }
  );
  return response;
};
