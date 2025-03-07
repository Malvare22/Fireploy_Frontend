import { postData } from "@core/services";
import { UsuarioService } from "../types/services.usuario";
import { adaptarUsuarioSalida } from "../utils/adaptar.usuario";
import { Usuario } from "../types/usuario";

export const queryCrearUsuario = async (
  token: string,
  data: Usuario
) => {
  const response = await postData<UsuarioService>(
    `/usuario`,
    adaptarUsuarioSalida("crear", data),
    {
      sessiontoken: token,
    }
  );

  return response;
};