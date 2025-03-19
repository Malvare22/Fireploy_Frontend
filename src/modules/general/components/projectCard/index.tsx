import { Box, Card, Stack, Typography } from "@mui/material";

import AnimatedCard from "../animatedCard";
import Score from "../score";
import {
  proyecto1,
  ProyectoCard,
} from "@modules/proyectos/types/proyecto.card";
import React from "react";
import RoundedIcon from "../roundedIcon";
import { obtenerImagen } from "../roundedIcon/utils";
import { ProjectCardMembers } from "../avatar";
import Status from "../status";

type ProjectCardProps = {
  proyecto?: ProyectoCard;
  tipo?: "home" | "portafolio";
  handleOpen?: () => void;
};

export enum LabelProjectCard {
  titulo = "Título",
  integrantes = "Integrantes",
  tecnologias = "Tecnologías",
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  proyecto = proyecto1,
  tipo = "home",
  handleOpen = () => {},
}) => {
  function getCard() {
    switch (tipo) {
      case "home":
        return <ProjectCardHome proyecto={proyecto} />;

      case "portafolio":
        return (
          <ProjectCardPortafolio handleOpen={handleOpen} proyecto={proyecto} />
        );
    }
  }

  return <>{getCard()}</>;
};

type ProjectCardHomeProps = {
  proyecto: ProyectoCard;
};

type ProjectCardPortafolioProps = {
  proyecto: ProyectoCard;
  handleOpen: () => void;
};

export const ProjectCardHome: React.FC<ProjectCardHomeProps> = ({
  proyecto = proyecto1,
}) => {
  return (
    <AnimatedCard
      sx={{
        maxWidth: 400,
        paddingBottom: 2,
      }}
    >
      <Stack direction={"column"} spacing={2}>
        <Box
          component={"img"}
          sx={{ width: "100%", height: 200, border: "1px solid black" }}
          src={proyecto.imagen}
        />
        <Box textAlign={"center"}>
          <Typography variant="h4">{proyecto.titulo}</Typography>
          <Score value={proyecto.puntuacion} />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyItems: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">{LabelProjectCard.integrantes}</Typography>
          <Box>
            <ProjectCardMembers integrantes={proyecto.integrantes} />
          </Box>
        </Box>
        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyItems: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">{LabelProjectCard.tecnologias}</Typography>
            <Box>
              <RoundedIcon
                imagen={obtenerImagen[proyecto.frontend.imagen].ruta}
                nombre={obtenerImagen[proyecto.frontend.imagen].nombre}
              />
              <RoundedIcon
                imagen={obtenerImagen[proyecto.backend.imagen].ruta}
                nombre={obtenerImagen[proyecto.backend.imagen].nombre}
              />
              <RoundedIcon
                imagen={obtenerImagen[proyecto.dataBase.imagen].ruta}
                nombre={obtenerImagen[proyecto.dataBase.imagen].nombre}
              />
            </Box>
          </Box>
        </Box>
      </Stack>
    </AnimatedCard>
  );
};

export const ProjectCardPortafolio: React.FC<ProjectCardPortafolioProps> = ({
  proyecto,
  handleOpen,
}) => {
  return (
    <AnimatedCard
      sx={{
        maxWidth: 300,
        paddingBottom: 2,
        cursor: "pointer",
      }}
      onClick={handleOpen}
    >
      <Stack direction={"column"} spacing={2}>
        <Box sx={{ position: "relative" }}>
          <Box
            component={"img"}
            sx={{ width: "100%", border: "1px solid black" }}
            src={proyecto.imagen}
          />
          <Card
            sx={{
              display: "inline-block",
              padding: 0.5,
              position: "absolute",
              top: 5,
              right: 5,
            }}
          >
            <Status estado="A" />
          </Card>
        </Box>
        <Stack spacing={2}>
          <Stack spacing={2} sx={{ paddingX: 2 }}>
            <Box textAlign={"center"}>
              <Typography variant="h5">{proyecto.titulo}</Typography>
              <Score value={proyecto.puntuacion} />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyItems: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="body1">
                {LabelProjectCard.integrantes}
              </Typography>
              <Box>
                <ProjectCardMembers integrantes={proyecto.integrantes} />
              </Box>
            </Box>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyItems: "center",
                  alignItems: "center",
                }}
              >
                <Typography variant="body1">
                  {LabelProjectCard.tecnologias}
                </Typography>
                <Box>
                  <RoundedIcon
                    imagen={obtenerImagen[proyecto.frontend.imagen].ruta}
                    nombre={obtenerImagen[proyecto.frontend.imagen].nombre}
                  />
                  <RoundedIcon
                    imagen={obtenerImagen[proyecto.backend.imagen].ruta}
                    nombre={obtenerImagen[proyecto.backend.imagen].nombre}
                  />
                  <RoundedIcon
                    imagen={obtenerImagen[proyecto.dataBase.imagen].ruta}
                    nombre={obtenerImagen[proyecto.dataBase.imagen].nombre}
                  />
                </Box>
              </Box>
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </AnimatedCard>
  );
};

export default ProjectCard;
