import { z } from "zod";

export const ProyectoSchema = z.object({
    titulo: z.string(),
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
  });