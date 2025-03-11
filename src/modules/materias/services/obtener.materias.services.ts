import { getData } from "@core/services";
import { MateriaService } from "../types/materia.service";

export const obtenerMateriasService = async (token: string) => {
  const response = await getData<MateriaService[]>(
    `/materia`,
    {},
    {
      sessiontoken: token,
    }
  );

  return response;
};
