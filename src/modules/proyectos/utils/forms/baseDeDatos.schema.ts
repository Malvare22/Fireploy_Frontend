import { z } from "zod";
import { BaseDeDatos } from "@modules/proyectos/types/baseDeDatos";
import { contraseniaSchema } from "@modules/usuarios/utils/form/usuario.schema";

export const BaseDeDatosSchema: z.ZodType<BaseDeDatos> = z.object({
  proyecto: z.string().min(1, { message: "El nombre del proyecto es obligatorio." }),
  tipo: z.enum(["S", "N", "E"], {
    message: "El tipo debe ser 'S', 'N' o 'E'.",
  }),
  id: z.string().min(1, { message: "El ID es obligatorio." }),
  proyectoId: z.string().min(1, { message: "El ID del proyecto es obligatorio." }),
  nombre: z.string().min(1, {message: "El nombre es obligatorio"}),
  contrasenia: contraseniaSchema,
});