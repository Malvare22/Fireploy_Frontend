import { z } from "zod";
import { BaseDeDatos } from "@modules/proyectos/types/baseDeDatos";
import { contraseniaSchema } from "@modules/usuarios/utils/form/usuario.schema";
import { UrlSchema } from "../../../materias/utils/forms/url.schema";
import { StandardStringRequiredSchema } from "@modules/materias/utils/forms/string.schema";

export const BaseDeDatosSchema: z.ZodType<BaseDeDatos> = z.object({
  proyecto: z.string().optional(),
  id: z.number().optional(),
  proyectoId: z.string().optional(),
  nombre: StandardStringRequiredSchema,
  contrasenia: contraseniaSchema,
  url: UrlSchema.min(1, "Campo Obligatorio"),
  tipo: z.enum(["S", "N", "E"], {
    errorMap: () => ({ message: "Selecciona un tipo de base de datos válido" }),
  }),
});
