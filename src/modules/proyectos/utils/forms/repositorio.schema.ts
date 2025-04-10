import { Repositorio } from "@modules/proyectos/types/repositorio";
import { z } from "zod";
import { UrlSchema } from "../../../materias/utils/forms/url.schema";

export const RepositorioSchema: z.ZodType<Repositorio> = z.object({
  id: z.number().min(1, { message: "El ID debe ser un número positivo." }).optional(),
  proyecto: z
    .string(),
  url: UrlSchema,
  imagen: z.string().min(1, { message: "La imagen es obligatoria." }),
  tipo: z.enum(["B", "F", "I"], {
    message: "El tipo debe ser Backend, Frontend o Monolito",
  }),
  variables: z.array(
    z.object({
      nombre: z
        .string()
        .min(1, { message: "El nombre de la variable es obligatorio." }),
      valor: z
        .string()
        .min(1, { message: "El valor de la variable es obligatorio." }),
    })
  ),
  docker: z
    .object({
      tecnologia: z
        .string()
        .min(1, { message: "La tecnología es obligatoria." }),
      tag: z.string().min(1, { message: "El tag es obligatorio." }),
    }),
  dockerText: z.string()
});
