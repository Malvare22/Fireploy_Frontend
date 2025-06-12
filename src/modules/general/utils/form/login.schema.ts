import { z } from "zod"
import { FORM_CONSTRAINS } from "../formConstrains"

/**
 * LoginSchema – Zod schema for validating login form fields.
 *
 * This schema validates that the email and password fields meet the required constraints.
 * It ensures the email follows a valid format as defined in the shared form constraints,
 * and that the password field is not empty.
 *
 * @schema
 *
 * @fields
 * - `email`: A string that must match the predefined email format constraint.
 * - `password`: A non-empty string. Field is required.
 *
 * @example
 * ```ts
 * LoginSchema.parse({ email: "user@example.com", password: "securePassword" });
 * ```
 */
export const LoginSchema = z.object({
    email: FORM_CONSTRAINS.EMAIL,
    password: z.string().min(1, 'Campo obligatorio')
})

export type LoginSchema = z.infer<typeof LoginSchema>