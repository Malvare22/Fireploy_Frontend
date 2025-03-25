import { getData } from "@core/services";
import { UsuarioService } from "../types/services.usuario";

export const getExplorarPortafolioUsuarios = async () => {
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
