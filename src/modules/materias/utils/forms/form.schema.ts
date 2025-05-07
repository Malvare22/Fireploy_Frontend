import { Curso, UsuarioCurso } from "@modules/materias/types/curso";
import { Materia } from "@modules/materias/types/materia";
import { Seccion } from "@modules/materias/types/seccion";
import { number, z } from "zod";

/**
 * SeccionSchema – Zod schema for validating `Seccion` objects.
 * This schema ensures that the section has a valid ID, title, description, start and end dates, 
 * state, associated course ID, and optional project IDs. 
 * It also validates that the start date is less than or equal to the end date.
 * 
 * @constant
 * @type {z.ZodType<Seccion>}
 * 
 * @example
 * const validSeccion = SeccionSchema.parse({
 *   id: 1,
 *   titulo: "Introduction to Programming",
 *   descripcion: "Basic programming concepts.",
 *   fechaDeCierre: "2024-04-01",
 *   fechaDeInicio: "2024-03-01",
 *   estado: "A",
 *   cursoId: "CURSO-101",
 * });
 */
export const SeccionSchema: z.ZodType<Seccion> = z
  .object({
    id: z.number().min(-1, "El ID es requerido").optional(),
    titulo: z.string().min(1, "El título es requerido"),
    descripcion: z.string().min(1, "La descripción es requerida"),
    fechaDeCierre: z.string().min(1, "La fecha de cierre es requerida"),
    fechaDeInicio: z.string().min(1, "La fecha de inicio es requerida"),
    estado: z.enum(["A", "I"]),
    cursoId: z.string().min(1, "El ID del curso es requerido").optional(),
    proyectos: z.array(number()).optional(),
  })
  .refine((data) => data.fechaDeInicio <= data.fechaDeCierre, {
    message: "La fecha de inicio debe ser menor o igual que la fecha de cierre",
    path: ["fechaDeInicio"],
  });

/**
 * SeccionesSchema – Zod schema for validating an array of `Seccion` objects.
 * This schema ensures that the `secciones` property is an array of valid sections.
 * 
 * @constant
 * @type {z.ZodType<SeccionesSchema>}
 */
export const SeccionesSchema = z.object({
  secciones: z.array(z.lazy(() => SeccionSchema)).optional(),
});

export type SeccionesSchema = z.infer<typeof SeccionesSchema>;

/**
 * UsuarioCursoSchema – Zod schema for validating `UsuarioCurso` objects.
 * This schema ensures that the user has a valid ID, name, email (optional), profile image,
 * and a valid state (`A` for active or `I` for inactive).
 * 
 * @constant
 * @type {z.ZodType<UsuarioCurso>}
 * 
 * @example
 * const validUsuarioCurso = UsuarioCursoSchema.parse({
 *   id: 1,
 *   nombre: "Juan Pérez",
 *   correo: "juan.perez@example.com",
 *   imagen: "path/to/image.jpg",
 *   estado: "A",
 * });
 */
export const UsuarioCursoSchema: z.ZodType<UsuarioCurso> = z.object({
  id: z.number().min(1, "El ID es requerido"),
  nombre: z.string().min(1, "El nombre es requerido"),
  correo: z.string().email("El correo debe ser válido").optional(),
  imagen: z.string(),
  estado: z.enum(["A", "I"]),

});

/**
 * MateriaSchema – Zod schema for validating `Materia` objects.
 * This schema ensures that the subject has a valid state, name, semester, ID (optional),
 * and a list of associated courses.
 * 
 * @constant
 * @type {z.ZodType<Materia>}
 */
export const MateriaSchema: z.ZodType<Materia> = z.object({
  estado: z.enum(["A", "I"]),
  nombre: z.string().min(1, "El nombre es requerido"),
  semestre: z.number(),
  id: z.number().int().positive("El ID debe ser un número positivo").optional(),
  cursos: z.array(z.lazy(() => CursoSchema)).optional(),
});

/**
 * CursoSchema – Zod schema for validating `Curso` objects.
 * This schema ensures that the course has a valid group, semester, description, state, 
 * optional instructor, list of students, sections, and associated subject information.
 * 
 * @constant
 * @type {z.ZodType<Curso>}
 */
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
  estudiantes: z.array(z.lazy(() => UsuarioCursoSchema)).optional(),
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
