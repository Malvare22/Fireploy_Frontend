import { UsuarioPortafolioCard, usuarioPrueba } from "@modules/usuarios/types/usuario.portafolio";
import { Proyecto } from "./proyecto.tipo";
export type ProyectoCard = {
  id: number;
  titulo: string;
  descripcion: string;
  imagen: string;
  integrantes: UsuarioPortafolioCard[];
  frontend?: string | null;
  backend?: string | null;
  integrado?: string | null;
  dataBase: string;
  fav_usuarios: number[];
  materia: string;
  grupo: string;
  seccion: string;
  semestre: string;
  estado: Proyecto["estadoDeEjecucion"];
};

export const proyectoEjemplo: ProyectoCard = {
  id: 101,
  titulo: "Sistema de Gestión Académica",
  descripcion:
    "Aplicación web para administrar cursos, estudiantes y calificaciones en una institución educativa.",
  imagen:
    "https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&w=800&q=80",
  integrantes: [usuarioPrueba],
  frontend: "React, TypeScript, Tailwind CSS",
  backend: "Node.js, Express",
  dataBase: "PostgreSQL",
  fav_usuarios: [],
  materia: "Ingeniería de Software",
  grupo: "Grupo 3",
  seccion: "A",
  semestre: "2024-1",
  estado: "E",
};
