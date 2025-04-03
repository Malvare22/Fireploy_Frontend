import { Curso, UsuarioCurso } from "@modules/materias/types/curso";
import { Materia } from "@modules/materias/types/materia";
import { Seccion } from "@modules/materias/types/seccion";
import { number, z } from "zod";

export const SeccionSchema: z.ZodType<Seccion> = z.object({
  id: z.number().min(1, "El ID es requerido").optional(),
  titulo: z.string().min(1, "El título es requerido"),
  descripcion: z.string().min(1, "La descripción es requerida"),
  fechaDeCierre: z.string().min(1, "La fecha de cierre es requerida"),
  fechaDeInicio: z.string().min(1, "La fecha de inicio es requerida"),
  estado: z.enum(["A", "I"]),
  cursoId: z.string().min(1, "El ID del curso es requerido"),
  proyectos: z.array(number()).optional()
});

export const UsuarioCursoSchema: z.ZodType<UsuarioCurso> = z.object({
  id: z.number().min(1, "El ID es requerido"),
  nombre: z.string().min(1, "El nombre es requerido"),
  correo: z.string().email("El correo debe ser válido").optional(),
});

export const EstudianteCurso = z.object({
  nombre: z.string(),
  id: z.number(),
  correo: z.string(),
  foto: z.string(),
  estado: z.enum(["A", "I"]),
});

export type EstudianteCurso = z.infer<typeof EstudianteCurso>;

export const MateriaSchema: z.ZodType<Materia> = z.object({
  estado: z.enum(["A", "I"]),
  nombre: z.string().min(1, "El nombre es requerido"),
  semestre: z.number(),
  id: z.number().int().positive("El ID debe ser un número positivo").optional(),
  cursos: z.array(z.lazy(() => CursoSchema)).optional(),
});

export const CursoSchema: z.ZodType<Curso> = z.object({
  id: z.string().optional(),
  grupo: z.string().min(1, "El grupo es requerido"),
  semestre: z.string().min(1, "El semestre es requerido"),
  descripcion: z.string().min(1, "La descripción es requerida"),
  estado: z.enum(["A", "I"]),
  docente: z
    .lazy(() => UsuarioCursoSchema)
    .nullable()
    .optional(),
  estudiantes: z.array(z.lazy(() => EstudianteCurso)).optional(),
  secciones: z.array(z.lazy(() => SeccionSchema)).optional(),
  materia: z
    .object({
      id: z.number().int().positive().nullable(),
      nombre: z.string().min(1, "El nombre de la materia es requerido"),
      semestre: z.string().min(1, "El semestre de la materia es requerido"),
      estado: z.string().min(1, "El estado de la materia es requerido"),
    })
    .optional(),
});
