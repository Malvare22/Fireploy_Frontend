import { UsuarioService } from "@modules/usuarios/types/services.usuario";
import { EstadoMateria } from "./materia.estado";
import { MateriaService } from "./materia.service";

export type CursoService = {
  id: string; //"6I2025-1 id materia - grupo - código",
  grupo: string;
  semestre: string;
  descripcion: string;
  estado: EstadoMateria;
  materia: MateriaService;
  docente: UsuarioService;
  estudiantes?: UsuarioService[];
};
