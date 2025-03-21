import { seccionesCurso } from "./curso.seccion";
import { CursoMateria } from "./materia.curso";
export type EstadoMateria = "A" | "I";
export type EstadoCurso = "A" | "I";
export type SemestreMateria =
  | "I"
  | "II"
  | "III"
  | "IV"
  | "V"
  | "VI"
  | "VII"
  | "VIII"
  | "IX"
  | "X";
export type Materia = {
  estado: EstadoMateria;
  nombre: string;
  semestre: string;
  id: number;
  descripcion: string;
  cursos: CursoMateria[];
};

const cursoEjemplo = [
  {
    id: "101",
    grupo: "G1",
    semestre: "2023-1",
    descripcion: "Curso de cálculo multivariable.",
    estado: "A",
    materia: "POO 1",
    secciones: seccionesCurso,
    docente: {
      id: 1,
      nombres: "Marco Antonio",
      apellidos: "Lopez Angarita",
      correo: "juan.perez@example.com",
      fechaDeNacimiento: "1980-05-15",
      estado: "A",
      tipo: "D",
      sexo: "M",
      fotoDePerfil: "url_foto_juan",
      redSocial: {
        facebook: "juan.perez",
        instagram: null,
        linkedin: "juan-perez",
        x: null,
        github: null,
      },
      descripcion: "Profesor de matemáticas con 10 años de experiencia.",
      estFechaInicio: "2010-09-01",
    },
    estudiantes: [
      {
        id: 2,
        nombres: "Ana",
        apellidos: "Gómez",
        correo: "ana.gomez@example.com",
        fechaDeNacimiento: "2000-03-20",
        estado: "A",
        tipo: "E",
        sexo: "F",
        fotoDePerfil: "url_foto_ana",
        redSocial: {
          facebook: null,
          instagram: "ana.gomez",
          linkedin: null,
          x: null,
          github: "ana-gomez",
        },
        descripcion: "Estudiante de ingeniería.",
        estFechaInicio: "2022-08-01",
      },
    ],
  },
];

export const materiasEjemplo: Materia[] = [
  {
    id: 1,
    nombre: "Matemáticas Avanzadas",
    semestre: "2023-1",
    descripcion:
      "Curso de matemáticas avanzadas que cubre temas como cálculo multivariable y álgebra lineal. asdjhsdkgjhdfkjghdkf gidj hrijhijdf h gkjdfhngkjdfkjgdhkjhgdkjhgdkjhfgkjdhfgkjdhfgkjhdfkghdfkjhgkdjhgkdjhfgk",
    estado: "A",
    cursos: [
      ...cursoEjemplo,
      ...cursoEjemplo,
      ...cursoEjemplo,
      ...cursoEjemplo,
      ...cursoEjemplo,
      ...cursoEjemplo,
      ...cursoEjemplo,
      ...cursoEjemplo,
    ],
  },
  {
    id: 2,
    nombre: "Física Cuántica",
    semestre: "2023-1",
    descripcion:
      "Introducción a los principios de la física cuántica y sus aplicaciones.",
    estado: "A",
    cursos: [
      {
        id: "201",
        grupo: "G1",
        semestre: "2023-1",
        descripcion: "Curso de mecánica cuántica.",
        estado: "A",
        secciones: seccionesCurso,
        materia: "POO 2",
        docente: {
          id: 3,
          nombres: "Carlos",
          apellidos: "Ruiz",
          correo: "carlos.ruiz@example.com",
          fechaDeNacimiento: "1975-12-10",
          estado: "A",
          tipo: "D",
          sexo: "M",
          fotoDePerfil: "url_foto_carlos",
          redSocial: {
            facebook: null,
            instagram: null,
            linkedin: "carlos-ruiz",
            x: "carlos_ruiz",
            github: null,
          },
          descripcion: "Profesor de física con especialización en cuántica.",
          estFechaInicio: "2005-06-01",
        },
        estudiantes: [
          {
            id: 4,
            nombres: "Luis",
            apellidos: "Martínez",
            correo: "luis.martinez@example.com",
            fechaDeNacimiento: "1999-07-25",
            estado: "A",
            tipo: "E",
            sexo: "M",
            fotoDePerfil: "url_foto_luis",
            redSocial: {
              facebook: "luis.martinez",
              instagram: null,
              linkedin: null,
              x: null,
              github: "luis-martinez",
            },
            descripcion: "Estudiante de física.",
            estFechaInicio: "2021-08-01",
          },
        ],
      },
    ],
  },
];
