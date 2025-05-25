import { MateriaInformacion, Proyecto } from "@modules/proyectos/types/proyecto.tipo";
import { z } from "zod";
import { RepositorioSchema } from "./repositorio.schema";
import { BaseDeDatosSchema } from "./baseDeDatos.schema";
import { FORM_CONSTRAINS } from "@modules/general/utils/formConstrains";
import { UsuarioCursoSchema } from "@modules/materias/utils/forms/form.schema";


/**
 * MateriaInformacionSchema – Zod schema to validate academic context information for a project, including section ID, subject ID, and course ID as numeric and string fields.
 */
export const MateriaInformacionSchema: z.ZodType<MateriaInformacion> = z.object({
  seccionId: z.number(),
  materiaId: z.number(),
  cursoId: z.string(),
});

/**
 * ProyectoSchema – Zod schema that validates a complete project structure (excluding favorite users), including title, optional description, URL, database info, optional repositories (backend, frontend, integrated), type ("M" = Modular, "S" = Simple), academic info, and list of participants.
 */
export const ProyectoSchema: z.ZodType<Omit<Proyecto, "fav_usuarios">> = z.object({
  titulo: FORM_CONSTRAINS.TEXT_LABEL,
  descripcion: FORM_CONSTRAINS.TEXT_DESCRIPTION.optional(),
  url: FORM_CONSTRAINS.URL,
  baseDeDatos: BaseDeDatosSchema,
  backend: RepositorioSchema.optional(),
  frontend: RepositorioSchema.optional(),
  integrado: RepositorioSchema.optional(),
  tipo: z.enum(["M", "S"]),
  materiaInformacion: MateriaInformacionSchema,
  integrantes: z.array(z.lazy(() => UsuarioCursoSchema)),
  imagen: z.string().nullable().optional(),
});

/**
 * ProyectoInformationSchema – Zod schema that validates project metadata: optional ID, title, optional description, academic info, and type ("M" = Modular, "S" = Simple).
 */
export const ProyectoInformationSchema: z.ZodType<
  Pick<Proyecto, "titulo" | "descripcion" | "materiaInformacion" | "tipo" | "id" | "imagen">
> = z.object({
  id: FORM_CONSTRAINS.ID.optional(),
  titulo: FORM_CONSTRAINS.TEXT_LABEL,
  descripcion: FORM_CONSTRAINS.TEXT_DESCRIPTION.optional(),
  materiaInformacion: MateriaInformacionSchema,
  tipo: z.enum(["M", "S"]),
  imagen: z.string().nullable().optional(),
});

/**
 * ProyectoRepositoriesSchema – Zod schema that validates the repository section of a project, allowing optional backend, frontend, and integrated repository data.
 */
export const ProyectoRepositoriesSchema: z.ZodType<
  Pick<Proyecto, "backend" | "frontend" | "integrado">
> = z.object({
  backend: RepositorioSchema.optional(),
  frontend: RepositorioSchema.optional(),
  integrado: RepositorioSchema.optional(),
});

/**
 * ProyectoSchema – Inferred type from ProyectoSchema, representing a validated full project object without favorite users.
 */
export type ProyectoSchema = z.infer<typeof ProyectoSchema>;

/**
 * ProyectoInformationSchema – Inferred type from ProyectoInformationSchema, representing validated project metadata for updates or display.
 */
export type ProyectoInformationSchema = z.infer<typeof ProyectoInformationSchema>;

/**
 * ProyectoRepositoriesSchema – Inferred type from ProyectoRepositoriesSchema, representing the repository-related part of a project.
 */
export type ProyectoRepositoriesSchema = z.infer<typeof ProyectoRepositoriesSchema>;
