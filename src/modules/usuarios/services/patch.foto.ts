import { patchData } from "@core/services";
import { UsuarioService } from "../types/services.usuario";

export const patchUpdatePhotoService = async (
  token: string,
  id: number,
  imgFile: Blob
) => {
  const formData = new FormData();

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
