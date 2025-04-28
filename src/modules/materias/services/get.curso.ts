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

export const getCursosByIdStudent = async (token: string, id: number) => {
  const response = await getData<CursoService[]>(
    `/curso`,
    {
      estudiantes: id
    },
    {
      sessiontoken: token,
    }
  );

  return response;
};

export type GetCursoParams = {
  materia?: number,
  estudiantes?: number,
  docente?: number
}

export const getCursos = async (token: string, params: GetCursoParams) => {
  const response = await getData<CursoService[]>(
    `/curso`,
    params,
    {
      sessiontoken: token,
    }
  );

  return response;
};

