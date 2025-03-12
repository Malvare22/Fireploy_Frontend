export type MateriaService = {
  estado: string;
  nombre: string;
  semestre: string;
  id?: number;
  cursos?: CursoTablaService[];
};

export type CursoTablaService = {
  id: string;
  grupo: string;
  semestre: string;
  descripcion: string;
  estado: string;
  docente?: {
    id: number;
    nombre: string;
    apellido: string;
    foto_perfil: string;
    correo: string;
  };
};
