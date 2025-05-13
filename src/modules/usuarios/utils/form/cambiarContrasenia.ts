import { z } from "zod";
import { contraseniaSchema, correoSchema } from "./usuario.schema";

/**
 * Schema for changing the password.
 * 
 * This schema validates the user's current password, new password, and ensures that the
 * current password matches the new password when provided.
 * 
 * @schema
 * @type {ZodObject}
 * @property {string} correo - User's email address, validated with the `correoSchema`.
 * @property {string} contrasenia - User's current password, validated with the `contraseniaSchema`.
 * @property {string} nuevaContrasenia - User's new password (must match `contrasenia` if provided).
 * 
 * @validation
 * Ensures that if both the `contrasenia` (current password) and `nuevaContrasenia` (new password) are provided, they must match.
 * 
 * @example
 * ```ts
 * const result = CambiarContrasenaSchema.parse({
 *   correo: "user@example.com",
 *   contrasenia: "oldPassword123",
 *   nuevaContrasenia: "newPassword123"
 * });
 * ```
 * 
 * @throws {ZodError} Throws an error if the passwords do not match or the input is invalid.
 */
export const CambiarContrasenaSchema = z
  .object({
    correo: correoSchema,
    contrasenia: contraseniaSchema,
    nuevaContrasenia: z.string(),
  })
  // Passwords must match if provided
  .refine(
    (data) => {
      if (data.contrasenia || data.nuevaContrasenia) {
        return data.contrasenia === data.nuevaContrasenia;
      }
      return true;
    },
    {
      message: "Las contraseñas no coinciden",
      path: ["nuevaContrasenia"],
    }
  );
