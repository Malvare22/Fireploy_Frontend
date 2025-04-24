import { Box, Grid2, Stack, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import AccordionUsage from "@modules/general/components/accordionUsage";
import { ProyectoCard, proyectoEjemplo } from "@modules/proyectos/types/proyecto.card";
import { labelCardSeccion } from "@modules/materias/enums/labelCardSeccion";
import { Seccion } from "@modules/materias/types/seccion";
import ProjectCard from "@modules/general/components/projectCard";
// import RefinePanel, { SorterOptions } from "@modules/general/components/selects";

type CardSeccionProps = {
  seccion: Seccion;
};

// const sorters: SorterOptions = [
//   {
//     key: "titulo",
//     label: [
//       ["A-Z", "desc"],
//       ["A-Z", "asc"],
//       [labelSelects.noAplicar, undefined],
//     ],
//   },
//   {
//     key: "puntuacion",
//     label: [
//       ["Mayor", "desc"],
//       ["Menor", "asc"],
//       [labelSelects.noAplicar, undefined],
//     ],
//   },
// ];

const CardSeccion: React.FC<CardSeccionProps> = ({ seccion }) => {
  const [proyectos, _setProyectos] = useState<ProyectoCard[]>([proyectoEjemplo]);

  const theme = useTheme();

  const Title = () => {
    return (
      <Stack spacing={1}>
        <Typography variant="h6">{seccion.titulo}</Typography>
        <Box>
          <Typography
            display={"inline-block"}
            sx={{
              backgroundColor: theme.palette.terciary.main,
              color: "white",
              fontWeight: "500",
              padding: 0.5,
            }}
            variant="body2"
          >{`${seccion.fechaDeInicio} - ${seccion.fechaDeCierre}`}</Typography>
        </Box>
      </Stack>
    );
  };

  return (
    <AccordionUsage title={<Title />}>

        {/* <SelectOrders data={} setRefineData={setBu} sorterOptions={sorters}/> */}
        <Stack spacing={3}>
          <Typography>{seccion.descripcion}</Typography>
          <Typography variant="h5">{labelCardSeccion.proyectos}</Typography>
          <Grid2 container rowSpacing={2}>
            {proyectos.map((proyecto, key) => (
              <Grid2 size={{ lg: 4, md: 6, xs: 12 }} display={"flex"} justifyContent={"center"}>
                <ProjectCard handleOpen={() => {}} proyecto={proyecto} key={key} />
              </Grid2>
            ))}
          </Grid2>
        </Stack>
    </AccordionUsage>
  );
};

export default CardSeccion;
