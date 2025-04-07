import { patchData } from "@core/services";
import { UsuarioService } from "../types/services.usuario";
import { Usuario } from "../types/usuario";

export const postChangeUsuarioService = async (id: number, token: string, user: Usuario) => {
  type Body = {
    nombre: string;
    apellido: string;
    fecha_nacimiento: string; // Formato ISO (YYYY-MM-DD)
    sexo: string; // Si hay más opciones, puedes usar string
    descripcion: string;
    red_social: string;
    est_fecha_inicio?: string; // Formato ISO (YYYY-MM-DD)
    foto_perfil: string;
  };

  const body: Body = {
    nombre: user.nombres,
    apellido: user.apellidos,
    fecha_nacimiento: user.fechaDeNacimiento, // Formato ISO (YYYY-MM-DD)
    sexo: user.sexo, // Si hay más opciones, puedes usar string
    descripcion: user.descripcion,
    foto_perfil: user.fotoDePerfil,
    red_social:
      typeof user.redSocial === "object" ? JSON.stringify(user.redSocial) : user.redSocial,
  };

  if (user.estFechaInicio) {
    body.est_fecha_inicio = user.estFechaInicio;
  }

  const response = await patchData<UsuarioService>(`/usuario/${id}`, body, {
    sessiontoken: token,
  });

  return response;
};

export const postChangeUserStateService = async (token: string, id: number, estado: "A" | "I") => {

  console.log(id, estado)

  const response = await patchData<UsuarioService>(
    `/usuario/${id}`,
    { estado: estado },
    {
      sessiontoken: token,
    }
  );

  return response;
};
