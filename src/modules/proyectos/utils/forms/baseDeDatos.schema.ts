import { z } from "zod";
import { BaseDeDatos } from "@modules/proyectos/types/baseDeDatos";

export const baseDeDatosSchema: z.ZodType<BaseDeDatos> = z.object({
  proyecto: z.string().min(1, { message: "El nombre del proyecto es obligatorio." }),
  tipo: z.enum(["S", "N", "E"], {
    message: "El tipo debe ser 'S', 'N' o 'E'.",
  }),
  id: z.string().min(1, { message: "El ID es obligatorio." }),
  proyectoId: z.string().min(1, { message: "El ID del proyecto es obligatorio." }),
});