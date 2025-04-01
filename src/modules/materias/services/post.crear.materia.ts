import { postData } from "@core/services";
import { Materia } from "../types/materia";
import { MateriaService } from "../types/materia.service";

export const postCreateMateriaService = async (token: string, data: Materia) => {
  type Body = {
    nombre: string;
    semestre: string;
    estado: string;
  };

  const body: Body = {
    nombre: data.nombre,
    estado: data.estado as string,
    semestre: data.semestre.toString() as string,
  };

  const response = await postData<MateriaService>(`/materia`, body, {
    sessiontoken: token,
  });

  return response;
};
