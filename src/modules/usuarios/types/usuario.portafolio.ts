/**
 * Represents an achievement or milestone of a user.
 * 
 * @type {Object}
 * @property {string} titulo - The title of the achievement or milestone.
 * @property {string} valor - The value or description of the achievement.
 */
export type Logro = {
  titulo: string;
  valor: string;
};

/**
 * Represents a user’s portfolio card information.
 * Contains personal details, profile picture, role, and achievements.
 * 
 * @type {Object}
 * @property {string} nombres - The full name of the user.
 * @property {string} foto - The URL of the user's profile photo.
 * @property {string} [rol] - The user's role or job title (optional).
 * @property {Logro[]} [logros] - A list of achievements or milestones of the user (optional).
 * @property {string} id - A unique identifier for the user.
 */
export type UsuarioPortafolioCard = {
  nombres: string;
  foto: string;
  rol?: string;
  logros?: Logro[];
  id: string;
};

/**
 * Example of a user's portfolio card with basic details and achievements.
 * This data is typically used to display a user’s portfolio in a list or card format.
 * 
 * @type {UsuarioPortafolioCard}
 * @property {string} nombres - "Carlos Pérez"
 * @property {string} foto - The URL to a sample user image.
 * @property {string} rol - "Desarrollador Full Stack"
 * @property {Logro[]} logros - A list of user achievements, including GitHub repositories.
 * @property {string} id - "1"
 */
export const usuarioPrueba: UsuarioPortafolioCard = {
  nombres: "Carlos Pérez",
  id: "1",
  foto: "https://img.freepik.com/vector-premium/iconos-usuario-incluye-iconos-usuario-icones-personas-simbolos-elementos-diseno-grafico-calidad-premium_981536-526.jpg",
  rol: "Desarrollador Full Stack",
  logros: [{ titulo: "Repositorios en GitHub", valor: "50+" }],
};
