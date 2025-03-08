import { patchData } from "@core/services";
import { UsuarioService } from "../types/services.usuario";
import { adaptarUsuarioSalida } from "../utils/adaptar.usuario";
import { Usuario } from "../types/usuario";
import { EstadoUsuario } from "../types/usuario.estado";

export const modificarUsuarioService = async (
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

export const modificarEstadoUsuario = async (
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
