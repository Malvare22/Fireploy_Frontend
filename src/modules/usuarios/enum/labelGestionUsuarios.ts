import { Usuario } from "../types/usuario";

export const labelUsuario = {
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
  registrarUsuario: 'Registrar Usuario',
  verPerfil: 'Ver Perfil',
  verPortafolio: 'Ver Portafolio',
  fechaIngreso: "Fecha de Ingreso a la Universidad",
  registroExitoso: 'Usuario Registrado con éxito',
  seleccioneUnSexo: 'Seleccione un Sexo',
  seleccioneUnTipo: 'Seleccione su tipo de usuario',
  id: 'Id',
  cambiarContrasenia: 'Reestablecer Contraseña'
};

export const obtenerLabelHabilitarUsuario = (usuario: Usuario) => (`¿Está seguro de que desea habilitar al usuario ${usuario.apellidos} ${usuario.nombres}?`);

export const obtenerLabelDeshabilitarUsuario = (usuario: Usuario) => (`¿Está seguro de que desea deshabilitar al usuario ${usuario.apellidos} ${usuario.nombres}?`);