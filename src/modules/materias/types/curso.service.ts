import { UsuarioService } from "@modules/usuarios/types/services.usuario";
import { MateriaService } from "./materia.service";
import { EstadoMateria } from "./materia";

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
