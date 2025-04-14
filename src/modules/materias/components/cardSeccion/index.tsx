import {
  Box,
  Grid2,
  MenuItem,
  Select,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import AccordionUsage from "@modules/general/components/accordionUsage";
import {
  proyecto1,
  ProyectoCard,
} from "@modules/proyectos/types/proyecto.card";
import { labelSelects } from "@modules/general/enums/labelSelects";
import useOrderSelect from "@modules/general/hooks/useOrderSelect";
import { labelCardSeccion } from "@modules/materias/enums/labelCardSeccion";
import { Seccion } from "@modules/materias/types/seccion";
import ProjectCard from "@modules/general/components/projectCard";

type CardSeccionProps = {
  seccion: Seccion;
};

const CardSeccion: React.FC<CardSeccionProps> = ({ seccion }) => {
  const proyectos = [proyecto1, proyecto1, proyecto1];

  const theme = useTheme();

  const { handleRequestSort, stableSort } =
    useOrderSelect<ProyectoCard>();

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
      <Stack spacing={3}>
        <Typography>{seccion.descripcion}</Typography>
        <Typography variant="h5">{labelCardSeccion.proyectos}</Typography>
        <Stack
          direction={"row"}
          justifyContent={"end"}
          alignItems={"center"}
          spacing={1}
        >
          <Typography variant="h6" fontWeight={"bold"}>
            {labelSelects.ordenarPor}
          </Typography>
          <Select
            onChange={(e) => {
              const selectedValue = JSON.parse(e.target.value as string);
              handleRequestSort(selectedValue.key, selectedValue.order);
            }}
            defaultValue={JSON.stringify({ key: undefined, order: undefined })}
            sx={{ width: 300 }}
            variant="outlined"
            size="small"
          >
            <MenuItem
              value={JSON.stringify({ key: undefined, order: undefined })}
            >
              {labelSelects.noAplicar}
            </MenuItem>
            <MenuItem value={JSON.stringify({ key: "titulo", order: "asc" })}>
              {labelSelects.alfabeticamenteMayor}
            </MenuItem>
            <MenuItem value={JSON.stringify({ key: "titulo", order: "desc" })}>
              {labelSelects.alfabeticamenteMenor}
            </MenuItem>
            <MenuItem
              value={JSON.stringify({ key: "puntuacion", order: "asc" })}
            >
              {labelSelects.puntuacionMayor}
            </MenuItem>
            <MenuItem
              value={JSON.stringify({ key: "puntuacion", order: "desc" })}
            >
              {labelSelects.puntuacionMenor}
            </MenuItem>
          </Select>
        </Stack>
        <Grid2 container rowSpacing={2}>
          {stableSort(proyectos).map((proyecto, key) => (
            <Grid2 size={{lg: 4, md: 6, xs: 12}} display={'flex'} justifyContent={'center'}>
              <ProjectCard
                handleOpen={() => {}}
                proyecto={proyecto}
                key={key}
              />
            </Grid2>
          ))}
        </Grid2>
      </Stack>
    </AccordionUsage>
  );
};

export default CardSeccion;
