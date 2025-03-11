import { z } from "zod";
import { fechaSchema } from "./fechaSchema";
import { apellidosSchema, contraseniaSchema, correoSchema, nombresSchema, sexoUsuarioSchema } from "./usuario.schema";

/**
 * Objeto Zod para la validación de formularios de registro
 */
const RegistroSchema = z
  .object({
    nombres: nombresSchema,

    apellidos: apellidosSchema,

    correo: correoSchema,

    fechaDeNacimiento: fechaSchema,

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



export default RegistroSchema;
