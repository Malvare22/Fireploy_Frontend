import { postData } from "@core/services";
import { UsuarioService } from "../types/services.usuario";
import { Usuario } from "../types/usuario";
import { getUserTypes } from "../utils/usuario.map";
import { getImage } from "@modules/general/utils/getImage";

export const postCreateUsuarioService = async (token: string, user: Usuario) => {
  type Body = {
    nombre: string;
    apellido: string;
    fecha_nacimiento: string; // Formato ISO (YYYY-MM-DD)
    sexo: string; // Si hay más opciones, puedes usar string
    descripcion: string;
    correo: string;
    contrasenia: string;
    red_social: string;
    tipo: string; // Ajusta según los tipos posibles
    est_fecha_inicio?: string; // Formato ISO (YYYY-MM-DD)
    foto_perfil: string;
  };

  const body: Body = {
    nombre: user.nombres,
    apellido: user.apellidos,
    fecha_nacimiento: user.fechaDeNacimiento, // Formato ISO (YYYY-MM-DD)
    sexo: user.sexo, // Si hay más opciones, puedes usar string
    descripcion: user.descripcion,
    correo: user.correo,
    contrasenia: user.contrasenia!!,
    red_social: JSON.stringify(user.redSocial),
    tipo: getUserTypes.get(user.tipo!!) || "Estudiante",
    foto_perfil: getImage.defaultProfileImage.ruta,
  };

  if (user.estFechaInicio) {
    body.est_fecha_inicio = user.estFechaInicio;
  }

  const response = await postData<UsuarioService>(`/usuario`, body, {
    sessiontoken: token,
  });

  return response;
};
