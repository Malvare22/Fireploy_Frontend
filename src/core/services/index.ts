import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

/**
 * Template for handling HTTP responses using Axios.
 *
 * @export
 * @interface ApiResponse
 * @template T - Type of data expected in a successful response.
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
 * Axios instance configuration for making HTTP requests.
 *
 * @constant {AxiosInstance} apiClient - Axios client with default settings.
 */
const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_URL_BACKEND as string,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

type MetodoConsulta = "get" | "post" | "put" | "delete" | "patch";

/**
 * Generic function for executing HTTP requests using Axios.
 *
 * @template T - Type of the expected response data.
 * @param {MetodoConsulta} method - HTTP method to be used.
 * @param {string} url - Endpoint URL for the request.
 * @param {unknown} [data] - Optional request body data.
 * @param {Record<string, unknown>} [params] - Optional query parameters.
 * @param {Record<string, string>} [headers] - Optional request headers.
 * @returns {Promise<T>} - Promise resolving with the response data or throwing an error.
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
        message: responseData.data.error.message || "API error",
        statusCode: responseData.data.error.statusCode || 500,
      };
    }

    return responseData.data as T;
  } catch (error: any) {
    // Error handling for network or Axios-related errors
    const errData = error?.response?.data;
    throw {
      message: errData?.error?.message || errData?.message || error.message,
      statusCode:
        errData?.error?.statusCode || errData?.statusCode || error.response?.status || 500,
    };
  }
};

/**
 * Executes a GET request.
 *
 * @template T - Type of the expected response data.
 * @param {string} url - Endpoint URL for the request.
 * @param {Record<string, unknown>} [params] - Optional query parameters.
 * @param {Record<string, string>} [headers] - Optional request headers.
 * @returns {Promise<T>} - Response data.
 */
export const getData = <T>(
  url: string,
  params?: Record<string, unknown>,
  headers?: Record<string, string>
) => fetchData<T>("get", url, undefined, params, headers);

/**
 * Executes a POST request.
 *
 * @template T - Type of the expected response data.
 * @param {string} url - Endpoint URL for the request.
 * @param {unknown} data - Request body data.
 * @param {Record<string, string>} [headers] - Optional request headers.
 * @returns {Promise<T>} - Response data.
 */
export const postData = <T>(url: string, data: unknown, headers?: Record<string, string>) =>
  fetchData<T>("post", url, data, {}, headers);

/**
 * Executes a PUT request.
 *
 * @template T - Type of the expected response data.
 * @param {string} url - Endpoint URL for the request.
 * @param {unknown} data - Request body data.
 * @param {Record<string, string>} [headers] - Optional request headers.
 * @returns {Promise<T>} - Response data.
 */
export const putData = <T>(url: string, data: unknown, headers?: Record<string, string>) =>
  fetchData<T>("put", url, data, headers);

/**
 * Executes a DELETE request.
 *
 * @template T - Type of the expected response data.
 * @param {string} url - Endpoint URL for the request.
 * @param {Record<string, string>} headers - Request headers.
 * @returns {Promise<T>} - Response data.
 */
export const deleteData = <T>(url: string, headers: Record<string, string>) =>
  fetchData<T>("delete", url, headers);

/**
 * Executes a PATCH request.
 *
 * @template T - Type of the expected response data.
 * @param {string} url - Endpoint URL for the request.
 * @param {unknown} data - Request body data.
 * @param {Record<string, string>} [headers] - Optional request headers.
 * @returns {Promise<T>} - Response data.
 */
export const patchData = <T>(url: string, data: unknown, headers?: Record<string, string>) =>
  fetchData<T>("patch", url, data, {}, headers);

/**
 * Default Axios client export.
 *
 * @default
 */
export default apiClient;
