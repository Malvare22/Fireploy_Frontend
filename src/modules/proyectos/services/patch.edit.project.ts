import { patchData } from "@core/services";
import { ProyectoInformationSchema } from "../utils/forms/proyecto.schema";

interface Body {
  titulo: string;
  descripcion: string;
  seccionId: number;
}

export async function patchEditProject(token: string, project: ProyectoInformationSchema) {
  const body: Body = {
    titulo: project.titulo,
    descripcion: project.descripcion,
    seccionId: project.materiaInformacion.seccionId ?? -1,
  };
  const response = await patchData<unknown>(`/proyecto/${project.id}`, body, {
    sessiontoken: token,
  });

  return response;
}
