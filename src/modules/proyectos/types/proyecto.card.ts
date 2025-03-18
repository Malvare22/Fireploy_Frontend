import { Imagenes } from "@modules/general/components/roundedIcon/utils";
import { UsuarioPortafolioCard } from "@modules/usuarios/types/usuario.portafolio";
import { EstadoProyecto } from "./proyecto.estado";

export type ProyectoCard = {
  titulo: string;
  descripcion: string;
  imagen: string;
  integrantes: UsuarioPortafolioCard[];
  tecnologias: { nombre: string; imagen: keyof typeof Imagenes }[];
  puntuacion: number;
  calificador: UsuarioPortafolioCard;
  materia: string;
  grupo: string;
  seccion: string;
  semestre: string;
  estado: EstadoProyecto;
};


export const proyecto1: ProyectoCard = {
  titulo: "Plataforma de Aprendizaje AI",
  descripcion:
    "Una plataforma interactiva basada en inteligencia artificial para ayudar a los estudiantes a mejorar sus habilidades.",
  imagen: "https://backiee.com/static/wallpapers/560x315/278140.jpg",
  integrantes: [
    {
      nombres: "Carlos Pérez",
      id: "1",
      foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnLAwnCxV26w3jNd5ARMQl_WXk9yn7IRAi5Q&s",
      rol: "Desarrollador Full Stack",
      logros: { titulo: "Repositorios en GitHub", valor: "50+" },
    },
    {
      nombres: "Ana Gómez",
      id: "1",
      foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnLAwnCxV26w3jNd5ARMQl_WXk9yn7IRAi5Q&s",
      rol: "Diseñadora UI/UX",
      logros: { titulo: "Proyectos completados", valor: "30+" },
    },
    {
      nombres: "Ana Gómez",
      id: "1",
      foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnLAwnCxV26w3jNd5ARMQl_WXk9yn7IRAi5Q&s",
      rol: "Diseñadora UI/UX",
      logros: { titulo: "Proyectos completados", valor: "30+" },
    },
    
  ],
  tecnologias: [
    { nombre: "React", imagen: 'react' },
    { nombre: "Node.js", imagen: 'nodejs' },
    { nombre: "MongoDB", imagen: 'mongodb' },
  ],
  puntuacion: 5,
  calificador: {
    id: "1",
    nombres: "Laura Martínez",
    foto: "s",
    rol: "Gerente de Producto",
    logros: { titulo: "Años de experiencia", valor: "10+" },
  },
  materia: 'Análisis de Algoritmos',
  grupo: 'A',
  seccion: 'Teoría de grafos',
  semestre: '2025-1',
  estado: 'I'
};
