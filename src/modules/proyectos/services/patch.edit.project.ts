import { patchData } from "@core/services";

interface BodyEditProject {
  titulo?: string;
  descripcion?: string;
  seccionId?: number;
  imagen?: string | null;
  tipo_proyecto?: string;
  estado_proyecto?: string;
}

export async function patchEditProject(token: string,id: number, body: BodyEditProject) {

  const response = await patchData<unknown>(`/proyecto/${id}`, body, {
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

/**
 * patchEditImgProject function – updates the image associated with a project.
 *
 * This function uploads a new image for the given project by sending a PATCH request
 * with form data containing the image blob.
 *
 * @function
 *
 * @param token A string representing the session token used for authentication.
 * @param projectId A number that uniquely identifies the project whose image is being updated.
 * @param img A Blob object representing the image file to be uploaded.
 *
 * @returns A Promise that resolves with the API response after the image is updated.
 *
 * @example
 * ```ts
 * const imageBlob = new Blob([/* image data *\/], { type: "image/png" });
 * await patchEditImgProject(token, 3, imageBlob);
 * ```
 */
export async function patchEditImgProject(token: string, projectId: number, img: Blob) {
  const formData = new FormData();
  formData.append("image", img, `${projectId}.png`);
  const response = await patchData<unknown>(`/proyecto/image/${projectId}`, formData, {
    sessiontoken: token,
  });

  return response;
}
