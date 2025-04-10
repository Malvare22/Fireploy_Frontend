import { MateriaInformacion, Proyecto } from "@modules/proyectos/types/proyecto.tipo";
import { array, z } from "zod";
import { RepositorioSchema } from "./repositorio.schema";
import { BaseDeDatosSchema } from "./baseDeDatos.schema";
import { EstudianteCursoSchema } from "@modules/materias/utils/forms/form.schema";

export const MateriaInformacionSchema: z.ZodType<MateriaInformacion> = z.object({
  seccionId: z.string(),
  materiaId: z.string(),
  cursoId: z.string(),
});

export const ProyectoSchema: z.ZodType<Proyecto> = z.object({
  titulo: z.string(),
  descripcion: z.string(),
  url: z.string(),
  baseDeDatos: BaseDeDatosSchema,
  backend: RepositorioSchema.optional(),
  frontend: RepositorioSchema.optional(),
  integrado: RepositorioSchema.optional(),
  materiaInformacion: MateriaInformacionSchema,
  colaboradores:  z.array(z.lazy(() => EstudianteCursoSchema)),
  
});
