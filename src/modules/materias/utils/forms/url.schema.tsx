import { z } from "zod";

/**
 * UrlSchema – Zod schema for validating a URL string.
 * This schema ensures that the string is a valid URL and does not exceed 256 characters in length.
 * 
 * @constant
 * @type {z.ZodType<string>}
 * 
 * @example
 * const validUrl = UrlSchema.parse("https://example.com");
 * const invalidUrl = UrlSchema.parse("invalid-url");
 */
export const UrlSchema = z.string().max(256).url("URL inválida");
