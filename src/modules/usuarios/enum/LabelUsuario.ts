import { Usuario } from "../types/usuario";

export const LabelUsuario = {
  nombres: "Nombres",
  apellidos: "Apellidos",
  fechaNacimiento: "Fecha Nacimiento",
  codigo: "Código",
  contrasenia: "Contraseña",
  fotoPerfil: "Foto de Perfil",
  rol: "Rol",
  estudiante: "Estudiante",
  docente: "Docente",
  administrador: "Administrador",
  semestre: "Semestre",
  sexo: 'Sexo',
  redesSociales: 'Redes Sociales',
  correo: 'Correo Electrónico',
  descripcion: 'Descripción',
  estado: 'Estado',
  deshabilitar: 'Deshabilitar',
  habilitar: 'Habilitar',
  confirmarContrasenia: 'Confirmar Contraseña',
  registrarUsuario: 'Registrar Usuario'
};

export const obtenerHabilitarUsuario = (usuario: Usuario) => (`¿Está seguro de que desea habilitar al usuario ${usuario.apellidos} ${usuario.nombres}?`);

export const obtenerDeshabilitarUsuario = (usuario: Usuario) => (`¿Está seguro de que desea deshabilitar al usuario ${usuario.apellidos} ${usuario.nombres}?`);