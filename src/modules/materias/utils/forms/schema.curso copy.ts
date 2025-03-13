import { z } from "zod";

export const SeccionSchema = z.object({
  titulo: z.string(),
  descripcion: z.string().optional(),
  fechaDeCierre: z.string(),
  fechaDeInicio: z.string(),
  estado: z.enum(["I", "A"] as const),
});

export type SeccionSchemaType = z.infer<typeof SeccionSchema>;

export const seccionBase: SeccionSchemaType = {
  estado: "I",
  descripcion: "",
  fechaDeCierre: "",
  fechaDeInicio: "",
  titulo: "",
};
