import { TypeProyecto } from "@modules/general/utils/data/proyectos";
import { z } from "zod";

export const ProyectoSchema = z.object({
  repositorioFrontend: z
    .object({
      id: z.number().int().positive(),
      url: z.string().url(),
    })
    .optional(),
  repositorioBackend: z.object({
    id: z.number().int().positive(),
    url: z.string().url(),
  }),
  baseDeDatos: z.object({
    id: z.number().int().positive(),
    url: z.string().url(),
  }),
  colaboradores: z.array(
    z.object({
      id: z.number().int().positive(),
    })
  ),
  titulo: z.string().min(1, { message: "Ingrese un título válido" }),
  description: z.string().refine((d) => d.length >= 1 && d.length <= 360, {
    message: "Ingrese una descripción de máximo 360 caracteres",
  }),
  materia: z
    .number()
    .positive({ message: "Es requerido que seleccione un curso válido" }),
  curso: z.string().length(1, { message: "Seleccione un curso válido" }),
  seccion: z.number({ message: "Seleccione un sección válida" }),
  numeroCapas: z
    .number()
    .refine((n) => n == 1 || n == 2, {
      message: "Seleccione un número de capas válido (1 ó 2)",
    }),
});
