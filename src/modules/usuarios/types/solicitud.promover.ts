export type Solicitud = {
  id: number;
  usuario: {
    nombres: string;
    id: string;
    fechaRecepcion: string;
    fechaAceptacion: null | string;
  };
  estado: "A" | "P" | "R";
  aprobadoPor: string | null;
  curso: string | null;
};

export function getDatesSolicitudes(x: Solicitud[], key: keyof Solicitud["usuario"]): string[] {
  const set = new Set<string>();
  x.forEach((y) => {
    if (y.usuario[key]) set.add(y.usuario[key]);
  });

  return Array.from(set);
}

export const exampleSolicitudes: Solicitud[] = [
  {
    id: 1,
    usuario: {
      nombres: "Juan Pérez",
      id: "USR001",
      fechaRecepcion: "2024-03-28T12:00:00Z",
      fechaAceptacion: null,
    },
    estado: "P",
    aprobadoPor: null,
    curso: null,
  },
  {
    id: 2,
    usuario: {
      nombres: "María González",
      id: "USR002",
      fechaRecepcion: "2024-03-27T15:30:00Z",
      fechaAceptacion: "2024-03-27T15:30:00Z",
    },
    estado: "A",
    aprobadoPor: "Admin1 Jaime enrique Acevedo",
    curso: null,
  },
  {
    id: 3,
    usuario: {
      nombres: "Carlos Ramírez",
      id: "USR003",
      fechaRecepcion: "2024-03-26T09:45:00Z",
      fechaAceptacion: null,
    },
    estado: "P",
    aprobadoPor: null,
    curso: null,
  },
  {
    id: 4,
    usuario: {
      nombres: "Ana López",
      id: "USR004",
      fechaRecepcion: "2024-03-25T18:20:00Z",
      fechaAceptacion: "2024-03-27T15:30:00Z",
    },
    estado: "A",
    aprobadoPor: "Admin2",
    curso: null,
  },
  {
    id: 5,
    usuario: {
      nombres: "Ana López",
      id: "USR004",
      fechaRecepcion: "2024-03-25T18:20:00Z",
      fechaAceptacion: null,
    },
    estado: "R",
    aprobadoPor: null,
    curso: null,
  },
];
