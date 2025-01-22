interface Grupo {
  id: string; // ID del grupo (letra)
  estudiantes: { id: number }[]; // Lista de estudiantes
}

interface Materia {
  id: number; // ID de la materia
  nombre: string; // Nombre de la materia
  grupos: Grupo[]; // Lista de grupos
}

const materias: Materia[] = [
  {
    id: 1,
    nombre: "Matemáticas",
    grupos: [
      {
        id: "A",
        estudiantes: [{ id: 101 }, { id: 102 }, { id: 103 }],
      },
      {
        id: "B",
        estudiantes: [{ id: 201 }, { id: 202 }],
      },
    ],
  },
  {
    id: 2,
    nombre: "Historia",
    grupos: [
      {
        id: "A",
        estudiantes: [{ id: 301 }, { id: 302 }],
      },
    ],
  },
  {
    id: 3,
    nombre: "Química",
    grupos: [
      {
        id: "A",
        estudiantes: [{ id: 401 }, { id: 402 }, { id: 403 }, { id: 404 }],
      },
      {
        id: "B",
        estudiantes: [{ id: 501 }, { id: 502 }],
      },
      {
        id: "C",
        estudiantes: [{ id: 601 }],
      },
    ],
  },
];

export default materias;
