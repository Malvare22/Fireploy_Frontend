/**
 * Enum representing different types of actions for buttons used in the UI.
 * This enum is used to define the various button actions that can be performed within the application.
 * 
 * Each type corresponds to a specific action such as viewing, editing, deleting, enabling or disabling entities.
 * These action types are used in button components to determine the functionality and appearance of the button.
 *
 * @enum {string}
 */
export enum actionButtonTypes {
  /** View details or content */
  ver = "ver",

  /** Edit existing content */
  editar = "editar",

  /** Delete content */
  eliminar = "eliminar",

  /** Enable a user account */
  habilitarUsuario = "habilitar usuario",

  /** Disable a user account */
  deshabilitarUsuario = "deshabilitar usuario",

  /** Enable a general entity */
  habilitar = "habilitar",

  /** Disable a general entity */
  deshabilitar = "deshabilitar",

  /** Cancel an ongoing action or operation */
  cancelar = 'cancelar',

  /** Save changes */
  guardar = 'guardar'
}
