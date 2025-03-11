import { z } from "zod";
import { fechaSchema } from "./fechaSchema";
import {
  apellidosSchema,
  contraseniaSchema,
  correoSchema,
  nombresSchema,
  sexoUsuarioSchema,
} from "./usuario.schema";
import { UsuarioRegistro } from "@modules/usuarios/types/usuario";

type RegistroKeys = Pick<
  UsuarioRegistro,
  | "nombres"
  | "apellidos"
  | "correo"
  | "fechaDeNacimiento"
  | "estFechaInicio"
  | "sexo"
  | "contrasenia"
  | "confirmarContrasenia"
>;

/**
 * Objeto Zod para la validación de formularios de registro
 */
const RegistroSchema: z.ZodType<RegistroKeys> = z
  .object({
    nombres: nombresSchema,
    apellidos: apellidosSchema,
    correo: correoSchema,
    fechaDeNacimiento: fechaSchema,
    estFechaInicio: fechaSchema,
    sexo: sexoUsuarioSchema,
    contrasenia: contraseniaSchema,
    confirmarContrasenia: z
      .string()
      .min(1, { message: "Debe confirmar la contraseña." }),
  })
  .refine((data) => data.contrasenia === data.confirmarContrasenia, {
    message: "Las contraseñas no coinciden.",
    path: ["confirmarContrasenia"],
  });

export type RegistroSchemaType = z.infer<typeof RegistroSchema>;

export default RegistroSchema;
