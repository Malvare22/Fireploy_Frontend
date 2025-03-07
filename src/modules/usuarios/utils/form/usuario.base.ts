import { TiposUsuario } from "@modules/usuarios/types/usuario.tipos";
import { EstadoUsuario } from "@modules/usuarios/types/usuario.estado";
import { SexoUsuario } from "@modules/usuarios/types/usuario.sexo";
import { RedSocialUsuario } from "@modules/usuarios/types/usuario.redSocial";
import { Usuario } from "@modules/usuarios/types/usuario";

export const UsuarioBase: Usuario = {
  correo: "",
  id: 0,
  fechaDeNacimiento: "",
  estado: "A" as EstadoUsuario, // Valor por defecto dentro de los permitidos
  tipo: "E" as TiposUsuario, // Valor por defecto dentro de los permitidos
  nombres: "",
  apellidos: "",
  contrasenia: "",
  sexo: "M" as SexoUsuario, // Valor por defecto dentro de los permitidos
  fotoDePerfil: "",
  redSocial: {
    facebook: "",
    instagram: "",
    linkedin: "",
    x: ""
  } as RedSocialUsuario,
  descripcion: "",
  estFechaInicio: ""
};

