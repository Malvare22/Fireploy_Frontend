import { TecnologiaRepositorio } from "@modules/proyectos/types/proyecto.tipo";

export const tecnologiasPrueba: TecnologiaRepositorio = [
  {
    id: 0,
    nombre: "React",
    versiones: ["16.8", "17.0", "18.0"],
    logo: "react",
    tipo: 'F'
  },
  {
    id: 1,
    nombre: "Node.js",
    versiones: ["12.x", "14.x", "16.x"],
    logo: "nodejs",
    tipo: 'B'
  },
  {
    id: 2,
    nombre: "MongoDB",
    versiones: ["4.4", "5.0"],
    logo: "mongodb",
    tipo: 'I'
  }
];
