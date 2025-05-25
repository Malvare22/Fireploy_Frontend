export type Fichero = {
  id?: number
  nombre: string
  contenido: File | null
}

export type FicheroService = {
  id?: number
  nombre: string
  contenido: string
}