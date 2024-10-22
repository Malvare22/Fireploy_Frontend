import { SubjectType } from "@modules/subjects/types/subjectType";

export const subjectData: SubjectType[] = [
  {
    name: "Matemáticas",
    code: 101,
    group: "A1",
    students: [
      { name: "Juan Pérez", code: 1001 },
      { name: "María García", code: 1002 },
      { name: "Carlos Ramírez", code: 1003 }
    ],
    sections: [
      {
        name: "Álgebra",
        projects: [
          {
            name: "Ecuaciones Lineales",
            students: [
              { name: "Juan Pérez", code: 1001 },
              { name: "María García", code: 1002 }
            ]
          },
          {
            name: "Polinomios",
            students: [
              { name: "Carlos Ramírez", code: 1003 },
              { name: "María García", code: 1002 }
            ]
          }
        ]
      },
      {
        name: "Geometría",
        projects: [
          {
            name: "Teorema de Pitágoras",
            students: [
              { name: "Juan Pérez", code: 1001 },
              { name: "Carlos Ramírez", code: 1003 }
            ]
          }
        ]
      }
    ]
  },
  {
    name: "Física",
    code: 102,
    group: "B1",
    students: [
      { name: "Ana Torres", code: 1004 },
      { name: "Luis Gómez", code: 1005 }
    ],
    sections: [
      {
        name: "Mecánica",
        projects: [
          {
            name: "Movimiento Rectilíneo",
            students: [
              { name: "Ana Torres", code: 1004 },
              { name: "Luis Gómez", code: 1005 }
            ]
          }
        ]
      }
    ]
  },
  {
    name: "Química",
    code: 103,
    group: "C1",
    students: [
      { name: "José Fernández", code: 1006 },
      { name: "Clara López", code: 1007 }
    ],
    sections: [
      {
        name: "Reacciones Químicas",
        projects: [
          {
            name: "Ácidos y Bases",
            students: [
              { name: "José Fernández", code: 1006 },
              { name: "Clara López", code: 1007 }
            ]
          }
        ]
      }
    ]
  }
];
