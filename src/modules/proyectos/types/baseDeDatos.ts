import { ProyectoService } from "./proyecto.service";

export type BaseDeDatos = {
  proyecto?: Pick<ProyectoService, 'titulo' | 'estado_proyecto'> | null;
  id?: number | undefined;
  proyectoId?: number | undefined;
  nombre: string;
  contrasenia: string;
  url?: string,
  tipo: "S" | "N" | "E";
};
