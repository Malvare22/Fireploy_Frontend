import { UsuarioPlano } from "@modules/usuarios/types/usuario.plano";

export const usuariosPrueba: UsuarioPlano[] = [
  {
    correo: "rod@gmail.com",
    id: 1,
    fechaDeNacimiento: "2002-04-22",
    estado: "A", // Activo
    tipo: "E", // Estudiante
    nombres: "Rodrigo",
    apellidos: "Malaver",
    contrasenia: "123",
    sexo: "M", // Masculino
    fotoDePerfil: "https://static.wikia.nocookie.net/mamarre-estudios-espanol/images/9/93/240px-Rayman_Mini_Icon.png/revision/latest?cb=20201009000250&path-prefix=es",
    redSocial: '{"facebook": "", "instagram": "", "linkedin": ""}', // Se guarda como string
    descripcion: "Estudiante de ingeniería.",
  },
  {
    correo: "maria.lopez@hotmail.com",
    id: 2,
    fechaDeNacimiento: "1985-10-25",
    estado: "I", // Inactivo
    tipo: "D", // Docente
    nombres: "María",
    apellidos: "López",
    contrasenia: "securePass456",
    sexo: "F", // Femenino
    fotoDePerfil: "https://example.com/perfil/maria.jpg",
    redSocial: '{"facebook": "", "instagram": "", "linkedin": ""}', // Se guarda como string
    descripcion: "Docente de matemáticas.",
  },
  {
    correo: "carlos.gomez@yahoo.com",
    id: 3,
    fechaDeNacimiento: "2000-01-20",
    estado: "A", // Activo
    tipo: "A", // Administrador
    nombres: "Carlos",
    apellidos: "Gómez",
    contrasenia: "admin789",
    sexo: "M", // Masculino
    fotoDePerfil: "https://example.com/perfil/carlos.jpg",
    redSocial: '{"facebook": "", "instagram": "", "linkedin": ""}', // Se guarda como string
    descripcion: "Administrador del sistema.",
  },
  {
    correo: "sofia.ramirez@gmail.com",
    id: 4,
    fechaDeNacimiento: "1995-08-10",
    estado: "A", // Activo
    tipo: "E", // Estudiante
    nombres: "Sofía",
    apellidos: "Ramírez",
    contrasenia: "sofia123",
    sexo: "F", // Femenino
    fotoDePerfil: "https://example.com/perfil/sofia.jpg",
    redSocial: '{"facebook": "", "instagram": "", "linkedin": ""}', // Se guarda como string
    descripcion: "Estudiante de literatura.",
  },
];
