import { adapterUsuario } from "../utils/adaptar.usuario";
import { UsuarioService } from "./services.usuario";
export type TiposUsuario = "A" | "D" | "E";
export type SexoUsuario = "F" | "M" | "O";
export type EstadoUsuario = "A" | "I";
export type RedSocialUsuario = {
  facebook?: "" | null | string;
  instagram?: "" | null | string;
  linkedin?: "" | null | string;
  x?: "" | null | string;
  github?: "" | null | string;
};

export type Usuario = {
  id?: number | undefined;
  correo: string;
  nombres: string;
  apellidos: string;
  fotoDePerfil: string;
  fechaDeNacimiento: string;
  sexo: SexoUsuario;

  tipo?: TiposUsuario | undefined;
  estFechaInicio?: string | undefined;
  estado: EstadoUsuario;

  redSocial: RedSocialUsuario;
  descripcion: string;

  contrasenia?: string | undefined;
  confirmarContrasenia?: string | undefined;
};

export const usuarios: Usuario[] = [
  {
    id: 1,
    correo: "juan.perez@example.com",
    nombres: "Juan",
    apellidos: "Pérez",
    fotoDePerfil: "https://example.com/juan.jpg",
    fechaDeNacimiento: "1990-05-15",
    sexo: "M",
    tipo: "A",
    estFechaInicio: "2023-01-01",
    estado: "A",
    redSocial: {
      facebook: "https://facebook.com/juanperez",
      instagram: "https://instagram.com/juanperez",
      linkedin: null,
      x: "https://x.com/juanperez",
      github: "https://github.com/juanperez",
    },
    descripcion: "Desarrollador Full Stack con 5 años de experiencia.",
  },
  {
    id: 2,
    correo: "maria.gomez@example.com",
    nombres: "María",
    apellidos: "Gómez",
    fotoDePerfil: "https://example.com/maria.jpg",
    fechaDeNacimiento: "1988-08-21",
    sexo: "F",
    tipo: "E",
    estFechaInicio: "2022-06-15",
    estado: "A",
    redSocial: {
      facebook: null,
      instagram: "https://instagram.com/mariagomez",
      linkedin: "https://linkedin.com/in/mariagomez",
      x: null,
      github: "",
    },
    descripcion: "Especialista en UX/UI y diseño de productos digitales.",
  },
  {
    id: 3,
    correo: "carlos.rodriguez@example.com",
    nombres: "Carlos",
    apellidos: "Rodríguez",
    fotoDePerfil: "https://example.com/carlos.jpg",
    fechaDeNacimiento: "1995-02-10",
    sexo: "M",
    tipo: "D",
    estFechaInicio: "2021-09-10",
    estado: "I",
    redSocial: {
      facebook: "",
      instagram: null,
      linkedin: "https://linkedin.com/in/carlosrodriguez",
      x: "https://x.com/carlosrodriguez",
      github: "https://github.com/carlosrodriguez",
    },
    descripcion:
      "Ingeniero de software con experiencia en backend y bases de datos.",
  },
  {
    id: 4,
    correo: "ana.lopez@example.com",
    nombres: "Ana",
    apellidos: "López",
    fotoDePerfil: "https://example.com/ana.jpg",
    fechaDeNacimiento: "1992-12-03",
    sexo: "F",
    tipo: "A",
    estFechaInicio: "2020-04-20",
    estado: "A",
    redSocial: {
      facebook: "https://facebook.com/analopez",
      instagram: "",
      linkedin: "https://linkedin.com/in/analopez",
      x: null,
      github: null,
    },
    descripcion: "Project Manager con experiencia en metodologías ágiles.",
  },
];

const usuarioServiceEjemplo: UsuarioService = {
  estado: "A",
  id: 6,
  nombre: "YA",
  apellido: "YA",
  fecha_nacimiento: "2002-04-22T00:00:00.000Z",
  sexo: "M",
  descripcion:
    "Soy un ingeniero civil altamente motivado y con una sólida formación en gestión de proyectos. Busco un puesto que me permita aplicar mis habilidades en la planificación y supervisión de proyectos de construcción, con el objetivo de contribuir al éxito de la empresa y desarrollarme profesionalmente en un entorno retador y dinámico",
  correo: "rodrigo.admiSn@gmail.com",
  contrasenia: "$2b$10$ZCxiGXQANpB7wL/j2xEGP.7pU3AfOlA46Rkzqd2NuD3DZFPzw2Vna",
  red_social:
    '{"facebook":"aaaa","instagram":"aaaa","linkedin":"aa","x":"aaaa"}',
  foto_perfil:
    "https://storage.googleapis.com/fireploy-57702.firebasestorage.app/uploads/User_Image_6.png",
  tipo: "Docente",
};
export const usuarioEjemplo: Usuario = adapterUsuario(usuarioServiceEjemplo);

export const usuarioTemplate: Usuario =  {
  id: 0,
  correo: "",
  nombres: "",
  apellidos: "",
  fotoDePerfil: "",
  fechaDeNacimiento: "",
  sexo: "" as SexoUsuario,
  tipo: "E",
  estFechaInicio: "",
  estado: "A",
  redSocial: {
    facebook: "",
    instagram: "",
    linkedin: "",
    x: "",
    github: ""
  },
  descripcion: "",
};