import { Repositorio } from "@modules/proyectos/types/repositorio";
import { z } from "zod";
import { UrlSchema } from "../../../materias/utils/forms/url.schema";
import { transformStringToKV } from "@modules/general/utils/string";

/**
 * RepositorioSchema – Zod schema that validates a repository object, including its ID, URL, type ("B" = Backend, "F" = Frontend, "I" = Integrated), environment variables string (must be convertible to key-value pairs or empty), Docker metadata (technology, version, framework), and a display name for the technology.
 */
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
});
