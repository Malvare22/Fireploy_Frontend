import { z } from "zod";

// Esquema para EstadoEjecucionProyecto
const EstadoEjecucionProyectoSchema = z.enum(["F", "N", "E", "L"], {
  errorMap: () => ({ message: "El estado de ejecución debe ser F, N, E o L." }),
});

// Esquema para EstadoProyecto
const EstadoProyectoSchema = z.enum(["A", "I"], {
  errorMap: () => ({
    message: "El estado de proyecto debe ser A (Activo) o I (Inactivo).",
  }),
});

// Esquema para TipoBaseDeDatos
const TipoBaseDeDatosSchema = z.enum(["S", "N"], {
  errorMap: () => ({
    message: "El tipo de base de datos debe ser S (SQL) o N (NoSQL).",
  }),
});

// Base de Datos Proyecto Schema
const BaseDeDatosProyectoSchema = z.object({
  id: z.number().positive({ message: "El ID debe ser un número positivo." }),
  usuario: z
    .string()
    .nonempty({ message: "El usuario de la base de datos es obligatorio." }),
  url: z
    .string()
    .url({ message: "La URL de la base de datos debe ser válida." }),
  contrasenia: z
    .string()
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres." }),
  tipo: TipoBaseDeDatosSchema,
});

// Esquema para TipoRepositorio
const TipoRepositorioSchema = z.enum(["F", "B", "I"], {
  errorMap: () => ({
    message:
      "El tipo de repositorio debe ser F (Frontend), B (Backend) o I (Infraestructura).",
  }),
});

// Esquema para TecnologiaRepositorio
const TecnologiaRepositorioSchema = z.object({
  nombre: z
    .string()
    .nonempty({ message: "El nombre de la tecnología es obligatorio." }),
  versiones: z
    .array(z.string())
    .nonempty({ message: "Debe haber al menos una versión de tecnología." }),
  logo: z
    .string()
    .url({ message: "El logo de la tecnología debe ser una URL válida." }),
  tipo: z.enum(["F", "B", "I"], {
    errorMap: () => ({
      message:
        "El tipo de tecnología debe ser F (Frontend), B (Backend) o I (Infraestructura).",
    }),
  }),
});

// Esquema para RepositorioProyecto
const RepositorioProyectoSchema = z.object({
  id: z
    .number()
    .positive({
      message: "El ID del repositorio debe ser un número positivo.",
    }),
  url: z.string().url({ message: "La URL del repositorio debe ser válida." }),
  tipo: TipoRepositorioSchema,
  versionDeTecnologia: z
    .string()
    .nonempty({ message: "La versión de la tecnología es obligatoria." }),
  variablesDeEntorno: z.string().optional(),
  tecnologia: TecnologiaRepositorioSchema,
});

// Esquema principal para Proyecto
export const ProyectoSchema = z.object({
  id: z
    .number()
    .positive({ message: "El ID del proyecto debe ser un número positivo." }),
  titulo: z
    .string()
    .min(1, { message: "El título del proyecto es obligatorio." }),
  descripcion: z
    .string()
    .min(1, { message: "La descripción del proyecto es obligatoria." }),
  calificacion: z
    .number()
    .min(0, { message: "La calificación debe ser un número entre 0 y 10." })
    .max(10, { message: "La calificación debe ser un número entre 0 y 10." }),
  imagen: z
    .string()
    .url({ message: "La URL de la imagen debe ser válida." })
    .optional(),
  url: z.string().url({ message: "La URL del proyecto debe ser válida." }),
  estadoDeEjecucion: EstadoEjecucionProyectoSchema,
  estadoDeProyecto: EstadoProyectoSchema,
  baseDeDatos: BaseDeDatosProyectoSchema,
  repositorios: z
    .array(RepositorioProyectoSchema)
    .nonempty({
      message: "Debe haber al menos un repositorio en el proyecto.",
    }),

  numeroCapas: z.number({message: 'Ingrese una cantidad válida de capas'})
});
