export type BaseDeDatos = {
  proyecto: string;
  tipo: "S" | "N" | "E";
  id: string;
  proyectoId: string;
};

export const exampleBasesDeDatos: BaseDeDatos[] = [
  {
    proyecto: "E-commerce Platform",
    tipo: "S",
    id: "db-12345",
    proyectoId: "proj-1001",
  },
  {
    proyecto: "Customer Analytics",
    tipo: "N",
    id: "db-67890",
    proyectoId: "proj-1002",
  },
  {
    proyecto: "Inventory Management",
    tipo: "E",
    id: "db-54321",
    proyectoId: "proj-1003",
  },
  {
    proyecto: "User Authentication",
    tipo: "S",
    id: "db-98765",
    proyectoId: "proj-1004",
  },
  {
    proyecto: "Logistics Tracking",
    tipo: "N",
    id: "db-13579",
    proyectoId: "proj-1005",
  },
];
