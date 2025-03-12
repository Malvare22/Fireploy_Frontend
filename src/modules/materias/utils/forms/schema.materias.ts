import { z } from "zod";
import { listaSemestresMaterias } from "../map.materias";

export const MateriaModalSchema = z.object({
  semestre: z.enum(listaSemestresMaterias),
  estado: z.enum(["A", "I"]), // A = Activo, I = Inactivo
  nombre: z.string().min(1, "El nombre es obligatorio").max(100, "El nombre es demasiado largo"),
  id: z.number().optional()
});

// Tipo TypeScript inferido a partir del esquema
export type MateriaModal = z.infer<typeof MateriaModalSchema>;
