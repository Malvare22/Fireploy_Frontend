import { z } from "zod";
import { BaseDeDatos } from "@modules/proyectos/types/baseDeDatos";
import { FORM_CONSTRAINS } from "@modules/general/utils/formConstrains";

/**
 * passwordSchema – Zod schema that validates a secure password.
 * 
 * Requirements:
 * - Minimum of 8 characters.
 * - At least one uppercase letter.
 * - At least one lowercase letter.
 * - At least one numeric digit.
 * - Must not include any of the following characters: @, :, /, ?, &.
 */
const passwordSchema = z.string().min(8, { message: "La contraseña debe tener al menos 8 caracteres." })
  .regex(/[A-Z]/, {
    message: "La contraseña debe contener al menos una letra mayúscula.",
  })
  .regex(/[a-z]/, {
    message: "La contraseña debe contener al menos una letra minúscula.",
  })
  .regex(/[0-9]/, {
    message: "La contraseña debe contener al menos un número.",
  })
  .regex(
    /^[^@:/?&]+$/,
    "No puede contener ninguno de los siguientes caracteres: [@, :, /, ?, &,]"
  )
  .regex(/^\S*$/, {
    message: "No se admiten espacios vacíos",
  });

const userNameSchema = FORM_CONSTRAINS.TEXT_LABEL.regex(
  /^[^@:/?&]+$/,
  "No puede contener ninguno de los siguientes caracteres: [@, :, /, ?, &,]"
).regex(/^\S*$/, {
  message: "No se admiten espacios vacíos",
});

/**
 * BaseDeDatosSchema – Zod schema used to validate a database object.
 * 
 * It excludes the project reference and includes:
 * - Optional ID.
 * - Validated name using restricted characters.
 * - Strong password validation.
 * - Required URL.
 * - Valid type, where:
 *   - "S" represents SQL.
 *   - "N" represents NoSQL.
 *   - "E" represents Embedded.
 *   - "P" represents Proprietary.
 *   - "M" represents Mixed.
 */
export const BaseDeDatosSchema: z.ZodType<Omit<BaseDeDatos, "proyecto">> =
  z.object({
    id: FORM_CONSTRAINS.ID.optional(),
    nombre: userNameSchema,
    contrasenia: passwordSchema,
    url: FORM_CONSTRAINS.URL,
    tipo: z.enum(["S", "N", "E", "P", "M"], {
      errorMap: () => ({
        message: "Selecciona un tipo de base de datos válido",
      }),
    }),
  });

/**
 * BaseDeDatosSchema – Type inferred from the BaseDeDatosSchema Zod schema.
 * 
 * Represents a validated database model excluding any link to a project.
 */
export type BaseDeDatosSchema = z.infer<typeof BaseDeDatosSchema>;

/**
 * BaseDeDatosRegisterSchema – Zod schema used to validate input when registering a new database.
 * 
 * Includes:
 * - Optional project ID.
 * - Name with restricted characters.
 * - Strong password validation.
 * - Optional URL.
 * - Required type with the following options:
 *   - "S" for SQL.
 *   - "N" for NoSQL.
 *   - "E" for Embedded.
 *   - "P" for Proprietary.
 *   - "M" for Mixed.
 */
export const BaseDeDatosRegisterSchema: z.ZodType<
  Pick<BaseDeDatos, "contrasenia" | "nombre" | "tipo" | "proyectoId" | "url">
> = z.object({
  proyectoId: z.number().optional(),
  nombre: userNameSchema,
  contrasenia: passwordSchema,
  tipo: z.enum(["S", "N", "E", "P", "M"], {
    errorMap: () => ({ message: "Selecciona un tipo de base de datos válido" }),
  }),
  url: z.string().optional(),
});

/**
 * BaseDeDatosRegisterSchema – Type inferred from the BaseDeDatosRegisterSchema Zod schema.
 * 
 * Represents the shape of a validated form for registering a new database instance,
 * including its name, password, type, optional URL, and optional project ID.
 */
export type BaseDeDatosRegisterSchema = z.infer<
  typeof BaseDeDatosRegisterSchema
>;
