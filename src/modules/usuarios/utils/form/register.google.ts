import { z } from "zod";
import {
  sexoUsuarioSchema,
  tiposUsuarioSchema,
  UsuarioSchema,
} from "./usuario.schema";
import { FORM_CONSTRAINS } from "@modules/general/utils/formConstrains";

export type RegisterGoogleSchema = Pick<
  UsuarioSchema,
  "contrasenia" | "confirmarContrasenia" | "sexo" | "estFechaInicio" | "fechaDeNacimiento"
>;

export const RegistroGoogleSchema: z.ZodType<RegisterGoogleSchema> = z
  .object({
    id: FORM_CONSTRAINS.ID.optional(),
    estFechaInicio: FORM_CONSTRAINS.DATE_NO_MINOR.optional(),
    sexo: sexoUsuarioSchema,
    contrasenia: FORM_CONSTRAINS.PASSWORD.optional(),
    confirmarContrasenia: z.string().optional(),
    tipo: tiposUsuarioSchema.optional(),
    fechaDeNacimiento: FORM_CONSTRAINS.DATE_NO_MINOR
  })
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
      return FORM_CONSTRAINS.DATE.safeParse(data.estFechaInicio).success;
    }
    return true;
  },
    {
      message: "Requerida fecha de ingreso en la universidad",
      path: ["estFechaInicio"],
    }
  ).refine((data) => {
    if (!data.estFechaInicio) return true;
    const birth = new Date(data.fechaDeNacimiento).getTime();
    const entryToUniversity = new Date(data.estFechaInicio).getTime();
    return birth < entryToUniversity;
  }, { message: 'La fecha de ingreso a la universidad no puede ser menor o igual a la fecha de nacimiento', path: ['estFechaInicio'] });
