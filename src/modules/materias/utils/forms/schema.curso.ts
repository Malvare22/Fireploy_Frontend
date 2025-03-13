import { z } from "zod";

const DocenteSchema = z
  .number()
  .min(0, { message: "Solo se admiten usuarios de tipo docente válidos" });

const EstadoSchema = z.enum(["I", "A"] as const, {
  message: "Ingrese un valor de estado válido",
});

const SemestreSchema = z.string();


const DescripcionSchema = z.string().optional();

export const CursoModalSchema = z.object({
  docente: DocenteSchema,
  estado: EstadoSchema,
  semestre: SemestreSchema,
  descripcion: DescripcionSchema,
});

export type CursoModal = z.infer<typeof CursoModalSchema>;

export const cursoModalBase: CursoModal = {
  docente: 0,
  estado: "I",
  semestre: "2025-1",
  descripcion: "",
};
