import { CursoMateria } from "@modules/materias/types/materia.curso";
import { z } from "zod";

const DocenteSchema = z.number();

const EstadoSchema = z.enum(["I", "A"] as const);

const SemestreSchema = z.string();

const MateriaIdSchema = z.number();

const DescripcionSchema = z.string().optional();

type CursoKeys = keyof Pick<
  CursoMateria,
  "docente" | "estado" | "semestre"
>;

type CursoModalType = {
  [K in CursoKeys]: unknown; // Permite cambiar valores
} & { materiaId: number; descripcion?: string };

export const CursoModalSchema: z.ZodType<CursoModalType> = z.object({
  docente: DocenteSchema,
  estado: EstadoSchema,
  semestre: SemestreSchema,
  materiaId: MateriaIdSchema,
  descripcion: DescripcionSchema,
});

export type CursoModal = z.infer<typeof CursoModalSchema>;

export const cursoModalBase: CursoModal = {
  materiaId: 0,
  docente: 0,
  estado: "I",
  semestre: "2025-1",
  descripcion: "",
};
