import { adaptarFechaBackend } from "@modules/general/utils/fechas";
import { UsuarioService } from "../types/services.usuario";
import { Usuario } from "../types/usuario";
import { EstadoUsuario } from "../types/usuario.estado";
import { RedSocialUsuario } from "../types/usuario.redSocial";
import { SexoUsuario } from "../types/usuario.sexo";
import { TiposUsuario } from "../types/usuario.tipos";
import {
  obtenerLetraTiposUsuario,
  TiposUsuarioStringCompleto,
} from "./usuario.map";

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
    fotoDePerfil: usuario.foto_perfil,
    redSocial: adaptarRedSocial(usuario.red_social),
    descripcion: usuario.descripcion,
    proyectos: [],
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
    fecha_nacimiento: usuario.fechaDeNacimiento,
    nombre: usuario.nombres,
    apellido: usuario.apellidos,
    sexo: usuario.sexo,
    foto_perfil: usuario.fotoDePerfil,
    red_social: "",
    descripcion: usuario.descripcion,
    contrasenia: usuario.contrasenia,
    correo: usuario.correo,
    est_fecha_inicio: "",
    estado: usuario.estado,
    id: usuario.id.toString(),
    tipo: usuario.tipo,
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
