/**
 * Enum representing different types of actions for buttons used in the UI.
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
