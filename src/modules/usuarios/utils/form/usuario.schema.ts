import { z } from "zod";
import { getGender, getUserStatus, getUserTypes } from "../usuario.map";
import { SexoUsuario, Usuario } from "@modules/usuarios/types/usuario";
import { FORM_CONSTRAINS } from "@modules/general/utils/formConstrains";
import { calculateAge } from "@modules/general/utils/fechas";

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

const msgRedSocial = "Ingrese un link válido para la respectiva red social o deje en blanco";

export const RedSocialUsuarioSchema = z
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
    gitLab: z
      .string()
      .optional()
      .refine((s) => s?.includes("gitlab.com") || s?.length == 0, {
        message: msgRedSocial,
      }),
  })
  .strict();


const birthSchema = FORM_CONSTRAINS.DATE.refine((x) => {

  return (calculateAge(x) >= 16)
}, "Se requiere una edad mínima de 16 años para registrarse al sistema");

const universityDateSchema = FORM_CONSTRAINS.DATE.refine((x) => {

  return (calculateAge(x) >= 16)
}, "Se requiere una edad mínima de 16 años para registrarse al sistema");

/**
 * Full Zod schema for validating a complete Usuario object.
 * Includes validations for fields, conditional logic, and password matching.
 */
export const UsuarioSchema: z.ZodType<Omit<Usuario & { confirmarContrasenia?: string | undefined }, 'redSocial'>> = z
  .object({
    id: z.number(),
    correo: FORM_CONSTRAINS.EMAIL,
    nombres: FORM_CONSTRAINS.TEXT_LABEL,
    apellidos: FORM_CONSTRAINS.TEXT_LABEL,
    fechaDeNacimiento: birthSchema,
    estFechaInicio: universityDateSchema.optional(),
    estado: estadoUsuarioSchema,
    sexo: sexoUsuarioSchema,
    tipo: tiposUsuarioSchema,
    descripcion: FORM_CONSTRAINS.TEXT_DESCRIPTION,
    fotoDePerfil: FORM_CONSTRAINS.LINK_LENGTH,
    contrasenia: FORM_CONSTRAINS.PASSWORD.optional(),
    confirmarContrasenia: FORM_CONSTRAINS.PASSWORD.optional(),
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
  }, { message: 'La fecha de ingreso a la universidad no puede ser menor o igual a la fecha de nacimiento', path: ['estFechaInicio'] }).refine((data) => {
    if (!data.estFechaInicio) return true;
    const birth = new Date(data.fechaDeNacimiento).getTime();
    const entryToUniversity = new Date(data.estFechaInicio).getTime();
    return birth < entryToUniversity;
  }, { message: 'Los datos ingresados en las fechas son poco verosímiles (contacta a soporte)', path: ['estFechaInicio'] });

export type UsuarioSchema = z.infer<typeof UsuarioSchema>;

/**
 * Default template object for creating a new Usuario instance.
 */
export const usuarioTemplate: Usuario & { confirmarContrasenia?: string | undefined } = {
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

export const PortafolioSchema: z.ZodType<Pick<Usuario, 'descripcion' | 'redSocial'>> = z.object({
  redSocial: RedSocialUsuarioSchema,
  descripcion: FORM_CONSTRAINS.TEXT_DESCRIPTION
})

export const CorreoSchema = z.object({
  correo: FORM_CONSTRAINS.EMAIL
})

export type PortafolioSchema = z.infer<typeof PortafolioSchema>;
