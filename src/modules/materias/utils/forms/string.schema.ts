import { z } from "zod";

/**
 * StandardStringSchema – Zod schema for validating a standard string field.
 * This schema ensures that the string has a maximum length of 50 characters.
 * 
 * @constant
 * @type {z.ZodType<string>}
 * 
 * @example
 * const validString = StandardStringSchema.parse("Some valid string");
 * const invalidString = StandardStringSchema.parse("This string is too long for the validation rule");
 */
export const StandardStringSchema = z.string().max(50, "Máximo 50 caracteres para este campo.");

/**
 * StandardStringRequiredSchema – Zod schema for validating a required string field.
 * This schema ensures that the string is not empty (minimum length of 1) and 
 * has a maximum length of 50 characters.
 * 
 * @constant
 * @type {z.ZodType<string>}
 * 
 * @example
 * const validString = StandardStringRequiredSchema.parse("Valid required string");
 * const invalidString = StandardStringRequiredSchema.parse("");
 */
export const StandardStringRequiredSchema = z.string().min(1, "Campo Obligatorio").max(50, "Máximo 50 caracteres para este campo.");

/**
 * DescriptionStringSchema – Zod schema for validating a description string field.
 * This schema ensures that the string has a maximum length of 512 characters.
 * 
 * @constant
 * @type {z.ZodType<string>}
 * 
 * @example
 * const validDescription = DescriptionStringSchema.parse("A valid description text.");
 * const invalidDescription = DescriptionStringSchema.parse("This description exceeds the maximum length of 512 characters...");
 */
export const DescriptionStringSchema = z.string().max(512, "Máximo 512 caracteres para el campo descripción.");
