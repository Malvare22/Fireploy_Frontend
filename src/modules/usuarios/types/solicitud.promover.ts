/**
 * Represents a request (solicitud) made by a user.
 * 
 * This type defines the structure of a `Solicitud` object, which contains details about the request,
 * the user making the request, the state of the request, and additional optional properties like
 * the course related to the request and who approved it (if applicable).
 * 
 * @type Solicitud
 * 
 * @property {number} id - The unique identifier of the request.
 * @property {object} usuario - The user making the request.
 * @property {string} usuario.nombres - The full name of the user.
 * @property {string} usuario.id - The unique identifier of the user.
 * @property {string} usuario.fechaRecepcion - The reception date of the request in ISO format (YYYY-MM-DDTHH:MM:SSZ).
 * @property {string | null} usuario.fechaAceptacion - The acceptance date of the request, if available, in ISO format.
 * @property {string} estado - The state of the request: "A" for approved, "P" for pending, or "R" for rejected.
 * @property {string | null} aprobadoPor - The name of the user who approved the request, or `null` if not approved yet.
 * @property {string | null} curso - The course related to the request, if applicable, or `null` if not specified.
 * 
 * @example
 * const solicitud: Solicitud = {
 *   id: 1,
 *   usuario: {
 *     nombres: "Juan Pérez",
 *     id: "USR001",
 *     fechaRecepcion: "2024-03-28T12:00:00Z",
 *     fechaAceptacion: null,
 *   },
 *   estado: "P",
 *   aprobadoPor: null,
 *   curso: null,
 * };
 */
export type Solicitud = {
  id: number;
  usuario: {
    nombres: string;
    id: string;
    fechaRecepcion: string;
    fechaAceptacion: null | string;
  };
  estado: "A" | "P" | "R";
  aprobadoPor: string | null;
  curso: string | null;
};

/**
 * Retrieves unique values of dates from a list of solicitudes based on a specified key.
 * 
 * This function takes an array of `Solicitud` objects and extracts unique values of the specified
 * key from the `usuario` object, such as `fechaRecepcion` or `fechaAceptacion`.
 * 
 * @function getDatesSolicitudes
 * 
 * @param {Solicitud[]} x - The list of `Solicitud` objects.
 * @param {keyof Solicitud["usuario"]} key - The key to extract values from within the `usuario` object (e.g., `fechaRecepcion`).
 * 
 * @returns {string[]} - An array of unique date strings.
 * 
 * @example
 * const uniqueDates = getDatesSolicitudes(exampleSolicitudes, "fechaRecepcion");
 * console.log(uniqueDates); // Output: ["2024-03-28T12:00:00Z", "2024-03-27T15:30:00Z", "2024-03-26T09:45:00Z", "2024-03-25T18:20:00Z"]
 */
export function getDatesSolicitudes(x: Solicitud[], key: keyof Solicitud["usuario"]): string[] {
  const set = new Set<string>();
  x.forEach((y) => {
    if (y.usuario[key]) set.add(y.usuario[key]);
  });

  return Array.from(set);
}

export const exampleSolicitudes: Solicitud[] = [
  {
    id: 1,
    usuario: {
      nombres: "Juan Pérez",
      id: "USR001",
      fechaRecepcion: "2024-03-28T12:00:00Z",
      fechaAceptacion: null,
    },
    estado: "P",
    aprobadoPor: null,
    curso: null,
  },
  {
    id: 2,
    usuario: {
      nombres: "María González",
      id: "USR002",
      fechaRecepcion: "2024-03-27T15:30:00Z",
      fechaAceptacion: "2024-03-27T15:30:00Z",
    },
    estado: "A",
    aprobadoPor: "Admin1 Jaime enrique Acevedo",
    curso: null,
  },
  {
    id: 3,
    usuario: {
      nombres: "Carlos Ramírez",
      id: "USR003",
      fechaRecepcion: "2024-03-26T09:45:00Z",
      fechaAceptacion: null,
    },
    estado: "P",
    aprobadoPor: null,
    curso: null,
  },
  {
    id: 4,
    usuario: {
      nombres: "Ana López",
      id: "USR004",
      fechaRecepcion: "2024-03-25T18:20:00Z",
      fechaAceptacion: "2024-03-27T15:30:00Z",
    },
    estado: "A",
    aprobadoPor: "Admin2",
    curso: null,
  },
  {
    id: 5,
    usuario: {
      nombres: "Ana López",
      id: "USR004",
      fechaRecepcion: "2024-03-25T18:20:00Z",
      fechaAceptacion: null,
    },
    estado: "R",
    aprobadoPor: null,
    curso: null,
  },
];
