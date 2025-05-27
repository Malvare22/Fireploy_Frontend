import axios from "axios";

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