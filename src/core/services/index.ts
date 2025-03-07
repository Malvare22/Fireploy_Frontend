// import { config } from "@external/config";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

// Interfaz para la respuesta genérica
export interface ApiResponse<T> {
  data?: T;
  status?: number;
  message?: string;
  error?: {
    error: string;
    message: string[];
    statusCode: number;
  };
  statusCode?: number;
}

// Configuración de la instancia de Axios
const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_URL_BACKEND as string,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Función genérica para manejar peticiones
type MetodoConsulta = "get" | "post" | "put" | "delete" | "patch";
const fetchData = async <T>(
  method: MetodoConsulta,
  url: string,
  data?: unknown,
  params?: Record<string, unknown>,
  headers?: Record<string, string>
): Promise<ApiResponse<T>> => {
  try {
    console.log(headers)
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
    const response: ApiResponse<T> = await apiClient(config);
    return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(
      "Error en la petición:",
      error.response?.data || error.message
    );
    return { error: error.response?.data || error.message };
  }
};

export const getData = <T>(
  url: string,
  params?: Record<string, unknown>,
  headers?: Record<string, string>
) => fetchData<T>("get", url, undefined, params, headers);

export const postData = <T>(
  url: string,
  data: unknown,
  headers?: Record<string, string>
) => fetchData<T>("post", url, data, {}, headers);

export const putData = <T>(
  url: string,
  data: unknown,
  headers?: Record<string, string>
) => fetchData<T>("put", url, data, headers);

export const deleteData = <T>(url: string, headers: Record<string, string>) =>
  fetchData<T>("delete", url, headers);

export const patchData = <T>(
  url: string,
  data: unknown,
  headers?: Record<string, string>
) => fetchData<T>("patch", url, data, {}, headers);

export default apiClient;
