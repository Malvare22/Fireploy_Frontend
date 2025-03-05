import { getData } from "@core/services";
import { UsuarioService } from "../types/services.usuario";

export const obtenerUsuarioPorId = async (id: number, token: string) => {
  const response = await getData<UsuarioService>(
    `/usuario/${id}`,
    {},
    {
      sessiontoken: token,
    }
  );

  console.log(response);
  return response;
};
