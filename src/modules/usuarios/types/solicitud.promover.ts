export type SolicitudPromover = {
    id: number;
    usuario: {
        nombres: string;
        id: string;
        fechaRecepcion: string;
    }
    estado: 'A' | 'P';
    aprobadoPor: string | null;
};

export const exampleSolicitudes: SolicitudPromover[] = [
    {
      id: 1,
      usuario: {
        nombres: "Juan Pérez",
        id: "USR001",
        fechaRecepcion: "2024-03-28T12:00:00Z"
      },
      estado: "P",
      aprobadoPor: null
    },
    {
      id: 2,
      usuario: {
        nombres: "María González",
        id: "USR002",
        fechaRecepcion: "2024-03-27T15:30:00Z"
      },
      estado: "A",
      aprobadoPor: "Admin1 Jaime enrique Acevedo"
    },
    {
      id: 3,
      usuario: {
        nombres: "Carlos Ramírez",
        id: "USR003",
        fechaRecepcion: "2024-03-26T09:45:00Z"
      },
      estado: "P",
      aprobadoPor: null
    },
    {
      id: 4,
      usuario: {
        nombres: "Ana López",
        id: "USR004",
        fechaRecepcion: "2024-03-25T18:20:00Z"
      },
      estado: "A",
      aprobadoPor: "Admin2"
    }
  ];