import { Repositorio } from "@modules/proyectos/types/repositorio";
import { z } from "zod";
import { UrlSchema } from "../../../materias/utils/forms/url.schema";

export const RepositorioSchema: z.ZodType<Repositorio> = z.object({
  id: z.number(),
  proyecto: z
    .string().optional(),
  url: UrlSchema,
  tipo: z.enum(["B", "F", "I"], {
    message: "El tipo debe ser Backend, Frontend o Monolito",
  }),
  variables: z.string().optional(),
  docker: z
    .object({
      tecnologia: z
        .string(),
      tag: z.string(),
    }),
  dockerText: z.string()
});
