import { Proyecto } from "@modules/proyectos/types/proyecto";
import { archivosLogsPrueba } from "./archivosLog.prueba";
import { BasesDeDatosPrueba } from "./baseDeDatos.prueba";
import { repositoriosPrueba } from "./repositorios.prueba";

export const proyectosPrueba: Proyecto[] = [
  {
    id: 1,
    titulo: "Proyecto E-commerce",
    descripcion:
      "Desarrollo de una plataforma de comercio electrónico completa para permitir a los usuarios comprar y vender productos de manera sencilla y segura. Esta plataforma incluye funcionalidades avanzadas como un sistema de carrito de compras intuitivo, una pasarela de pagos integrada para procesar transacciones de forma segura y eficiente, así como un panel de administración robusto que permite gestionar pedidos, productos y el inventario general del sitio. Además, se han incorporado múltiples métodos de autenticación para proteger la privacidad de los usuarios, junto con herramientas de análisis de ventas para ayudar a los administradores a tomar decisiones informadas.",
    calificacion: 4.5,
    imagen:
      "https://store-images.s-microsoft.com/image/apps.28264.65843946604617087.4d3f1eaa-9f9b-4884-8da5-69d3fa77479f.c9e7e6ca-2bfb-451b-a590-535c97dea939?q=90&w=480&h=270",
    url: "https://mi-ecommerce.com",
    estadoDeEjecucion: "N",
    estadoDeProyecto: "A",
    baseDeDatos: BasesDeDatosPrueba[0],
    repositorios: [repositoriosPrueba[1], repositoriosPrueba[0]],
    numeroDeCapas: 2,
    archivosLogs: archivosLogsPrueba,
    materiaInformacion: { materia: 1, curso: "A", seccion: "S01" },
    fechaUltimaModificacion: "2002/04/22",
  },
  {
    id: 2,
    titulo: "Proyecto de Blog",
    descripcion:
      "Plataforma avanzada para publicar artículos, noticias y contenido multimedia. Este proyecto permite a los usuarios registrarse, escribir y gestionar sus propios artículos a través de un sistema de edición intuitivo. Los visitantes del blog tienen la capacidad de leer, comentar y compartir el contenido publicado, lo que fomenta una comunidad activa. Además, el sistema incluye funcionalidades robustas de categorías y etiquetado para una navegación más efectiva, junto con herramientas de búsqueda avanzadas. La administración del contenido está respaldada por un sistema de moderación que permite gestionar comentarios, artículos y la configuración general del sitio, brindando a los administradores total control sobre el contenido publicado.",
    calificacion: 4.0,
    imagen:
      "https://www.techgames.com.mx/wp-content/uploads/2019/06/Rosado-Patricio-Estrella-Amarillo-Bob-Esponja.jpg",
    url: "https://mi-blog.com",
    estadoDeEjecucion: "F",
    estadoDeProyecto: "A",
    baseDeDatos: BasesDeDatosPrueba[0],
    repositorios: [repositoriosPrueba[0]],
    numeroDeCapas: 2,
    archivosLogs: archivosLogsPrueba,
    materiaInformacion: { materia: 0, curso: "A", seccion: "S01" },
    fechaUltimaModificacion: "2002/04/22",
  },
  {
    id: 3,
    titulo: "Proyecto Gestión de Recursos Humanos",
    descripcion:
      "Sistema integral para la administración de personal en empresas. Permite gestionar nóminas, vacaciones, evaluaciones de desempeño y procesos de contratación. Incluye módulos avanzados para generación de reportes y paneles de control con estadísticas clave, facilitando una mejor toma de decisiones para el departamento de recursos humanos.",
    calificacion: 4.8,
    imagen:
      "https://www.pockettactics.com/wp-content/sites/pockettactics/2023/01/mario-wallpapers-5.jpg",
    url: "https://gestion-recursos-humanos.com",
    estadoDeEjecucion: "E",
    estadoDeProyecto: "A",
    baseDeDatos: BasesDeDatosPrueba[0],
    repositorios: [repositoriosPrueba[0]],
    numeroDeCapas: 2,
    archivosLogs: archivosLogsPrueba,
    materiaInformacion: { materia: 0, curso: "A", seccion: "S01" },
    fechaUltimaModificacion: "2002/04/22",
  },
  {
    id: 4,
    titulo: "Proyecto Sistema de Reservas",
    descripcion:
      "Aplicación para la gestión de reservas en restaurantes, hoteles o espacios de coworking. Ofrece una interfaz amigable para los clientes y un sistema de administración robusto para los negocios, que permite gestionar horarios, disponibilidad y notificaciones automáticas por correo o SMS.",
    calificacion: 4.3,
    imagen:
      "https://w0.peakpx.com/wallpaper/213/730/HD-wallpaper-halo-halo-4-master-chief.jpg",
    url: "https://sistema-reservas.com",
    estadoDeEjecucion: "N",
    estadoDeProyecto: "A",
    baseDeDatos: BasesDeDatosPrueba[0],
    repositorios: [repositoriosPrueba[0]],
    numeroDeCapas: 2,
    archivosLogs: archivosLogsPrueba,
    materiaInformacion: { materia: 0, curso: "A", seccion: "S01" },
    fechaUltimaModificacion: "2002/04/22",
  },
  {
    id: 5,
    titulo: "Proyecto Plataforma de Educación Online",
    descripcion:
      "Sistema educativo que permite a instituciones académicas ofrecer cursos en línea de forma sencilla. Incluye funcionalidades para videoconferencias, evaluación automática, gestión de usuarios, foros de discusión y un sistema robusto de certificación. La plataforma está diseñada para soportar un alto volumen de usuarios y garantizar una experiencia educativa fluida.",
    calificacion: 4.7,
    imagen: "https://images.com/online-education.png",
    url: "https://educacion-online.com",
    estadoDeEjecucion: "L",
    estadoDeProyecto: "A",
    baseDeDatos: BasesDeDatosPrueba[0],
    repositorios: [repositoriosPrueba[0]],
    numeroDeCapas: 2,
    archivosLogs: archivosLogsPrueba,
    materiaInformacion: { materia: 0, curso: "A", seccion: "S01" },
    fechaUltimaModificacion: "2002/04/22",
  },
];
