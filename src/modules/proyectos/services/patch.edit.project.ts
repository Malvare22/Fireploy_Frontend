import { patchData } from "@core/services";
import { ProyectoInformationSchema } from "../utils/forms/proyecto.schema";

interface BodyEditProject {
  titulo: string;
  descripcion: string;
  seccionId: number;
}

export async function patchEditProject(token: string, project: ProyectoInformationSchema) {
  const body: BodyEditProject = {
    titulo: project.titulo,
    descripcion: project.descripcion,
    seccionId: project.materiaInformacion.seccionId ?? -1,
  };
  const response = await patchData<unknown>(`/proyecto/${project.id}`, body, {
    sessiontoken: token,
  });

  return response;
}

interface BodyAddMembers {
  estudiantesIds: number[];
}

export async function patchEditProjectMembers(token: string, projectId: number, users: number[]) {
  const body: BodyAddMembers = {
    estudiantesIds: users,
  };
  const response = await patchData<unknown>(`/proyecto/${projectId}`, body, {
    sessiontoken: token,
  });

  return response;
}
