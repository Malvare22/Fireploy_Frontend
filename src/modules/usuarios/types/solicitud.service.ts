import { EstadoUsuario } from "./usuario";

/**
 * Represents the structure of a `Solicitud` service response.
 * 
 * This type defines the details of a request (solicitud) in the context of the service.
 * It includes information about the state of the request, the user involved, approval details,
 * and optional course information. The `SolicitudService` type is typically used when interacting
 * with a backend service to retrieve or manipulate request data.
 * 
 * @type SolicitudService
 * 
 * @property {string} estado - The state of the request: "P" for pending, "A" for approved, or "R" for rejected.
 * @property {string} fecha_solicitud - The date when the request was made in ISO format (YYYY-MM-DDTHH:MM:SSZ).
 * @property {number} id - The unique identifier of the request.
 * @property {string | null} fecha_respuesta - The date of the response, if applicable, in ISO format (or `null` if no response yet).
 * @property {number} tipo_solicitud - The type of the request (usually corresponds to a category like role requests, etc.).
 * @property {object} usuario - The user making the request.
 * @property {EstadoUsuario} usuario.estado - The current status of the user making the request (e.g., active, inactive).
 * @property {number} usuario.id - The unique identifier of the user.
 * @property {string} usuario.nombre - The name of the user.
 * @property {object | null} aprobado_by - The user who approved the request, if applicable.
 * @property {string} aprobado_by.estado - The status of the user who approved the request.
 * @property {number} aprobado_by.id - The unique identifier of the user who approved the request.
 * @property {string} aprobado_by.nombre - The name of the user who approved the request.
 * @property {object | null} curso - The course associated with the request, if applicable.
 * @property {string} curso.id - The unique identifier of the course.
 * 
 * @example
 * const solicitudService: SolicitudService = {
 *   estado: "P",
 *   fecha_solicitud: "2024-03-28T12:00:00Z",
 *   id: 1,
 *   fecha_respuesta: null,
 *   tipo_solicitud: 1,
 *   usuario: {
 *     estado: "active",
 *     id: 123,
 *     nombre: "Juan Pérez",
 *   },
 *   aprobado_by: null,
 *   curso: null,
 * };
 */
export type SolicitudService = {
  estado: "P" | "A" | 'R';
  fecha_solicitud: string;
  id: number;
  fecha_respuesta: null | string;
  tipo_solicitud: number;
  usuario: {
    estado: EstadoUsuario;
    id: number;
    nombre: string;
  };
  aprobado_by: null | {
    estado: string;
    id: number;
    nombre: string;
  };
  curso: null | {
    id: string
  }
};
