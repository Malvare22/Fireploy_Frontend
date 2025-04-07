import { z } from "zod";
import { contraseniaSchema, correoSchema } from "./usuario.schema";

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
