import { z } from "zod";

const RegistroSchema = z
  .object({
    nombres: z
      .string()
      .min(1, { message: "El campo nombres no puede estar vacío." })
      .max(50, { message: "El nombre no debe exceder los 50 caracteres." }),

    apellidos: z
      .string()
      .min(1, { message: "El campo apellidos no puede estar vacío." })
      .max(50, { message: "El apellido no debe exceder los 50 caracteres." }),

    id: z
      .string()
      .regex(/^\d{8}$/, {
        message: "El código institucional debe tener exactamente 8 dígitos.",
      }),

    correo: z
      .string()
      .email({
        message: "El correo electrónico debe tener un formato válido.",
      }),

    fechaDeNacimiento: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: "La fecha de nacimiento debe tener el formato AAAA-MM-DD.",
      })
      .refine(
        (fecha) => {
          const fechaNacimiento = new Date(fecha);
          return !isNaN(fechaNacimiento.getTime());
        },
        { message: "La fecha de nacimiento debe ser una fecha válida." }
      ),

    sexo: z.enum(["M", "F", "O"], {
      message: 'El sexo debe ser "M" para masculino o "F" para femenino.',
    }),

    contrasenia: z
      .string()
      .min(8, { message: "La contraseña debe tener al menos 8 caracteres." })
      .regex(/[A-Z]/, {
        message: "La contraseña debe contener al menos una letra mayúscula.",
      })
      .regex(/[a-z]/, {
        message: "La contraseña debe contener al menos una letra minúscula.",
      })
      .regex(/[0-9]/, {
        message: "La contraseña debe contener al menos un número.",
      })
      .regex(/[@$!%*?&#]/, {
        message:
          "La contraseña debe contener al menos un carácter especial (@$!%*?&#).",
      }),

    confirmarContrasenia: z
      .string()
      .min(1, { message: "Debe confirmar la contraseña." }),
  })
  .refine((data) => data.contrasenia === data.confirmarContrasenia, {
    message: "Las contraseñas no coinciden.",
    path: ["confirmarContrasenia"],
  });

export default RegistroSchema;
