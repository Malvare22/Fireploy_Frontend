export type MateriaTabla = {
  codigo: number;
  nombre: string;
  semestre: number;
  cantidadGruposActivos: number;
  estado: "A" | "I";
};

export const exampleMaterias: MateriaTabla[] = [
  {
    codigo: 101,
    nombre: "Matemáticas I",
    semestre: 2,
    cantidadGruposActivos: 3,
    estado: "A",
  },
  {
    codigo: 102,
    nombre: "Física I",
    semestre: 2,
    cantidadGruposActivos: 2,
    estado: "A",
  },
  {
    codigo: 103,
    nombre: "Programación I",
    semestre: 2,
    cantidadGruposActivos: 4,
    estado: "A",
  },
  {
    codigo: 104,
    nombre: "Historia Universal",
    semestre: 2,
    cantidadGruposActivos: 1,
    estado: "I",
  },
  {
    codigo: 105,
    nombre: "Química General",
    semestre: 2,
    cantidadGruposActivos: 3,
    estado: "A",
  },
];
