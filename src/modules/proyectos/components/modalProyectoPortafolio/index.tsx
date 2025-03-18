import { ProjectCardAvatar } from "@modules/general/components/avatar";
import PortafolioCard from "@modules/general/components/portafolioCard";
import Score from "@modules/general/components/score";
import { labelModalProyectoPortafolio } from "@modules/proyectos/enum/labelModalProyectoPortafolio";
import {
  proyecto1,
  ProyectoCard,
} from "@modules/proyectos/types/proyecto.card";
import { UsuarioPortafolioCard } from "@modules/usuarios/types/usuario.portafolio";
import {
  Box,
  Button,
  Card,
  Grid2,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import CardTecnologia from "../cardTecnologia";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CloudOffIcon from "@mui/icons-material/CloudOff";

type Props = {
  proyecto?: ProyectoCard;
};
const ModalProyectoPortafolio: React.FC<Props> = ({ proyecto = proyecto1 }) => {
  return (
    <Stack
      sx={{ overflowY: "scroll", width: { md: "80vw", xs: "70vw" }, maxHeight: '85vh', backgroundColor: 'none'}}
      spacing={3}
    >
      <Box><CardEstado estado={proyecto.estado} /></Box>
      <Box>
        <Typography variant="h4" fontWeight={"bold"}>
          {proyecto.titulo}
        </Typography>
      </Box>
      <Stack direction={"row"} spacing={6}>
        <Box
          component={"img"}
          sx={{ width: { md: 550 } }}
          src={proyecto.imagen}
        />
        <Stack spacing={2}>
          <Typography variant="h5" fontWeight={"bold"}>
            {labelModalProyectoPortafolio.calificador}
          </Typography>
          <CardCalificador
            calificador={proyecto.calificador}
            grupo={proyecto.grupo}
            materia={proyecto.materia}
            puntuacion={proyecto.puntuacion}
            seccion={proyecto.seccion}
            semestre={proyecto.semestre}
          />
          <Typography variant="h5" fontWeight={"bold"}>
            {labelModalProyectoPortafolio.tecnologias}
          </Typography>
          <Stack direction={"row"} spacing={2}>
            {proyecto.tecnologias.map((tecnologia) => (
              <CardTecnologia tecnologia={tecnologia.imagen} />
            ))}
          </Stack>
        </Stack>
      </Stack>

      <Stack spacing={1}>
        <Typography variant="h5" fontWeight={"bold"}>
          {labelModalProyectoPortafolio.descripcion}
        </Typography>
        <Typography>{proyecto.descripcion}</Typography>
      </Stack>
      <Stack spacing={1}>
        <Typography variant="h5" fontWeight={"bold"}>
          {labelModalProyectoPortafolio.integrantes}
        </Typography>
        <Grid2 container spacing={2}>
          {proyecto.integrantes.map((integrante) => (
            <Grid2 size={{ md: 5 }}>
              <PortafolioCard usuario={integrante} key={integrante.id} />
            </Grid2>
          ))}
        </Grid2>
      </Stack>
    </Stack>
  );
};

type CardCalificadorProps = {
  calificador: UsuarioPortafolioCard;
  puntuacion: ProyectoCard["puntuacion"];
  materia: ProyectoCard["materia"];
  grupo: ProyectoCard["grupo"];
  seccion: ProyectoCard["seccion"];
  semestre: ProyectoCard["semestre"];
};
const CardCalificador: React.FC<CardCalificadorProps> = ({
  calificador,
  grupo,
  materia,
  puntuacion,
  seccion,
  semestre,
}) => {
  return (
    <Card sx={{ padding: 3 }}>
      <Stack direction={"row"} alignItems={"center"} spacing={2}>
        <ProjectCardAvatar
          usuario={calificador}
          sx={{ width: 48, height: 48 }}
        />
        <Stack>
          <Stack direction={"row"} spacing={2}>
            {" "}
            <Typography variant="h6">{calificador.nombres}</Typography>
            <Score value={puntuacion} />
          </Stack>
          <Typography>{`${materia} / ${grupo} / ${seccion}`}</Typography>
        </Stack>
      </Stack>
    </Card>
  );
};

type CardEstadoProps = {
  estado: ProyectoCard['estado'];
};
const CardEstado: React.FC<CardEstadoProps> = ({ estado }) => {
  const theme = useTheme();

  function getColor() {
    return estado == "A"
      ? theme.palette.success.light
      : theme.palette.warning.light;
  }

  function getLabel() {
    return (
      <Stack direction={"row"} alignItems={"center"} spacing={1}>
        {estado == "A" ? (
          <>
            <Typography  fontWeight='bold'>{labelModalProyectoPortafolio.online}</Typography>
            <CheckCircleOutlineIcon />
          </>
        ) : (
          <>
            <Typography  fontWeight='bold'>{labelModalProyectoPortafolio.offline}</Typography>
            <CloudOffIcon />
          </>
        )}
      </Stack>
    );
  }

  return (
    <Card sx={{ backgroundColor: getColor(), color: 'white', paddingY: 1 }}>
      <Stack direction={"row"} alignItems={"center"} justifyContent={'center'} spacing={2}>
        {getLabel()}
        {estado == "A" && (
          <Button variant="outlined" color="inherit">{labelModalProyectoPortafolio.visitar}</Button>
        )}
      </Stack>
    </Card>
  );
};

export default ModalProyectoPortafolio;
