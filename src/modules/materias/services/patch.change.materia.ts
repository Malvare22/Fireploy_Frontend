import { patchData } from "@core/services";
import { MateriaService } from "../types/materia.service";

export const patchChangeStatusMateria = async (
  token: string,
  data: any,
  idMateria: number
) => {
  const response = await patchData<MateriaService>(
    `/materia/${idMateria}`,
    data,
    {
      sessiontoken: token,
    }
  );

  return response;
};
