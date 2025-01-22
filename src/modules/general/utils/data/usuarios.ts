interface RedSocial {
    facebook?: string;
    linkedin?: string;
    instagram?: string;
    x?: string; // Representa la red social "X" (anteriormente Twitter).
  }
  
  export interface TypeUsuario {
    id: number; // Ahora es un número
    correo: string;
    fechaNacimiento: string; // Ahora es un string en formato "YYYY/MM/DD"
    estado: "A" | "I"; // 'A' para Activo, 'I' para Inactivo
    nombres: string;
    apellidos: string;
    contraseña: string;
    sexo: "M" | "F" | "O"; // 'M', 'F', u 'O' para masculino, femenino u otro
    descripcion: string;
    redSocial: RedSocial; // JSON con redes sociales
    fotoPerfil: string;
  }
  
  export const usersDummy: TypeUsuario[] = [
    {
      id: 1,
      correo: "usuario1@example.com",
      fechaNacimiento: "1990/01/01",
      estado: "A",
      nombres: "Juan",
      apellidos: "Pérez",
      contraseña: "contraseña123",
      sexo: "M",
      descripcion: "Usuario activo en la plataforma.",
      redSocial: {
        facebook: "https://facebook.com/usuario1",
        linkedin: "https://linkedin.com/in/usuario1"
      },
      fotoPerfil: "https://cdn.pixabay.com/photo/2023/02/08/06/33/fashion-7775827_960_720.jpg"
    },
    {
      id: 2,
      correo: "usuario2@example.com",
      fechaNacimiento: "1995/05/15",
      estado: "I",
      nombres: "María",
      apellidos: "González",
      contraseña: "segura456",
      sexo: "F",
      descripcion: "Le gusta compartir contenido creativo.",
      redSocial: {
        instagram: "https://instagram.com/usuario2",
        x: "https://x.com/usuario2"
      },
      fotoPerfil: "https://cdn.pixabay.com/photo/2023/02/08/06/33/fashion-7775827_960_720.jpg"
    },
    {
      id: 3,
      correo: "usuario3@example.com",
      fechaNacimiento: "2000/08/20",
      estado: "A",
      nombres: "Carlos",
      apellidos: "López",
      contraseña: "clave789",
      sexo: "M",
      descripcion: "Amante de la tecnología y la música.",
      redSocial: {
        facebook: "https://facebook.com/usuario3",
        instagram: "https://instagram.com/usuario3",
        x: "https://x.com/usuario3"
      },
      fotoPerfil: "https://cdn.pixabay.com/photo/2023/02/08/06/33/fashion-7775827_960_720.jpg"
    }
  ];
    