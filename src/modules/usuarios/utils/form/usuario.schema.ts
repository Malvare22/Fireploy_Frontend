import { z } from "zod";
import {
  obtenerEstadoUsuario,
  obtenerSexo,
  obtenerTiposUsuario,
} from "../usuario.map";
import { fechaSchema } from "./fechaSchema";

/**
 * Atributo Zod para la validación de Estados de Usuario
 */
export const estadoUsuarioSchema = z.enum(
  Array.from(obtenerEstadoUsuario.keys()) as ["A", "I"],
  { message: "Ingrese un estado válido" }
);

/**
 * Atributo Zod para la validación de Tipos de Usuario
 */
export const tiposUsuarioSchema = z.enum(
  Array.from(obtenerTiposUsuario.keys()) as ["A", "D", "E"],
  { message: "Ingrese un tipo de usuario válido" }
);

/**
 * Atributo Zod para la validación del sexo de Usuario
 */
export const sexoUsuarioSchema = z.enum(
  Array.from(obtenerSexo.keys()) as ["M", "F", "O"],
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

const msgRedSocial = 'Ingrese un link válido para la respectiva red social o deje en blanco'

/**
 * Atributo Zod para la validación de redes sociales de Usuario
 */
export const redSocialUsuarioSchema = z
  .object({
    facebook: z.string().optional().refine((s) => s?.includes('facebook.com') || s?.length == 0, {message: msgRedSocial}),
    instagram: z.string().optional().refine((s) => s?.includes('instagram.com') || s?.length == 0, {message: msgRedSocial}),
    linkedin: z.string().optional().refine((s) => s?.includes('linkedin.com') || s?.length == 0, {message: msgRedSocial}),
    x: z.string().optional().optional().refine((s) => s?.includes('x.com') || s?.length == 0, {message: msgRedSocial})
  })
  .strict();

  /**
 * Validación de información personal del usuario.
 */
export const nombresSchema = z.string().min(1, { message: "El nombre no puede estar vacío" });
export const apellidosSchema = z.string().min(1, { message: "El apellido no puede estar vacío" });
export const fotoDePerfilSchema = z.string().min(1, { message: "Es obligatorio agregar una imagen" });
export const descripcionSchema = z.string().optional();
export const correoSchema = z.string().email({ message: "Debe ser un correo válido" });

/**
 * Objeto Zod para la validación de edición de perfil por parte de un administrador
 */
export const UsuarioSchema = z.object({
  correo: correoSchema,
  fechaDeNacimiento: fechaSchema,
  estado: estadoUsuarioSchema,
  tipo: tiposUsuarioSchema,
  nombres: nombresSchema,
  apellidos: apellidosSchema,
  contrasenia: contraseniaSchema,
  sexo: sexoUsuarioSchema,
  fotoDePerfil: fotoDePerfilSchema,
  redSocial: redSocialUsuarioSchema,
  descripcion: descripcionSchema,
  estFechaInicio: fechaSchema,
});

export type Usuario = z.infer<typeof UsuarioSchema>;
