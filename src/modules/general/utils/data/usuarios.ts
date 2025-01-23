// Interfaz para representar las redes sociales
interface RedSocial {
  facebook?: string; // URL de la cuenta de Facebook
  linkedin?: string; // URL de la cuenta de LinkedIn
  instagram?: string; // URL de la cuenta de Instagram
  x?: string; // URL de la red social "X" (anteriormente Twitter)
}

// Interfaz principal para un usuario
export interface TypeUsuario {
  id: number; // Identificador único del usuario
  correo: string; // Dirección de correo electrónico
  fechaNacimiento: string; // Fecha de nacimiento en formato "YYYY/MM/DD"
  estado: "A" | "I"; // 'A' para Activo, 'I' para Inactivo
  nombres: string; // Nombres del usuario
  apellidos: string; // Apellidos del usuario
  contraseña: string; // Contraseña del usuario
  sexo: "M" | "F" | "O"; // 'M' Masculino, 'F' Femenino, 'O' Otro
  descripcion: string; // Descripción breve del usuario
  redSocial: RedSocial; // Redes sociales asociadas al usuario
  fotoPerfil: string; // URL de la foto de perfil
  tipoUsuario: "A" | "E" | "D"; // Tipo de usuario: 'A' (Admin), 'E' (Estándar), 'D' (Desarrollador)
}

// Datos de ejemplo (usuarios dummy)
export const usuariosDummy: TypeUsuario[] = [
  {
    id: 1,
    correo: "pingoalex22@gmail.com",
    fechaNacimiento: "1990/01/01",
    estado: "A",
    nombres: "Rodrigo Andrés",
    apellidos: "Malaver Suárez",
    contraseña: "123", // Esto es solo un ejemplo; nunca almacenes contraseñas así
    sexo: "M",
    descripcion: "Usuario activo en la plataforma.",
    redSocial: {
      facebook: "https://facebook.com/usuario1",
      linkedin: "https://linkedin.com/in/usuario1"
    },
    fotoPerfil: "https://cdn.pixabay.com/photo/2023/02/08/06/33/fashion-7775827_960_720.jpg",
    tipoUsuario: "E" // Usuario estándar
  },
  {
    id: 2,
    correo: "usuario2@example.com",
    fechaNacimiento: "1995/05/15",
    estado: "I",
    nombres: "María",
    apellidos: "González",
    contraseña: "segura456", // Ejemplo de contraseña
    sexo: "F",
    descripcion: "Le gusta compartir contenido creativo.",
    redSocial: {
      instagram: "https://instagram.com/usuario2",
      x: "https://x.com/usuario2"
    },
    fotoPerfil: "https://cdn.pixabay.com/photo/2023/02/08/06/33/fashion-7775827_960_720.jpg",
    tipoUsuario: "A" // Usuario administrador
  },
  {
    id: 3,
    correo: "usuario3@example.com",
    fechaNacimiento: "2000/08/20",
    estado: "A",
    nombres: "Carlos",
    apellidos: "López",
    contraseña: "clave789", // Ejemplo de contraseña
    sexo: "M",
    descripcion: "Amante de la tecnología y la música.",
    redSocial: {
      facebook: "https://facebook.com/usuario3",
      instagram: "https://instagram.com/usuario3",
      x: "https://x.com/usuario3"
    },
    fotoPerfil: "https://cdn.pixabay.com/photo/2023/02/08/06/33/fashion-7775827_960_720.jpg",
    tipoUsuario: "D" // Usuario desarrollador
  }
];
