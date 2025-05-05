import { postData } from "@core/services";

export const postCargaMasivaMaterias = async (token: string, file: File) => {

  const formData = new FormData;

  formData.append('file', file);

  const response = await postData<unknown>(
    `/materia/carga_masiva`,
    
      formData
    ,
    {
      sessiontoken: token,
    }
  );

  return response;
};