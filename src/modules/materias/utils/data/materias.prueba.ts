import { Materia } from "@modules/materias/types/materia";
import { usuariosPrueba } from "@modules/usuarios/test/data/usuarios.prueba";
import { seccionesCursoPrueba } from "./secciones.prueba";

// Datos de prueba para Materia
export const materiasPrueba: Materia[] = [
  {
    id: 1,
    nombre: "Matemáticas Avanzadas",
    semestre: "2024-1",
    cursos: [
      {
        id: "A",
        descripcion: "Curso intensivo de Matemáticas",
        grupo: "A",
        estudiantes: [usuariosPrueba[0], usuariosPrueba[1]],
        docente: usuariosPrueba[5],
        secciones: [seccionesCursoPrueba[0], seccionesCursoPrueba[1]],
      },
      {
        id: "B",
        descripcion: "Curso básico de Matemáticas",
        grupo: "B",
        estudiantes: [usuariosPrueba[2]],
        docente: usuariosPrueba[6],
        secciones: [seccionesCursoPrueba[0]],
      },
    ],
    cantidadDeCursos: 2,
  },
  {
    id: 2,
    nombre: "Programación Web",
    semestre: "2024-1",
    cursos: [
      {
        id: "C",
        descripcion: "Desarrollo Full Stack",
        grupo: "C",
        estudiantes: [usuariosPrueba[3], usuariosPrueba[4]],
        docente: usuariosPrueba[7],
        secciones: [seccionesCursoPrueba[0]],
      },
    ],
    cantidadDeCursos: 1,
  },
  {
    id: 3,
    nombre: "Física Aplicada",
    semestre: "2024-1",
    cursos: [
      {
        id: "D",
        descripcion: "Física Experimental",
        grupo: "D",
        estudiantes: [usuariosPrueba[1], usuariosPrueba[4]],
        docente: usuariosPrueba[5],
        secciones: [seccionesCursoPrueba[0]],
      },
    ],
    cantidadDeCursos: 2,
  },
];
