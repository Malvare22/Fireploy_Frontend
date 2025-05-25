import { z } from "zod";
import { BaseDeDatos } from "@modules/proyectos/types/baseDeDatos";
import { FORM_CONSTRAINS } from "@modules/general/utils/formConstrains";

/**
 * BaseDeDatosSchema – Zod schema used to validate a database object (excluding its relation to a project), including optional ID, name, password, URL, and type ("S" = SQL, "N" = NoSQL, "E" = Embedded).
 */
export const BaseDeDatosSchema: z.ZodType<Omit<BaseDeDatos, "proyecto">> = z.object({
  id: FORM_CONSTRAINS.ID.optional(),
  nombre: FORM_CONSTRAINS.TEXT_LABEL,
  contrasenia: FORM_CONSTRAINS.PASSWORD,
  url: FORM_CONSTRAINS.URL,
  tipo: z.enum(["S", "N", "E"], {
    errorMap: () => ({ message: "Selecciona un tipo de base de datos válido" }),
  }),
});

/**
 * BaseDeDatosSchema – Type inferred from BaseDeDatosSchema Zod validation, representing a validated database model without project reference.
 */
export type BaseDeDatosSchema = z.infer<typeof BaseDeDatosSchema>;

/**
 * BaseDeDatosRegisterSchema – Zod schema used for registering a database, validating name, password, type, and optionally the related project ID. Type values: "S" = SQL, "N" = NoSQL, "E" = Embedded.
 */
export const BaseDeDatosRegisterSchema: z.ZodType<
  Pick<BaseDeDatos, "contrasenia" | "nombre" | "tipo" | "proyectoId">
> = z.object({
  proyectoId: z.number().optional(),
  nombre: FORM_CONSTRAINS.TEXT_LABEL,
  contrasenia: FORM_CONSTRAINS.PASSWORD,
  tipo: z.enum(["S", "N", "E"], {
    errorMap: () => ({ message: "Selecciona un tipo de base de datos válido" }),
  }),
});

/**
 * BaseDeDatosRegisterSchema – Type inferred from BaseDeDatosRegisterSchema, representing validated fields for registering a new database instance.
 */
export type BaseDeDatosRegisterSchema = z.infer<typeof BaseDeDatosRegisterSchema>;
