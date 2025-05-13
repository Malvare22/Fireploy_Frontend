import { z } from "zod";
import { getGender, getUserStatus, getUserTypes } from "../usuario.map";
import { SexoUsuario, Usuario } from "@modules/usuarios/types/usuario";
import { fechaSchema } from "./fechaSchema";

/**
 * Zod schema for validating user status (EstadoUsuario).
 * Accepts only "A" (Active) or "I" (Inactive).
 */
export const estadoUsuarioSchema = z.enum(Array.from(getUserStatus.keys()) as ["A", "I"], {
  message: "Ingrese un estado válido",
});

/**
 * Zod schema for validating user types (TiposUsuario).
 * Accepts only "A" (Admin), "D" (Teacher), or "E" (Student).
 */
export const tiposUsuarioSchema = z.enum(Array.from(getUserTypes.keys()) as ["A", "D", "E"], {
  message: "Ingrese un tipo de usuario válido",
});

/**
 * Zod schema for validating gender (SexoUsuario).
 * Accepts only "M", "F", or "O".
 */
export const sexoUsuarioSchema = z.enum(Array.from(getGender.keys()) as ["M", "F", "O"], {
  message: "Ingrese un sexo válido",
});

/**
 * Zod schema for validating user passwords.
 * Enforces:
 * - Minimum length of 8 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one number
 * - At least one special character
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
    message: "La contraseña debe contener al menos un carácter especial (@$!%*?&#).",
  });

const msgRedSocial = "Ingrese un link válido para la respectiva red social o deje en blanco";

/**
 * Zod schema for validating user's social network links.
 * Each field must be either a valid URL for the given platform or an empty string.
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
      .refine((s) => s?.includes("x.com") || s?.length == 0, {
        message: msgRedSocial,
      }),
    github: z
      .string()
      .optional()
      .refine((s) => s?.includes("github.com") || s?.length == 0, {
        message: msgRedSocial,
      }),
  })
  .strict();

/**
 * Zod schemas for individual personal data fields of the user.
 */
export const nombresSchema = z.string().min(1, { message: "El nombre no puede estar vacío" });

export const apellidosSchema = z.string().min(0, { message: "El apellido no puede estar vacío" });

export const fotoDePerfilSchema = z
  .string()
  .min(0, { message: "Es obligatorio agregar una imagen" });

export const descripcionSchema = z.string();

export const correoSchema = z.string().email({ message: "Debe ser un correo válido" });

export const CorreoSchema = z.object({ correo: correoSchema });

/**
 * Full Zod schema for validating a complete Usuario object.
 * Includes validations for fields, conditional logic, and password matching.
 */
export const UsuarioSchema: z.ZodType<Usuario> = z
  .object({
    id: z.number().optional(),
    correo: correoSchema,
    nombres: nombresSchema,
    apellidos: apellidosSchema.optional(),
    fechaDeNacimiento: fechaSchema,
    estFechaInicio: fechaSchema.optional(),
    estado: estadoUsuarioSchema,
    sexo: sexoUsuarioSchema,
    tipo: tiposUsuarioSchema.optional(),
    redSocial: redSocialUsuarioSchema,
    descripcion: descripcionSchema,
    fotoDePerfil: fotoDePerfilSchema,
    contrasenia: contraseniaSchema.optional(),
    confirmarContrasenia: z.string().optional(),
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
  },
  {
    message: "Requerida fecha de ingreso en la universidad",
    path: ["estFechaInicio"],
  });

export type UsuarioSchema = z.infer<typeof UsuarioSchema>

/**
 * Default template object for creating a new Usuario instance.
 */
export const usuarioTemplate: Usuario = {
  id: 1,
  nombres: "",
  apellidos: "",
  correo: "",
  fechaDeNacimiento: "",
  estFechaInicio: "2002-04-04",
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
