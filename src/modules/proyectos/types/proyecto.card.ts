import { UsuarioPortafolioCard } from "@modules/usuarios/types/usuario.portafolio";

export type ProyectoCard = {
  titulo: string;
  descripcion: string;
  imagen: string;
  integrandes: UsuarioPortafolioCard[];
  tecnologias: { nombre: string; imagen: string }[];
  puntuacion: number;
  calificador: UsuarioPortafolioCard;
};


export const proyecto1: ProyectoCard = {
  titulo: "Plataforma de Aprendizaje AI",
  descripcion:
    "Una plataforma interactiva basada en inteligencia artificial para ayudar a los estudiantes a mejorar sus habilidades.",
  imagen: "https://backiee.com/static/wallpapers/560x315/278140.jpg",
  integrandes: [
    {
      nombres: "Carlos Pérez",
      id: "1",
      foto: "https://example.com/carlos.png",
      rol: "Desarrollador Full Stack",
      logros: { titulo: "Repositorios en GitHub", valor: "50+" },
    },
    {
      nombres: "Ana Gómez",
      id: "1",
      foto: "https://example.com/ana.png",
      rol: "Diseñadora UI/UX",
      logros: { titulo: "Proyectos completados", valor: "30+" },
    },
  ],
  tecnologias: [
    { nombre: "React", imagen: "https://example.com/react.png" },
    { nombre: "Node.js", imagen: "https://example.com/node.png" },
    { nombre: "TensorFlow", imagen: "https://example.com/tensorflow.png" },
  ],
  puntuacion: 5,
  calificador: {
    id: "1",
    nombres: "Laura Martínez",
    foto: "https://example.com/laura.png",
    rol: "Gerente de Producto",
    logros: { titulo: "Años de experiencia", valor: "10+" },
  },
};
