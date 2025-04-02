import { getData } from "@core/services";
import { CursoService } from "../types/curso.service";

export const getCursoByMateriaId = async (token: string, id: string) => {
  const response = await getData<CursoService[]>(
    `/curso`,
    {
      materia: id,
    },
    {
      sessiontoken: token,
    }
  );

  return response;
};

export const getCursoById = async (token: string, id: string) => {
  const response = await getData<CursoService>(
    `/curso/${id}`,
    {},
    {
      sessiontoken: token,
    }
  );

  return response;
};
