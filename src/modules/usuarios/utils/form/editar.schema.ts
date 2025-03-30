import { z } from "zod";
import { fechaSchema } from "./fechaSchema";
import { getGender, getUserStatus, getUserTypes } from "../usuario.map";
import { SexoUsuario, Usuario } from "@modules/usuarios/types/usuario";

/**
 * Atributo Zod para la validación de Estados de Usuario
 */
export const estadoUsuarioSchema = z.enum(
  Array.from(getUserStatus.keys()) as ["A", "I"],
  { message: "Ingrese un estado válido" }
);

/**
 * Atributo Zod para la validación de Tipos de Usuario
 */
export const tiposUsuarioSchema = z.enum(
  Array.from(getUserTypes.keys()) as ["A", "D", "E"],
  { message: "Ingrese un tipo de usuario válido" }
);

/**
 * Atributo Zod para la validación del sexo de Usuario
 */
export const sexoUsuarioSchema = z.enum(
  Array.from(getGender.keys()) as ["M", "F", "O"],
  { message: "Ingrese un sexo válido" }
);

/**
 * Objeto Zod para la validación de contraseñas de Usuario
 */
export const contraseniaSchema = z
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
  });

const msgRedSocial =
  "Ingrese un link válido para la respectiva red social o deje en blanco";

/**
 * Atributo Zod para la validación de redes sociales de Usuario
 */
export const redSocialUsuarioSchema = z
  .object({
    facebook: z
      .string()
      .optional()
      .refine((s) => s?.includes("facebook.com") || s?.length == 0, {
        message: msgRedSocial,
      }),
    instagram: z
      .string()
      .optional()
      .refine((s) => s?.includes("instagram.com") || s?.length == 0, {
        message: msgRedSocial,
      }),
    linkedin: z
      .string()
      .optional()
      .refine((s) => s?.includes("linkedin.com") || s?.length == 0, {
        message: msgRedSocial,
      }),
    x: z
      .string()
      .optional()
      .optional()
      .refine((s) => s?.includes("x.com") || s?.length == 0, {
        message: msgRedSocial,
      }),
    github: z
      .string()
      .optional()
      .optional()
      .refine((s) => s?.includes("github.com") || s?.length == 0, {
        message: msgRedSocial,
      }),
  })
  .strict();

/**
 * Validación de información personal del usuario.
 */
export const nombresSchema = z
  .string()
  .min(0, { message: "El nombre no puede estar vacío" });
export const apellidosSchema = z
  .string()
  .min(1, { message: "El apellido no puede estar vacío" });
export const fotoDePerfilSchema = z
  .string()
  .min(1, { message: "Es obligatorio agregar una imagen" });
export const descripcionSchema = z.string();
export const correoSchema = z
  .string()
  .email({ message: "Debe ser un correo válido" });

export const UsuarioForm = z
  .object({
    id: z.number().optional(),
    nombres: nombresSchema,
    apellidos: apellidosSchema,
    correo: correoSchema,
    fechaDeNacimiento: fechaSchema,
    estFechaInicio: fechaSchema.optional(),
    estado: estadoUsuarioSchema,
    sexo: sexoUsuarioSchema,
    tipo: tiposUsuarioSchema,
    redSocial: redSocialUsuarioSchema,
    descripcion: descripcionSchema,
    fotoDePerfil: z.string().optional().nullable(),
    contrasenia: contraseniaSchema.optional(),
    confirmarContrasenia: z.string().optional(),
  })
  .refine(
    (data) => {
      // Solo validar coincidencia de contraseñas si se está creando o modificando la contraseña
      if (data.contrasenia || data.confirmarContrasenia) {
        return data.contrasenia === data.confirmarContrasenia;
      }
      return true;
    },
    {
      message: "Las contraseñas no coinciden",
      path: ["confirmarContrasenia"],
    }
  );

export type UsuarioForm = Usuario & { confirmarContrasenia: string };

export const usuarioFormTemplate: UsuarioForm = {
  id: 1,
  nombres: "",
  apellidos: "",
  correo: "",
  fechaDeNacimiento: "",
  estFechaInicio: "",
  estado: "A",
  sexo: "" as SexoUsuario,
  tipo: "E",
  redSocial: {
    facebook: "",
    instagram: "",
    linkedin: "",
    x: "",
    github: "",
  },
  descripcion: "",
  fotoDePerfil: "",
  contrasenia: "",
  confirmarContrasenia: "",
};

// Adaptador de UsuarioForm (formulario) a Usuario (backend)
// Adaptador de Usuario a formulario (incluye confirmarContrasenia)
export function adapterUsuarioToUsuarioForm(usuario: Usuario): UsuarioForm {
  return {
    ...usuario,
    confirmarContrasenia: usuario.contrasenia || "",
    estFechaInicio: usuario.tipo == "E" ? usuario.estFechaInicio : "2002-04-22",
  };
}

// Adaptador de formulario a Usuario (elimina confirmarContrasenia)
export function adapterUsuarioFormToUsuario(formData: UsuarioForm): Usuario {

  const _usuario = formData as Usuario;
  return _usuario;
}
