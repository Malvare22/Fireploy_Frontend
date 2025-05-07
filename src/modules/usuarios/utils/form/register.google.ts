import { z } from "zod";
import {
  contraseniaSchema,
  sexoUsuarioSchema,
  tiposUsuarioSchema,
  UsuarioSchema,
} from "./usuario.schema";
import { fechaSchema } from "./fechaSchema";

export type RegisterGoogleSchema = Pick<
  UsuarioSchema,
  "contrasenia" | "confirmarContrasenia" | "sexo" | "estFechaInicio"
>;

/**
 * Zod schema for validating the registration data when a user signs up via Google.
 * 
 * This schema is responsible for validating the input during the registration process, ensuring:
 * - Proper password confirmation if passwords are provided.
 * - A valid date for `estFechaInicio` when the user type is "E" (student).
 * - Proper validation of user gender and type.
 *
 * @validation
 * - If passwords are provided, the `contrasenia` and `confirmarContrasenia` must match.
 * - If the user type is "E", the `estFechaInicio` field must be a valid date string.
 * 
 * @example
 * // Valid input
 * const validInput = {
 *   sexo: "M",
 *   contrasenia: "password123",
 *   confirmarContrasenia: "password123",
 *   estFechaInicio: "2025-04-06",
 *   tipo: "E",
 * };
 * 
 * // Invalid input - Passwords don't match
 * const invalidInput = {
 *   sexo: "M",
 *   contrasenia: "password123",
 *   confirmarContrasenia: "password321",
 *   estFechaInicio: "2025-04-06",
 *   tipo: "E",
 * };
 * 
 * @throws {ZodError} Throws an error if the validation fails, such as mismatched passwords or invalid date for students.
 */
export const RegistroGoogleSchema: z.ZodType<RegisterGoogleSchema> = z
  .object({
    id: z.number().optional(),
    estFechaInicio: z.string().optional(),
    sexo: sexoUsuarioSchema,
    contrasenia: contraseniaSchema.optional(),
    confirmarContrasenia: z.string().optional(),
    tipo: tiposUsuarioSchema.optional(),
  })
  // Passwords must match if provided
  .refine(
    (data) => {
      if (data.contrasenia || data.confirmarContrasenia) {
        return data.contrasenia === data.confirmarContrasenia;
      }
      return true;
    },
    {
      message: "Las contraseñas no coinciden",
      path: ["confirmarContrasenia"],
    }
  )
  // If user type is "E" (student), estFechaInicio must be a valid date
  .refine((data) => {
    if (data.tipo === "E") {
      return fechaSchema.safeParse(data.estFechaInicio).success;
    }
    return true;
  });
