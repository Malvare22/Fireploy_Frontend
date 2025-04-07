import { z } from "zod";

/**
 * Zod schema for validating date strings.
 *
 * This schema ensures that the input:
 * - Is a string matching the format YYYY-MM-DD.
 * - Represents a valid calendar date.
 *
 * @example
 * fechaSchema.parse("2025-04-06"); // ✅ Valid
 * fechaSchema.parse("2025-13-40"); // ❌ Invalid date
 * fechaSchema.parse("06-04-2025"); // ❌ Invalid format
 */
export const fechaSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "La fecha debe tener el formato AAAA-MM-DD.",
  })
  .refine(
    (fecha) => {
      const _fecha = new Date(fecha);
      return !isNaN(_fecha.getTime());
    },
    { message: "La fecha debe ser una fecha válida." }
  );
