import { z } from "zod";
import { fechaSchema } from "./fechaSchema";
import {
  apellidosSchema,
  contraseniaSchema,
  correoSchema,
  nombresSchema,
  sexoUsuarioSchema,
  tiposUsuarioSchema,
} from "./editar.schema";
import { Usuario } from "@modules/usuarios/types/usuario";

export type UsuarioRegistro = Usuario & { confirmarContrasenia: string };

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
  | 'tipo'
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
    tipo: tiposUsuarioSchema,
    contrasenia: contraseniaSchema,
    confirmarContrasenia: z
      .string()
      .min(1, { message: "Debe confirmar la contraseña." }),
  })
  .refine((data) => data.contrasenia === data.confirmarContrasenia, {
    message: "Las contraseñas no coinciden.",
    path: ["confirmarContrasenia"],
  });

export type RegistroSchema= z.infer<typeof RegistroSchema>;

export default RegistroSchema;
