import { getData } from "@core/services";
import { UsuarioService } from "../types/services.usuario";
import { TiposUsuarioStringCompleto } from "../utils/usuario.map";

export const obtenerUsuariosPorTipoService = async (tipo: TiposUsuarioStringCompleto | 'todos', token: string) => {
  const params = tipo == "todos" ? {} : {tipo: tipo};
  const response = await getData<UsuarioService[]>(
    `/usuario`,
    params,
    {
      sessiontoken: token,
    }
  );
  console.log(response)
  return response;
};
