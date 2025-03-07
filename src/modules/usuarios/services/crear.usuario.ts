import { patchData } from "@core/services";
import { UsuarioService } from "../types/services.usuario";
import { adaptarUsuarioSalida } from "../utils/adaptar.usuario";
import { Usuario } from "../types/usuario";
import { EstadoUsuario } from "../types/usuario.estado";

export const queryCrearUsuario = async (
  token: string,
  data: Usuario
) => {
  const response = await patchData<UsuarioService>(
    `/usuario`,
    adaptarUsuarioSalida("crear", data),
    {
      sessiontoken: token,
    }
  );

  return response;
};