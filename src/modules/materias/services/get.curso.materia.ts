import { getData } from "@core/services";
import { MateriaService } from "../types/materia.service";

export const getCursosMateria = async (token: string, id: string) => {
  const response = await getData<MateriaService>(
    `/materia/${id}`,
    {
        materia: id
    },
    {
      sessiontoken: token,
    }
  );

  return response;
};