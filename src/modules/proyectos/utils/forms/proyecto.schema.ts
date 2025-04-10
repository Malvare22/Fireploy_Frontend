import { MateriaInformacion, Proyecto } from "@modules/proyectos/types/proyecto.tipo";
import { z } from "zod";
import { RepositorioSchema } from "./repositorio.schema";
import { BaseDeDatosSchema } from "./baseDeDatos.schema";
import { EstudianteCursoSchema } from "@modules/materias/utils/forms/form.schema";
import { StandardStringRequiredSchema } from "@modules/materias/utils/forms/string.schema";
import { UrlSchema } from "@modules/materias/utils/forms/url.schema";

export const MateriaInformacionSchema: z.ZodType<MateriaInformacion> = z.object({
  seccionId: z.number(),
  materiaId: z.number(),
  cursoId: z.string(),
});

export const ProyectoSchema: z.ZodType<Proyecto> = z.object({
  titulo: StandardStringRequiredSchema,
  descripcion: StandardStringRequiredSchema,
  url: UrlSchema,
  baseDeDatos: BaseDeDatosSchema,
  backend: RepositorioSchema.optional(),
  frontend: RepositorioSchema.optional(),
  integrado: RepositorioSchema.optional(),
  tipo: z.enum(["M", "D"]),
  materiaInformacion: MateriaInformacionSchema,
  integrantes: z.array(z.lazy(() => EstudianteCursoSchema)),
});

export const ProyectoInformationSchema: z.ZodType<
  Pick<Proyecto, "titulo" | "descripcion" | "materiaInformacion" | "tipo">
> = z.object({
  titulo: StandardStringRequiredSchema,
  descripcion: StandardStringRequiredSchema,
  materiaInformacion: MateriaInformacionSchema,
  tipo: z.enum(["M", "D"]),
});

export type ProyectoSchema = z.infer<typeof ProyectoSchema>;

export type ProyectoInformationSchema = z.infer<typeof ProyectoInformationSchema>;
