import { patchData } from "@core/services";
import { Materia } from "../types/materia";
import { MateriaService } from "../types/materia.service";

export const postEditMateriaService = async (token: string, data: Materia) => {
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
  console.log('AAA', data)
  const response = await patchData<MateriaService>(`/materia/${data.id}`, body, {
    sessiontoken: token,
  });

  return response;
};
