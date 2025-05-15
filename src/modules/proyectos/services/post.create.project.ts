import { postData } from "@core/services";
import { ProyectoInformationSchema } from "../utils/forms/proyecto.schema";

interface Body {
  titulo: string;
  descripcion: string;
  seccionId: string;
  tipo_proyecto: "S" | "M";

}

/**
 * Creates a new project by sending a POST request to the server.
 * 
 * This function allows users to create a new project by sending the project details in a request.
 * It requires the session token for authentication and a `ProyectoInformationSchema` object that contains
 * the project details. The function sends the data to the server and returns the project ID in the response.
 * 
 * @param {string} token - The session token used for authentication in the request header.
 * @param {ProyectoInformationSchema} project - The project schema object containing the details to create the project.
 * 
 * @returns {Promise<{id: number}>} A promise that resolves to the server's response, which includes the project ID.
 * 
 * @example
 * ```ts
 * const response = await postCreateProject(token, {
 *   titulo: "New Project",
 *   descripcion: "A description of the new project",
 *   materiaInformacion: { seccionId: 123 },
 *   tipo: "S"
 * });
 * console.log(response.id); // The ID of the created project
 * ```
 */
export async function postCreateProject(token: string, project: ProyectoInformationSchema) {
  const body: Body = {
    titulo: project.titulo,
    descripcion: project.descripcion || '',
    seccionId: project.materiaInformacion.seccionId?.toString() ?? "-1",
    tipo_proyecto: project.tipo,
  };
  const response = await postData<{id: number}>(`/proyecto`, body, {
    sessiontoken: token,
  });

  return response;
}
