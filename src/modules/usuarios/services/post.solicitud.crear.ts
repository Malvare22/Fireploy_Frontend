import { postData } from "@core/services";
import { UsuarioService } from "../types/services.usuario";

export const postCrearSolicitud = async (usuarioId: number, token: string) => {
  const response = await postData<unknown>(
    `/solicitud`,
    {
      usuario: usuarioId,
    },
    {
      sessiontoken: token,
    }
  );

  return response;
};
