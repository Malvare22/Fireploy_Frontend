import { z } from "zod";
import {
  obtenerEstadoUsuario,
  obtenerSexo,
  obtenerTiposUsuario,
} from "../usuario.map";

export const EstadoUsuarioSchema = z.enum(
  Array.from(obtenerEstadoUsuario.keys()) as ["A", "I"],
  { message: "Ingrese un estado válido" }
);
export const TiposUsuarioSchema = z.enum(
  Array.from(obtenerTiposUsuario.keys()) as ["A", "D", "E"],
  { message: "Ingrese un tipo de usuario válido" }
);
export const SexoUsuarioSchema = z.enum(
  Array.from(obtenerSexo.keys()) as ["M", "F", "O"],
  { message: "Ingrese un sexo válido" }
);

// Schema para redes sociales
const msgRedSocial = 'Ingrese un link válido para la respectiva red social o deje en blanco'
export const RedSocialUsuarioSchema = z
  .object({
    facebook: z.string().optional().refine((s) => s?.includes('facebook.com') || s?.length == 0, {message: msgRedSocial}),
    instagram: z.string().optional().refine((s) => s?.includes('instagram.com') || s?.length == 0, {message: msgRedSocial}),
    linkedin: z.string().optional().refine((s) => s?.includes('linkedin.com') || s?.length == 0, {message: msgRedSocial}),
    x: z.string().optional().optional().refine((s) => s?.includes('x.com') || s?.length == 0, {message: msgRedSocial})
  })
  .strict();

export const UsuarioSchema = z.object({
  correo: z.string().email({ message: "Debe ser un correo válido" }),
  fechaDeNacimiento: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Debe ser una fecha válida (YYYY-MM-DD)",
  }),
  estado: EstadoUsuarioSchema,
  tipo: TiposUsuarioSchema,
  nombres: z.string().min(1, { message: "El nombre no puede estar vacío" }),
  apellidos: z.string().min(1, { message: "El apellido no puede estar vacío" }),
  contrasenia: z
    .string()
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
  sexo: SexoUsuarioSchema,
  fotoDePerfil: z.string().url({ message: "Debe ser una URL válida" }),
  redSocial: RedSocialUsuarioSchema,
  descripcion: z.string().optional(),
  estFechaInicio: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Debe ser una fecha válida (YYYY-MM-DD)",
  }),
});

export type Usuario = z.infer<typeof UsuarioSchema>;
