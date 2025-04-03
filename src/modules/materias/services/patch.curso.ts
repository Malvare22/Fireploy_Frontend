import { patchData } from "@core/services";
import { CursoService } from "../types/curso.service";
import { Curso } from "../types/curso";

export const patchEditCurso = async (token: string, data: Curso) => {
  const id = data.id || "";
  type Body = {
    descripcion: string;
    estado: string;
    docente: number | null;
  };

  const body: Body = {
    descripcion: data.descripcion,
    docente: data.docente?.id || null,
    estado: data.estado,
  };

  const response = await patchData<CursoService>(`/curso/${id}`, body, {
    sessiontoken: token,
  });

  return response;
};
