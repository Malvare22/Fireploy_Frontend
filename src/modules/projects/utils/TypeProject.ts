export interface TypeProject {
  titulo: string;
  estado: "online" | "offline" | "pausado" | "cargando";
  ultimaModificacion: string;
  tecnologias: {imagen: string, nombre: string} [];
}
