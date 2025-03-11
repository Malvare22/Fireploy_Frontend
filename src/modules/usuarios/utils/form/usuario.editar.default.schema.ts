import { z } from "zod";
import { apellidosSchema, descripcionSchema, fotoDePerfilSchema, nombresSchema, redSocialUsuarioSchema, sexoUsuarioSchema, } from "./usuario.schema";
import { fechaSchema } from "./fechaSchema";

/**
 * Plantilla de información para modificar perfil por parte del mismo usuario
 */
export const UsuarioEditarDefaultSchema = z.object({
  fechaDeNacimiento: fechaSchema,
  nombres: nombresSchema,
  apellidos: apellidosSchema,
  sexo: sexoUsuarioSchema,
  fotoDePerfil: fotoDePerfilSchema,
  redSocial: redSocialUsuarioSchema,
  descripcion: descripcionSchema,
});

export type UsuarioEditarDefault = z.infer<typeof UsuarioEditarDefaultSchema>;
