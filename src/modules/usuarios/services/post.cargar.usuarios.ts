import { postData } from "@core/services";

export const postCargaMasivaUsuarios = async (token: string, file: File) => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await postData<unknown>(
    `/usuario/carga_masiva`,
    formData,
    {
      sessiontoken: token,
    }
  );

  return response;
};
