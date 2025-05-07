/**
 * Represents a user profile in the system.
 * 
 * This interface defines the structure of a user, which includes personal details, contact information,
 * and other optional fields that may be included in the user's profile.
 * 
 * @interface UsuarioService
 * 
 * @property {string} estado - The status of the user (e.g., active, inactive).
 * @property {number} id - The unique identifier for the user.
 * @property {string} nombre - The user's first name.
 * @property {string} apellido - The user's last name.
 * @property {string} fecha_nacimiento - The user's birth date in ISO format (YYYY-MM-DD).
 * @property {string} sexo - The user's gender.
 * @property {string | null} descripcion - A description about the user, or `null` if not provided.
 * @property {string} correo - The user's email address.
 * @property {string | null | undefined} contrasenia - The user's password (optional, may be `null` or `undefined`).
 * @property {string} red_social - A JSON string or object containing the user's social media links.
 * @property {string | null} foto_perfil - The URL to the user's profile picture (optional, may be `null`).
 * @property {string | undefined | null} tipo - The user's type (e.g., admin, user, etc.), which may be `undefined` or `null`.
 * @property {string | null | undefined} est_fecha_inicio - The user's start date (optional, may be `null` or `undefined`).
 * 
 * @example
 * const user: UsuarioService = {
 *   estado: "active",
 *   id: 123,
 *   nombre: "John",
 *   apellido: "Doe",
 *   fecha_nacimiento: "1990-01-01",
 *   sexo: "male",
 *   descripcion: "A passionate developer.",
 *   correo: "john.doe@example.com",
 *   red_social: '{"facebook": "john.doe", "twitter": "johndoe"}',
 *   foto_perfil: "https://example.com/profile.jpg",
 *   tipo: "admin",
 *   est_fecha_inicio: "2023-01-01"
 * };
 * ```
 */ 
export interface UsuarioService {
    estado: string;
    id: number;
    nombre: string;
    apellido: string;
    fecha_nacimiento: string;
    sexo: string;
    descripcion: string | null;
    correo: string;
    contrasenia?: string | null | undefined;
    red_social: string;
    foto_perfil?: string | null;
    tipo?: string | undefined | null;
    est_fecha_inicio?: string | null | undefined;
  }