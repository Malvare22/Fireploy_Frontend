import { Repositorio } from "@modules/proyectos/types/repositorio";
import { z } from "zod";

export const RepositorioSchema: z.ZodType<Repositorio> = z.object({
  id: z.number().min(1, { message: "El ID debe ser un número positivo." }).optional(),
  proyecto: z
    .string(),
  url: z.string().url({ message: "La URL debe ser válida." }),
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
