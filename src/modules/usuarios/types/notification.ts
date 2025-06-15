/**
 * `NotificationMessage` – Represents a notification entity in the system.
 *
 * Notifications can relate to different types of events, such as projects or requests.
 *
 * Type mapping:
 * - 1 → Project
 * - 2 → Request
 *
 * @property {number} id - The unique identifier of the notification.
 * @property {string} titulo - The title or subject of the notification.
 * @property {string} mensaje - The detailed message content of the notification.
 * @property {number} tipo - The type of notification (1 for Project, 2 for Request).
 * @property {string} fecha_creacion - The ISO timestamp when the notification was created.
 * @property {boolean} visto - Whether the notification has been viewed by the user.
 * @property {UsuarioNotificacion} usuario - The user associated with the notification.
 */
export type NotificationMessage = {
  id: number
  titulo: string
  mensaje: string
  tipo: number
  fecha_creacion: string
  visto: boolean
  usuario: UsuarioNotificacion
}

/**
 * `UsuarioNotificacion` – Represents minimal user information tied to a notification.
 *
 * @property {string} estado - The current status of the user (e.g., active, inactive).
 * @property {number} id - The unique identifier of the user.
 * @property {string} nombre - The full name of the user.
 */
export type UsuarioNotificacion = {
  estado: string
  id: number
  nombre: string
}
