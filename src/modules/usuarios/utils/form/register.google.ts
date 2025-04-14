import { z } from "zod";
import {
  contraseniaSchema,
  sexoUsuarioSchema,
  tiposUsuarioSchema,
  UsuarioSchema,
} from "./usuario.schema";
import { fechaSchema } from "./fechaSchema";

export type RegisterGoogleSchema = Pick<
  UsuarioSchema,
  "contrasenia" | "confirmarContrasenia" | "sexo" | "estFechaInicio"
>;

export const RegistroGoogleSchema: z.ZodType<RegisterGoogleSchema> = z
  .object({
    id: z.number().optional(),
    estFechaInicio: z.string().optional(),
    sexo: sexoUsuarioSchema,
    contrasenia: contraseniaSchema.optional(),
    confirmarContrasenia: z.string().optional(),
    tipo: tiposUsuarioSchema.optional(),
  })
  // Passwords must match if provided
  .refine(
    (data) => {
      if (data.contrasenia || data.confirmarContrasenia) {
        return data.contrasenia === data.confirmarContrasenia;
      }
      return true;
    },
    {
      message: "Las contraseñas no coinciden",
      path: ["confirmarContrasenia"],
    }
  )
  // If user type is "E" (student), estFechaInicio must be a valid date
  .refine((data) => {
    if (data.tipo === "E") {
      return fechaSchema.safeParse(data.estFechaInicio).success;
    }
    return true;
  });
