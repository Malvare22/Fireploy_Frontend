import { patchData } from "@core/services";
import { UsuarioService } from "../types/services.usuario";
import { adaptarUsuarioSalida } from "../utils/adaptar.usuario";
import { EstadoUsuario, Usuario } from "../types/usuario";

export const postModificarUsuarioService = async (
  id: number,
  token: string,
  data: Usuario
) => {
  const response = await patchData<UsuarioService>(
    `/usuario/${id}`,
    adaptarUsuarioSalida("editar", data),
    {
      sessiontoken: token,
    }
  );

  return response;
};

export const postModificarEstadoUsuarioService = async (
  id: number,
  token: string,
  estado: EstadoUsuario
) => {
  const response = await patchData<UsuarioService>(
    `/usuario/${id}`,
    { estado },
    {
      sessiontoken: token,
    }
  );

  return response;
};
