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
      context.setTest != undefined
    )
  ) {
    return <></>;
  }

  const { test, setTest } = context;

  return (
    <Box>
      <RepositoryForm type="backend" buffer={test} setBuffer={setTest}/>
      {/* <RepositoryForm
        type="frontend"
        buffer={buffer}
        setBuffer={setBuffer}
      /> */}
    </Box>
  )
}

interface RepositoryFormProps {
  type: TypeTecnologia["type"];
  buffer: string;
  setBuffer: React.Dispatch<string>;
}

const RepositoryForm: React.FC<RepositoryFormProps> = (
  ({ type, buffer, setBuffer }: RepositoryFormProps) => {
    const marginRight = 2;

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
            value={buffer}
            onChange={(e) =>
              setBuffer(e.currentTarget.value)
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
