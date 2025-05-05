import { Repositorio } from "@modules/proyectos/types/repositorio";
import { z } from "zod";
import { UrlSchema } from "../../../materias/utils/forms/url.schema";
import { transformStringToKV } from "@modules/general/utils/string";

export const RepositorioSchema: z.ZodType<Repositorio> = z.object({
  id: z.number(),
  url: UrlSchema,
  tipo: z.enum(["B", "F", "I"], {
    message: "El tipo debe ser Backend, Frontend o Monolito",
  }),
  variables: z.string().refine((variable) => {
    return transformStringToKV(variable) || variable.length == 0;
  }, "Ingrese variables de entorno con una sintaxis válida (consulta manual de usuario)"),
  docker: z.object({
    tecnologia: z.string(),
    version: z.string(),
    framework: z.string()
  }),
  tecnologyToShow: z.string(),
});
