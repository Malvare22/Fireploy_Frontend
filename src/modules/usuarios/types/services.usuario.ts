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