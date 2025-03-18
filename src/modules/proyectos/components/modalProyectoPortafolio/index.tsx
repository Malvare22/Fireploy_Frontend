import { ProjectCardAvatar } from "@modules/general/components/avatar";
import PortafolioCard from "@modules/general/components/portafolioCard";
import Score from "@modules/general/components/score";
import { labelModalProyectoPortafolio } from "@modules/proyectos/enum/labelModalProyectoPortafolio";
import {
  proyecto1,
  ProyectoCard,
} from "@modules/proyectos/types/proyecto.card";
import { UsuarioPortafolioCard } from "@modules/usuarios/types/usuario.portafolio";
import { Box, Card, Grid2, Stack, Typography } from "@mui/material";
import React from "react";

type Props = {
  proyecto?: ProyectoCard;
};
const ModalProyectoPortafolio: React.FC<Props> = ({ proyecto = proyecto1 }) => {
  return (
    <Stack
      width={"90vw"}
      maxHeight={"80vh"}
      sx={{ overflowY: "scroll" }}
      spacing={2}
    >
      <Box>
        <Typography variant="h4" fontWeight={"bold"}>
          {proyecto.titulo}
        </Typography>
      </Box>
      <Stack direction={"row"} spacing={6}>
        <Box component={"img"} sx={{ width: 550 }} src={proyecto.imagen} />
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
          <Stack>
            <Typography  variant="h5" fontWeight={"bold"}>{labelModalProyectoPortafolio.tecnologias}</Typography>
          </Stack>
        </Stack>
      </Stack>

      <Stack>
        <Typography>{labelModalProyectoPortafolio.descripcion}</Typography>
        <Typography>{proyecto.descripcion}</Typography>
      </Stack>
      <Stack>
        <Typography>{labelModalProyectoPortafolio.integrantes}</Typography>
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

export default ModalProyectoPortafolio;
