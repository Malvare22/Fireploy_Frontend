export interface TypeLogs {
    mensaje: string;
    instancia: "frontend" | "backend";
    fecha: string; // ISO 8601 format
    detalles: string;
  }
  

export const LogsDummy: TypeLogs[] = [
  {
    mensaje: "Se inició la aplicación correctamente.",
    instancia: "frontend",
    fecha: "2025-01-17T10:15:00Z",
    detalles: "El servidor frontend está escuchando en el puerto 3000.El servidor frontend está escuchando en el puerto 3000.El servidor frontend está escuchando en el puerto 3000.El servidor frontend está escuchando en el puerto 3000.El servidor frontend está escuchando en el puerto 3000.El servidor frontend está escuchando en el puerto 3000.El servidor frontend está escuchando en el puerto 3000.El servidor frontend está escuchando en el puerto 3000.El servidor frontend está escuchando en el puerto 3000.El servidor frontend está escuchando en el puerto 3000.El servidor frontend está escuchando en el puerto 3000.El servidor frontend está escuchando en el puerto 3000.El servidor frontend está escuchando en el puerto 3000.El servidor frontend está escuchando en el puerto 3000.El servidor frontend está escuchando en el puerto 3000.El servidor frontend está escuchando en el puerto 3000.El servidor frontend está escuchando en el puerto 3000.El servidor frontend está escuchando en el puerto 3000.El servidor frontend está escuchando en el puerto 3000.El servidor frontend está escuchando en el puerto 3000.El servidor frontend está escuchando en el puerto 3000.El servidor frontend está escuchando en el puerto 3000.El servidor frontend está escuchando en el puerto 3000.El servidor frontend está escuchando en el puerto 3000.El servidor frontend está escuchando en el puerto 3000.El servidor frontend está escuchando en el puerto 3000.El servidor frontend está escuchando en el puerto 3000.El servidor frontend está escuchando en el puerto 3000.El servidor frontend está escuchando en el puerto 3000.",
  },
  {
    mensaje: "Error al conectar con la base de datos.",
    instancia: "backend",
    fecha: "2025-01-17T10:20:00Z",
    detalles: "La conexión a MongoDB falló debido a credenciales incorrectas.",
  },
  {
    mensaje: "Usuario autenticado correctamente.",
    instancia: "backend",
    fecha: "2025-01-17T10:25:00Z",
    detalles: "El usuario user-001 inició sesión exitosamente.",
  },
  {
    mensaje: "El componente Header se cargó sin problemas.",
    instancia: "frontend",
    fecha: "2025-01-17T10:30:00Z",
    detalles: "El tiempo de carga del componente fue de 42 ms.",
  },
  {
    mensaje: "Error en la validación de datos.",
    instancia: "backend",
    fecha: "2025-01-17T10:35:00Z",
    detalles: "El campo 'email' no tiene un formato válido.",
  },
  {
    mensaje: "Se actualizó el estado de la aplicación.",
    instancia: "frontend",
    fecha: "2025-01-17T10:40:00Z",
    detalles: "El estado global se sincronizó correctamente.",
  },
  {
    mensaje: "Nueva solicitud recibida.",
    instancia: "backend",
    fecha: "2025-01-17T10:45:00Z",
    detalles: "Solicitud GET en /api/v1/orders con 200 OK.",
  },
  {
    mensaje: "Se detectó un cambio en el entorno.",
    instancia: "frontend",
    fecha: "2025-01-17T10:50:00Z",
    detalles: "El archivo .env fue actualizado y cargado nuevamente.",
  },
];
