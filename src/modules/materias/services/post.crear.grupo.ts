import { postData } from "@core/services";
import { Curso } from "../types/curso";
import { CursoService } from "../types/curso.service";

export const postCreateCursoService = async (
  token: string,
  idMateria: number,
  data: Curso
) => {
  type Body = {
    grupo: string;
    semestre: string;
    descripcion: string;
    estado: string;
    docenteId?: number | null | undefined;
    materiaId: number;
  };

  const body = {
    descripcion: data.descripcion,
    docenteId: data.docente?.id ? parseInt(data.docente.id) : null,
    estado: data.estado,
    grupo: data.grupo,
    materiaId: idMateria,
    semestre: data.semestre,
  } as Body;

  const response = await postData<CursoService>(`/curso`, body, {
    sessiontoken: token,
  });

  return response;
};
