import { UsuarioService } from "@modules/usuarios/types/services.usuario";

export type ProyectoService = {
  id: number;
  titulo: string;
  descripcion: string;
  calificacion: number;
  url: string;
  imagen: string | null;
  estado_proyecto: string;
  estado_ejecucion: string;
  fecha_creacion: string;
  estudiantes: UsuarioService[];
  seccion: {
    id: number;
    titulo: string;
    descripcion: string;
    fecha_inicio: string;
    fecha_fin: string;
    estado: string;
  };
  tutor: UsuarioService;
  repositorios: any[];
  base_de_datos: {
    id: number;
    tipo: string;
  };
};
