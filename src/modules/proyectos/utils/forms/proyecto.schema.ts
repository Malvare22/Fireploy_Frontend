import {
  MateriaInformacion,
  Proyecto,
} from "@modules/proyectos/types/proyecto.tipo";
import { z } from "zod";
import { RepositorioSchema } from "./repositorio.schema";
import { BaseDeDatosSchema } from "./baseDeDatos.schema";
import {
  FORM_CONSTRAINS,
  MESSAGE_ERRORS,
} from "@modules/general/utils/formConstrains";
import { UsuarioCursoSchema } from "@modules/materias/utils/forms/form.schema";

/**
 * MateriaInformacionSchema – Zod schema to validate academic context information for a project.
 * 
 * Includes:
 * - Section ID as a number.
 * - Subject ID as a number.
 * - Course ID as a string.
 */
export const MateriaInformacionSchema: z.ZodType<MateriaInformacion> = z.object(
  {
    seccionId: z.number({ message: MESSAGE_ERRORS.REQUIRED }),
    materiaId: z.number({ message: MESSAGE_ERRORS.REQUIRED }),
    cursoId: z.string({ message: MESSAGE_ERRORS.REQUIRED }),
  }
);

/**
 * ProyectoSchema – Zod schema that validates the full structure of a project, excluding favorite users.
 * 
 * Includes:
 * - Title, optional description, and project URL.
 * - Database details.
 * - Optional backend, frontend, and integrated repositories.
 * - Project type: "M" for Modular, "S" for Simple.
 * - Academic information for the associated subject.
 * - List of project participants.
 * - Optional image.
 */
export const ProyectoSchema: z.ZodType<Omit<Proyecto, "fav_usuarios">> =
  z.object({
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
 * ProyectoInformationSchema – Zod schema that validates only the metadata of a project.
 * 
 * Includes:
 * - Optional ID.
 * - Title and optional description.
 * - Academic information (section, subject, and course).
 * - Project type: "M" for Modular, "S" for Simple.
 * - Optional image.
 */
export const ProyectoInformationSchema: z.ZodType<
  Pick<
    Proyecto,
    "titulo" | "descripcion" | "materiaInformacion" | "tipo" | "id" | "imagen"
  >
> = z.object({
  id: FORM_CONSTRAINS.ID.optional(),
  titulo: FORM_CONSTRAINS.TEXT_LABEL,
  descripcion: FORM_CONSTRAINS.TEXT_DESCRIPTION.optional(),
  materiaInformacion: MateriaInformacionSchema,
  tipo: z.enum(["M", "S"]),
  imagen: z.string().nullable().optional(),
});

/**
 * ProyectoRepositoriesSchema – Zod schema that validates the repository section of a project.
 * 
 * Allows:
 * - Optional backend repository.
 * - Optional frontend repository.
 * - Optional integrated repository.
 */
export const ProyectoRepositoriesSchema: z.ZodType<
  Pick<Proyecto, "backend" | "frontend" | "integrado">
> = z.object({
  backend: RepositorioSchema.optional(),
  frontend: RepositorioSchema.optional(),
  integrado: RepositorioSchema.optional(),
});

/**
 * ProyectoSchema – Inferred type from ProyectoSchema Zod schema.
 * 
 * Represents a validated complete project object excluding favorite users.
 */
export type ProyectoSchema = z.infer<typeof ProyectoSchema>;

/**
 * ProyectoInformationSchema – Inferred type from ProyectoInformationSchema Zod schema.
 * 
 * Represents the validated metadata of a project, suitable for display or partial updates.
 */
export type ProyectoInformationSchema = z.infer<
  typeof ProyectoInformationSchema
>;

/**
 * ProyectoRepositoriesSchema – Inferred type from ProyectoRepositoriesSchema Zod schema.
 * 
 * Represents the part of the project that holds repository information, with optional fields.
 */
export type ProyectoRepositoriesSchema = z.infer<
  typeof ProyectoRepositoriesSchema
>;
