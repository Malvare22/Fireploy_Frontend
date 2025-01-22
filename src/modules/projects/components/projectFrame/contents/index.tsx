import { Box, Button } from "@mui/material";
import React, { useMemo, useState } from "react";
import Collaborators from "./collaborators";
import Repositories from "./repositories";
import Database from "./database";
import { ProyectoContext } from "@modules/projects/context/proyectoContext";
import Logs from "./logs";
import Adicionales from "./adicionales";
import { TypeProyecto } from "@modules/general/utils/data/proyectos";

interface ContentsProps {
  currentOption: number;
  setCurrentOption?: React.Dispatch<number>;
  proyecto: TypeProyecto | undefined;
}

const Contents: React.FC<ContentsProps> = ({ currentOption, proyecto }) => {
  const [buffer, setBuffer] = useState<undefined | TypeProyecto>(proyecto);

  const handleCancelar = () => setBuffer(proyecto);

  const comparator = () => {
    return JSON.stringify(buffer) == JSON.stringify(proyecto);
  }

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
        { !comparator() && 
          <Box sx={{display: 'flex', justifyContent: 'end'}}>
            <Button variant="contained" color="warning">Guardar</Button>
            <Button variant="contained" sx={{marginLeft: 2}} onClick={handleCancelar}>Cancelar</Button>
          </Box>
        }
      </Box>
    </ProyectoContext.Provider>
  );
};

export default Contents;
