import { patchData } from "@core/services";
import { UsuarioService } from "../types/services.usuario";

export const patchSubirFotoPerfil = async (
  id: number,
  token: string,
  imgFile: Blob
) => {
  const formData = new FormData();

  console.log(imgFile)

  formData.append("image", imgFile, `${id}.png`);

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
