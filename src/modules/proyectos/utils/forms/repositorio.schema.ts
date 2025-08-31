import { Repositorio } from "@modules/proyectos/types/repositorio";
import { z } from "zod";
import { transformStringToKV } from "@modules/general/utils/string";
import { frameworkValidation, TECNOLOGIES } from "../technologies";

/**
 * RepositorioSchema – Zod schema used to validate a project repository object (excluding associated files).
 * 
 * Validates the following fields:
 * - `id`: Numeric identifier of the repository.
 * - `url`: URL of the repository; must be a valid GitHub or GitLab link, with a maximum of 256 characters when `file` is false.
 * - `tipo`: Indicates the repository type. "B" = Backend, "F" = Frontend, "I" = Integrated layer.
 * - `variables`: String containing environment variables in a key-value format; validated for syntax and restricted keywords.
 * - `informacion`: Object containing:
 *    - `tecnologia`: Selected technology name (required).
 *    - `framework`: Selected framework name (required).
 * - `file`: Optional boolean indicating whether the repository content is file-based instead of URL-based.
 * 
 * Applies multiple refinements:
 * - Ensures valid and bounded URL when `file` is false.
 * - Checks URL format to be from GitHub or GitLab.
 * - Validates the structure and content of the `variables` field using `transformStringToKV` and `frameworkValidation`.
 */
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
        return data.url && data.url.length <= 256;
      }
      return true;
    },
    {
      message: "La longitud máxima permitida es de 256 caracteres",
      path: ["url"]
    }
  ).refine(
    (data) => {
      if (!data.file) {
        const urlCheck = z.string().refine((data) => {
          return (data.startsWith("https://github.com/") || data.startsWith("https://gitlab.com/"));
        }).safeParse(data.url);
        return urlCheck.success;
      }
      return true;
    },
    {
      message: "Debe ser una dirección URL válida de GitHub o GitLab",
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

/**
* RepositorioSchema – Type inferred from RepositorioSchema Zod schema.
* 
* Represents a validated repository object excluding the attached file list.
*/
export type RepositorioSchema = z.infer<typeof RepositorioSchema>

/**
 * EnvTester – Zod schema to validate environment variables 
 * and related repository information.
 * 
 * - `variables`: must be a string (can be empty).
 * - `informacion`: requires both `tecnologia` and `framework`.
 * - Refinement: validates variables using transformStringToKV 
 *   and frameworkValidation.
 */
export const EnvValidator = z
  .object({
    variables: z.string(),
    framework: z.string({ message: "Es obligatorio seleccionar un framework" }),

  })
  .refine((data) => {
    if (data.variables.length === 0) return true;

    const transformed = transformStringToKV(data.variables);

    if (transformed) {
      return frameworkValidation(
        data.framework as TECNOLOGIES,
        transformed.map(({ clave }) => clave)
      );
    }
    return true;
  }, {
    message:
      "Una o más variables coinciden con las que se encuentran restringidas o presentan errores de sintaxis",
    path: ["variables"],
  });

export type EnvValidator = z.infer<typeof EnvValidator>;
