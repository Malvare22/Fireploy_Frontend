import { UsuarioService } from "@modules/usuarios/types/services.usuario";
import { MateriaService } from "./materia.service";
import { Curso } from "./curso";

export type CursoService = {
  id: string;
  grupo: string;
  semestre: string;
  descripcion: string;
  estado: Curso['estado'];
  materia: MateriaService;
  docente: UsuarioService | null;
  estudiantes: UsuarioService[];
};
