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

/**
 * RegistroGoogleSchema – Zod validation schema for registering users via Google.
 *
 * This schema validates the necessary fields when a user is registering with a Google account.
 * It ensures optional passwords match, validates conditional requirements based on user type,
 * and enforces correct date relationships between birth and university entry.
 *
 * @typedef
 *
 * @property {string} [contrasenia] - Optional password input provided by the user.
 * @property {string} [confirmarContrasenia] - Optional field to confirm the user's password.
 * @property {"M" | "F" | "O"} sexo - Required gender of the user (Male, Female, Other).
 * @property {string} [estFechaInicio] - Optional university entry date, required if the user type is "E".
 * @property {string} fechaDeNacimiento - Required birth date of the user; must be earlier than university entry.
 * @property {"E" | "A" | "D"} [tipo] - Optional user type (e.g., Estudiante, Administrador, Docente).
 *
 * @validation
 * - Passwords must match if both are provided.
 * - `estFechaInicio` is required if user type is "E".
 * - `estFechaInicio` must be later than `fechaDeNacimiento`.
 */
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
