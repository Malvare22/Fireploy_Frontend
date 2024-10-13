import { z } from "zod";

export const passwordSchema = z
  .string()
  .refine((data) => data.length >= 8, {
    message: "La contraseña debe tener al menos 8 caracteres.",
  })
  .refine((data) => /[A-Z]/.test(data), {
    message: "La contraseña debe incluir al menos una letra mayúscula (A-Z).",
  })
  .refine((data) => /[a-z]/.test(data), {
    message: "La contraseña debe incluir al menos una letra minúscula (a-z).",
  })
  .refine((data) => /[0-9]/.test(data), {
    message: "La contraseña debe incluir al menos un dígito (0-9).",
  })
  .refine((data) => /[!@#$%^&*(),.?":{}|<>]/.test(data), {
    message:
      "La contraseña debe incluir al menos un carácter especial (por ejemplo, !@#$%^&*).",
  });

export const passwordConfirmMessage = "Ambas contraseñas deben coincidir";

export const passwords = z
  .object({
    password: passwordSchema,

    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Las contraseñas no coinciden",
    path: ["passwordConfirm"], // Este es el campo que mostrará el error
  });

export const passwordChangeSchema = z.object({ passwords });

export type PasswordChangeSchemaType = z.infer<typeof passwordChangeSchema>;
