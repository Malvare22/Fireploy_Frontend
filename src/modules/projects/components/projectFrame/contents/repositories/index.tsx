import CustomInput from "@modules/general/components/customInput";
import CustomSelect from "@modules/general/components/customSelect";
import { TypeProyecto } from "@modules/general/utils/data/proyectos";
import { tecnologiasDummy, TypeTecnologia } from "@modules/general/utils/data/tecnologias";
import { ProyectoContext } from "@modules/projects/context/proyectoContext";
import { Box, Divider, MenuItem, Typography } from "@mui/material";
import React, { useContext, useMemo } from "react";

function Repositories() {
  const context = useContext(ProyectoContext);

  if (
    !(
      context &&
      context.buffer &&
      context.proyecto &&
      context.setBuffer != undefined
    )
  ) {
    return <></>;
  }

  const { buffer, setBuffer } = context;

  return (
    <Box>
      <RepositoryForm type="frontend" buffer={buffer} setBuffer={setBuffer} />
      <RepositoryForm type="backend" buffer={buffer} setBuffer={setBuffer} />
    </Box>
  );
}

interface RepositoryFormProps {
  type: TypeTecnologia["type"];
  buffer: TypeProyecto;
  setBuffer: React.Dispatch<TypeProyecto>;
}

const RepositoryForm: React.FC<RepositoryFormProps> = ({
  type,
  buffer,
  setBuffer,
}: RepositoryFormProps) => {
  const marginRight = 2;

  const key: keyof TypeProyecto = useMemo(
    () => (type == "backend" ? "repositorioBackend" : "repositorioFrontend"),
    [type]
  );

  const filteredTechnologies = useMemo(
    () => tecnologiasDummy.filter((tec) => tec.type === type),
    [type]
  );
  const handleBufferChange = (field: "url" | "id", value: any) => {
    setBuffer({
      ...buffer,
      [key]: {
        ...buffer[key],
        [field]: value,
      },
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        marginBottom: 4,
      }}
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
        <CustomInput
          value={buffer[key]?.url}
          onChange={(e) => handleBufferChange("url", e.target.value)}
          variant="secondary"
        />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="titleBold" marginRight={marginRight}>
          Tecnología
        </Typography>
        <CustomSelect
          variantDelta="secondary"
          value={buffer[key]?.id}
          onChange={(e) => handleBufferChange("id", e.target.value)}
        >
          {filteredTechnologies?.map((tecnologia, index) => (
            <MenuItem key={index} value={tecnologia.id}>
              {tecnologia.text}
            </MenuItem>
          ))}
        </CustomSelect>
      </Box>
    </Box>
  );
};

export default Repositories;
