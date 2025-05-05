import { CursoService, SeccionesService } from "@modules/materias/types/curso.service";
import { MateriaService } from "@modules/materias/types/materia.service";
import { DataBaseService } from "./dabase.service";
import { UsuarioCurso } from "@modules/materias/types/curso";

export type ProyectoService = {
  id: number;
  titulo: string;
  descripcion: string | null;
  fav_usuarios: {
    estado: "A" | "I";
    id: number;
    nombre: string;
  }[];
  url: string;
  imagen: string | null;
  estado_proyecto: string;
  estado_ejecucion: string;
  puerto: number;
  fecha_creacion: string;
  tipo_proyecto: string;
  estudiantes: UsuarioCurso[];
  seccion?: SeccionesService & { curso: CursoService & { materia: MateriaService } };
  tutor: UsuarioCurso;
  repositorios: RepositorioService[];
  base_de_datos: DataBaseService;
  creador: UsuarioCurso;
};

export type RepositorioService = {
  proyecto: Partial<ProyectoService>;
  id: number;
  url: string | null;
  tipo: string;
  tecnologia: string | null;
  variables_de_entorno: string | null;
  version: string | null;
  framework: string | null;
};
