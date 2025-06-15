import { z } from "zod";
import { getGender, getUserStatus, getUserTypes } from "../usuario.map";
import { SexoUsuario, Usuario } from "@modules/usuarios/types/usuario";
import { FORM_CONSTRAINS } from "@modules/general/utils/formConstrains";
import { calculateAge } from "@modules/general/utils/fechas";

/**
 * Zod schema for validating user status (EstadoUsuario).
 * Accepts only "A" (Active) or "I" (Inactive).
 */
export const estadoUsuarioSchema = z.enum(
  Array.from(getUserStatus.keys()) as ["A", "I"],
  {
    message: "Ingrese un estado válido",
  }
);

/**
 * Zod schema for validating user types (TiposUsuario).
 * Accepts only "A" (Admin), "D" (Teacher), or "E" (Student).
 */
export const tiposUsuarioSchema = z.enum(
  Array.from(getUserTypes.keys()) as ["A", "D", "E"],
  {
    message: "Ingrese un tipo de usuario válido",
  }
);

/**
 * Zod schema for validating gender (SexoUsuario).
 * Accepts only "M", "F", or "O".
 */
export const sexoUsuarioSchema = z.enum(
  Array.from(getGender.keys()) as ["M", "F", "O"],
  {
    message: "Ingrese un sexo válido",
  }
);

const msgRedSocial =
  "Ingrese un link válido para la respectiva red social";

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

export const UserDatesSchema = z.object({
  fechaDeNacimiento: FORM_CONSTRAINS.DATE_MINOR.refine(
    (birth) => {
      return calculateAge(birth) > 16;
    },
    {
      message:
        "Se requiere que el usuario tenga una edad permitida (ver documentación)",
    }
  ),
  estFechaInicio: FORM_CONSTRAINS.DATE_MINOR,
});

const UsuarioSchemaIncomplete = z.object({
  id: z.number(),
  correo: FORM_CONSTRAINS.EMAIL,
  nombres: FORM_CONSTRAINS.TEXT_LABEL,
  apellidos: FORM_CONSTRAINS.TEXT_LABEL,
  estado: estadoUsuarioSchema,
  sexo: sexoUsuarioSchema,
  tipo: tiposUsuarioSchema,
  fotoDePerfil: FORM_CONSTRAINS.LINK_LENGTH,
  contrasenia: FORM_CONSTRAINS.PASSWORD.optional(),
  confirmarContrasenia: FORM_CONSTRAINS.PASSWORD.optional(),
});

export const UsuarioSchema = UsuarioSchemaIncomplete.merge(UserDatesSchema)
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
  .refine(
    (object) => {
      const { estFechaInicio, fechaDeNacimiento } = object;
      const yearBirth = new Date(fechaDeNacimiento).getFullYear();
      const yearEntryDate = new Date(estFechaInicio).getFullYear();
      return yearEntryDate - yearBirth >= 16;
    },
    {
      message:
        "Las fechas son inverosímiles para el sistema (ver documentación)",
      path: ["estFechaInicio"],
    }
  );

export type UsuarioSchema = z.infer<typeof UsuarioSchema>;

export const usuarioTemplate: UsuarioSchema= {
  id: 1,
  nombres: "",
  apellidos: "",
  correo: "",
  fechaDeNacimiento: "",
  estFechaInicio: "2002-04-04",
  estado: "A",
  sexo: "" as SexoUsuario,
  tipo: "E",
  fotoDePerfil: "",
  contrasenia: "",
  confirmarContrasenia: "",
};

export const PortafolioSchema: z.ZodType<
  Pick<Usuario, "descripcion" | "redSocial">
> = z.object({
  redSocial: RedSocialUsuarioSchema,
  descripcion: FORM_CONSTRAINS.TEXT_DESCRIPTION,
});

/**
 * CorreoSchema – Zod schema for validating email-only input.
 *
 * Accepts a single email field validated using standard email constraints.
 */
export const CorreoSchema = z.object({
  correo: FORM_CONSTRAINS.EMAIL,
});

export type PortafolioSchema = z.infer<typeof PortafolioSchema>;
