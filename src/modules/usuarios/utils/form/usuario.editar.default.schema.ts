import { z } from "zod";
import { RedSocialUsuarioSchema, SexoUsuarioSchema } from "./usuario.schema";

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
