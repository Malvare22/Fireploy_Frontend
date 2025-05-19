import { Alert, Box, CardActionArea, Divider, Paper, Stack, Typography, useTheme } from "@mui/material";
import { ProyectoCard } from "@modules/proyectos/types/proyecto.card";
import React, { useContext, useEffect, useState } from "react";
import { ProjectCardMembers } from "../projectCardAvatar";
import { DialogContext } from "@modules/materias/pages/explorar/grupos/id";
import { useMutation } from "@tanstack/react-query";
import { postStarProject, postUnStarProject } from "@modules/proyectos/services/post.calificar";
import { VARIABLES_LOCAL_STORAGE } from "@modules/general/enums/variablesLocalStorage";
import { useAuth } from "@modules/general/context/accountContext";
import StarButton from "@modules/proyectos/components/starButton";
import { getImage } from "@modules/general/utils/getImage";
import { ExecutionState } from "@modules/proyectos/components/executionState";

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

  const theme = useTheme();

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
    <Stack sx={{ padding: 1, width: "100%" }} justifyContent={"space-between"} component={Paper}>
      <CardActionArea onClick={handleOpen} sx={{display: 'flex', flexDirection: 'column', alignItems: 'start', gap: 1}}>
        <Box sx={{position: 'relative', width: 'inherit'}}>
          <Box
          component={"img"}
          src={proyecto.imagen ?? getImage["not_found"].ruta}
          sx={{ width: "100%", height: 180, borderRadius: 1, objectFit: "cover" }}
        >
        </Box>
          <Box sx={{position: 'absolute', top: 4, left: 4, backgroundColor: theme.palette.background.paper, opacity: 0.8, borderRadius: 3, padding: 0.5}}><ExecutionState projectStatus={proyecto.estado}/></Box>
        </Box>
        <Typography
          sx={{
            display: "-webkit-box",
            overflow: "visible",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            wordBreak: "break-all",
          }}
          variant="h5"
        >
          {proyecto.titulo}
        </Typography>

       <Box sx={{marginBottom: 1}}> {proyecto.descripcion.length > 0 ? (
          <Typography
            sx={{
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3,
              wordBreak: "break-all",
            }}
            variant="body2"
          >
            {proyecto.descripcion}
          </Typography>
        ) : (
          <Alert severity="info">
            <Typography variant="body2">{"Descripción no disponible"}</Typography>
          </Alert>
        )}</Box>
      </CardActionArea>
      <Stack spacing={1}>
        <Divider />
        <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
          <ProjectCardMembers integrantes={proyecto.integrantes} />
          <StarButton modal={false} isLoading={isPending} mutate={mutate} value={localValue} />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ProjectCard;
