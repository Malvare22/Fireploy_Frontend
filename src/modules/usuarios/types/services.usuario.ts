export interface UsuarioService {
    estado: string;
    id: number;
    nombre: string;
    apellido: string;
    fecha_nacimiento: string;
    sexo: string;
    descripcion: string | null;
    correo: string;
    contrasenia: string;
    red_social: string;
    foto_perfil: string;
    tipo: string;
    est_fecha_inicio?: string | null | undefined;
  }