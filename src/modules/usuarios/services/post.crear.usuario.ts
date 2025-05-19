import { postData } from "@core/services";
import { UsuarioService } from "../types/services.usuario";
import { Usuario } from "../types/usuario";
import { getUserTypes } from "../utils/usuario.map";

/**
 * Creates a new user by sending a POST request to the server with the user's data.
 * 
 * This function sends a POST request to the server to create a new user. The user's information
 * is included in the request body, including personal details, account information, and a default profile image.
 * The request is authenticated using the session token.
 * 
 * @param {string} token - The session token used for authenticating the API request.
 * @param {Usuario} user - The user object containing all the necessary data to create the new user.
 * 
 * @returns {Promise<UsuarioService>} The response from the server containing the created user's details.
 * 
 * @example
 * ```tsx
 * const user = { 
 *   nombres: "John", 
 *   apellidos: "Doe", 
 *   fechaDeNacimiento: "1990-01-01", 
 *   sexo: "M", 
 *   descripcion: "A new user", 
 *   correo: "john.doe@example.com", 
 *   contrasenia: "password123", 
 *   redSocial: { facebook: "john.doe" }, 
 *   tipo: "admin",
 *   foto_perfil: "path/to/photo.jpg"
 * };
 * const response = await postCreateUsuarioService("your-session-token", user);
 * ```
 */
export const postCreateUsuarioService = async (token: string, user: Usuario) => {
  type Body = {
    nombre: string;
    apellido: string;
    fecha_nacimiento: string; // Formato ISO (YYYY-MM-DD)
    sexo: string; // Si hay más opciones, puedes usar string
    descripcion: string;
    correo: string;
    contrasenia: string;
    red_social: string;
    tipo: string; // Ajusta según los tipos posibles
    est_fecha_inicio?: string; // Formato ISO (YYYY-MM-DD)
    foto_perfil: string;
  };

  const body: Body = {
    nombre: user.nombres,
    apellido: user.apellidos ?? '',
    fecha_nacimiento: user.fechaDeNacimiento, // Formato ISO (YYYY-MM-DD)
    sexo: user.sexo, // Si hay más opciones, puedes usar string
    descripcion: user.descripcion,
    correo: user.correo,
    contrasenia: user.contrasenia!!,
    red_social: JSON.stringify(user.redSocial),
    tipo: getUserTypes.get(user.tipo!!) || "Estudiante",
    foto_perfil: "",
  };

  if (user.estFechaInicio) {
    body.est_fecha_inicio = user.estFechaInicio;
  }

  const response = await postData<UsuarioService>(`/usuario`, body, {
    sessiontoken: token,
  });

  return response;
};
