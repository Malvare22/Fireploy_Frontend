import { Repositorio } from "@modules/proyectos/types/repositorio";
import { z } from "zod";
import { transformStringToKV } from "@modules/general/utils/string";
import { frameworkValidation, TECNOLOGIES } from "../technologies";
import { FORM_CONSTRAINS } from "@modules/general/utils/formConstrains";

export const RepositorioSchema: z.ZodType<Omit<Repositorio, 'ficheros'>> = z
  .object({
    id: z.number(),
    url: z.string(),
    tipo: z.enum(["B", "F", "I"], {
      message: "El tipo debe ser Backend, Frontend o de una capa",
    }),
    variables: z
      .string(),
    informacion: z.object({
      tecnologia: z.string({ message: "Es obligatorio seleccionar una tecnología" }),
      framework: z.string({ message: "Es obligatorio seleccionar un framework" }),
    }),
    file: z.boolean().nullable().optional(),
  })
  .refine(
    (data) => {
      if (!data.file) {
        const urlCheck = FORM_CONSTRAINS.URL.safeParse(data.url);
        return urlCheck.success;
      }
      else return true;
    },
    {
      message: "Lo ingresado no corresponde a un URL válida, ejemplo: https://www.google.com",
      path: ["url"]
    }
  ).refine((data) => {
    if (data.variables.length == 0) return true;
    const transformed = transformStringToKV(data.variables);

    if (transformed) {
      return frameworkValidation(data.informacion.framework as TECNOLOGIES, transformed.map(({ clave }) => clave));
    }
    return true;
  }, {
    message: "Una o más variables coinciden con las que se encuentran restringidas o presentan errores de sintaxis",
    path: ["variables"]
  });

export type RepositorioSchema = z.infer<typeof RepositorioSchema>

