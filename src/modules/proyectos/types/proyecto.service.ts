import { CursoService, SeccionesService } from "@modules/materias/types/curso.service";
import { MateriaService } from "@modules/materias/types/materia.service";
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
  puerto: number;
  fecha_creacion: string;
  tipo_proyecto: string;
  estudiantes: UsuarioService[];
  seccion: SeccionesService & { curso: CursoService & { materia: MateriaService } };
  tutor: UsuarioService;
  repositorios: RepositorioService[];
  base_de_datos: any;
  creador: UsuarioService[];
};

export type RepositorioService = {
  proyecto: number;
  id: number;
  url: string | null;
  tipo: string;
  tecnologia: string | null;
  variables_de_entorno: string | null;
  version: string | null;
};
