import { patchData } from "@core/services";
import { UsuarioService } from "../types/services.usuario";
import { urlToBlob } from "@modules/general/utils/urlToBlod";

export const subirImagenUsuario = async (
  id: number,
  token: string,
  imgUrl: string
) => {
  const formData = new FormData();

  const blob = urlToBlob(imgUrl);

  formData.append("image", blob, `${id}.png`);

  const response = await patchData<UsuarioService>(
    `/usuario/image/${id}`,
    formData,
    {
      sessiontoken: token,
    }
  );

  console.log(response);

  return response;
};
