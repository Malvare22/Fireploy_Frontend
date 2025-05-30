import { z } from "zod";
import { BaseDeDatos } from "@modules/proyectos/types/baseDeDatos";
import { FORM_CONSTRAINS } from "@modules/general/utils/formConstrains";

const passwordSchema = z.string().min(8, { message: "La contraseña debe tener al menos 8 caracteres." })
  .regex(/[A-Z]/, {
    message: "La contraseña debe contener al menos una letra mayúscula.",
  })
  .regex(/[a-z]/, {
    message: "La contraseña debe contener al menos una letra minúscula.",
  })
  .regex(/[0-9]/, {
    message: "La contraseña debe contener al menos un número.",
  }).regex(/^[^@:/?&]+$/, "No puede contener ninguno de los siguientes caracteres: [@, :, /, ?, &,]");

const userNameSchema = FORM_CONSTRAINS.TEXT_LABEL.regex(/^[^@:/?&]+$/, 'No puede contener ninguno de los siguientes caracteres: [@, :, /, ?, &,]')

/**
 * BaseDeDatosSchema – Zod schema used to validate a database object (excluding its relation to a project), including optional ID, name, password, URL, and type ("S" = SQL, "N" = NoSQL, "E" = Embedded).
 */
export const BaseDeDatosSchema: z.ZodType<Omit<BaseDeDatos, "proyecto">> = z.object({
  id: FORM_CONSTRAINS.ID.optional(),
  nombre: userNameSchema,
  contrasenia: passwordSchema,
  url: FORM_CONSTRAINS.URL,
  tipo: z.enum(["S", "N", "E", 'P', 'M'], {
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
  Pick<BaseDeDatos, "contrasenia" | "nombre" | "tipo" | "proyectoId" | 'url'>
> = z.object({
  proyectoId: z.number().optional(),
  nombre: userNameSchema,
  contrasenia: passwordSchema,
  tipo: z.enum(["S", "N", "E", 'P', 'M'], {
    errorMap: () => ({ message: "Selecciona un tipo de base de datos válido" }),
  }),
  url: z.string().optional()
});

/**
 * BaseDeDatosRegisterSchema – Type inferred from BaseDeDatosRegisterSchema, representing validated fields for registering a new database instance.
 */
export type BaseDeDatosRegisterSchema = z.infer<typeof BaseDeDatosRegisterSchema>;
