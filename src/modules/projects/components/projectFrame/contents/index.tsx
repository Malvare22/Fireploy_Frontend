import { Box } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import Collaborators from "./collaborators";
import Repositories from "./repositories";
import Database from "./database";
import { TypeProyecto } from "@modules/projects/utils/type/typeProyecto";
import { useParams } from "react-router-dom";
import { proyectosDummy } from "@modules/projects/utils/data/proyectos";
import { ProyectoContext } from "@modules/projects/context/proyectoContext";
import Logs from "./logs";
import Adicionales from "./adicionales";

interface ContentsProps {
  currentOption: number;
  setCurrentOption?: React.Dispatch<number>;
}

const Contents: React.FC<ContentsProps> = ({ currentOption }) => {
  const [proyecto, setProyecto] = useState<undefined | TypeProyecto>(undefined);
  const [buffer, setBuffer] = useState<undefined | TypeProyecto>(undefined);

  const { id } = useParams();

  useEffect(() => {
    const projectId = id ? parseInt(id) : 0;
    const proyecto = proyectosDummy.find((p) => p.id == projectId);
    setProyecto(proyecto);
    setBuffer(proyecto);
  }, []);

  const Content = useMemo(() => {
    switch (currentOption) {
      case 0:
        return <Repositories />;

      case 1:
        return <Logs />;

      case 2:
        return <Database />;

      case 3:
        return <Collaborators />;

      case 4:
        return <Adicionales />;

      default:
        return <></>;
    }
  }, [currentOption]);

  return (
    <ProyectoContext.Provider
      value={{ buffer: buffer, setBuffer: setBuffer, proyecto: proyecto }}
    >
      <Box
        sx={{
          padding: { sm: 4, xs: 2 },
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        {Content}
      </Box>
    </ProyectoContext.Provider>
  );
};

export default Contents;
