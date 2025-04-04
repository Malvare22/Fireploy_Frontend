import { Avatar, Box, Card, Stack, Typography } from "@mui/material";
import AnimatedCard from "../animatedCard";
import Score from "../score";
import { proyecto1, ProyectoCard } from "@modules/proyectos/types/proyecto.card";
import React from "react";
import { getImage } from "../../utils/getImage";
import { ProjectCardMembers } from "../projectCardAvatar";
import Status from "../status";
import { labelProjectCard } from "@modules/general/enums/labelProjectCard";

type ProjectCardProps = {
  proyecto?: ProyectoCard;
  tipo?: "home" | "portafolio";
  handleOpen?: () => void;
};

/**
 * `ProjectCard` component that dynamically renders either a home-style project card
 * or a portfolio-style project card based on the `tipo` prop.
 *
 * @param {ProjectCardProps} props - Component props.
 * @param {ProyectoCard} [props.proyecto] - Project data (defaults to `proyecto1`).
 * @param {"home" | "portafolio"} [props.tipo] - Determines the type of card to render.
 * @param {() => void} [props.handleOpen] - Function to handle opening the project details (only for portfolio view).
 *
 * @returns {JSX.Element} A project card (either home-style or portfolio-style).
 */
export const ProjectCard: React.FC<ProjectCardProps> = ({
  proyecto = proyecto1,
  tipo = "home",
  handleOpen = () => {},
}) => {
  /**
   * Determines which card layout to render based on `tipo`.
   *
   * @returns {JSX.Element} The appropriate project card component.
   */
  function getCard() {
    switch (tipo) {
      case "home":
        return <ProjectCardHome proyecto={proyecto} />;
      case "portafolio":
        return <ProjectCardPortafolio handleOpen={handleOpen} proyecto={proyecto} />;
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

/**
 * `ProjectCardHome` component that displays project details in a home page style.
 *
 * @param {ProjectCardHomeProps} props - Component props.
 * @param {ProyectoCard} props.proyecto - Project data.
 *
 * @returns {JSX.Element} A home-style project card.
 */
export const ProjectCardHome: React.FC<ProjectCardHomeProps> = ({ proyecto }) => {
  return (
    <AnimatedCard
      sx={{
        maxWidth: 400,
        paddingBottom: 2,
      }}
    >
      <Stack direction={"column"} spacing={2}>
        {/* Project Image */}
        <Box
          component={"img"}
          sx={{ width: "100%", height: 200, border: "1px solid black" }}
          src={proyecto.imagen}
          alt={proyecto.titulo}
        />

        {/* Title and Score */}
        <Box textAlign={"center"}>
          <Typography variant="h4">{proyecto.titulo}</Typography>
          <Score value={proyecto.puntuacion} />
        </Box>

        {/* Members Section */}
        <Stack spacing={1} alignItems={"center"}>
          <Typography variant="body1">{labelProjectCard.integrantes}</Typography>
          <ProjectCardMembers integrantes={proyecto.integrantes} />
        </Stack>

        {/* Technologies Section */}
        <Stack spacing={1} alignItems={"center"}>
          <Typography variant="body1">{labelProjectCard.tecnologias}</Typography>
          <Stack direction={"row"} spacing={2}>
            <Avatar src={getImage[proyecto.frontend.imagen].ruta} />
            <Avatar src={getImage[proyecto.backend.imagen].ruta} />
            <Avatar src={getImage[proyecto.dataBase.imagen].ruta} />
          </Stack>
        </Stack>
      </Stack>
    </AnimatedCard>
  );
};

/**
 * `ProjectCardPortafolio` component that displays project details in a portfolio-style card.
 *
 * @param {ProjectCardPortafolioProps} props - Component props.
 * @param {ProyectoCard} props.proyecto - Project data.
 * @param {() => void} props.handleOpen - Function to handle opening the project details.
 *
 * @returns {JSX.Element} A portfolio-style project card.
 */
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
        {/* Project Image with Status Badge */}
        <Box sx={{ position: "relative" }}>
          <Box
            component={"img"}
            sx={{ width: "100%", border: "1px solid black" }}
            src={proyecto.imagen}
            alt={proyecto.titulo}
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
            <Status status="A" />
          </Card>
        </Box>

        {/* Project Details */}
        <Stack spacing={2} sx={{ paddingX: 2 }}>
          <Box textAlign={"center"}>
            <Typography variant="h5">{proyecto.titulo}</Typography>
            <Score value={proyecto.puntuacion} />
          </Box>

          {/* Members Section */}
          <Stack spacing={1} alignItems={"center"}>
            <Typography variant="body1">{labelProjectCard.integrantes}</Typography>
            <ProjectCardMembers integrantes={proyecto.integrantes} />
          </Stack>

          {/* Technologies Section */}
          <Stack spacing={1} alignItems={"center"}>
            <Typography variant="body1">{labelProjectCard.tecnologias}</Typography>
            <Stack direction={"row"} spacing={2}>
              <Avatar src={getImage[proyecto.frontend.imagen].ruta} />
              <Avatar src={getImage[proyecto.backend.imagen].ruta} />
              <Avatar src={getImage[proyecto.dataBase.imagen].ruta} />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </AnimatedCard>
  );
};

export default ProjectCard;
