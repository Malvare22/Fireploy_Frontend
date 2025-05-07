import { patchData } from "@core/services";
import { UsuarioService } from "../types/services.usuario";
import { Usuario } from "../types/usuario";

/**
 * Updates the user data by sending a PATCH request to the server with the updated user information.
 * 
 * This function sends a PATCH request to the server to update the details of an existing user.
 * It accepts the user ID, session token, and user data as parameters, and updates the user's personal 
 * details including name, birth date, gender, description, social media links, start date, and profile photo.
 * 
 * @param {number} id - The ID of the user whose data is being updated.
 * @param {string} token - The session token used for authenticating the API request.
 * @param {Usuario} user - The updated user object containing the new data.
 * 
 * @returns {Promise<UsuarioService>} The response from the server containing the updated user's details.
 * 
 * @example
 * ```tsx
 * const user = { 
 *   nombres: "John", 
 *   apellidos: "Doe", 
 *   fechaDeNacimiento: "1990-01-01", 
 *   sexo: "M", 
 *   descripcion: "Updated user", 
 *   redSocial: { facebook: "john.doe" }, 
 *   fotoDePerfil: "new-profile-photo.jpg",
 *   estFechaInicio: "2025-01-01"
 * };
 * const response = await postChangeUsuarioService(1, "your-session-token", user);
 * ```
 */

/**
 * Changes the user's state (Active/Inactive) by sending a PATCH request to the server.
 * 
 * This function sends a PATCH request to the server to update the user's state (either "A" for Active
 * or "I" for Inactive). It requires the user ID, session token, and the new state to be set.
 * 
 * @param {string} token - The session token used for authenticating the API request.
 * @param {number} id - The ID of the user whose state is being updated.
 * @param {"A" | "I"} estado - The new state for the user, either "A" (Active) or "I" (Inactive).
 * 
 * @returns {Promise<UsuarioService>} The response from the server indicating the result of the state change.
 * 
 * @example
 * ```tsx
 * const response = await postChangeUserStateService("your-session-token", 1, "A");
 * ```
 */
export const postChangeUsuarioService = async (id: number, token: string, user: Usuario) => {
  type Body = {
    nombre: string;
    apellido: string;
    fecha_nacimiento: string; // Formato ISO (YYYY-MM-DD)
    sexo: string; // Si hay más opciones, puedes usar string
    descripcion: string;
    red_social: string;
    est_fecha_inicio?: string; // Formato ISO (YYYY-MM-DD)
    foto_perfil: string;
  };

  const body: Body = {
    nombre: user.nombres,
    apellido: user.apellidos,
    fecha_nacimiento: user.fechaDeNacimiento, // Formato ISO (YYYY-MM-DD)
    sexo: user.sexo, // Si hay más opciones, puedes usar string
    descripcion: user.descripcion,
    foto_perfil: user.fotoDePerfil,
    red_social:
      typeof user.redSocial === "object" ? JSON.stringify(user.redSocial) : user.redSocial,
  };

  if (user.estFechaInicio) {
    body.est_fecha_inicio = user.estFechaInicio;
  }

  const response = await patchData<UsuarioService>(`/usuario/${id}`, body, {
    sessiontoken: token,
  });

  return response;
};

export const postChangeUserStateService = async (token: string, id: number, estado: "A" | "I") => {

  console.log(id, estado)

  const response = await patchData<UsuarioService>(
    `/usuario/${id}`,
    { estado: estado },
    {
      sessiontoken: token,
    }
  );

  return response;
};
