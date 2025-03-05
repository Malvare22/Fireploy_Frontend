// import { postData } from "@core/services";

import { postData } from "@core/services";
import { TiposUsuarioStringCompleto } from "@modules/usuarios/utils/usuario.map";

export const queryIniciarSesion = async (
  correo: string,
  contrasenia: string
) => {
  const data = { username: correo, password: contrasenia };
  type Response = {
    access_token: string;
    nombre: string;
    tipo: TiposUsuarioStringCompleto;
    foto: string;
    id: number
  };
  try {
    const response = await postData<Response>("/auth/login", data);
    return response;
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    throw error;
  }
};
