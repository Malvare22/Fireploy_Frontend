import { Alert, Box, Chip, Stack, Typography } from "@mui/material";
import AnimatedCard from "../animatedCard";
import { ProyectoCard } from "@modules/proyectos/types/proyecto.card";
import React, { useContext, useEffect, useState } from "react";
import { ProjectCardMembers } from "../projectCardAvatar";
import { labelProjectCard } from "@modules/general/enums/labelProjectCard";
import { DialogContext } from "@modules/materias/pages/explorar/grupos/id";
import { useMutation } from "@tanstack/react-query";
import { postStarProject, postUnStarProject } from "@modules/proyectos/services/post.calificar";
import { VARIABLES_LOCAL_STORAGE } from "@modules/general/enums/variablesLocalStorage";
import { useAuth } from "@modules/general/context/accountContext";
import StarButton from "@modules/proyectos/components/starButton";

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
 * ProjectCard Component
 * 
 * A card that displays the details of a project. It includes the project image, 
 * title, members, technologies used, and a star button for liking/disliking the project.
 * The component also handles the click events to open a modal or navigate to another page.
 * 
 * @component
 * 
 * @param {ProjectCardProps} props - Component properties.
 * @param {ProyectoCard} props.proyecto - The project data to be displayed in the card.
 * @param {Function} props.handleOpen - The callback function to handle the card click event.
 * 
 * @returns {JSX.Element} A styled project card.
 * 
 * @example
 * ```tsx
 * <ProjectCard proyecto={projectData} handleOpen={handleCardClick} />
 * ```
 */
export const ProjectCard: React.FC<ProjectCardProps> = ({ proyecto, handleOpen }) => {
  const [localValue, setLocalValue] = useState<boolean>(false);
  const { token, id } = useAuth().accountInformation;

  const { setError } = useContext(DialogContext);

  useEffect(() => {
    if (!localStorage.getItem(VARIABLES_LOCAL_STORAGE.SCORES))
      localStorage.setItem(VARIABLES_LOCAL_STORAGE.SCORES, JSON.stringify([]));
    else {
      const LIKES = JSON.parse(
        localStorage.getItem(VARIABLES_LOCAL_STORAGE.SCORES) ?? "[]"
      ) as number[];
      setLocalValue(LIKES.includes(proyecto.id) || proyecto.fav_usuarios.includes(id));
    }
  }, []);

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      if (localValue) {
        return await postUnStarProject(proyecto.id, token);
      } else {
        return await postStarProject(proyecto.id, token);
      }
    },
    onSuccess: () => {
      const LIKES = JSON.parse(
        localStorage.getItem(VARIABLES_LOCAL_STORAGE.SCORES) ?? "[]"
      ) as number[];
      const nValue = localValue
        ? LIKES.filter((_proyectoId) => _proyectoId != proyecto.id)
        : [...LIKES, proyecto.id];
      localStorage.setItem(VARIABLES_LOCAL_STORAGE.SCORES, JSON.stringify(nValue));
      setLocalValue(!localValue);
    },
    onError: (err) => setError(err),
  });

  return (
    <Box sx={{ position: "relative", height: "100%" }}>
      <Box sx={{ position: "absolute", top: 4, right: 4, zIndex: 100 }}>
        <StarButton
          isLoading={isPending}
          mutate={mutate}
          value={localValue ? 1 : 0}
          modal={false}
        />
      </Box>
      <AnimatedCard
        sx={{
          width: 300,
          paddingBottom: 2,
          cursor: "pointer",
          height: "100%",
        }}
        onClick={handleOpen}
      >
        <Stack direction={"column"} justifyContent={"space-around"} height={"100%"}>
          {/* Project Image with Status Badge */}
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

          {/* Project Details */}
          <Stack spacing={2} sx={{ paddingX: 2 }}>
            <Box textAlign={"center"}>
              <Typography variant="h5">{proyecto.titulo}</Typography>
              {/* <Score value={proyecto.puntuacion} /> */}
            </Box>

            {/* Members Section */}
            <Stack spacing={0} alignItems={"center"}>
              <Typography variant="body1">{labelProjectCard.integrantes}</Typography>
              <ProjectCardMembers integrantes={proyecto.integrantes} />
            </Stack>

            {/* Technologies Section */}
            <Stack spacing={1} alignItems={"center"}>
              <Typography variant="body1">{labelProjectCard.tecnologias}</Typography>
              <Stack spacing={3} direction={"row"} justifyContent={"center"}>
                {proyecto.backend && <Chip label={proyecto.backend} color="error" />}
                {proyecto.frontend && <Chip label={proyecto.frontend} color="primary" />}
                {proyecto.integrado && <Chip label={proyecto.integrado} color="info" />}
                {proyecto.dataBase && <Chip label={proyecto.dataBase} color="warning" />}
                {!proyecto.integrado && !proyecto.frontend && !proyecto.backend && (
                  <Alert severity="warning">
                    Este proyecto actualmente no tiene tecnologías vinculadas
                  </Alert>
                )}
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </AnimatedCard>
    </Box>
  );
};

export default ProjectCard;
