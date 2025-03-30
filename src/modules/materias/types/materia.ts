import { seccionesCurso } from "./curso.seccion";
import { CursoMateria } from "./materia.curso";

export type EstadoMateria = "A" | "I";

export type EstadoCurso = "A" | "I";

export type Materia = {
  estado?: EstadoMateria;
  nombre: string;
  semestre: string;
  id: number;
  cursos?: CursoMateria[] | undefined;
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