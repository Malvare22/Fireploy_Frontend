import { TiposUsuario } from "@modules/usuarios/types/usuario.tipos";
import { EstadoUsuario } from "@modules/usuarios/types/usuario.estado";
import { SexoUsuario } from "@modules/usuarios/types/usuario.sexo";
import { RedSocialUsuario } from "@modules/usuarios/types/usuario.redSocial";
import { Usuario, UsuarioRegistro } from "@modules/usuarios/types/usuario";

/**
 * Usuario por defecto a la hora de realizar la creación de Usuario
 */
export const UsuarioBase: Usuario = {
  correo: "",
  id: 0,
  fechaDeNacimiento: "",
  estado: "A" as EstadoUsuario,
  tipo: "E" as TiposUsuario,
  nombres: "",
  apellidos: "",
  contrasenia: "",
  sexo: "M" as SexoUsuario,
  fotoDePerfil: "https://cdn.pixabay.com/photo/2016/11/14/17/39/person-1824147_1280.png",
  redSocial: {
    facebook: "",
    instagram: "",
    linkedin: "",
    x: "",
  } as RedSocialUsuario,
  descripcion: "",
  estFechaInicio: "",
};

/**
 * Usuario por defecto para realizar el registro
 */
export const UsuarioBaseRegistro: UsuarioRegistro = {
  ...UsuarioBase,
  confirmarContrasenia: "",
};
