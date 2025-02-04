import { TecnologiaRepositorio } from "@modules/projects/types/repositorio.tecnologia";

export const TecnologiasPrueba: TecnologiaRepositorio[] = [
  {
    nombre: "React",
    versiones: ["16.8", "17.0", "18.0"],
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
    tipo: 'F'
  },
  {
    nombre: "Node.js",
    versiones: ["12.x", "14.x", "16.x"],
    logo: "https://cdn.hashnode.com/res/hashnode/image/upload/v1703155483443/e42a7be2-890a-4bd2-accf-306e53ccebbd.png",
    tipo: 'B'
  },
  {
    nombre: "MongoDB",
    versiones: ["4.4", "5.0"],
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/47/MongoDB_logo.svg",
    tipo: 'I'
  }
];
