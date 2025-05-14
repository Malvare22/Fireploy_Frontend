import { patchData } from "@core/services";
import { ProyectoInformationSchema } from "../utils/forms/proyecto.schema";

interface BodyEditProject {
  titulo: string;
  descripcion: string;
  seccionId: number;
}

/**
 * patchEditProject function – Edits the details of an existing project.
 *
 * This function allows you to update the project details, including its title,
 * description, and section ID. It sends a PATCH request to the API to modify the
 * specified project.
 *
 * @param {string} token - The authentication token for the session.
 * @param {ProyectoInformationSchema} project - The project information to update.
 *
 * @returns {Promise<unknown>} A promise that resolves with the response from the PATCH request.
 *
 * @example
 * const updatedProject = await patchEditProject(token, project);
 * console.log('Project updated:', updatedProject);
 */
export async function patchEditProject(token: string, project: ProyectoInformationSchema) {
  const body: BodyEditProject = {
    titulo: project.titulo,
    descripcion: project.descripcion || "",
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

/**
 * patchEditProjectMembers function – Adds or removes members from a project.
 *
 * This function modifies the members of a project by adding or removing students
 * based on the provided user IDs. It sends a PATCH request to the API to update the
 * project's members.
 *
 * @param {string} token - The authentication token for the session.
 * @param {number} projectId - The ID of the project to update.
 * @param {number[]} users - An array of student IDs to be added or removed from the project.
 *
 * @returns {Promise<unknown>} A promise that resolves with the response from the PATCH request.
 *
 * @example
 * const updatedMembers = await patchEditProjectMembers(token, projectId, [1, 2, 3]);
 * console.log('Project members updated:', updatedMembers);
 */
export async function patchEditProjectMembers(token: string, projectId: number, users: number[]) {
  const body: BodyAddMembers = {
    estudiantesIds: users,
  };
  const response = await patchData<unknown>(`/proyecto/${projectId}`, body, {
    sessiontoken: token,
  });

  return response;
}

export async function patchEditImgProject(token: string, projectId: number, img: Blob) {
  const formData = new FormData();
  formData.append("image", img, `${projectId}.png`);
  const response = await patchData<unknown>(`/proyecto/image/${projectId}`, formData, {
    sessiontoken: token,
  });

  return response;
}
