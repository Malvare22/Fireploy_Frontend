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

export const adapterUsuario = (usuario: UsuarioService) => {
  console.log(usuario);
  const _usuario: Usuario = {
    correo: usuario.correo,
    id: usuario.id,
    fechaDeNacimiento: adaptarFechaBackend(usuario.fecha_nacimiento),
    estado: usuario.estado as EstadoUsuario,
    tipo: getUserLetterTypes.get(
      usuario.tipo as UserTypeFullString
    ) as TiposUsuario,
    nombres: usuario.nombre,
    apellidos: usuario.apellido,
    sexo: usuario.sexo as SexoUsuario,
    fotoDePerfil:
      usuario.foto_perfil == "" || !usuario.foto_perfil
        ? ""
        : `${usuario.foto_perfil.replace(/\?t=.*/, "")}?t=${Date.now()}}`,
    redSocial: adaptarRedSocial(usuario.red_social),
    descripcion: usuario.descripcion ?? "",
  };

  if (usuario.est_fecha_inicio) {
    _usuario.estFechaInicio = adaptarFechaBackend(usuario.est_fecha_inicio);
  }
  return _usuario;
};

const adaptarRedSocial = (redSocialPlana: string) => {
  try {
    const conversion = JSON.parse(redSocialPlana) as RedSocialUsuario;
    return conversion;
  } catch {
    return {};
  }
};

export function adaptarUsuarioServiceAUsuarioCampoDeBusqueda(
  usuario: UsuarioService
): UsuarioCampoBusqueda {
  return {
    id: usuario.id,
    foto: usuario.foto_perfil || "",
    nombreCompleto: `${usuario.nombre} ${usuario.apellido}`,
  };
}

export function adaptarUsuarioAUsuarioCardPortafolio(
  usuario: Usuario
): UsuarioPortafolioCard {
  return {
    foto: usuario.fotoDePerfil || "",
    nombres: `${usuario.nombres} ${usuario.apellidos}`,
    id: usuario.id ? usuario.id.toString() : "",
    rol: usuario.tipo || "E",
    logros: [{ titulo: "Ejemplo", valor: "X" }],
  };
}
