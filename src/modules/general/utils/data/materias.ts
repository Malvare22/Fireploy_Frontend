import { TypeProyecto } from "./proyectos";

interface Seccion {
  id: number; // ID numérico de la sección
  titulo: string; // Título de la sección
  proyectos: TypeProyecto[]; // Lista de proyectos asociados a la sección
}

interface Estudiante {
  id: number;
}

export const materiasDummy: Materia[] = [
  {
    id: 1,
    nombre: "Matemáticas",
    grupos: [
      {
        id: "A",
        estudiantes: [{ id: 101 }, { id: 102 }, { id: 103 }],
        secciones: [
          {
            id: 1,
            titulo: "Sección A1",
            proyectos: [] // Aquí se pueden asociar proyectos en el futuro
          }
        ]
      },
      {
        id: "B",
        estudiantes: [{ id: 201 }, { id: 202 }],
        secciones: [
          {
            id: 2,
            titulo: "Sección B1",
            proyectos: []
          }
        ]
      }
    ]
  },
  {
    id: 2,
    nombre: "Historia",
    grupos: [
      {
        id: "A",
        estudiantes: [{ id: 301 }, { id: 302 }],
        secciones: [
          {
            id: 3,
            titulo: "Sección A1",
            proyectos: []
          }
        ]
      }
    ]
  },
  {
    id: 3,
    nombre: "Química",
    grupos: [
      {
        id: "A",
        estudiantes: [{ id: 401 }, { id: 402 }, { id: 403 }, { id: 404 }],
        secciones: [
          {
            id: 4,
            titulo: "Sección A1",
            proyectos: []
          }
        ]
      },
      {
        id: "B",
        estudiantes: [{ id: 501 }, { id: 502 }],
        secciones: [
          {
            id: 5,
            titulo: "Sección B1",
            proyectos: []
          }
        ]
      },
      {
        id: "C",
        estudiantes: [{ id: 601 }],
        secciones: [
          {
            id: 6,
            titulo: "Sección C1",
            proyectos: []
          }
        ]
      }
    ]
  }
];

interface Grupo {
  id: string; // ID del grupo (letra)
  estudiantes: Estudiante[]; // Lista de estudiantes
  secciones: Seccion[]; // Lista de secciones
}

interface Materia {
  id: number; // ID de la materia
  nombre: string; // Nombre de la materia
  grupos: Grupo[]; // Lista de grupos
}
