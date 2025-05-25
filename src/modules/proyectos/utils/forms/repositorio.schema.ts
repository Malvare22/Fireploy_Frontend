import { Repositorio } from "@modules/proyectos/types/repositorio";
import { z } from "zod";
import { UrlSchema } from "../../../materias/utils/forms/url.schema";
import { transformStringToKV } from "@modules/general/utils/string";
import { reservedVariables } from "../technologies";

/**
 * RepositorioSchema – Zod schema that validates a repository object, including its ID, URL, type ("B" = Backend, "F" = Frontend, "I" = Integrated), environment variables string (must be convertible to key-value pairs or empty), Docker metadata (technology, version, framework), and a display name for the technology.
 */
export const RepositorioSchema: z.ZodType<Repositorio> = z
  .object({
    id: z.number(),
    url: z.string(),
    tipo: z.enum(["B", "F", "I"], {
      message: "El tipo debe ser Backend, Frontend o de una capa",
    }),
    variables: z
      .string()
      .refine((variable) => {
        if (variable.length == 0) return true;
        const transformed = transformStringToKV(variable);
        const allRestringid = ([] as string[]).concat(
          [...reservedVariables.GENERAL],
          [...reservedVariables.NO_SQL],
          [...reservedVariables.SQL]
        );
        if (transformed) {
          console.log(transformed)
          return !transformed.some(({ clave }) => allRestringid.includes(clave));
        }
        return true;
      }, "Una o más variables coinciden con las que se encuentran restringidas"),
    informacion: z.object({
      tecnologia: z.string({ message: "Es obligatorio seleccionar una tecnología" }),
      framework: z.string({ message: "Es obligatorio seleccionar un framework" }),
    }),
    file: z.boolean().nullable().optional(),
  })
  .refine(
    (data) => {
      if (!data.file) {
        const urlCheck = UrlSchema.safeParse(data.url);
        return urlCheck.success;
      }
      else return true;
    },
    {
      message: "Lo ingresado no corresponde a un URL válida, ejemplo: https://www.google.com",
      path: ["url"]
    }
  );
