import { Box, Card, Stack, Typography } from "@mui/material";
import AnimatedCard from "../animatedCard";
import Score from "../score";
import { ProyectoCard } from "@modules/proyectos/types/proyecto.card";
import React from "react";
import Status from "../status";

type ProjectCardProps = {
  /**
   * Project data to be rendered in the card.
   */
  proyecto: ProyectoCard;

  /**
   * Callback function to handle card click events (e.g. open modal or navigate).
   */
  handleOpen: () => void;
};

/**
 * Renders a card component displaying project details including image, score,
 * members, and technologies used.
 *
 * @component
 * @param {ProjectCardProps} props - Props containing the project info and event handler.
 * @returns {JSX.Element} - Returns a styled project card component.
 */


export const ProjectCard: React.FC<ProjectCardProps> = ({ proyecto, handleOpen }) => {

  return (
    <AnimatedCard
      sx={{
        width: 300,
        paddingBottom: 2,
        cursor: "pointer",
      }}
      onClick={handleOpen}
    >
      <Stack direction={"column"} spacing={2}>
        {/* Project Image with Status Badge */}
        <Box sx={{ position: "relative" }}>
          {proyecto.imagen ? (
            <Box
              component={"img"}
              sx={{ width: "100%", border: "1px solid black" }}
              src={proyecto.imagen}
              alt={proyecto.titulo}
            />
          ) : (
            <Box component={"img"} sx={{ width: "100%", height: 170, backgroundColor: "black" }} />
          )}
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
          {/* <Stack spacing={1} alignItems={"center"}>
            <Typography variant="body1">{labelProjectCard.integrantes}</Typography>
            <ProjectCardMembers integrantes={proyecto.integrantes} />
          </Stack> */}

          {/* Technologies Section */}
          {/* <Stack spacing={1} alignItems={"center"}>
            <Typography variant="body1">{labelProjectCard.tecnologias}</Typography>
            <Stack spacing={2}>
              <Chip color="error" label={proyecto.backend} />
              <Chip
                sx={{ backgroundColor: theme.palette.terciary.main }}
                label={proyecto.dataBase}
              />
              <Chip color="primary" label={proyecto.frontend} />
            </Stack>
          </Stack> */}
        </Stack>
      </Stack>
    </AnimatedCard>
  );
};

export default ProjectCard;
