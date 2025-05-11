/**
 * Tipo 1 -> Proyecto
 * Tipo 2 -> Solicitud
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

export type UsuarioNotificacion = {
  estado: string
  id: number
  nombre: string
}
