import { z } from "zod";

export const emailSchema = z.string().email({
  message: "No tiene el formato adecuado de un correo electrónico",
});

export type EmailSchemaType = z.infer<typeof emailSchema>;

export const emailObjectSchema = z.object({
  email: emailSchema
})

export type EmailSchemaObjectType = z.infer<typeof emailObjectSchema>;
