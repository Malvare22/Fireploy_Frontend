import ProjectForList from "@modules/proyectos/components/projectCard";
import { proyecto1, proyecto2 } from "@modules/proyectos/types/proyecto.card";

function MisProyectos() {

    const proyectos = [proyecto1, proyecto2];

  return (
    <ProjectForList proyecto={proyecto1}/>
  )
}

export default MisProyectos