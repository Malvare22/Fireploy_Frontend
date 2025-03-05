import { UsuarioService } from "../types/services.usuario";
import { Usuario } from "../types/usuario";
import { EstadoUsuario } from "../types/usuario.estado";
import { RedSocialUsuario } from "../types/usuario.redSocial";
import { SexoUsuario } from "../types/usuario.sexo";
import { TiposUsuario } from "../types/usuario.tipos";
import { obtenerLetraTiposUsuario, TiposUsuarioStringCompleto } from "./usuario.map";

export const adaptarUsuario = (usuario: UsuarioService) => {
  const _usuario: Usuario = {
    correo: usuario.correo,
    id: usuario.id,
    fechaDeNacimiento: usuario.fecha_nacimiento,
    estado: usuario.estado as EstadoUsuario,
    tipo: (obtenerLetraTiposUsuario.get(usuario.tipo as TiposUsuarioStringCompleto)) as TiposUsuario,
    nombres: usuario.nombre,
    apellidos: usuario.apellido,
    contrasenia: usuario.contrasenia,
    sexo: usuario.sexo as SexoUsuario,
    fotoDePerfil: usuario.foto_perfil,
    redSocial: {},
    descripcion: usuario.descripcion,
    proyectos: [],
  };

  return _usuario;
};

const adaptarRedSocial = (redSocialPlana: string) => {
  return 'JSON.parse(redSocialPlana) as RedSocialUsuario';
};
