import { z } from "zod";
import { passwordChangeSchema } from "./password";

import { userSchema } from "./userSchema";

export const registerSchema = (userSchema
  .merge(passwordChangeSchema))
  .refine((data) => data.password == data.passwordConfirm, {
    message: "Las contraseñas no coinciden",
    path: ["passwordConfirm"], // Este es el campo que mostrará el error
  });
// , passwordChangeSchema, emailSchema, genreSchema
//merge(passwordChangeSchema).merge(emailSchema).merge(genreSchema)

export const RegisterNotification = [
  "Error al registrar al usuario",
  "Usuario registrado con éxito",
];

export type RegisterSchemaType = z.infer<typeof registerSchema>;
