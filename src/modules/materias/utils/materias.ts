import { Materia } from "../types/materia";

export const getMateriasSemestresLabels = () => {
  const labels = ["l", "ll", "lll", "lV", "V", "Vl", "Vll", "Vlll", "lX", "X"];
  return labels.map((label, index) => [index + 1, label] as [number, string]);
};

const materiaStates: Record<Materia["estado"], string> = {
  A: "Activo",
  I: "Inactivo",
} as const;

export const getMateriaStateMap = new Map(
  Object.entries(materiaStates) as [Materia["estado"], string][]
);

export const getMateriaStatesArray = (
  Object.entries(materiaStates) as [Materia["estado"], string][]
);
