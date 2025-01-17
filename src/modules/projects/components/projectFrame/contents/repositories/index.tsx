import CustomSelect from "@modules/general/components/customSelect";
import { ProyectoContext } from "@modules/projects/context/proyectoContext";
import { tecnologiasDummy } from "@modules/projects/utils/data/tecnologias";
import { TypeTecnologia } from "@modules/projects/utils/type/typeTecnologia";
import { Box, Divider, Input, MenuItem, Typography } from "@mui/material";
import React, { useContext, useState } from "react";

function Repositories() {
  const proyecto  = useContext(ProyectoContext);
  const [currentUrlBackend, setCurrentUrlBackend] = useState(proyecto?.repositorioBackend?.url || "");
  const [currentUrlFrontend, setCurrentUrlFrontend] = useState(proyecto?.repositorioFrontend?.url || "");
  const [currentBackend, setCurrentBackend] = useState(proyecto?.repositorioBackend?.tecnologia || 0);
  const [currentFrontend, setCurrentFrontend] = useState(proyecto?.repositorioFrontend?.tecnologia || 0);
  

  return (
    (proyecto && proyecto.repositorioBackend && proyecto.repositorioFrontend) ? <Box>
      <RepositoryForm
        type="backend"
        currentUrl={currentUrlBackend}
        setCurrentUrl={setCurrentUrlBackend}
        currentTechnology={currentBackend}
        setCurrentTechnology={setCurrentBackend}
      />
      <RepositoryForm
        type="frontend"
        currentUrl={currentUrlFrontend}
        setCurrentUrl={setCurrentUrlFrontend}
        currentTechnology={currentFrontend}
        setCurrentTechnology={setCurrentFrontend}
      />
    </Box> : <></>
  );
}

interface RepositoryFormProps {
  type: TypeTecnologia["type"];
  currentUrl: string;
  setCurrentUrl: React.Dispatch<string>;
  currentTechnology: number;
  setCurrentTechnology: React.Dispatch<number>;
}

const RepositoryForm: React.FC<RepositoryFormProps> = ({
  type,
  currentUrl,
  setCurrentUrl,
  currentTechnology,
  setCurrentTechnology,
}: RepositoryFormProps) => {
  const marginRight = 2;


  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 4 }}
    >
      <Box>
        <Typography variant="h3Bold">
          {type == "frontend" ? "Frontend" : "Backend"}
        </Typography>

        <Divider />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="titleBold" marginRight={marginRight}>
          Repositorio
        </Typography>
        <Input
          value={currentUrl}
          onChange={(e) => setCurrentUrl(e.target.value)}
          variant="secondary"
        />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="titleBold" marginRight={marginRight}>
          Tecnología
        </Typography>
        <CustomSelect
          variantDelta="secondary"
          value={currentTechnology}
          onChange={(e) => setCurrentTechnology(e.target.value as number)}
        >
          {tecnologiasDummy?.map(
            (tecnologia, index) =>
              tecnologia.type == type && (
                <MenuItem key={index} value={tecnologia.id}>
                  {tecnologia.text}
                </MenuItem>
              )
          )}
        </CustomSelect>
      </Box>
    </Box>
  );
};

export default Repositories;
