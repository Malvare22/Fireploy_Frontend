import { patchData } from "@core/services";
import { UsuarioService } from "../types/services.usuario";
import { adaptarUsuarioSalida } from "../utils/adaptar.usuario";
import { Usuario } from "../types/usuario";

export const modificarUsuario = async (id: number, token: string, data: Usuario) => {
  const response = await patchData<UsuarioService>(
    `/usuario/${id}`,
    adaptarUsuarioSalida("editar", data),
    {
      sessiontoken: token,
    }
  );

  return response;
};
