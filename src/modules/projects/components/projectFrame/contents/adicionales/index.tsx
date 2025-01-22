import CustomInput from "@modules/general/components/customInput";
import CustomSelect from "@modules/general/components/customSelect";
import CustomTextArea from "@modules/general/components/customTextArea";
import { ProyectoContext } from "@modules/projects/context/proyectoContext";
import { Box, Divider, SxProps, Typography } from "@mui/material";
import { useContext, useState } from "react";

function Adicionales() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Box>
        <Typography variant="h3Bold">Otros Aspectos</Typography>
        <Divider />
      </Box>
      <Content />
    </Box>
  );
}

const columnSx = {
  display: "flex",
  flexDirection: { xs: "column", sm: "row" },
  gap: 2,
  alignItems: { sm: "center" },
} as SxProps;
const labelSx = { width: 120 } as SxProps;

const Content = () => {
  const context = useContext(ProyectoContext);

  if (!context) return <></>;

  const { proyecto } = context;

  if (!proyecto) return <></>;

  return (
    <Box
      sx={{
        border: "solid 1px rgba(0,0,0, .2)",
        padding: 3,
        display: "flex",
        flexDirection: "column",
        gap: 4,
        paddingBottom: 5,
      }}
    >
      <Box sx={columnSx}>
        <Typography variant="titleBold" sx={labelSx}>
          Título
        </Typography>
        <CustomInput variant="secondary" errorMessage="Epa" />
      </Box>
      <Box sx={columnSx}>
        <Typography variant="titleBold" sx={labelSx}>
          Descripción
        </Typography>
        <CustomTextArea></CustomTextArea>
      </Box>
      <Box sx={columnSx}>
        <Typography variant="titleBold" sx={labelSx}>
          Materia
        </Typography>
        <CustomSelect variantDelta="secondary">
          <></>
        </CustomSelect>
      </Box>
      <Box sx={columnSx}>
        <Typography variant="titleBold" sx={labelSx}>
          Número de Capas
        </Typography>
        <CustomSelect variantDelta="secondary">
          <></>
        </CustomSelect>
      </Box>
    </Box>
  );
};

export default Adicionales;
