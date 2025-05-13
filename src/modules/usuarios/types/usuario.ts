import { adaptUser } from "../utils/adapt.usuario";
import { UsuarioService } from "./services.usuario";

/**
 * Type representing the possible user types.
 * 
 * @type {string}
 * @values "A" | "D" | "E"
 */
export type TiposUsuario = "A" | "D" | "E";

/**
 * Type representing the possible gender values of a user.
 * 
 * @type {string}
 * @values "F" | "M" | "O"
 */
export type SexoUsuario = "F" | "M" | "O";

/**
 * Type representing the possible user states.
 * 
 * @type {string}
 * @values "A" | "I"
 */
export type EstadoUsuario = "A" | "I";

/**
 * Type representing the social media links of a user.
 * 
 * @type {Object}
 * @property {string} [facebook] - Facebook URL or an empty string if not available.
 * @property {string} [instagram] - Instagram URL or an empty string if not available.
 * @property {string} [linkedin] - LinkedIn URL or an empty string if not available.
 * @property {string} [x] - X (formerly Twitter) URL or an empty string if not available.
 * @property {string} [github] - GitHub URL or an empty string if not available.
 */
export type RedSocialUsuario = {
  facebook?: "" | null | string;
  instagram?: "" | null | string;
  linkedin?: "" | null | string;
  x?: "" | null | string;
  github?: "" | null | string;
};

/**
 * Type representing a user with various properties.
 * 
 * @type {Object}
 * @property {number} [id] - Optional unique identifier for the user.
 * @property {string} correo - User's email address.
 * @property {string} nombres - User's first name.
 * @property {string} apellidos - User's last name.
 * @property {string} fotoDePerfil - URL to the user's profile picture.
 * @property {string} fechaDeNacimiento - User's birth date in ISO format (YYYY-MM-DD).
 * @property {SexoUsuario} sexo - User's gender ("F", "M", "O").
 * @property {TiposUsuario} [tipo] - Optional type of user ("A", "D", "E").
 * @property {string} [estFechaInicio] - Optional start date in ISO format (YYYY-MM-DD).
 * @property {EstadoUsuario} estado - User's state ("A" - Active, "I" - Inactive).
 * @property {RedSocialUsuario} redSocial - Social media links of the user.
 * @property {string} descripcion - A brief description of the user.
 * @property {string} [contrasenia] - Optional user's password.
 * @property {string} [confirmarContrasenia] - Optional confirmation of the user's password.
 */
export type Usuario = {
  id?: number | undefined;
  correo: string;
  nombres: string;
  apellidos?: string | undefined;
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

/**
 * Example user array with sample user data.
 * 
 * @type {Usuario[]}
 * @example
 * [
 *   {
 *     id: 1,
 *     correo: "juan.perez@example.com",
 *     nombres: "Juan",
 *     apellidos: "Pérez",
 *     fotoDePerfil: "https://example.com/juan.jpg",
 *     fechaDeNacimiento: "1990-05-15",
 *     sexo: "M",
 *     tipo: "A",
 *     estFechaInicio: "2023-01-01",
 *     estado: "A",
 *     redSocial: { facebook: "https://facebook.com/juanperez", ... },
 *     descripcion: "Desarrollador Full Stack con 5 años de experiencia."
 *   }
 * ]
 */
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

/**
 * Example of a user service object, which is adapted into a `Usuario` type.
 * 
 * @type {UsuarioService}
 * @example
 * {
 *   estado: "A",
 *   id: 6,
 *   nombre: "YA",
 *   apellido: "YA",
 *   fecha_nacimiento: "2002-04-22T00:00:00.000Z",
 *   sexo: "M",
 *   descripcion: "Soy un ingeniero civil altamente motivado...",
 *   correo: "rodrigo.admiSn@gmail.com",
 *   foto_perfil: "https://storage.googleapis.com/fireploy-57702.firebasestorage.app/uploads/User_Image_6.png",
 *   tipo: "Docente",
 * }
 */
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

/**
 * Example of an adapted user object in `Usuario` format.
 * 
 * @type {Usuario}
 * @example
 * {
 *   correo: "rodrigo.admiSn@gmail.com",
 *   nombres: "YA",
 *   apellidos: "YA",
 *   fotoDePerfil: "https://...",
 *   fechaDeNacimiento: "2002-04-22",
 *   sexo: "M",
 *   estado: "A",
 *   redSocial: { facebook: "aaaa", ... },
 *   descripcion: "Soy un ingeniero civil...",
 * }
 */
export const usuarioEjemplo: Usuario = adaptUser(usuarioServiceEjemplo);

/**
 * Template for creating a new user, with empty or default values.
 * 
 * @type {Usuario}
 * @example
 * {
 *   correo: "",
 *   nombres: "",
 *   apellidos: "",
 *   fotoDePerfil: "",
 *   fechaDeNacimiento: "",
 *   sexo: "F",
 *   tipo: "E",
 *   estado: "A",
 *   redSocial: { facebook: "", instagram: "", ... },
 *   descripcion: "",
 * }
 */
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