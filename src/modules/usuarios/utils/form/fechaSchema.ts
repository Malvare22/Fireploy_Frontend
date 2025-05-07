import { z } from "zod";

/**
 * Zod schema for validating date strings.
 *
 * This schema ensures that the input:
 * - Is a string matching the format YYYY-MM-DD.
 * - Represents a valid calendar date.
 *
 * The schema performs two main validations:
 * 1. Ensures the string matches the format `YYYY-MM-DD` using a regular expression.
 * 2. Verifies that the string represents a valid date (i.e., it can be parsed correctly by JavaScript's `Date` object).
 * 
 * @validation
 * - The string must match the regex pattern for a valid date format.
 * - The date must be valid in the calendar.
 * 
 * @example
 * fechaSchema.parse("2025-04-06"); // ✅ Valid date format and valid calendar date
 * fechaSchema.parse("2025-13-40"); // ❌ Invalid date (Month > 12 and Day > 31)
 * fechaSchema.parse("06-04-2025"); // ❌ Invalid format (should be YYYY-MM-DD)
 *
 * @throws {ZodError} Throws an error if the input does not meet the validation criteria.
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
