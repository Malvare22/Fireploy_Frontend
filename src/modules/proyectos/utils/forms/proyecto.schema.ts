import { MateriaInformacion, Proyecto } from "@modules/proyectos/types/proyecto.tipo";
import { z } from "zod";
import { RepositorioSchema } from "./repositorio.schema";
import { BaseDeDatosSchema } from "./baseDeDatos.schema";
import { DescriptionStringSchema, StandardStringRequiredSchema } from "@modules/materias/utils/forms/string.schema";
import { UrlSchema } from "@modules/materias/utils/forms/url.schema";
import { UsuarioCursoSchema } from "@modules/materias/utils/forms/form.schema";

export const MateriaInformacionSchema: z.ZodType<MateriaInformacion> = z.object({
  seccionId: z.number(),
  materiaId: z.number(),
  cursoId: z.string(),
});

export const ProyectoSchema: z.ZodType<Omit<Proyecto, 'fav_usuarios'>> = z.object({
  titulo: StandardStringRequiredSchema,
  descripcion: DescriptionStringSchema.optional(),
  url: UrlSchema,
  baseDeDatos: BaseDeDatosSchema,
  backend: RepositorioSchema.optional(),
  frontend: RepositorioSchema.optional(),
  integrado: RepositorioSchema.optional(),
  tipo: z.enum(["M", "S"]),
  materiaInformacion: MateriaInformacionSchema,
  integrantes: z.array(z.lazy(() => UsuarioCursoSchema)),
});

export const ProyectoInformationSchema: z.ZodType<
  Pick<Proyecto, "titulo" | "descripcion" | "materiaInformacion" | "tipo" | "id">
> = z.object({
  id: z.number().optional(),
  titulo: StandardStringRequiredSchema,
  descripcion: DescriptionStringSchema.optional(),
  materiaInformacion: MateriaInformacionSchema,
  tipo: z.enum(["M", "S"]),
});

export const ProyectoRepositoriesSchema: z.ZodType<
  Pick<Proyecto, "backend" | "frontend" | "integrado">
> = z.object({
  backend: RepositorioSchema.optional(),
  frontend: RepositorioSchema.optional(),
  integrado: RepositorioSchema.optional(),
});

export type ProyectoSchema = z.infer<typeof ProyectoSchema>;

export type ProyectoInformationSchema = z.infer<typeof ProyectoInformationSchema>;

export type ProyectoRepositoriesSchema = z.infer<typeof ProyectoRepositoriesSchema>;
