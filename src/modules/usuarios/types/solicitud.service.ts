import { EstadoUsuario } from "./usuario";

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
};
