import { FORM_CONSTRAINS } from "@modules/general/utils/formConstrains";
import { Curso, UsuarioCurso } from "@modules/materias/types/curso";
import { Materia } from "@modules/materias/types/materia";
import { Seccion } from "@modules/materias/types/seccion";
import { number, z } from "zod";


export const SeccionSchema: z.ZodType<Seccion> = z
  .object({
    id: FORM_CONSTRAINS.ID.optional(),
    titulo: FORM_CONSTRAINS.TEXT_LABEL,
    descripcion: FORM_CONSTRAINS.TEXT_DESCRIPTION,
    fechaDeCierre: FORM_CONSTRAINS.DATE,
    fechaDeInicio: FORM_CONSTRAINS.DATE,
    estado: z.enum(["A", "I"]),
    cursoId: z.string().optional(),
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


export const UsuarioCursoSchema: z.ZodType<UsuarioCurso> = z.object({
  id: FORM_CONSTRAINS.ID,
  nombre: FORM_CONSTRAINS.TEXT_LABEL,
  correo: FORM_CONSTRAINS.EMAIL.optional(),
  imagen: z.string(),
  estado: z.enum(["A", "I"]),
});

export const UsuarioCursoMinimalSchema: z.ZodType<Partial<UsuarioCurso>> = z.object({
  id: FORM_CONSTRAINS.ID,
  nombre: FORM_CONSTRAINS.TEXT_LABEL,
  correo: FORM_CONSTRAINS.EMAIL.optional(),
  imagen: z.string().optional(),
  estado: z.enum(["A", "I"]).optional(),
});

type UsuarioCursoMinimalSchema = z.infer<typeof UsuarioCursoMinimalSchema>

export const MateriaSchema: z.ZodType<Omit<Materia, 'cursos'> & {cursos?: CursoSchema[]}> = z.object({
  estado: z.enum(["A", "I"]),
  nombre: FORM_CONSTRAINS.TEXT_LABEL,
  semestre: z.number().refine((x)=> {
    return x <= 10 && x>=1;
  }, 'El semestre debe ser un valor numérico que se encuentre en el intervalo [1,10]'),
  id: FORM_CONSTRAINS.ID.optional(),
  cursos: z.array(z.lazy(() => CursoSchema)).optional(),
});

type NeoCurso = Omit<Curso, 'docente' | 'estudiantes'> & {docente?: UsuarioCursoMinimalSchema | null, estudiantes?: UsuarioCursoMinimalSchema[] | null};


export const CursoSchema: z.ZodType<NeoCurso> = z.object({
  id: z.string().optional(),
  grupo: FORM_CONSTRAINS.TEXT_LABEL,
  semestre: FORM_CONSTRAINS.TEXT_LABEL,
  descripcion: FORM_CONSTRAINS.TEXT_DESCRIPTION,
  estado: z.enum(["A", "I"]),
  docente: UsuarioCursoMinimalSchema.nullable().optional(),
  estudiantes: z.array(UsuarioCursoMinimalSchema).optional(),
  secciones: z.array(z.lazy(() => SeccionSchema)).optional(),
  materia: z.object({
    id: z.number().int().positive().nullable(),
    nombre: FORM_CONSTRAINS.TEXT_LABEL,
    semestre: FORM_CONSTRAINS.TEXT_LABEL,
    estado: FORM_CONSTRAINS.TEXT_LABEL,
  }).optional(),
});

export type CursoSchema = z.infer<typeof CursoSchema>