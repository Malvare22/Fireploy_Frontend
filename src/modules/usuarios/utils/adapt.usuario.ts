import { adaptarFechaBackend } from "@modules/general/utils/fechas";
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
 * Adapts a UsuarioService object to a standardized Usuario object.
 *
 * @param usuario The raw user object from the service.
 * @returns A formatted Usuario object.
 */
export const adaptUser = (usuario: UsuarioService): Usuario => {
  const _usuario: Usuario = {
    correo: usuario.correo,
    id: usuario.id,
    fechaDeNacimiento: adaptarFechaBackend(usuario.fecha_nacimiento),
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
    _usuario.estFechaInicio = adaptarFechaBackend(usuario.est_fecha_inicio);
  }
  return _usuario;
};

/**
 * Parses the raw social media string into a structured RedSocialUsuario object.
 *
 * @param redSocialPlana The raw social media string in JSON format.
 * @returns A parsed RedSocialUsuario object, or an empty object if parsing fails.
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
 * Converts a UsuarioService object into a UsuarioCampoBusqueda object,
 * which is used for user search results.
 *
 * @param usuario The user object from the service.
 * @returns A simplified object for user search context.
 */
export function adaptUserServiceToCB(usuario: UsuarioService): UsuarioCampoBusqueda {
  return {
    id: usuario.id,
    foto: usuario.foto_perfil || "",
    nombreCompleto: `${usuario.nombre} ${usuario.apellido}`,
  };
}

/**
 * Converts a Usuario object into a UsuarioPortafolioCard,
 * which is used for displaying a user's portfolio card.
 *
 * @param usuario The standardized user object.
 * @returns A formatted portfolio card object.
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
