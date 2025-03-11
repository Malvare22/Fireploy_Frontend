import { EstadoCurso } from "./estado.curso";
import { Usuario } from "@modules/usuarios/types/usuario";
import { EstudianteEjemplo, estudiantesEjemplo } from "./estudiantes.ejemplo";

export type DocenteCurso = Pick<
  Usuario,
  "apellidos" | "nombres" | "correo" | "id" | "fotoDePerfil"
>;

export type CursoMateria = {
  id: string;
  grupo: string;
  semestre: string;
  descripcion: string;
  estado: EstadoCurso;
  docente: DocenteCurso;
  estudiantes: EstudianteEjemplo[];
};

export const ejemploCurso: CursoMateria = {
  id: "CURSO-123",
  grupo: "Grupo A",
  semestre: "2024-1",
  descripcion: "Curso de Matemáticas Avanzadas",
  estado: "A", // Asegúrate de que coincide con los valores de EstadoCurso
  docente: {
    id: 101,
    nombres: "Carlos",
    apellidos: "Ramírez",
    correo: "carlos.ramirez@example.com",
    fotoDePerfil: "https://example.com/foto-docente.jpg",
  },
  estudiantes: estudiantesEjemplo,
};
