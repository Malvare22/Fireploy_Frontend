// import { config } from "@external/config";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

/**
 *
 * Plantilla de las consultas HTTP (axios)
 * @export
 * @interface ApiResponse
 * @template T tipo de datos que va a retornar la consulta en caso de ser exitosa
 */
export interface ApiResponse<T> {
  data?: T;
  status?: number;
  message?: string;
  error?: {
    error: string;
    message: string;
    statusCode: number;
  };
  statusCode?: number;
}

/**
 * Configuración de la instancias de Axios para consultas
 */
const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_URL_BACKEND as string,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

type MetodoConsulta = "get" | "post" | "put" | "delete" | "patch";

/**
 * 
 * @param method tipo de método a aplicar
 * @param url enlace de la consulta
 * @param data información del body
 * @param params los respectivos params de la consulta
 * @param headers los respectivos headers de la consulta
 * @returns Una APIResponse con los errores e información posibles de la consulta
 */
export const fetchData = async <T>(
  method: MetodoConsulta,
  url: string,
  data?: unknown,
  params?: Record<string, unknown>,
  headers?: Record<string, string>
): Promise<T> => {
  try {
    const config: AxiosRequestConfig = {
      method,
      url,
      data,
      params,
      headers: {
        ...apiClient.defaults.headers.common,
        ...(headers || {}),
      },
    };

    const response = await apiClient<ApiResponse<T>>(config);

    const responseData = response;

    if (responseData.data.error) {
      throw {
        message: responseData.data.error.message || "Error en la API",
        statusCode: responseData.data.error.statusCode || 500,
      };
    }


    return responseData.data as T;
  } catch (error: any) {
    // Manejo de errores de red o de Axios
    const errData = error?.response?.data;
    throw {
      message: errData?.error?.message || errData?.message || error.message,
      statusCode: errData?.error?.statusCode || errData?.statusCode || error.response?.status || 500,
    };
  }
};

/**
 * Ejecución de Consultas de tipo Get
 * @param url enlace de la consulta
 * @param params los respectivos params de la consulta
 * @param headers los respectivos headers de la consulta
 * @returns Una APIResponse con los errores e información posibles de la consulta
 */
export const getData = <T>(
  url: string,
  params?: Record<string, unknown>,
  headers?: Record<string, string>
) => fetchData<T>("get", url, undefined, params, headers);

/**
 * Ejecución de Consultas de tipo Post
 * @param url enlace de la consulta
 * @param data información del body
 * @param headers los respectivos headers de la consulta
 * @returns Una APIResponse con los errores e información posibles de la consulta
 */
export const postData = <T>(
  url: string,
  data: unknown,
  headers?: Record<string, string>
) => fetchData<T>("post", url, data, {}, headers);

/**
 * Ejecución de Consultas de tipo Put
 * @param url enlace de la consulta
 * @param data información del body
 * @param headers los respectivos headers de la consultalos respectivos params de la consulta
 * @returns Una APIResponse con los errores e información posibles de la consulta
 */
export const putData = <T>(
  url: string,
  data: unknown,
  headers?: Record<string, string>
) => fetchData<T>("put", url, data, headers);

/**
 * Ejecución de Consultas de tipo Delete
 * @param url enlace de la consulta
 * @param headers los respectivos headers de la consultalos respectivos params de la consulta
 * @returns Una APIResponse con los errores e información posibles de la consulta
 */
export const deleteData = <T>(url: string, headers: Record<string, string>) =>
  fetchData<T>("delete", url, headers);

/**
 * Ejecución de Consultas de tipo Patch
 * @param url enlace de la consulta
 * @param data información del body
 * @param headers los respectivos headers de la consulta
 * @returns Una APIResponse con los errores e información posibles de la consulta
 */
export const patchData = <T>(
  url: string,
  data: unknown,
  headers?: Record<string, string>
) => fetchData<T>("patch", url, data, {}, headers);

export default apiClient;
