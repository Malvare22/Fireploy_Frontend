import { Proyecto } from "@modules/projects/types/proyecto";
import { TecnologiasPrueba } from "./tecnologias.prueba";

export const proyectosPrueba: Proyecto[] = [
  {
    id: 1,
    titulo: "Proyecto E-commerce",
    descripcion: "Desarrollo de una plataforma de comercio electrónico.",
    calificacion: 4.5,
    imagen: "https://imagenes.com/ecommerce.png",
    url: "https://mi-ecommerce.com",
    estadoDeEjecucion: "N",
    estadoDeProyecto: "A",
    baseDeDatos: {
      id: 1,
      usuario: "admin",
      url: "https://database-ecommerce.com",
      contrasenia: "securepassword123",
      tipo: "S",
    },
    repositorios: [
      {
        id: 101,
        url: "https://github.com/mi-ecommerce-frontend",
        tipo: "F",
        versionDeTecnologia: "17.0",
        variablesDeEntorno: "API_URL=https://api.mi-ecommerce.com",
        tecnologia: TecnologiasPrueba[0],
      },
      {
        id: 102,
        url: "https://github.com/mi-ecommerce-backend",
        tipo: "B",
        versionDeTecnologia: "16.x",
        variablesDeEntorno: "DB_URL=https://database-ecommerce.com",
        tecnologia: TecnologiasPrueba[1],
      },
    ],
  },
  {
    id: 2,
    titulo: "Proyecto de Blog",
    descripcion: "Plataforma para publicar artículos y noticias.",
    calificacion: 4.0,
    imagen: "https://imagenes.com/blog.png",
    url: "https://mi-blog.com",
    estadoDeEjecucion: "F",
    estadoDeProyecto: "A",
    baseDeDatos: {
      id: 2,
      usuario: "blogadmin",
      url: "https://database-blog.com",
      contrasenia: "anothersecurepassword",
      tipo: "N",
    },
    repositorios: [
      {
        id: 201,
        url: "https://github.com/mi-blog-frontend",
        tipo: "F",
        versionDeTecnologia: "18.0",
        variablesDeEntorno: "API_URL=https://api.mi-blog.com",
        tecnologia: TecnologiasPrueba[0],
      },
      {
        id: 202,
        url: "https://github.com/mi-blog-backend",
        tipo: "B",
        versionDeTecnologia: "14.x",
        variablesDeEntorno: "DB_URL=https://database-blog.com",
        tecnologia: TecnologiasPrueba[1],
      },
    ],
  },
];
