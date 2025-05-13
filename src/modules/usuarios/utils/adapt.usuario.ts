import { adaptDateBackend } from "@modules/general/utils/fechas";
import { UsuarioService } from "../types/services.usuario";
import {
  EstadoUsuario,
  RedSocialUsuario,
  SexoUsuario,
  TiposUsuario,
  Usuario,
} from "../types/usuario";
import { UsuarioCampoBusqueda } from "@modules/general/hooks/useSearchUsers";
import { UsuarioPortafolioCard } from "../types/usuario.portafolio";
import { getUserLetterTypes, UserTypeFullString } from "./usuario.map";

/**
 * Adapts a `UsuarioService` object to a standardized `Usuario` object.
 *
 * This function takes a raw user object from the service layer and transforms it into a `Usuario` object,
 * which is used in the frontend. The transformation includes the following actions:
 * 
 * - Formats the `fecha_nacimiento` and `est_fecha_inicio` using the `adaptDateBackend` function.
 * - Sets the `estado`, `sexo`, and `tipo` properties based on the `UsuarioService` object.
 * - Modifies the `fotoDePerfil` to ensure the correct URL format.
 * - Parses the `red_social` field to a structured object.
 * 
 * @param usuario The raw user object from the service.
 * @returns A formatted `Usuario` object.
 * 
 * @example
 * const usuarioService = {
 *   correo: "juan@example.com",
 *   id: 123,
 *   fecha_nacimiento: "1990-05-15",
 *   estado: "A",
 *   tipo: "A",
 *   nombre: "Juan",
 *   apellido: "Pérez",
 *   sexo: "M",
 *   foto_perfil: "https://example.com/profile.jpg",
 *   red_social: '{"facebook":"https://facebook.com/juan"}',
 *   descripcion: "Full stack developer",
 *   est_fecha_inicio: "2023-01-01"
 * };
 * 
 * const usuarioAdaptado = adaptUser(usuarioService);
 * console.log(usuarioAdaptado);
 */
export const adaptUser = (usuario: UsuarioService): Usuario => {
  const _usuario: Usuario = {
    correo: usuario.correo,
    id: usuario.id,
    fechaDeNacimiento: adaptDateBackend(usuario.fecha_nacimiento),
    estado: usuario.estado as EstadoUsuario,
    tipo: getUserLetterTypes.get(usuario.tipo as UserTypeFullString) as TiposUsuario,
    nombres: usuario.nombre,
    apellidos: usuario.apellido,
    sexo: usuario.sexo as SexoUsuario,
    fotoDePerfil:
      usuario.foto_perfil == "" || !usuario.foto_perfil
        ? ""
        : `${usuario.foto_perfil.replace(/\?t=.*/, "")}?t=${Date.now()}}`,
    redSocial: adaptRedSocial(usuario.red_social),
    descripcion: usuario.descripcion ?? "",
  };

  if (usuario.est_fecha_inicio) {
    _usuario.estFechaInicio = adaptDateBackend(usuario.est_fecha_inicio);
  }
  return _usuario;
};

/**
 * Parses the raw social media string into a structured `RedSocialUsuario` object.
 * 
 * This function takes a raw social media string (in JSON format) from the backend and
 * parses it into a structured `RedSocialUsuario` object for easier usage in the frontend.
 * If parsing fails, it returns an empty object.
 *
 * @param redSocialPlana The raw social media string in JSON format.
 * @returns A parsed `RedSocialUsuario` object, or an empty object if parsing fails.
 * 
 * @example
 * const redSocial = '{"facebook":"https://facebook.com/juan"}';
 * const parsedRedSocial = adaptRedSocial(redSocial);
 * console.log(parsedRedSocial);
 */
const adaptRedSocial = (redSocialPlana: string): RedSocialUsuario | {} => {
  try {
    const conversion = JSON.parse(redSocialPlana) as RedSocialUsuario;
    return conversion;
  } catch {
    return {};
  }
};

/**
 * Converts a `UsuarioService` object into a `UsuarioCampoBusqueda` object,
 * which is used for user search results.
 * 
 * This function simplifies the user object by including only necessary fields
 * for search results. It formats the `nombreCompleto` and includes the profile picture URL.
 *
 * @param usuario The user object from the service.
 * @returns A simplified object for user search context.
 * 
 * @example
 * const usuarioService = {
 *   id: 1,
 *   nombre: "Juan",
 *   apellido: "Pérez",
 *   foto_perfil: "https://example.com/profile.jpg"
 * };
 * const searchResult = adaptUserServiceToCB(usuarioService);
 * console.log(searchResult);
 */
export function adaptUserServiceToCB(usuario: UsuarioService): UsuarioCampoBusqueda {
  return {
    id: usuario.id,
    foto: usuario.foto_perfil || "",
    nombreCompleto: `${usuario.nombre} ${usuario.apellido}`,
  };
}

/**
 * Converts a `Usuario` object into a `UsuarioPortafolioCard`,
 * which is used for displaying a user's portfolio card.
 * 
 * This function creates a portfolio card object for displaying user information,
 * such as the profile picture, full name, role, and achievements.
 *
 * @param usuario The standardized `Usuario` object.
 * @returns A formatted portfolio card object.
 * 
 * @example
 * const usuario = {
 *   fotoDePerfil: "https://example.com/profile.jpg",
 *   nombres: "Juan",
 *   apellidos: "Pérez",
 *   id: "123",
 *   tipo: "A"
 * };
 * const portfolioCard = adaptUserToPC(usuario);
 * console.log(portfolioCard);
 */
export function adaptUserToPC(usuario: Usuario): UsuarioPortafolioCard {
  return {
    foto: usuario.fotoDePerfil || "",
    nombres: `${usuario.nombres} ${usuario.apellidos}`,
    id: usuario.id ? usuario.id.toString() : "",
    rol: usuario.tipo || "E",
    logros: [{ titulo: "Ejemplo", valor: "X" }],
  };
}
