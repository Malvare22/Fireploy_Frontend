import axios from "axios";

/**
 * deleteProject – Realiza una solicitud HTTP DELETE para eliminar un proyecto por su ID.
 *
 * @async
 * @function
 * @param {string} token - Token de sesión del usuario autenticado. Se utiliza en el encabezado `sessiontoken`.
 * @param {number} projectId - ID del proyecto que se desea eliminar.
 * @returns {Promise<unknown | unknown[]>} Una promesa que resuelve con la respuesta del backend, que puede ser un objeto o un arreglo dependiendo de la implementación del servidor.
 *
 * @throws {AxiosError} Si la solicitud falla, se lanzará una excepción que debe ser capturada por el consumidor de esta función.
 *
 * @example
 * ```ts
 * try {
 *   const result = await deleteProject(userToken, 123);
 *   console.log("Proyecto eliminado:", result);
 * } catch (error) {
 *   console.error("Error al eliminar el proyecto:", error);
 * }
 * ```
 */
export async function deleteProject(
    token: string,
    projectId: number
): Promise<unknown | unknown[]> {

    const response = await axios({
        method: "delete",
        url: `${import.meta.env.VITE_URL_BACKEND}/proyecto/${projectId}`,
        headers: {
            sessiontoken: token,
        },
    }).then((response: unknown) => response);

    return response;
}