import CustomSelect from "@modules/general/components/customSelect";
import { ProyectoContext } from "@modules/projects/context/proyectoContext";
import { tecnologiasDummy } from "@modules/projects/utils/data/tecnologias";
import { TypeProyecto } from "@modules/projects/utils/type/typeProyecto";
import { TypeTecnologia } from "@modules/projects/utils/type/typeTecnologia";
import { Box, Divider, Input, MenuItem, Typography } from "@mui/material";
import React, { useContext, useMemo, useState } from "react";

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

  const { proyecto, buffer, setBuffer } = context;

  return proyecto &&
    proyecto.repositorioBackend &&
    proyecto.repositorioFrontend ? (
    <Box>
      <RepositoryForm type="backend" buffer={buffer} setBuffer={setBuffer} />
      {/* <RepositoryForm
        type="frontend"
        buffer={buffer}
        setBuffer={setBuffer}
      /> */}
    </Box>
  ) : (
    <></>
  );
}

interface RepositoryFormProps {
  type: TypeTecnologia["type"];
  buffer: TypeProyecto;
  setBuffer: React.Dispatch<TypeProyecto>;
}

const RepositoryForm: React.FC<RepositoryFormProps> = React.memo(
  ({ type, buffer, setBuffer }: RepositoryFormProps) => {
    const marginRight = 2;

    const key: keyof TypeProyecto =
      type == "backend" ? "repositorioBackend" : "repositorioFrontend";

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
          <Input
            value={buffer[key]?.url}
            onChange={(e) =>
              setBuffer({
                ...buffer,
                [key]: {
                  ...buffer[key],
                  url: e.target.value,
                },
              })
            }
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
            onChange={(e) =>
              setBuffer({
                ...buffer,
                [key]: {
                  ...buffer[key],
                  id: e.target.value as number,
                },
              })
            }
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
  }
);

export default Repositories;
