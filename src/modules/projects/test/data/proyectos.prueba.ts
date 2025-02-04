import { Proyecto } from "@modules/projects/types/proyecto";
import { TecnologiasPrueba } from "./tecnologias.prueba";

export const proyectosPrueba: Proyecto[] = [
  {
    id: 1,
    titulo: "Proyecto E-commerce",
    descripcion: "Desarrollo de una plataforma de comercio electrónico completa para permitir a los usuarios comprar y vender productos de manera sencilla y segura. Esta plataforma incluye funcionalidades avanzadas como un sistema de carrito de compras intuitivo, una pasarela de pagos integrada para procesar transacciones de forma segura y eficiente, así como un panel de administración robusto que permite gestionar pedidos, productos y el inventario general del sitio. Además, se han incorporado múltiples métodos de autenticación para proteger la privacidad de los usuarios, junto con herramientas de análisis de ventas para ayudar a los administradores a tomar decisiones informadas.",
    calificacion: 4.5,
    imagen: "https://www.techgames.com.mx/wp-content/uploads/2019/06/Rosado-Patricio-Estrella-Amarillo-Bob-Esponja.jpg",
    url: "https://mi-ecommerce.com",
    estadoDeEjecucion: "N",
    estadoDeProyecto: "A",
    baseDeDatos: {
      id: 1,
      usuario: "admin",
      url: "https://database-ecommerce.com",
      contrasenia: "securepassword123",
      tipo: 'N'
    },
    repositorios: [
      {
        id: 101,
        url: "https://github.com/mi-ecommerce-frontend",
        tipo: 'F',
        versionDeTecnologia: "17.0",
        variablesDeEntorno: "APN_URL=https://api.mi-ecommerce.com",
        tecnologia: TecnologiasPrueba[0]
      },
      {
        id: 102,
        url: "https://github.com/mi-ecommerce-backend",
        tipo: 'B',
        versionDeTecnologia: "16.x",
        variablesDeEntorno: "DB_URL=https://database-ecommerce.com",
        tecnologia: TecnologiasPrueba[1]
      }
    ]
  },
  {
    id: 2,
    titulo: "Proyecto de Blog",
    descripcion: "Plataforma avanzada para publicar artículos, noticias y contenido multimedia. Este proyecto permite a los usuarios registrarse, escribir y gestionar sus propios artículos a través de un sistema de edición intuitivo. Los visitantes del blog tienen la capacidad de leer, comentar y compartir el contenido publicado, lo que fomenta una comunidad activa. Además, el sistema incluye funcionalidades robustas de categorías y etiquetado para una navegación más efectiva, junto con herramientas de búsqueda avanzadas. La administración del contenido está respaldada por un sistema de moderación que permite gestionar comentarios, artículos y la configuración general del sitio, brindando a los administradores total control sobre el contenido publicado.",
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
      tipo: 'N'
    },
    repositorios: [
      {
        id: 201,
        url: "https://github.com/mi-blog-frontend",
        tipo: 'F',
        versionDeTecnologia: "18.0",
        variablesDeEntorno: "APN_URL=https://api.mi-blog.com",
        tecnologia: TecnologiasPrueba[0]
      },
      {
        id: 202,
        url: "https://github.com/mi-blog-backend",
        tipo: 'B',
        versionDeTecnologia: "14.x",
        variablesDeEntorno: "DB_URL=https://database-blog.com",
        tecnologia: TecnologiasPrueba[1]
      }
    ]
  }
];

