import { adaptarFechaBackend } from "@modules/general/utils/fechas";
import { UsuarioService } from "../types/services.usuario";
import { Usuario } from "../types/usuario";
import { EstadoUsuario } from "../types/usuario.estado";
import { RedSocialUsuario } from "../types/usuario.redSocial";
import { SexoUsuario } from "../types/usuario.sexo";
import { TiposUsuario } from "../types/usuario.tipos";
import {
  obtenerLetraTiposUsuario,
  obtenerTiposUsuario,
  TiposUsuarioStringCompleto,
} from "./usuario.map";
import { UsuarioCampoBusqueda } from "@modules/general/components/searchUsers/hook";

export const adaptarUsuario = (usuario: UsuarioService) => {
  const _usuario: Usuario = {
    correo: usuario.correo,
    id: usuario.id,
    fechaDeNacimiento: adaptarFechaBackend(usuario.fecha_nacimiento),
    estado: usuario.estado as EstadoUsuario,
    tipo: obtenerLetraTiposUsuario.get(
      usuario.tipo as TiposUsuarioStringCompleto
    ) as TiposUsuario,
    nombres: usuario.nombre,
    apellidos: usuario.apellido,
    sexo: usuario.sexo as SexoUsuario,
    fotoDePerfil: `${usuario.foto_perfil.replace(/\?t=.*/, "")}?t=${Date.now()}}`,
    redSocial: adaptarRedSocial(usuario.red_social),
    descripcion: usuario.descripcion ?? '',
    estFechaInicio: usuario.est_fecha_inicio ?? ''
  };

  return _usuario;
};

export const adaptarUsuarioSalida = (
  tipo: "crear" | "editar" | "editarEspecial",
  usuario: Usuario
) => {
  let _usuario: Partial<Record<keyof UsuarioService, string>>;
  if (tipo == "editar") {
    _usuario = {
      fecha_nacimiento: usuario.fechaDeNacimiento,
      nombre: usuario.nombres,
      apellido: usuario.apellidos,
      sexo: usuario.sexo,
      foto_perfil: usuario.fotoDePerfil,
      red_social: JSON.stringify(usuario.redSocial),
      descripcion: usuario.descripcion,
    };
    return _usuario;
  }

  _usuario = {
    nombre: usuario.nombres,
    apellido: usuario.apellidos,
    fecha_nacimiento: usuario.fechaDeNacimiento,
    sexo: usuario.sexo,
    descripcion: usuario.descripcion,
    correo: usuario.correo,
    red_social: JSON.stringify(usuario.redSocial),
    contrasenia: usuario.contrasenia,
    foto_perfil: usuario.fotoDePerfil,
    estado: usuario.estado,
    tipo: obtenerTiposUsuario.get(usuario.tipo),
    est_fecha_inicio: usuario.estFechaInicio,
  };
  return _usuario;
};

const adaptarRedSocial = (redSocialPlana: string) => {
  try{
    const conversion = JSON.parse(redSocialPlana) as RedSocialUsuario;
    return conversion;
  }
  catch{
    return {};
  }
};


export function adaptarUsuarioServiceAUsuarioCampoDeBusqueda(usuario: UsuarioService): UsuarioCampoBusqueda{
  return {
    id: usuario.id,
    foto: usuario.foto_perfil,
    nombreCompleto: `${usuario.nombre} ${usuario.apellido}`
  };
};
