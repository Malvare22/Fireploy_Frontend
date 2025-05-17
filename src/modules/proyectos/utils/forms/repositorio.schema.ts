import { Repositorio } from "@modules/proyectos/types/repositorio";
import { z } from "zod";
import { UrlSchema } from "../../../materias/utils/forms/url.schema";
import { transformStringToKV } from "@modules/general/utils/string";
import { reservedVariables } from "../technologies";

/**
 * RepositorioSchema – Zod schema that validates a repository object, including its ID, URL, type ("B" = Backend, "F" = Frontend, "I" = Integrated), environment variables string (must be convertible to key-value pairs or empty), Docker metadata (technology, version, framework), and a display name for the technology.
 */
export const RepositorioSchema: z.ZodType<Repositorio> = z.object({
  id: z.number(),
  url: UrlSchema,
  tipo: z.enum(["B", "F", "I"], {
    message: "El tipo debe ser Backend, Frontend o Monolito",
  }),
  variables: z
    .string()
    .refine((variable) => {
      return transformStringToKV(variable) || variable.length == 0;
    }, "Ingrese variables de entorno con una sintaxis válida (consulta manual de usuario)")
    .refine((variable) => {
      console.log(variable)
      if (variable.length == 0) return true;
      const transformed = transformStringToKV(variable);
      const allRestringid = ([] as string[]).concat(
        [...reservedVariables.GENERAL],
        [...reservedVariables.NO_SQL],
        [...reservedVariables.SQL]
      );
      if (transformed) {
        return !transformed.some(({ clave }) => allRestringid.includes(clave));
      }
      return true;
    }, "Una o más variables coinciden con las que se encuentran restringidas"),
  informacion: z.object({
    tecnologia: z.string({ message: "Es obligatorio seleccionar una tecnología" }),
    framework: z.string({ message: "Es obligatorio seleccionar un framework" }),
  }),
});
