import { Box, Grid2, Stack, Typography, useTheme } from "@mui/material";
import React from "react";
import { SeccionCurso } from "@modules/materias/types/curso.seccion";
import AccordionUsage from "@modules/general/components/accordionUsage";
import { ProjectCardPortafolio } from "@modules/general/components/projectCard";
import { proyecto1 } from "@modules/proyectos/types/proyecto.card";

type CardSeccionProps = {
  seccion: SeccionCurso;
};

const CardSeccion: React.FC<CardSeccionProps> = ({ seccion }) => {
  const proyectos = [proyecto1, proyecto1, proyecto1];

  const theme = useTheme();

  const Title = () => {
    return (
      <Stack spacing={1}>
        <Typography variant="h6">{seccion.titulo}</Typography>
        <Box>
          <Typography display={'inline-block'} sx={{backgroundColor: theme.palette.terciary.main, color: 'white', fontWeight: '500', padding: 0.5}} variant="body2">{`${seccion.fechaDeInicio} - ${seccion.fechaDeCierre}`}</Typography>
        </Box>
      </Stack>
    );
  };

  return (
    <AccordionUsage title={<Title />}>
      <Stack>
        <Typography>{seccion.descripcion}</Typography>
        <Stack sx={{ padding: 3 }} spacing={3}>
        <Grid2 container sx={{border: '1px solid black'}}>
        {proyectos.map((proyecto, key) => (
            <Grid2 size={4}><ProjectCardPortafolio
            handleOpen={() => {}}
            proyecto={proyecto}
            key={key}
          /></Grid2>
          ))}
        </Grid2>
        </Stack>
      </Stack>
    </AccordionUsage>
  );
};

export default CardSeccion;
