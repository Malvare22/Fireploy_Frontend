import { getData } from "@core/services";
import { UsuarioService } from "../types/services.usuario";
import { UserTypeFullString } from "../utils/usuario.map";

export const getUsuariosByTypeService = async (tipo: UserTypeFullString | 'todos', token: string) => {
  const params = tipo == "todos" ? {} : {tipo: tipo};
  const response = await getData<UsuarioService[]>(
    `/usuario`,
    params,
    {
      sessiontoken: token,
    }
  );
  return response;
};
