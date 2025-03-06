import { z } from "zod";
import { SexoUsuarioSchema } from "./usuario.schema";

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

export const UsuarioEditarDefaultSchema = z.object({
  fechaDeNacimiento: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Debe ser una fecha válida (YYYY-MM-DD)",
  }),
  nombres: z.string().min(1, { message: "El nombre no puede estar vacío" }),
  apellidos: z.string().min(1, { message: "El apellido no puede estar vacío" }),
  sexo: SexoUsuarioSchema,
  fotoDePerfil: z.string().url({ message: "Debe ser una URL válida" }),
  redSocial: RedSocialUsuarioSchema,
  descripcion: z.string().optional(),
});

export type UsuarioEditarDefault = z.infer<typeof UsuarioEditarDefaultSchema>;
